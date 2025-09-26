import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      unique: true,
      required: true,
    },
    patientInfo: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      age: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
      },
      bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true,
      },
      patientId: { type: String },
      contactPerson: {
        name: { type: String, required: true },
        relation: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String }
      }
    },
    requestDetails: {
      bloodComponent: {
        type: String,
        enum: ["whole_blood", "red_cells", "plasma", "platelets", "cryoprecipitate"],
        default: "whole_blood",
      },
      unitsRequired: {
        type: Number,
        required: true,
        min: 1,
      },
      urgencyLevel: {
        type: String,
        enum: ["critical", "urgent", "moderate", "routine"],
        default: "moderate",
      },
      medicalCondition: {
        type: String,
        required: true,
      },
      doctorName: { type: String, required: true },
      doctorRegistration: { type: String },
      requiredBy: {
        type: Date,
        required: true,
      },
      additionalNotes: { type: String }
    },
    hospitalInfo: {
      hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
      },
      hospitalName: { type: String, required: true },
      ward: { type: String },
      bedNumber: { type: String },
      contactNumber: { type: String, required: true }
    },
    matchingCriteria: {
      compatibleBloodGroups: [{
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
      }],
      maxDistance: {
        type: Number,
        default: 100, // in km
      },
      preferredDonorType: {
        type: String,
        enum: ["any", "verified_only", "regular_donors"],
        default: "any"
      }
    },
    requestStatus: {
      status: {
        type: String,
        enum: ["pending", "active", "partially_fulfilled", "fulfilled", "cancelled", "expired"],
        default: "pending",
      },
      statusHistory: [{
        status: { type: String },
        timestamp: { type: Date, default: Date.now },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        notes: { type: String }
      }],
      isActive: { type: Boolean, default: true },
      priority: {
        type: Number,
        min: 1,
        max: 10,
        default: 5
      }
    },
    donorMatches: [{
      donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor"
      },
      matchScore: { type: Number }, // AI compatibility score
      distance: { type: Number }, // in km
      estimatedTravelTime: { type: Number }, // in minutes
      availabilityConfirmed: { type: Boolean, default: false },
      contactedAt: { type: Date },
      responseStatus: {
        type: String,
        enum: ["not_contacted", "contacted", "accepted", "declined", "no_response"],
        default: "not_contacted"
      },
      donationScheduled: {
        isScheduled: { type: Boolean, default: false },
        scheduledDate: { type: Date },
        scheduledTime: { type: String },
        location: { type: String }
      }
    }],
    fulfillment: {
      unitsReceived: { type: Number, default: 0 },
      donations: [{
        donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
        donationId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodDonation" },
        units: { type: Number },
        donationDate: { type: Date },
        bloodBankId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodBank" }
      }],
      completedAt: { type: Date },
      completedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    aiInsights: {
      predictedFulfillmentTime: { type: Number }, // in hours
      riskFactors: [{ type: String }],
      recommendedActions: [{ type: String }],
      similarCasesAnalyzed: { type: Number },
      confidenceScore: { type: Number } // 0-1
    }
  },
  {
    timestamps: true,
  }
);

// Generate request ID
bloodRequestSchema.pre("save", function (next) {
  if (!this.requestId) {
    this.requestId = `REQ${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

// Auto-populate compatible blood groups based on patient blood group
bloodRequestSchema.pre("save", function (next) {
  if (this.isModified("patientInfo.bloodGroup") && !this.matchingCriteria.compatibleBloodGroups.length) {
    const compatibility = {
      "A+": ["A+", "A-", "O+", "O-"],
      "A-": ["A-", "O-"],
      "B+": ["B+", "B-", "O+", "O-"],
      "B-": ["B-", "O-"],
      "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "AB-": ["A-", "B-", "AB-", "O-"],
      "O+": ["O+", "O-"],
      "O-": ["O-"]
    };
    this.matchingCriteria.compatibleBloodGroups = compatibility[this.patientInfo.bloodGroup] || [];
  }
  next();
});

// Index for efficient queries
bloodRequestSchema.index({ "requestStatus.status": 1 });
bloodRequestSchema.index({ "requestStatus.isActive": 1 });
bloodRequestSchema.index({ "patientInfo.bloodGroup": 1 });
bloodRequestSchema.index({ "requestDetails.urgencyLevel": 1 });
bloodRequestSchema.index({ "requestDetails.requiredBy": 1 });

export const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);
