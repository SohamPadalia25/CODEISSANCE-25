import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DonorSidebar } from "@/components/DonorSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, QrCode, Award, Shield, Phone, Mail, Calendar, Heart, FileText, Download, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "Vatsal Jain",
    email: "vssv262024@gmail.com",
    phone: "+ 9136519205",
    age: "23",
    gender: "Male",
    bloodGroup: "O+",
    organDonation: true,
    emergencyContact: "Shreyash Singh - 8169698989",
    medicalHistory: "No major surgeries. Last donation: 3 months ago."
  });

  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const [medicalReports, setMedicalReports] = useState([]);
  const [showQrCode, setShowQrCode] = useState(false);
  const [extractedMedicalData, setExtractedMedicalData] = useState({
    bloodPressure: "120/80 mmHg",
    cholesterol: "180 mg/dL",
    lastCheckup: "2024-01-15",
    conditions: ["None"],
    medications: ["None"],
    allergies: ["None"]
  });

  const badges = [
    { name: "Gold Donor", icon: Award, color: "bg-warning" },
    { name: "Life Saver", icon: Heart, color: "bg-critical" },
    { name: "Verified", icon: Shield, color: "bg-success" }
  ];

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
          toast({
            title: "Profile Photo Updated",
            description: "Your profile photo has been successfully updated.",
          });
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload an image file.",
          variant: "destructive"
        });
      }
    }
  };

  const handleMedicalReportUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newReports = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        date: new Date().toLocaleDateString(),
        type: file.type,
        file: file
      }));

      setMedicalReports(prev => [...prev, ...newReports]);
      
      // Simulate PDF data extraction
      simulatePDFExtraction(files[0]);
      
      toast({
        title: "Medical Reports Uploaded",
        description: `${files.length} report(s) have been uploaded and processed.`,
      });
    }
  };

  const simulatePDFExtraction = (file) => {
    // Simulate AI extraction from PDF
    setTimeout(() => {
      const mockExtractedData = {
        bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 15)} mmHg`,
        cholesterol: `${150 + Math.floor(Math.random() * 50)} mg/dL`,
        lastCheckup: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        conditions: Math.random() > 0.7 ? ["Hypertension"] : ["None"],
        medications: Math.random() > 0.6 ? ["Aspirin"] : ["None"],
        allergies: Math.random() > 0.8 ? ["Penicillin"] : ["None"]
      };
      
      setExtractedMedicalData(mockExtractedData);
      
      toast({
        title: "Data Extracted",
        description: "Medical data has been successfully extracted from the report.",
      });
    }, 2000);
  };

  const handleRemoveReport = (reportId) => {
    setMedicalReports(prev => prev.filter(report => report.id !== reportId));
    toast({
      title: "Report Removed",
      description: "The medical report has been removed.",
    });
  };

  const handleDownloadReport = (report) => {
    // Simulate download functionality
    const url = URL.createObjectURL(report.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: `Downloading ${report.name}`,
    });
  };

  const toggleQrCode = () => {
    setShowQrCode(!showQrCode);
    toast({
      title: showQrCode ? "QR Code Hidden" : "QR Code Displayed",
      description: showQrCode ? "QR code is now hidden." : "Your donor QR code is now visible.",
    });
  };

  const generateDonorQRData = () => {
    return JSON.stringify({
      name: profileData.name,
      bloodGroup: profileData.bloodGroup,
      emergencyContact: profileData.emergencyContact,
      lastUpdated: new Date().toISOString()
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DonorSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Personal Profile
              </h1>
              <p className="text-muted-foreground">
                Manage your donor information and medical eligibility status.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Profile Card */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Overview</CardTitle>
                    <CardDescription>Your donor status and achievements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profileImage} alt="Profile" />
                        <AvatarFallback>
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <input
                        type="file"
                        id="profile-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="profile-upload">
                        <Button variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photo
                          </span>
                        </Button>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Donor Availability</span>
                        <Switch 
                          checked={isAvailable} 
                          onCheckedChange={setIsAvailable}
                        />
                      </div>
                      <Badge variant={isAvailable ? "default" : "secondary"} className="w-full justify-center">
                        {isAvailable ? "Available for Donation" : "Currently Unavailable"}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Achievement Badges</h4>
                      <div className="flex flex-wrap gap-2">
                        {badges.map((badge) => (
                          <Badge key={badge.name} className={`${badge.color} text-white`}>
                            <badge.icon className="h-3 w-3 mr-1" />
                            {badge.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">AI Health Score</h4>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">85% - Excellent fitness to donate</p>
                    </div>

                    <Button variant="outline" className="w-full" onClick={toggleQrCode}>
                      <QrCode className="h-4 w-4 mr-2" />
                      {showQrCode ? "Hide QR Code" : "Show QR Code"}
                    </Button>

                    {showQrCode && (
                      <div className="flex flex-col items-center p-4 border rounded-lg">
                        <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded">
                          <span className="text-sm text-muted-foreground">QR Code Preview</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          Scan this code for emergency donor information
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Extracted Medical Data */}
                <Card>
                  <CardHeader>
                    <CardTitle>Extracted Medical Data</CardTitle>
                    <CardDescription>AI-extracted information from your reports</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Blood Pressure:</span>
                        <p>{extractedMedicalData.bloodPressure}</p>
                      </div>
                      <div>
                        <span className="font-medium">Cholesterol:</span>
                        <p>{extractedMedicalData.cholesterol}</p>
                      </div>
                      <div>
                        <span className="font-medium">Last Checkup:</span>
                        <p>{extractedMedicalData.lastCheckup}</p>
                      </div>
                      <div>
                        <span className="font-medium">Conditions:</span>
                        <p>{extractedMedicalData.conditions.join(", ")}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Medications:</span>
                        <p>{extractedMedicalData.medications.join(", ")}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Allergies:</span>
                        <p>{extractedMedicalData.allergies.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Keep your contact and medical details updated</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={profileData.age}
                          onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={profileData.gender} onValueChange={(value) => setProfileData({...profileData, gender: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Select value={profileData.bloodGroup} onValueChange={(value) => setProfileData({...profileData, bloodGroup: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            className="pl-10"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            className="pl-10"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergency">Emergency Contact</Label>
                      <Input
                        id="emergency"
                        value={profileData.emergencyContact}
                        onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                        placeholder="Name - Phone Number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medical">Medical History</Label>
                      <Textarea
                        id="medical"
                        value={profileData.medicalHistory}
                        onChange={(e) => setProfileData({...profileData, medicalHistory: e.target.value})}
                        placeholder="Any relevant medical history or notes..."
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="organ-donation"
                        checked={profileData.organDonation}
                        onCheckedChange={(checked) => setProfileData({...profileData, organDonation: checked})}
                      />
                      <Label htmlFor="organ-donation" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Organ Donation Consent
                      </Label>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button onClick={handleSave} className="flex-1">
                        Save Changes
                      </Button>
                      <input
                        type="file"
                        id="medical-upload"
                        accept=".pdf,.doc,.docx,image/*"
                        multiple
                        className="hidden"
                        onChange={handleMedicalReportUpload}
                      />
                      <label htmlFor="medical-upload">
                        <Button variant="outline" asChild>
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Medical Reports
                          </span>
                        </Button>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Medical Reports Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Reports</CardTitle>
                    <CardDescription>Your uploaded medical documents and test results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {medicalReports.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No medical reports uploaded yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {medicalReports.map((report) => (
                          <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-8 w-8 text-blue-500" />
                              <div>
                                <p className="font-medium">{report.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {report.size} • {report.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadReport(report)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Simulate view functionality
                                  toast({
                                    title: "Viewing Report",
                                    description: `Opening ${report.name} in viewer...`,
                                  });
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveReport(report.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control what information hospitals can see</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Contact Information</p>
                        <p className="text-sm text-muted-foreground">Allow hospitals to see your contact details</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Medical History</p>
                        <p className="text-sm text-muted-foreground">Share medical history for compatibility</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Location Sharing</p>
                        <p className="text-sm text-muted-foreground">Help hospitals find nearby donors</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Profile;