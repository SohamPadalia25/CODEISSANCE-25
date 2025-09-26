import mongoose from "mongoose";

const bloodDonationSchema = new mongoose.Schema(
  {
    donationId: {
      type: String,
      unique: true,
      required: true,
    },
    donorInfo: {
      donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donor",
        required: true,
      },
      donorName: { type: String, required: true },
      donorBloodGroup: { type: String, required: true },
      donorPhone: { type: String, required: true }
    },
    donationDetails: {
      donationType: {
        type: String,
        enum: ["voluntary", "replacement", "directed", "autologous"],
        default: "voluntary",
      },
      bloodComponent: {
        type: String,
        enum: ["whole_blood", "plasma", "platelets", "double_red_cells"],
        default: "whole_blood",
      },
      volume: {
        type: Number,
        required: true, // in ml
      },
      units: {
        type: Number,
        default: 1,
      },
      donationDate: {
        type: Date,
        required: true,
      },
      donationTime: { type: String, required: true },
      estimatedDuration: { type: Number }, // in minutes
      actualDuration: { type: Number } // in minutes
    },
    location: {
      facilityId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "location.facilityType"
      },
      facilityType: {
        type: String,
        enum: ["Hospital", "BloodBank", "DonationCamp"],
        required: true
      },
      facilityName: { type: String, required: true },
      address: {
        street: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        coordinates: {
          latitude: { type: Number },
          longitude: { type: Number }
        }
      },
      collectionTeam: [{
        role: { type: String },
        name: { type: String },
        staffId: { type: String }
      }]
    },
    medicalScreening: {
      preScreening: {
        bloodPressure: {
          systolic: { type: Number },
          diastolic: { type: Number }
        },
        pulse: { type: Number },
        temperature: { type: Number },
        weight: { type: Number },
        hemoglobin: { type: Number },
        screeningNotes: { type: String },
        screenedBy: { type: String },
        approved: { type: Boolean, required: true }
      },
      medicalHistory: {
        recentIllness: { type: Boolean, default: false },
        medications: [{ type: String }],
        recentTravel: { type: Boolean, default: false },
        riskFactors: [{ type: String }],
        previousDonations: { type: Number, default: 0 },
        lastDonationDate: { type: Date }
      },
      postScreening: {
        adverseReactions: { type: Boolean, default: false },
        reactionType: { type: String },
        reactionSeverity: {
          type: String,
          enum: ["none", "mild", "moderate", "severe"]
        },
        treatmentGiven: { type: String },
        monitoringNotes: { type: String }
      }
    },
    testingResults: {
      bloodTyping: {
        abo: { type: String, required: true },
        rh: { type: String, required: true },
        confirmedBy: { type: String },
        testDate: { type: Date }
      },
      infectiousDisease: {
        hiv: { type: String, enum: ["negative", "positive", "pending"] },
        hepatitisB: { type: String, enum: ["negative", "positive", "pending"] },
        hepatitisC: { type: String, enum: ["negative", "positive", "pending"] },
        syphilis: { type: String, enum: ["negative", "positive", "pending"] },
        malaria: { type: String, enum: ["negative", "positive", "pending"] },
        testDate: { type: Date },
        testedBy: { type: String },
        labReference: { type: String }
      },
      qualityParameters: {
        hemoglobin: { type: Number },
        hematocrit: { type: Number },
        plateletCount: { type: Number },
        whiteBloodCells: { type: Number },
        qualityGrade: {
          type: String,
          enum: ["excellent", "good", "acceptable", "rejected"]
        }
      }
    },
    processing: {
      collectionBag: {
        bagType: { type: String },
        bagNumber: { type: String },
        expiryDate: { type: Date }
      },
      separation: {
        isSeparated: { type: Boolean, default: false },
        separationDate: { type: Date },
        components: [{
          type: {
            type: String,
            enum: ["red_cells", "plasma", "platelets", "cryoprecipitate"]
          },
          volume: { type: Number },
          bagNumber: { type: String },
          expiryDate: { type: Date },
          storageConditions: { type: String }
        }]
      },
      storage: {
        storageLocation: { type: String },
        storageConditions: { type: String },
        temperatureLog: [{
          temperature: { type: Number },
          timestamp: { type: Date }
        }]
      }
    },
    distribution: {
      isAvailable: { type: Boolean, default: true },
      reservedFor: {
        requestId: { type: mongoose.Schema.Types.ObjectId, ref: "BloodRequest" },
        hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
        patientName: { type: String },
        reservedDate: { type: Date }
      },
      dispensed: {
        isDispensed: { type: Boolean, default: false },
        dispensedTo: { type: String },
        dispensedDate: { type: Date },
        dispensedBy: { type: String },
        transportDetails: {
          method: { type: String },
          temperature: { type: String },
          estimatedDelivery: { type: Date }
        }
      }
    },
    donationStatus: {
      status: {
        type: String,
        enum: ["collected", "processing", "tested", "approved", "rejected", "expired", "dispensed"],
        default: "collected",
      },
      statusHistory: [{
        status: { type: String },
        timestamp: { type: Date, default: Date.now },
        updatedBy: { type: String },
        notes: { type: String }
      }],
      rejectionReason: { type: String },
      qualityIssues: [{ type: String }]
    },
    feedback: {
      donorFeedback: {
        experience: {
          type: String,
          enum: ["excellent", "good", "average", "poor"]
        },
        staffRating: { type: Number, min: 1, max: 5 },
        facilityRating: { type: Number, min: 1, max: 5 },
        overallRating: { type: Number, min: 1, max: 5 },
        comments: { type: String },
        wouldRecommend: { type: Boolean }
      },
      followUpContact: {
        contacted: { type: Boolean, default: false },
        contactDate: { type: Date },
        contactMethod: { type: String },
        response: { type: String }
      }
    }
  },
  {
    timestamps: true,
  }
);

// Generate donation ID
bloodDonationSchema.pre("save", function (next) {
  if (!this.donationId) {
    this.donationId = `BLD${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

// Index for efficient queries
bloodDonationSchema.index({ "donationDetails.donationDate": -1 });
bloodDonationSchema.index({ "donorInfo.donorBloodGroup": 1 });
bloodDonationSchema.index({ "donationStatus.status": 1 });
bloodDonationSchema.index({ "distribution.isAvailable": 1 });

export const BloodDonation = mongoose.model("BloodDonation", bloodDonationSchema);
