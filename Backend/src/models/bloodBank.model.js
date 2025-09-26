import mongoose from "mongoose";

const bloodBankSchema = new mongoose.Schema(
  {
    bloodBankId: {
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
        enum: ["government", "private", "ngo", "hospital_based", "standalone"],
        required: true,
      },
      category: {
        type: String,
        enum: ["district", "regional", "state", "national"],
        required: true,
      },
      establishedYear: { type: Number },
      capacity: { type: Number, required: true }, // Total storage capacity
      dailyCollectionTarget: { type: Number, default: 0 }
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
    licensing: {
      bloodBankLicense: { type: String, required: true },
      licenseIssueDate: { type: Date },
      licenseExpiryDate: { type: Date },
      issuingAuthority: { type: String },
      renewalStatus: {
        type: String,
        enum: ["valid", "expiring_soon", "expired", "renewal_pending"],
        default: "valid"
      },
      otherLicenses: [{
        licenseName: { type: String },
        licenseNumber: { type: String },
        issuedBy: { type: String },
        validUntil: { type: Date }
      }]
    },
    inventory: {
      currentStock: [{
        bloodGroup: {
          type: String,
          enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
          required: true
        },
        component: {
          type: String,
          enum: ["whole_blood", "red_cells", "plasma", "platelets", "cryoprecipitate", "fresh_frozen_plasma"],
          required: true
        },
        units: { type: Number, default: 0 },
        reserved: { type: Number, default: 0 }, // Reserved for specific requests
        available: { type: Number, default: 0 }, // Available for general use
        expiryBatches: [{
          batchId: { type: String },
          units: { type: Number },
          collectionDate: { type: Date },
          expiryDate: { type: Date },
          donationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "BloodDonation" }]
        }],
        minimumStock: { type: Number, default: 10 },
        criticalLevel: { type: Number, default: 5 },
        optimalLevel: { type: Number, default: 50 },
        lastUpdated: { type: Date, default: Date.now },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
      }],
      totalCapacityUsed: { type: Number, default: 0 },
      storageConditions: {
        wholeBlood: { temperature: String, humidity: String },
        redCells: { temperature: String, humidity: String },
        plasma: { temperature: String, humidity: String },
        platelets: { temperature: String, humidity: String }
      }
    },
    operations: {
      operatingHours: {
        monday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
        tuesday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
        wednesday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
        thursday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
        friday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
        saturday: { open: String, close: String, isOpen: { type: Boolean, default: true } },
        sunday: { open: String, close: String, isOpen: { type: Boolean, default: false } },
        emergencyAvailable: { type: Boolean, default: true }
      },
      services: [{
        service: {
          type: String,
          enum: ["collection", "testing", "processing", "storage", "distribution", "apheresis", "autologous"]
        },
        isAvailable: { type: Boolean, default: true },
        capacity: { type: Number },
        cost: { type: Number }
      }],
      equipment: [{
        equipmentType: {
          type: String,
          enum: ["refrigerator", "freezer", "centrifuge", "separator", "testing_kit", "collection_kit"]
        },
        brand: { type: String },
        model: { type: String },
        capacity: { type: Number },
        installationDate: { type: Date },
        lastMaintenanceDate: { type: Date },
        nextMaintenanceDate: { type: Date },
        status: {
          type: String,
          enum: ["operational", "maintenance", "breakdown", "retired"],
          default: "operational"
        }
      }]
    },
    staff: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: {
        type: String,
        enum: ["admin", "manager", "technician", "phlebotomist", "lab_technician", "quality_controller"]
      },
      department: {
        type: String,
        enum: ["administration", "collection", "testing", "processing", "storage", "distribution", "quality_control"]
      },
      shift: {
        type: String,
        enum: ["morning", "evening", "night", "rotating"]
      },
      isActive: { type: Boolean, default: true },
      joiningDate: { type: Date }
    }],
    partnerships: [{
      partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'partnerships.partnerType'
      },
      partnerType: {
        type: String,
        enum: ['Hospital', 'BloodBank', 'DonationCamp']
      },
      partnerName: { type: String },
      partnershipType: {
        type: String,
        enum: ["supplier", "distributor", "testing_partner", "collection_partner"]
      },
      agreementDate: { type: Date },
      agreementValidUntil: { type: Date },
      isActive: { type: Boolean, default: true }
    }],
    qualityControl: {
      accreditation: {
        nabh: {
          isAccredited: { type: Boolean, default: false },
          accreditationDate: { type: Date },
          validUntil: { type: Date },
          certificateNumber: { type: String }
        },
        cap: { // College of American Pathologists
          isAccredited: { type: Boolean, default: false },
          accreditationDate: { type: Date },
          validUntil: { type: Date }
        },
        iso: {
          isAccredited: { type: Boolean, default: false },
          standard: { type: String }, // ISO 15189, etc.
          accreditationDate: { type: Date },
          validUntil: { type: Date }
        }
      },
      qualityMetrics: {
        donationRejectionRate: { type: Number, default: 0 }, // percentage
        testingAccuracy: { type: Number, default: 0 }, // percentage
        storageCompliance: { type: Number, default: 0 }, // percentage
        lastAuditDate: { type: Date },
        nextAuditDate: { type: Date },
        auditScore: { type: Number }
      }
    },
    analytics: {
      monthlyStats: [{
        month: { type: Number },
        year: { type: Number },
        collections: { type: Number, default: 0 },
        distributions: { type: Number, default: 0 },
        wastage: { type: Number, default: 0 },
        emergencyRequests: { type: Number, default: 0 },
        newDonors: { type: Number, default: 0 },
        repeatDonors: { type: Number, default: 0 }
      }],
      performanceIndicators: {
        collectionEfficiency: { type: Number, default: 0 },
        inventoryTurnover: { type: Number, default: 0 },
        wastageRate: { type: Number, default: 0 },
        donorSatisfactionScore: { type: Number, default: 0 },
        averageResponseTime: { type: Number, default: 0 } // in minutes
      }
    },
    operationalStatus: {
      isOperational: { type: Boolean, default: true },
      currentCapacityUtilization: { type: Number, default: 0 }, // percentage
      lastStatusUpdate: { type: Date, default: Date.now },
      statusUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      maintenanceSchedule: [{
        maintenanceType: { type: String },
        scheduledDate: { type: Date },
        estimatedDuration: { type: Number }, // in hours
        impact: { type: String } // "none", "partial", "full"
      }]
    },
    emergencyProtocols: {
      emergencyContacts: [{
        name: { type: String },
        designation: { type: String },
        phone: { type: String },
        email: { type: String },
        availability: { type: String }
      }],
      disasterRecoveryPlan: {
        backupLocation: { type: String },
        backupCapacity: { type: Number },
        recoveryTime: { type: Number }, // in hours
        lastTested: { type: Date }
      },
      contingencyStock: [{
        bloodGroup: { type: String },
        component: { type: String },
        emergencyUnits: { type: Number },
        location: { type: String }
      }]
    },
    ratings: {
      totalRating: { type: Number, default: 0 },
      numberOfRatings: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      categories: {
        service: { type: Number, default: 0 },
        cleanliness: { type: Number, default: 0 },
        staff: { type: Number, default: 0 },
        efficiency: { type: Number, default: 0 },
        safety: { type: Number, default: 0 }
      },
      reviews: [{
        reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String },
        category: { type: String },
        reviewDate: { type: Date, default: Date.now },
        isVerified: { type: Boolean, default: false }
      }]
    }
  },
  {
    timestamps: true,
  }
);

