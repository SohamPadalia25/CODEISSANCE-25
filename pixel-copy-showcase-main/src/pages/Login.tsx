import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

type Role = "donor" | "hospital_admin" | "blood_bank";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithOtp, verifyOtp, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role | "">("");
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [donorId, setDonorId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      const response = await loginWithOtp(email);
      setDonorId(response);
      setIsOtpMode(true);
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !donorId) return;
    
    setIsSubmitting(true);
    try {
      await verifyOtp(donorId, otp);
      toast.success("Login successful!");
      navigate("/donor-index");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "OTP verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegularLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !email || !password) return;
    
    setIsSubmitting(true);
    try {
      await login(email, password, role);
      toast.success("Login successful!");
      
      if (role === "donor") {
        navigate("/donor-index");
      } else if (role === "hospital_admin") {
        navigate("/hospital");
      } else if (role === "blood_bank") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsOtpMode(false);
    setOtp("");
    setDonorId("");
    setEmail("");
    setPassword("");
    setRole("");
    clearError();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/30 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            {isOtpMode ? "Enter the OTP sent to your email" : "Login and choose your role to continue"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {isOtpMode ? (
            <form className="space-y-4" onSubmit={handleOtpVerification}>
              <div className="space-y-2">
                <label className="text-sm font-medium">OTP Code</label>
                <Input 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  placeholder="Enter 6-digit OTP" 
                  maxLength={6}
                  required 
                />
              </div>

              <Button type="submit" className="w-full" disabled={!otp || isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </Button>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={resetForm}
                disabled={isSubmitting}
              >
                Back to Login
              </Button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={role === "donor" ? handleOtpRequest : handleRegularLogin}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donor">Donor</SelectItem>
                    <SelectItem value="hospital_admin">Hospital Admin</SelectItem>
                    <SelectItem value="blood_bank">Blood Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="you@example.com" 
                  required 
                />
              </div>

              {role !== "donor" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    required 
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={!role || !email || (role !== "donor" && !password) || isSubmitting}>
                {isSubmitting ? "Signing in..." : role === "donor" ? "Send OTP" : "Sign in"}
              </Button>
            </form>
          )}

          <p className="mt-4 text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;


