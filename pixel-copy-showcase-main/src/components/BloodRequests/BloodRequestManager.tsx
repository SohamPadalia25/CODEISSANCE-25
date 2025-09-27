import React, { useState } from "react";
import { Plus, Filter, Search, Clock, AlertCircle, CheckCircle, Users, Zap, Loader, MapPin, Phone, Mail, Heart } from "lucide-react";

// Types
interface Location {
  lat: number;
  lon: number;
}

interface Donor {
  id: string;
  name: string;
  blood_type: string;
  organ: string | null;
  location: Location;
  available: boolean;
  phone?: string;
  email?: string;
  donationCount?: number;
  lastDonation?: Date;
  compatibilityScore?: number;
}

interface Recipient {
  id: string;
  name: string;
  blood_type_needed: string;
  organ_needed: string | null;
  hospital_id: string;
}

interface Hospital {
  id: string;
  name: string;
  location: Location;
  inventory: {
    blood: { [key: string]: number };
    organs: { [key: string]: number };
  };
}

interface BloodRequest {
  id: string;
  recipientId: string;
  patientName: string;
  bloodType: string;
  organNeeded: string | null;
  unitsRequired: number;
  urgency: string;
  status: string;
  requiredBy: Date;
  hospitalId: string;
  createdAt?: Date;
}

// Mock Data based on provided JSON
const mockHospitals: Hospital[] = [
  {
    "id": "H001",
    "name": "AIIMS Delhi",
    "location": {"lat": 28.61, "lon": 77.21},
    "inventory": {
      "blood": {"A+": 10, "A-": 5, "B+": 8, "B-": 2, "AB+": 4, "AB-": 1, "O+": 12, "O-": 1},
      "organs": {"Kidney": 2, "Liver": 1, "Heart": 0, "Lungs": 1}
    }
  },
  {
    "id": "H002",
    "name": "Tata Memorial Hospital Mumbai",
    "location": {"lat": 19.07, "lon": 72.88},
    "inventory": {
      "blood": {"A+": 8, "A-": 3, "B+": 5, "B-": 4, "AB+": 2, "AB-": 2, "O+": 15, "O-": 4},
      "organs": {"Kidney": 3, "Liver": 0, "Heart": 1, "Lungs": 2}
    }
  },
  {
    "id": "H003",
    "name": "Apollo Hospital Chennai",
    "location": {"lat": 13.08, "lon": 80.27},
    "inventory": {
      "blood": {"A+": 12, "A-": 6, "B+": 9, "B-": 3, "AB+": 5, "AB-": 1, "O+": 20, "O-": 5},
      "organs": {"Kidney": 1, "Liver": 2, "Heart": 0, "Lungs": 0}
    }
  },
  {
    "id": "H004",
    "name": "Lilavati Hospital Bandra",
    "location": {"lat": 19.0596, "lon": 72.8295},
    "inventory": {
      "blood": {"A+": 6, "A-": 4, "B+": 7, "B-": 2, "AB+": 3, "AB-": 1, "O+": 10, "O-": 2},
      "organs": {"Kidney": 2, "Liver": 1, "Heart": 1, "Lungs": 1}
    }
  }
];

const mockRecipients: Recipient[] = [
  {"id": "R001", "name": "Patient Anil", "blood_type_needed": "O-", "organ_needed": null, "hospital_id": "H001"},
  {"id": "R002", "name": "Patient Beena", "blood_type_needed": "A-", "organ_needed": null, "hospital_id": "H002"},
  {"id": "R003", "name": "Patient Charu", "blood_type_needed": "B+", "organ_needed": "Liver", "hospital_id": "H002"},
  {"id": "R004", "name": "Patient Dev", "blood_type_needed": "AB+", "organ_needed": null, "hospital_id": "H003"},
  {"id": "R005", "name": "Patient Esha", "blood_type_needed": "O+", "organ_needed": "Heart", "hospital_id": "H004"}
];