// Generate blood bank ID
bloodBankSchema.pre("save", function (next) {
  if (!this.bloodBankId) {
    this.bloodBankId = `BB${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

// Update available units when stock changes
bloodBankSchema.pre("save", function (next) {
  if (this.isModified("inventory.currentStock")) {
    this.inventory.currentStock.forEach(item => {
      item.available = Math.max(0, item.units - item.reserved);
    });
    
    // Calculate total capacity used
    this.inventory.totalCapacityUsed = this.inventory.currentStock.reduce((total, item) => {
      return total + item.units;
    }, 0);
  }
  next();
});

// Update license renewal status
bloodBankSchema.pre("save", function (next) {
  if (this.licensing.licenseExpiryDate) {
    const daysUntilExpiry = Math.ceil((this.licensing.licenseExpiryDate - Date.now()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry <= 0) {
      this.licensing.renewalStatus = "expired";
    } else if (daysUntilExpiry <= 30) {
      this.licensing.renewalStatus = "expiring_soon";
    } else {
      this.licensing.renewalStatus = "valid";
    }
  }
  next();
});

// Index for location-based queries
bloodBankSchema.index({ "address.coordinates": "2dsphere" });
bloodBankSchema.index({ "basicInfo.type": 1 });
bloodBankSchema.index({ "operationalStatus.isOperational": 1 });
bloodBankSchema.index({ "inventory.currentStock.bloodGroup": 1 });
bloodBankSchema.index({ "inventory.currentStock.component": 1 });

export const BloodBank = mongoose.model("BloodBank", bloodBankSchema);
