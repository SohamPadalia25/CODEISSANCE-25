import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donorId: {
      type: String,
      unique: true,
      required: true,
    },
    personalInfo: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /\d{10}/.test(v);
          },
          message: 'Contact number should be 10 digits'
        }
      },
      alternateNumber: {
        type: String,
        validate: {
          validator: function(v) {
            return !v || /\d{10}/.test(v);
          },
          message: 'Alternate number should be 10 digits'
        }
      },
      emergencyContact: {
        name: { type: String, required: true },
        relation: { type: String, required: true },
        phone: { type: String, required: true }
      }
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      }
    },
    bloodInfo: {
      bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true,
      },
      rhFactor: {
        type: String,
        enum: ["positive", "negative"],
        required: true,
      },
      lastDonationDate: {
        type: Date,
      },
      isEligibleForDonation: {
        type: Boolean,
        default: true,
      },
      donationHistory: [{
        donationId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodDonation" },
        donationDate: { type: Date },
        location: { type: String },
        units: { type: Number }
      }]
    },
    organDonor: {
      isOrganDonor: {
        type: Boolean,
        default: false,
      },
      organConsent: {
        kidneys: { type: Boolean, default: false },
        liver: { type: Boolean, default: false },
        heart: { type: Boolean, default: false },
        lungs: { type: Boolean, default: false },
        pancreas: { type: Boolean, default: false },
        corneas: { type: Boolean, default: false },
        skin: { type: Boolean, default: false },
        bones: { type: Boolean, default: false },
        tissues: { type: Boolean, default: false }
      },
      consentDate: { type: Date },
      nextOfKinConsent: { type: Boolean, default: false }
    },
    medicalHistory: {
      height: { type: Number, required: true }, // in cm
      weight: { type: Number, required: true }, // in kg
      bmi: { type: Number },
      bloodPressure: {
        systolic: { type: Number },
        diastolic: { type: Number }
      },
      chronicConditions: [{
        condition: { type: String },
        diagnosedDate: { type: Date },
        medication: { type: String }
      }],
      allergies: [{ type: String }],
      surgicalHistory: [{
        surgery: { type: String },
        date: { type: Date },
        hospital: { type: String }
      }],
      currentMedications: [{ type: String }],
      smokingStatus: {
        type: String,
        enum: ["never", "former", "current"],
        default: "never"
      },
      alcoholConsumption: {
        type: String,
        enum: ["none", "occasional", "moderate", "heavy"],
        default: "none"
      }
    },
    availability: {
      isAvailable: {
        type: Boolean,
        default: true,
      },
      preferredTimeSlots: [{
        day: {
          type: String,
          enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        },
        startTime: { type: String },
        endTime: { type: String }
      }],
      maxTravelDistance: {
        type: Number,
        default: 50, // in km
      },
      notificationPreferences: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        emergencyOnly: { type: Boolean, default: false }
      }
    },
    verification: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      verificationDocuments: [{
        documentType: {
          type: String,
          enum: ["aadhar", "pan", "passport", "driving_license", "medical_report"]
        },
        documentNumber: { type: String },
        documentUrl: { type: String },
        verificationDate: { type: Date },
        verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
      }],
      medicalClearance: {
        isCleared: { type: Boolean, default: false },
        clearanceDate: { type: Date },
        validUntil: { type: Date },
        clearingDoctor: { type: String },
        clearingHospital: { type: String }
      }
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "banned"],
      default: "active",
    },
    donorRating: {
      totalRating: { type: Number, default: 0 },
      numberOfRatings: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 }
    },
    lastActiveDate: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to calculate BMI
donorSchema.pre("save", function (next) {
  if (this.medicalHistory.height && this.medicalHistory.weight) {
    const heightInMeters = this.medicalHistory.height / 100;
    this.medicalHistory.bmi = this.medicalHistory.weight / (heightInMeters * heightInMeters);
  }
  next();
});

// Generate donor ID
donorSchema.pre("save", function (next) {
  if (!this.donorId) {
    this.donorId = `DON${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

// Index for location-based queries
donorSchema.index({ "address.coordinates": "2dsphere" });
donorSchema.index({ "bloodInfo.bloodGroup": 1 });
donorSchema.index({ "availability.isAvailable": 1 });
donorSchema.index({ "verification.isVerified": 1 });

export const Donor = mongoose.model("Donor", donorSchema);
