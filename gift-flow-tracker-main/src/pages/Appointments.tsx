import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DonorSidebar } from "@/components/DonorSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, MapPin, Plus, Edit, Trash2, Phone, CheckCircle, AlertCircle, Calendar as CalendarIcon, Smartphone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const upcomingAppointments = [
    {
      id: 1,
      date: "2024-02-15",
      time: "09:00 AM",
      hospital: "General Hospital",
      type: "Blood Donation",
      address: "123 Medical Center Dr",
      phone: "+1 (555) 123-4567",
      status: "confirmed",
      cooldownEnds: null,
      notes: "Regular quarterly donation"
    },
    {
      id: 2,
      date: "2024-03-20",
      time: "02:30 PM", 
      hospital: "Children's Medical Center",
      type: "Platelet Donation",
      address: "456 Pediatric Way",
      phone: "+1 (555) 987-6543",
      status: "pending",
      cooldownEnds: null,
      notes: "Special request for pediatric patient"
    }
  ];

  const availableHospitals = [
    {
      id: 1,
      name: "General Hospital",
      address: "123 Medical Center Dr",
      distance: "2.3 miles",
      rating: 4.8,
      slots: ["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM"]
    },
    {
      id: 2,
      name: "Regional Medical Center",
      address: "789 Health Plaza",
      distance: "5.1 miles", 
      rating: 4.6,
      slots: ["08:00 AM", "11:00 AM", "01:00 PM", "04:00 PM"]
    },
    {
      id: 3,
      name: "City Blood Center",
      address: "321 Donation Ave",
      distance: "3.7 miles",
      rating: 4.9,
      slots: ["09:30 AM", "01:30 PM", "03:00 PM"]
    }
  ];

  const donationHistory = [
    {
      id: 1,
      date: "2024-01-10",
      type: "Blood",
      nextEligible: "2024-04-10"
    },
    {
      id: 2,
      date: "2023-10-15",
      type: "Platelets", 
      nextEligible: "2023-10-29"
    }
  ];

  const calculateNextEligibleDate = () => {
    const lastBloodDonation = donationHistory
      .filter(d => d.type === "Blood")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    if (lastBloodDonation) {
      return lastBloodDonation.nextEligible;
    }
    return null;
  };

  const nextEligibleDate = calculateNextEligibleDate();
  const isEligibleNow = !nextEligibleDate || new Date() >= new Date(nextEligibleDate);

  const handleBookAppointment = () => {
    toast({
      title: "Appointment Booked",
      description: "Your appointment has been successfully scheduled. You'll receive a confirmation email.",
    });
    setIsBookingOpen(false);
  };

  const handleReschedule = (appointmentId: number) => {
    toast({
      title: "Reschedule Requested",
      description: "Hospital will contact you to confirm the new appointment time.",
    });
  };

  const handleCancel = (appointmentId: number) => {
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled. The slot is now available for others.",
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
                Appointments
              </h1>
              <p className="text-muted-foreground">
                Schedule and manage your donation appointments efficiently.
              </p>
            </div>

            {/* Eligibility Status */}
            <Card className={isEligibleNow ? "border-success/50 bg-success/5" : "border-warning/50 bg-warning/5"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isEligibleNow ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-warning" />
                  )}
                  Donation Eligibility Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEligibleNow ? (
                  <div className="space-y-2">
                    <p className="text-success font-medium">You're eligible to donate now!</p>
                    <p className="text-sm text-muted-foreground">
                      It's been over 12 weeks since your last blood donation. You can schedule a new appointment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-warning font-medium">Donation cooldown period active</p>
                    <p className="text-sm text-muted-foreground">
                      Next eligible date: {nextEligibleDate} (Based on your last blood donation)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Calendar View */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date</CardTitle>
                    <CardDescription>Choose your preferred appointment date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || (nextEligibleDate && date < new Date(nextEligibleDate));
                      }}
                    />
                  </CardContent>
                </Card>

                {/* AI Suggested Times */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                      AI Recommended
                    </CardTitle>
                    <CardDescription>Best times based on your history</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="font-medium text-sm">Tuesday, 10:00 AM</p>
                      <p className="text-xs text-muted-foreground">Best recovery time based on your work schedule</p>
                    </div>
                    <div className="p-3 rounded-lg border border-border">
                      <p className="font-medium text-sm">Friday, 2:30 PM</p>
                      <p className="text-xs text-muted-foreground">Weekend recovery period</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Appointments List */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <div className="flex gap-4">
                  <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex-1" disabled={!isEligibleNow}>
                        <Plus className="h-4 w-4 mr-2" />
                        Book New Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Book New Appointment</DialogTitle>
                        <DialogDescription>
                          Schedule your next donation appointment at a convenient time and location.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Hospital</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select hospital" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableHospitals.map((hospital) => (
                                  <SelectItem key={hospital.id} value={hospital.id.toString()}>
                                    {hospital.name} ({hospital.distance})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Donation Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="blood">Whole Blood</SelectItem>
                                <SelectItem value="platelets">Platelets</SelectItem>
                                <SelectItem value="plasma">Plasma</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Preferred Date</Label>
                            <Input type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label>Preferred Time</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:00">09:00 AM</SelectItem>
                                <SelectItem value="10:30">10:30 AM</SelectItem>
                                <SelectItem value="14:00">02:00 PM</SelectItem>
                                <SelectItem value="15:30">03:30 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Notes (Optional)</Label>
                          <Textarea placeholder="Any special requirements or notes..." />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleBookAppointment}>
                          Book Appointment
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Sync Calendar
                  </Button>
                </div>

                {/* Upcoming Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled donation appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingAppointments.map((appointment) => (
                          <div key={appointment.id} className="p-4 rounded-lg border border-border space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{appointment.hospital}</h3>
                                  <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                                    {appointment.status}
                                  </Badge>
                                </div>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4" />
                                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {appointment.address}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {appointment.phone}
                                  </div>
                                </div>
                                {appointment.notes && (
                                  <p className="text-sm text-muted-foreground italic">
                                    Note: {appointment.notes}
                                  </p>
                                )}
                              </div>
                              <Badge className="bg-destructive text-destructive-foreground">
                                {appointment.type}
                              </Badge>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleReschedule(appointment.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Reschedule
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleCancel(appointment.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Phone className="h-4 w-4 mr-2" />
                                Call Hospital
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
                        <p className="text-muted-foreground mb-4">
                          Schedule your next donation to help save lives.
                        </p>
                        <Button onClick={() => setIsBookingOpen(true)} disabled={!isEligibleNow}>
                          Book Your First Appointment
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Available Hospitals */}
                <Card>
                  <CardHeader>
                    <CardTitle>Available Hospitals</CardTitle>
                    <CardDescription>Nearby centers with open appointment slots</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {availableHospitals.map((hospital) => (
                        <div key={hospital.id} className="p-4 rounded-lg border border-border">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium">{hospital.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {hospital.address} • {hospital.distance}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-warning">
                                {'★'.repeat(Math.floor(hospital.rating))} {hospital.rating}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Available slots today:</p>
                            <div className="flex flex-wrap gap-2">
                              {hospital.slots.map((slot, index) => (
                                <Badge key={index} variant="outline" className="cursor-pointer hover:bg-accent">
                                  {slot}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
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

export default Appointments;