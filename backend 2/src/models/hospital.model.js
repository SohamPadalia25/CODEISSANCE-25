import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: String,
      unique: true,
      required: true,
    },
    basicInfo: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        enum: ["government", "private", "trust", "corporate"],
        required: true,
      },
      category: {
        type: String,
        enum: ["primary", "secondary", "tertiary", "quaternary"],
        required: true,
      },
      specializations: [{
        type: String,
        enum: ["cardiology", "nephrology", "hepatology", "neurology", "oncology", "emergency", "trauma", "pediatrics", "geriatrics"]
      }],
      establishedYear: { type: Number },
      bedCapacity: { type: Number, required: true },
      icuBeds: { type: Number, default: 0 },
      emergencyBeds: { type: Number, default: 0 }
    },
    contactInfo: {
      primaryPhone: {
        type: String,
        required: true,
      },
      emergencyPhone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
      website: { type: String },
      faxNumber: { type: String }
    },
    address: {
      street: { type: String, required: true },
      area: { type: String },
      city: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      }
    },
    bloodBank: {
      hasBloodBank: { type: Boolean, default: false },
      bloodBankLicense: { type: String },
      bloodBankCapacity: { type: Number, default: 0 },
      currentInventory: [{
        bloodGroup: {
          type: String,
          enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
        },
        component: {
          type: String,
          enum: ["whole_blood", "red_cells", "plasma", "platelets", "cryoprecipitate"]
        },
        units: { type: Number, default: 0 },
        expiryDates: [{
          units: { type: Number },
          expiryDate: { type: Date }
        }],
        minimumStock: { type: Number, default: 5 },
        criticalLevel: { type: Number, default: 2 },
        lastUpdated: { type: Date, default: Date.now }
      }],
      operatingHours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String },
        emergencyAvailable: { type: Boolean, default: true }
      }
    },
    organTransplant: {
      hasTransplantFacility: { type: Boolean, default: false },
      transplantLicense: { type: String },
      organCapabilities: [{
        organ: {
          type: String,
          enum: ["kidney", "liver", "heart", "lung", "pancreas", "cornea", "skin", "bone", "tissue"]
        },
        canTransplant: { type: Boolean, default: false },
        canHarvest: { type: Boolean, default: false },
        surgeonCount: { type: Number, default: 0 },
        annualCapacity: { type: Number, default: 0 }
      }],
      currentWaitingList: [{
        organ: { type: String },
        urgencyLevel: {
          type: String,
          enum: ["critical", "high", "medium", "low"]
        },
        patientCount: { type: Number, default: 0 }
      }]
    },
    staff: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: {
        type: String,
        enum: ["admin", "doctor", "nurse", "technician", "coordinator", "manager"]
      },
      department: { type: String },
      specialization: { type: String },
      isActive: { type: Boolean, default: true }
    }],
    accreditation: {
      nabh: {
        isAccredited: { type: Boolean, default: false },
        accreditationDate: { type: Date },
        validUntil: { type: Date }
      },
      jci: {
        isAccredited: { type: Boolean, default: false },
        accreditationDate: { type: Date },
        validUntil: { type: Date }
      },
      otherCertifications: [{
        name: { type: String },
        issuedBy: { type: String },
        issuedDate: { type: Date },
        validUntil: { type: Date }
      }]
    },
    emergencyServices: {
      has24x7Emergency: { type: Boolean, default: false },
      hasAmbulance: { type: Boolean, default: false },
      ambulanceCount: { type: Number, default: 0 },
      hasHelicopter: { type: Boolean, default: false },
      traumaLevel: {
        type: String,
        enum: ["level1", "level2", "level3", "level4", "none"],
        default: "none"
      }
    },
    operationalStatus: {
      isOperational: { type: Boolean, default: true },
      capacity: {
        current: { type: Number, default: 0 },
        maximum: { type: Number, default: 100 }
      },
      lastStatusUpdate: { type: Date, default: Date.now },
      statusUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    ratings: {
      totalRating: { type: Number, default: 0 },
      numberOfRatings: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      categories: {
        facilities: { type: Number, default: 0 },
        staff: { type: Number, default: 0 },
        cleanliness: { type: Number, default: 0 },
        responseTime: { type: Number, default: 0 }
      }
    }
  },
  {
    timestamps: true,
  }
);

// Generate hospital ID
hospitalSchema.pre("save", function (next) {
  if (!this.hospitalId) {
    this.hospitalId = `HOSP${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

// Index for location-based queries
hospitalSchema.index({ "address.coordinates": "2dsphere" });
hospitalSchema.index({ "basicInfo.specializations": 1 });
hospitalSchema.index({ "operationalStatus.isOperational": 1 });

export const Hospital = mongoose.model("Hospital", hospitalSchema);
