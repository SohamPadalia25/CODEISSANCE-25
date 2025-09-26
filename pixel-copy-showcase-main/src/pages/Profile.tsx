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
import { Upload, QrCode, Award, Shield, Phone, Mail, Calendar, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "John Donor",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    age: "32",
    gender: "Male",
    bloodGroup: "O+",
    organDonation: true,
    emergencyContact: "Jane Donor - +1 (555) 987-6543",
    medicalHistory: "No major surgeries. Last donation: 3 months ago."
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
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
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

                    <Button variant="outline" className="w-full">
                      <QrCode className="h-4 w-4 mr-2" />
                      Show QR Code
                    </Button>
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
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Medical Reports
                      </Button>
                    </div>
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