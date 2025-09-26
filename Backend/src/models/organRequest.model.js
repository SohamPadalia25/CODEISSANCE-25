import mongoose from "mongoose";

const organRequestSchema = new mongoose.Schema(
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
      weight: { type: Number, required: true }, // in kg
      height: { type: Number, required: true }, // in cm
      patientId: { type: String },
      uhid: { type: String }, // Unique Health ID
      contactPerson: {
        name: { type: String, required: true },
        relation: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String }
      }
    },
    organDetails: {
      organType: {
        type: String,
        enum: ["kidney", "liver", "heart", "lung", "pancreas", "cornea", "skin", "bone", "tissue"],
        required: true,
      },
      organSize: { type: String }, // e.g., "adult", "pediatric", "specific measurements"
      urgencyLevel: {
        type: String,
        enum: ["critical", "urgent", "high", "medium", "routine"],
        default: "medium",
      },
      medicalCondition: {
        primaryDiagnosis: { type: String, required: true },
        secondaryConditions: [{ type: String }],
        stageOfDisease: { type: String },
        prognosisWithoutTransplant: { type: String }
      },
      requiredBy: { type: Date },
      waitingListDate: { type: Date, required: true },
      meldScore: { type: Number }, // For liver transplants
      gfrLevel: { type: Number }, // For kidney transplants
      ejectionFraction: { type: Number } // For heart transplants
    },
    hospitalInfo: {
      hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
      },
      hospitalName: { type: String, required: true },
      transplantTeam: {
        leadSurgeon: { type: String, required: true },
        surgeonRegistration: { type: String },
        coordinatorName: { type: String },
        coordinatorPhone: { type: String }
      },
      ward: { type: String },
      bedNumber: { type: String }
    },
    matchingCriteria: {
      compatibleBloodGroups: [{
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
      }],
      ageRange: {
        min: { type: Number, default: 18 },
        max: { type: Number, default: 65 }
      },
      weightRange: {
        min: { type: Number },
        max: { type: Number }
      },
      heightRange: {
        min: { type: Number },
        max: { type: Number }
      },
      hlaCompatibility: [{
        locusType: { type: String }, // A, B, C, DR, DQ
        alleles: [{ type: String }]
      }],
      crossmatchRequirement: {
        type: String,
        enum: ["required", "preferred", "not_required"],
        default: "required"
      },
      maxDistance: {
        type: Number,
        default: 500, // in km
      }
    },
    requestStatus: {
      status: {
        type: String,
        enum: ["waitlisted", "active", "match_found", "transplant_scheduled", "transplanted", "cancelled", "deceased"],
        default: "waitlisted",
      },
      statusHistory: [{
        status: { type: String },
        timestamp: { type: Date, default: Date.now },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        notes: { type: String }
      }],
      priority: {
        type: Number,
        min: 1,
        max: 10,
        default: 5
      },
      waitingListPosition: { type: Number },
      estimatedWaitTime: { type: Number } // in days
    },
    potentialMatches: [{
      donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor"
      },
      compatibilityScore: { type: Number }, // 0-100
      hlaMatchLevel: { type: String }, // "full", "partial", "minimal"
      distance: { type: Number },
      riskFactors: [{ type: String }],
      organQuality: { type: String },
      matchDate: { type: Date, default: Date.now },
      crossmatchResult: {
        type: String,
        enum: ["positive", "negative", "pending", "not_done"]
      }
    }],
    transplantDetails: {
      isScheduled: { type: Boolean, default: false },
      scheduledDate: { type: Date },
      scheduledTime: { type: String },
      operatingRoom: { type: String },
      estimatedDuration: { type: Number }, // in hours
      selectedDonor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
      transplantTeam: [{
        role: { type: String },
        doctorName: { type: String },
        specialization: { type: String }
      }],
      preOpRequirements: [{ type: String }],
      completedAt: { type: Date },
      outcome: {
        type: String,
        enum: ["successful", "complications", "rejected", "failed"]
      },
      postOpNotes: { type: String }
    },
    aiInsights: {
      survivalProbability: { type: Number }, // 0-1
      optimalTransplantWindow: {
        start: { type: Date },
        end: { type: Date }
      },
      riskAssessment: {
        surgical: { type: String },
        immunological: { type: String },
        overall: { type: String }
      },
      recommendedActions: [{ type: String }],
      similarCasesAnalyzed: { type: Number },
      modelConfidence: { type: Number } // 0-1
    }
  },
  {
    timestamps: true,
  }
);

// Generate request ID
organRequestSchema.pre("save", function (next) {
  if (!this.requestId) {
    this.requestId = `ORG${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

// Auto-populate compatible blood groups
organRequestSchema.pre("save", function (next) {
  if (this.isModified("patientInfo.bloodGroup") && !this.matchingCriteria.compatibleBloodGroups.length) {
    const organCompatibility = {
      "A+": ["A+", "A-", "O+", "O-"],
      "A-": ["A-", "O-"],
      "B+": ["B+", "B-", "O+", "O-"],
      "B-": ["B-", "O-"],
      "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "AB-": ["A-", "B-", "AB-", "O-"],
      "O+": ["O+", "O-"],
      "O-": ["O-"]
    };
    this.matchingCriteria.compatibleBloodGroups = organCompatibility[this.patientInfo.bloodGroup] || [];
  }
  next();
});

// Index for efficient queries
organRequestSchema.index({ "requestStatus.status": 1 });
organRequestSchema.index({ "organDetails.organType": 1 });
organRequestSchema.index({ "organDetails.urgencyLevel": 1 });
organRequestSchema.index({ "requestStatus.waitingListPosition": 1 });

export const OrganRequest = mongoose.model("OrganRequest", organRequestSchema);
