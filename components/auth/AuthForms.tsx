"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Lock, User, Phone, MapPin, AtSign } from "lucide-react";
import Link from "next/link";
import { generateCivicId, validateUsername, checkUsernameAvailability } from "@/lib/generate-civic-id";
import { KENYA_LOCATIONS } from "@/lib/location-data";

export function SigninForm() {
  const router = useRouter();
  const supabase = createClient();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Determine if identifier is email, username, or civic ID
      let email = identifier;
      
      // If not an email, lookup in profiles table
      if (!identifier.includes('@')) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('email')
          .or(`username.eq.${identifier},civic_id.eq.${identifier}`)
          .single();
        
        if (!profile || !profile.email) {
          throw new Error('User not found');
        }
        
        email = profile.email;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-brand-accent/20 bg-brand-bg/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-bold text-brand-primary">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-brand-muted">
          Sign in to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignin} className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="identifier"
            >
              Email, Username, or Civic ID
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="identifier"
                type="text"
                placeholder="email, username, or KE-2024-000001"
                className="pl-10 bg-brand-surface border-brand-border"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-10 bg-brand-surface border-brand-border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && (
            <div className="text-sm text-red-500 font-medium text-center">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-brand-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth"
            className="text-brand-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

interface SignupFormProps {
  role: "citizen" | "politician" | "creator";
}

export function SignupForm({ role }: SignupFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  // const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null); // Unused for now
  const [phoneNumber, setPhoneNumber] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedConstituency, setSelectedConstituency] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const constituencies = selectedCounty
    ? KENYA_LOCATIONS.find((c) => c.name === selectedCounty)?.constituencies || []
    : [];

  const wards = selectedConstituency
    ? constituencies.find((c) => c.name === selectedConstituency)?.wards || []
    : [];

  const getRoleTitle = () => {
    switch (role) {
      case "politician":
        return "Campaign Account";
      case "creator":
        return "Creator Profile";
      default:
        return "Citizen Account";
    }
  };

  const mapRoleToDbRole = (role: string) => {
    // Mapping URL role to DB role expected by schema
    if (role === "citizen") return "citizen"; 
    if (role === "politician") return "politician"; 
    return role; // 'creator' -> 'creator'
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!termsAccepted) {
        throw new Error("You must accept the terms and conditions to sign up.");
      }

      // Validate username
      if (!username.trim()) {
        throw new Error("Username is required");
      }

      const usernameValidation = validateUsername(username);
      if (!usernameValidation.isValid) {
        throw new Error(usernameValidation.error);
      }

      // Check username availability
      const isAvailable = await checkUsernameAvailability(username);
      if (!isAvailable) {
        throw new Error("Username is already taken");
      }

      const dbRole = mapRoleToDbRole(role);

      // Generate civic ID before signup
      const civicId = await generateCivicId();

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username.toLowerCase(),
            civic_id: civicId,
            role: dbRole,
            phone_number: phoneNumber,
            physical_address: physicalAddress,
            county: selectedCounty,
            constituency: selectedConstituency,
            ward: selectedWard,
          },
        },
      });

      if (error) throw error;

      // Auto-signin after successful registration
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Redirect to profile setup page
      router.push(`/auth/complete-profile?role=${role}`);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-brand-accent/20 bg-brand-bg/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-bold text-brand-primary">
          Create {getRoleTitle()}
        </CardTitle>
        <CardDescription className="text-center text-brand-muted">
          Join the community as a {role}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                className="pl-10 bg-brand-surface border-brand-border"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="john_doe"
                className="pl-10 pr-10 bg-brand-surface border-brand-border"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                pattern="^[a-z0-9_]{3,20}$"
                title="3-20 characters, lowercase letters, numbers, and underscores only"
                required
              />
            </div>
            <p className="text-xs text-brand-text-muted">
              3-20 characters, lowercase letters, numbers, and underscores only
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10 bg-brand-surface border-brand-border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-10 bg-brand-surface border-brand-border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {(role === "citizen" || role === "politician") && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254..."
                    className="pl-10 bg-brand-surface border-brand-border"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">County</label>
                <Select
                  value={selectedCounty}
                  onValueChange={(value) => {
                    setSelectedCounty(value);
                    setSelectedConstituency("");
                    setSelectedWard("");
                  }}
                  required
                >
                  <SelectTrigger className="bg-brand-surface border-brand-border">
                    <SelectValue placeholder="Select County" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white border-gray-800">
                    {KENYA_LOCATIONS.map((county) => (
                      <SelectItem 
                        key={county.name} 
                        value={county.name}
                        className="focus:bg-gray-800 focus:text-white"
                      >
                        {county.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCounty && (
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Constituency
                  </label>
                  <Select
                    value={selectedConstituency}
                    onValueChange={(value) => {
                      setSelectedConstituency(value);
                      setSelectedWard("");
                    }}
                    required
                  >
                    <SelectTrigger className="bg-brand-surface border-brand-border">
                      <SelectValue placeholder="Select Constituency" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white border-gray-800">
                      {constituencies.map((constituency) => (
                        <SelectItem
                          key={constituency.name}
                          value={constituency.name}
                          className="focus:bg-gray-800 focus:text-white"
                        >
                          {constituency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedConstituency && (
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Ward</label>
                  <Select
                    value={selectedWard}
                    onValueChange={setSelectedWard}
                    required
                  >
                    <SelectTrigger className="bg-brand-surface border-brand-border">
                      <SelectValue placeholder="Select Ward" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white border-gray-800">
                      {wards.map((ward) => (
                        <SelectItem 
                          key={ward} 
                          value={ward}
                          className="focus:bg-gray-800 focus:text-white"
                        >
                          {ward}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="address"
                >
                  Physical Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    type="text"
                    placeholder="Street, Building, etc."
                    className="pl-10 bg-brand-surface border-brand-border"
                    value={physicalAddress}
                    onChange={(e) => setPhysicalAddress(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {role === "politician" && (
            <p className="text-xs text-brand-muted italic">
              * You will need to verify your candidacy status after signup.
            </p>
          )}


          <div className="flex items-center space-x-2 py-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the{" "}
              <Link href="/terms" className="text-brand-primary hover:underline">
                terms and conditions
              </Link>
            </label>
          </div>

          {error && (
            <div className="text-sm text-red-500 font-medium text-center">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-brand-muted">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-brand-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
