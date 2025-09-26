import mongoose from "mongoose";

const emergencyAlertSchema = new mongoose.Schema(
  {
    alertId: {
      type: String,
      unique: true,
      required: true,
    },
    alertType: {
      type: String,
      enum: ["blood_shortage", "organ_match", "mass_casualty", "critical_patient"],
      required: true,
    },
    emergencyDetails: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      severity: {
        type: String,
        enum: ["critical", "high", "medium", "low"],
        default: "medium",
      },
      category: {
        type: String,
        enum: ["immediate", "urgent", "routine"],
        default: "urgent",
      },
      estimatedCasualties: { type: Number }, // for mass casualty events
      responseTimeRequired: { type: Number }, // in minutes
    },
    location: {
      hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
      },
      hospitalName: { type: String, required: true },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      },
      address: { type: String, required: true },
      contactInfo: {
        phone: { type: String, required: true },
        emergencyContact: { type: String }
      }
    },
    requirements: {
      blood: [{
        bloodGroup: {
          type: String,
          enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
        },
        component: {
          type: String,
          enum: ["whole_blood", "red_cells", "plasma", "platelets", "cryoprecipitate"]
        },
        unitsNeeded: { type: Number, required: true },
        urgencyLevel: {
          type: String,
          enum: ["immediate", "within_1hr", "within_4hrs", "within_24hrs"]
        }
      }],
      organs: [{
        organType: {
          type: String,
          enum: ["kidney", "liver", "heart", "lung", "pancreas", "cornea"]
        },
        urgencyLevel: {
          type: String,
          enum: ["critical", "urgent", "high"]
        },
        patientInfo: {
          age: { type: Number },
          bloodGroup: { type: String },
          medicalCondition: { type: String }
        }
      }]
    },
    targetAudience: {
      radius: {
        type: Number,
        default: 50, // km
      },
      donorTypes: [{
        type: String,
        enum: ["all", "verified_only", "regular", "first_time", "specific_group"]
      }],
      bloodGroups: [{
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
      }],
      excludeRecentDonors: { type: Boolean, default: false },
      minimumDonorRating: { type: Number, default: 0 }
    },
    alertStatus: {
      status: {
        type: String,
        enum: ["active", "partially_resolved", "resolved", "cancelled", "expired"],
        default: "active",
      },
      isActive: { type: Boolean, default: true },
      activatedAt: { type: Date, default: Date.now },
      resolvedAt: { type: Date },
      autoExpireAt: { type: Date },
      statusUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    responses: {
      totalNotified: { type: Number, default: 0 },
      totalResponded: { type: Number, default: 0 },
      positiveResponses: { type: Number, default: 0 },
      confirmedDonors: [{
        donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
        responseTime: { type: Date },
        estimatedArrival: { type: Date },
        bloodGroup: { type: String },
        contactNumber: { type: String },
        currentLocation: {
          latitude: { type: Number },
          longitude: { type: Number }
        },
        transportMode: { type: String },
        specialNotes: { type: String }
      }],
      responseRate: { type: Number, default: 0 } // percentage
    },
    routing: {
      suggestedRoutes: [{
        donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
        route: {
          distance: { type: Number }, // in km
          duration: { type: Number }, // in minutes
          steps: [{ type: String }],
          trafficConditions: { type: String },
          alternateRoutes: [{
            distance: { type: Number },
            duration: { type: Number },
            description: { type: String }
          }]
        },
        lastUpdated: { type: Date, default: Date.now }
      }],
      emergencyVehicles: [{
        vehicleType: { type: String },
        vehicleId: { type: String },
        currentLocation: {
          latitude: { type: Number },
          longitude: { type: Number }
        },
        estimatedArrival: { type: Date },
        capacity: { type: Number },
        isDispatched: { type: Boolean, default: false }
      }]
    },
    aiOptimization: {
      matchingAlgorithm: {
        version: { type: String },
        confidenceScore: { type: Number }, // 0-1
        factors: [{
          factor: { type: String },
          weight: { type: Number },
          value: { type: Number }
        }],
        processingTime: { type: Number } // in milliseconds
      },
      predictions: {
        expectedResolutionTime: { type: Number }, // in minutes
        probabilityOfSuccess: { type: Number }, // 0-1
        recommendedActions: [{ type: String }],
        riskFactors: [{ type: String }]
      },
      optimization: {
        routeOptimization: { type: Boolean, default: true },
        resourceAllocation: { type: Boolean, default: true },
        priorityAdjustment: { type: Boolean, default: true },
        realTimeAdjustments: { type: Boolean, default: true }
      }
    },
    communication: {
      notifications: [{
        method: {
          type: String,
          enum: ["sms", "email", "push", "call", "whatsapp"]
        },
        recipients: { type: Number },
        sentAt: { type: Date },
        deliveryStatus: { type: String },
        responseRate: { type: Number }
      }],
      updates: [{
        updateType: {
          type: String,
          enum: ["status_change", "new_requirements", "donor_update", "resolution"]
        },
        message: { type: String },
        timestamp: { type: Date, default: Date.now },
        sentTo: { type: String } // "all", "donors", "hospitals", "staff"
      }]
    }
  },
  {
    timestamps: true,
  }
);

// Generate alert ID
emergencyAlertSchema.pre("save", function (next) {
  if (!this.alertId) {
    this.alertId = `ALT${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

// Auto-expire alerts after 24 hours if not set
emergencyAlertSchema.pre("save", function (next) {
  if (!this.alertStatus.autoExpireAt) {
    this.alertStatus.autoExpireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  }
  next();
});

// Index for location-based queries
emergencyAlertSchema.index({ "location.coordinates": "2dsphere" });
emergencyAlertSchema.index({ "alertStatus.status": 1 });
emergencyAlertSchema.index({ "alertStatus.isActive": 1 });
emergencyAlertSchema.index({ "emergencyDetails.severity": 1 });

export const EmergencyAlert = mongoose.model("EmergencyAlert", emergencyAlertSchema);