const mockDonors: Donor[] = [
  {"id": "D001", "name": "Amit Sharma", "blood_type": "O-", "organ": "Kidney", "location": {"lat": 28.6139, "lon": 77.2090}, "available": true, "phone": "+91 98765 43210", "email": "amit.sharma@email.com", "donationCount": 5, "lastDonation": new Date('2024-01-15')},
  {"id": "D002", "name": "Bhavna Reddy", "blood_type": "A+", "organ": null, "location": {"lat": 28.6145, "lon": 77.2105}, "available": true, "phone": "+91 98765 43211", "email": "bhavna.reddy@email.com", "donationCount": 3, "lastDonation": new Date('2024-02-01')},
  {"id": "D003", "name": "Chirag Patel", "blood_type": "B-", "organ": null, "location": {"lat": 28.6155, "lon": 77.2120}, "available": true, "phone": "+91 98765 43212", "email": "chirag.patel@email.com", "donationCount": 7, "lastDonation": new Date('2024-01-20')},
  {"id": "D004", "name": "Deepa Iyer", "blood_type": "AB+", "organ": "Liver", "location": {"lat": 19.0760, "lon": 72.8777}, "available": true, "phone": "+91 98765 43213", "email": "deepa.iyer@email.com", "donationCount": 2, "lastDonation": new Date('2024-01-30')},
  {"id": "D005", "name": "Eshan Verma", "blood_type": "O+", "organ": null, "location": {"lat": 19.0775, "lon": 72.8790}, "available": true, "phone": "+91 98765 43214", "email": "eshan.verma@email.com", "donationCount": 8, "lastDonation": new Date('2024-02-05')},
  {"id": "D006", "name": "Farah Khan", "blood_type": "A-", "organ": null, "location": {"lat": 19.0785, "lon": 72.8805}, "available": true, "phone": "+91 98765 43215", "email": "farah.khan@email.com", "donationCount": 4, "lastDonation": new Date('2024-01-25')},
  {"id": "D007", "name": "Gopal Nair", "blood_type": "B+", "organ": null, "location": {"lat": 19.0800, "lon": 72.8820}, "available": false, "phone": "+91 98765 43216", "email": "gopal.nair@email.com", "donationCount": 6, "lastDonation": new Date('2024-02-15')},
  {"id": "D008", "name": "Harleen Kaur", "blood_type": "AB-", "organ": "Heart", "location": {"lat": 13.0827, "lon": 80.2707}, "available": true, "phone": "+91 98765 43217", "email": "harleen.kaur@email.com", "donationCount": 1, "lastDonation": new Date('2024-02-10')},
  {"id": "D009", "name": "Irfan Sheikh", "blood_type": "O-", "organ": null, "location": {"lat": 13.0835, "lon": 80.2715}, "available": true, "phone": "+91 98765 43218", "email": "irfan.sheikh@email.com", "donationCount": 9, "lastDonation": new Date('2024-01-10')},
  {"id": "D010", "name": "Jyoti Mishra", "blood_type": "A+", "organ": null, "location": {"lat": 13.0845, "lon": 80.2725}, "available": true, "phone": "+91 98765 43219", "email": "jyoti.mishra@email.com", "donationCount": 5, "lastDonation": new Date('2024-02-08')},
  {"id": "D011", "name": "Karan Mehta", "blood_type": "O+", "organ": "Lungs", "location": {"lat": 28.6165, "lon": 77.2150}, "available": true, "phone": "+91 98765 43220", "email": "karan.mehta@email.com", "donationCount": 3, "lastDonation": new Date('2024-01-28')},
  {"id": "D012", "name": "Leela Menon", "blood_type": "B-", "organ": null, "location": {"lat": 28.6175, "lon": 77.2165}, "available": true, "phone": "+91 98765 43221", "email": "leela.menon@email.com", "donationCount": 7, "lastDonation": new Date('2024-02-12')},
  {"id": "D013", "name": "Manoj Deshmukh", "blood_type": "A-", "organ": null, "location": {"lat": 19.0815, "lon": 72.8835}, "available": true, "phone": "+91 98765 43222", "email": "manoj.deshmukh@email.com", "donationCount": 4, "lastDonation": new Date('2024-01-18')},
  {"id": "D014", "name": "Neha Gupta", "blood_type": "AB+", "organ": null, "location": {"lat": 19.0825, "lon": 72.8845}, "available": true, "phone": "+91 98765 43223", "email": "neha.gupta@email.com", "donationCount": 2, "lastDonation": new Date('2024-02-14')},
  {"id": "D015", "name": "Om Prakash", "blood_type": "O-", "organ": null, "location": {"lat": 13.0855, "lon": 80.2735}, "available": true, "phone": "+91 98765 43224", "email": "om.prakash@email.com", "donationCount": 6, "lastDonation": new Date('2024-01-22')},
  {"id": "D016", "name": "Pooja Joshi", "blood_type": "A+", "organ": null, "location": {"lat": 13.0865, "lon": 80.2745}, "available": false, "phone": "+91 98765 43225", "email": "pooja.joshi@email.com", "donationCount": 8, "lastDonation": new Date('2024-02-03')},
  {"id": "D017", "name": "Rahul Yadav", "blood_type": "B+", "organ": null, "location": {"lat": 28.6185, "lon": 77.2180}, "available": true, "phone": "+91 98765 43226", "email": "rahul.yadav@email.com", "donationCount": 5, "lastDonation": new Date('2024-01-29')},
  {"id": "D018", "name": "Sanya Kapoor", "blood_type": "O+", "organ": null, "location": {"lat": 28.6195, "lon": 77.2195}, "available": true, "phone": "+91 98765 43227", "email": "sanya.kapoor@email.com", "donationCount": 3, "lastDonation": new Date('2024-02-07')},
  {"id": "D019", "name": "Tarun Gill", "blood_type": "A-", "organ": "Kidney", "location": {"lat": 19.0835, "lon": 72.8855}, "available": true, "phone": "+91 98765 43228", "email": "tarun.gill@email.com", "donationCount": 7, "lastDonation": new Date('2024-01-14')},
  {"id": "D020", "name": "Usha Rani", "blood_type": "AB-", "organ": null, "location": {"lat": 19.0845, "lon": 72.8865}, "available": true, "phone": "+91 98765 43229", "email": "usha.rani@email.com", "donationCount": 4, "lastDonation": new Date('2024-02-11')}
];

// Convert recipients to blood requests
const mockBloodRequests: BloodRequest[] = mockRecipients.map(recipient => {
  const hospital = mockHospitals.find(h => h.id === recipient.hospital_id);
  return {
    id: recipient.id,
    recipientId: recipient.id,
    patientName: recipient.name,
    bloodType: recipient.blood_type_needed,
    organNeeded: recipient.organ_needed,
    unitsRequired: 2, // Default value
    urgency: recipient.organ_needed ? "Critical" : "High",
    status: "Pending",
    requiredBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    hospitalId: recipient.hospital_id,
    hospitalName: hospital?.name || "Unknown Hospital",
    createdAt: new Date()
  };
});

// Extend BloodRequest interface
interface ExtendedBloodRequest extends BloodRequest {
  hospitalName?: string;
}

const BloodRequestManager: React.FC = () => {
  const [requests, setRequests] = useState<ExtendedBloodRequest[]>(mockBloodRequests);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editRequestId, setEditRequestId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedDonors, setRecommendedDonors] = useState<Donor[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [aiProgress, setAiProgress] = useState(0);

  const [newRequest, setNewRequest] = useState({
    recipientId: "",
    patientName: "",
    bloodType: "O+",
    organNeeded: "",
    unitsRequired: 1,
    urgency: "Low",
    status: "Pending",
    requiredBy: new Date(),
    hospitalId: "H001"
  });

  // Calculate distance between two locations (simplified)
  const calculateDistance = (loc1: Location, loc2: Location): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lon - loc1.lon) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Simulate AI processing to find compatible donors
  const findCompatibleDonors = (bloodType: string, organNeeded: string | null, hospitalId: string) => {
    setIsLoading(true);
    setAiProgress(0);
    
    const progressInterval = setInterval(() => {
      setAiProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Get hospital location for distance calculation
    const hospital = mockHospitals.find(h => h.id === hospitalId);
    
    setTimeout(() => {
      const compatibilityMap: { [key: string]: string[] } = {
        "O+": ["O+", "O-"],
        "O-": ["O-"],
        "A+": ["A+", "A-", "O+", "O-"],
        "A-": ["A-", "O-"],
        "B+": ["B+", "B-", "O+", "O-"],
        "B-": ["B-", "O-"],
        "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        "AB-": ["A-", "B-", "AB-", "O-"]
      };

      const compatibleTypes = compatibilityMap[bloodType] || [];
      let filteredDonors = mockDonors.filter(donor => 
        compatibleTypes.includes(donor.blood_type) && 
        donor.available
      );

      // If organ is needed, filter donors who have that organ available
      if (organNeeded) {
        filteredDonors = filteredDonors.filter(donor => 
          donor.organ === organNeeded
        );
      }

      // Calculate compatibility scores with distance consideration
      const scoredDonors = filteredDonors.map(donor => {
        let score = 0;
        
        // Blood type compatibility
        if (donor.blood_type === bloodType) score += 40;
        else if (bloodType.includes('AB') && donor.blood_type.includes('O')) score += 30;
        else score += 20;

        // Organ match bonus
        if (organNeeded && donor.organ === organNeeded) score += 30;

        // Distance consideration (closer is better)
        if (hospital) {
          const distance = calculateDistance(donor.location, hospital.location);
          if (distance < 10) score += 20; // Within 10km
          else if (distance < 50) score += 15; // Within 50km
          else if (distance < 100) score += 10; // Within 100km
        }

        // Donor reliability
        if (donor.donationCount && donor.donationCount > 5) score += 10;
        else if (donor.donationCount && donor.donationCount > 2) score += 5;

        return {
          ...donor,
          compatibilityScore: Math.min(score, 100),
          distance: hospital ? calculateDistance(donor.location, hospital.location) : 0
        };
      }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);

      setRecommendedDonors(scoredDonors.slice(0, 4)); // Top 4 matches
      setIsLoading(false);
      setAiProgress(100);
      clearInterval(progressInterval);
    }, 3000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "High":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
      case "Medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 text-amber-500" />;
      case "Fulfilled":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Cancelled":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    if (score >= 60) return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    if (score >= 40) return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
    return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAiProgress(0);

    const progressInterval = setInterval(() => {
      setAiProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 20;
      });
    }, 200);

    setTimeout(() => {
      if (editRequestId !== null) {
        setRequests(
          requests.map((req) =>
            req.id === editRequestId ? { ...req, ...newRequest } : req
          )
        );
      } else {
        const newId = `R${String(requests.length + 1).padStart(3, '0')}`;
        const hospital = mockHospitals.find(h => h.id === newRequest.hospitalId);
        const createdRequest: ExtendedBloodRequest = {
          id: newId,
          ...newRequest,
          organNeeded: newRequest.organNeeded || null,
          status: "Pending",
          requiredBy: new Date(newRequest.requiredBy),
          hospitalName: hospital?.name,
          createdAt: new Date()
        };
        
        setRequests([createdRequest, ...requests]);
        setSelectedRequestId(newId);
        findCompatibleDonors(newRequest.bloodType, newRequest.organNeeded || null, newRequest.hospitalId);
      }

      setShowCreateForm(false);
      setEditRequestId(null);
      setNewRequest({
        recipientId: "",
        patientName: "",
        bloodType: "O+",
        organNeeded: "",
        unitsRequired: 1,
        urgency: "Low",
        status: "Pending",
        requiredBy: new Date(),
        hospitalId: "H001"
      });
      clearInterval(progressInterval);
    }, 2000);
  };

  const handleEditRequest = (request: ExtendedBloodRequest) => {
    setNewRequest({
      recipientId: request.recipientId,
      patientName: request.patientName,
      bloodType: request.bloodType,
      organNeeded: request.organNeeded || "",
      unitsRequired: request.unitsRequired,
      urgency: request.urgency,
      status: request.status,
      requiredBy: request.requiredBy,
      hospitalId: request.hospitalId
    });
    setEditRequestId(request.id);
    setShowCreateForm(true);
  };

  const handleRemoveRequest = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id));
    if (selectedRequestId === id) {
      setSelectedRequestId(null);
      setRecommendedDonors([]);
    }
  };

  const handleShowRecommendations = (request: ExtendedBloodRequest) => {
    setSelectedRequestId(request.id);
    findCompatibleDonors(request.bloodType, request.organNeeded, request.hospitalId);
  };

  const handleContactDonor = (donor: Donor) => {
    alert(`Contacting ${donor.name}...\nPhone: ${donor.phone}\nEmail: ${donor.email}`);
  };

  const filteredRequests = requests.filter((request) =>
    request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.recipientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.urgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (request.organNeeded && request.organNeeded.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getAiTaskDescription = (progress: number) => {
    if (progress < 25) return "Analyzing blood and organ compatibility...";
    if (progress < 50) return "Scanning donor database for matches...";
    if (progress < 75) return "Calculating distance and compatibility scores...";
    return "Finalizing recommendations...";
  };

  const getCityFromLocation = (location: Location): string => {
    // Simplified city detection based on coordinates
    if (location.lat > 28 && location.lon > 77) return "Delhi";
    if (location.lat > 19 && location.lon > 72) return "Mumbai";
    if (location.lat > 13 && location.lon > 80) return "Chennai";
    return "Unknown Location";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Blood & Organ Requests
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage blood/organ requests and find compatible donors using AI
          </p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(true);
            setEditRequestId(null);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      {/* AI Recommendations Section */}
      {selectedRequestId && recommendedDonors.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Recommended Donors
              </h3>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                Best Matches
              </span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              For Request #{selectedRequestId}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedDonors.map((donor) => (
              <div key={donor.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCompatibilityColor(donor.compatibilityScore || 0)}`}>
                    {donor.compatibilityScore}% Match
                  </span>
                  <div className="flex items-center space-x-1">
                    {donor.organ && (
                      <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 text-xs px-2 py-1 rounded-full flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {donor.organ}
                      </span>
                    )}
                    <span className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-xs px-2 py-1 rounded-full">
                      {donor.blood_type}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{donor.name}</h4>
                  
                  <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{getCityFromLocation(donor.location)}</span>
                    <span className="text-gray-400">({Math.round((donor as any).distance || 0)}km)</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <Users className="w-3 h-3" />
                      <span>{donor.donationCount || 0} donations</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${donor.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className={donor.available ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}>
                        {donor.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <button 
                    onClick={() => handleContactDonor(donor)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-xs transition-colors flex items-center justify-center space-x-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Contact</span>
                  </button>
                  <button className="p-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Mail className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Loading Animation */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <Loader className="w-8 h-8 animate-spin text-red-600" />
                <Zap className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white block">
                  Agentic AI Processing
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 block">
                  {getAiTaskDescription(aiProgress)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Blood & Organ Analysis</span>
                <span className="text-green-600 dark:text-green-400">{aiProgress >= 25 ? '✓' : '⏳'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Donor Matching</span>
                <span className="text-green-600 dark:text-green-400">{aiProgress >= 50 ? '✓' : '⏳'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Distance Calculation</span>
                <span className="text-green-600 dark:text-green-400">{aiProgress >= 75 ? '✓' : '⏳'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Finalizing Results</span>
                <span className="text-green-600 dark:text-green-400">{aiProgress >= 100 ? '✓' : '⏳'}</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${aiProgress}%` }}
              ></div>
            </div>
            <div className="text-right mt-1">
              <span className="text-xs text-gray-600 dark:text-gray-400">{aiProgress}% Complete</span>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search requests by patient name, ID, blood type, organ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Blood Requests Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Organ Needed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hospital
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Urgency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Required By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedRequestId === request.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {request.patientName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {request.recipientId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                      {request.bloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.organNeeded ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                        <Heart className="w-3 h-3 mr-1" />
                        {request.organNeeded}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500 dark:text-gray-400">Blood Only</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {request.hospitalName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(
                        request.urgency
                      )}`}
                    >
                      {request.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(request.status)}
                      <span className="text-sm text-gray-900 dark:text-white">{request.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {request.requiredBy.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleShowRecommendations(request)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-xs px-2 py-1 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                    >
                      Find Donors
                    </button>
                    <button
                      onClick={() => handleEditRequest(request)}
                      className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-xs px-2 py-1 border border-green-200 rounded hover:bg-green-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveRequest(request.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-xs px-2 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Search className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No matching requests found.</p>
                    <p className="text-sm">Try adjusting your search terms</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editRequestId ? "Edit Request" : "Create New Request"}
            </h3>
            <form className="space-y-4" onSubmit={handleCreateRequest}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Patient ID
                </label>
                <input
                  type="text"
                  value={newRequest.recipientId}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, recipientId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter patient ID"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={newRequest.patientName}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, patientName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter patient name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Blood Type Needed
                </label>
                <select
                  value={newRequest.bloodType}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, bloodType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Organ Needed (Optional)
                </label>
                <select
                  value={newRequest.organNeeded}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, organNeeded: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">None (Blood Only)</option>
                  <option>Kidney</option>
                  <option>Liver</option>
                  <option>Heart</option>
                  <option>Lungs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hospital
                </label>
                <select
                  value={newRequest.hospitalId}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, hospitalId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {mockHospitals.map(hospital => (
                    <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Units Required
                </label>
                <input
                  type="number"
                  min="1"
                  value={newRequest.unitsRequired}
                  onChange={(e) =>
                    setNewRequest({
                      ...newRequest,
                      unitsRequired: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Urgency
                </label>
                <select
                  value={newRequest.urgency}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, urgency: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{editRequestId ? "Update Request" : "Create Request"}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditRequestId(null);
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 py-2 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodRequestManager;