import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APP_LOGO, APP_TITLE } from "@/const";
import IDCardPreview from "@/components/IDCardPreview";
import IDCardPreviewModal from "@/components/IDCardPreviewModal";
import { api, RegisterSupporterData, Supporter } from "@/lib/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Register() {
    const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [formData, setFormData] = useState<Partial<RegisterSupporterData>>({
    fullName: "",
    age: undefined,
    business: "",
    state: "",
    LG: "",
    ward: "",
    pollingUnit: "",
    phoneNumber: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [registeredSupporter, setRegisteredSupporter] = useState<Supporter | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [lgas, setLgas] = useState<string[]>([]);
  const [loadingLgas, setLoadingLgas] = useState(false);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await api.getStates();
        if (response.success && response.data) {
          setStates(response.data);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        toast.error('Failed to load states');
      }
    };
    fetchStates();
  }, []);

  // Fetch LGAs when state changes
  useEffect(() => {
    const fetchLGAs = async () => {
      if (!formData.state) {
        setLgas([]);
        return;
      }
      
      setLoadingLgas(true);
      try {
        const response = await api.getLGAs(formData.state);
        if (response.success && response.data) {
          setLgas(response.data.lgas);
        }
      } catch (error) {
        console.error('Error fetching LGAs:', error);
        toast.error('Failed to load LGAs');
        setLgas([]);
      } finally {
        setLoadingLgas(false);
      }
    };
    fetchLGAs();
  }, [formData.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      state: value,
      LG: "", // Reset LG when state changes
    }));
  };

  const handleLGChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      LG: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5242880) {
        toast.error("Photo size must be less than 5MB");
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      toast.error("Please upload your photo");
      return;
    }

    if (!formData.fullName || !formData.state || !formData.LG || !formData.ward || !formData.pollingUnit || !formData.phoneNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.registerSupporter({
        ...formData,
        photo,
      } as RegisterSupporterData);

      if (response.success && response.data) {
        const regNum = response.data.registrationNumber;
        setRegistrationNumber(regNum);
        // Call verify API to get latest supporter data
        const verifyRes = await api.verifySupporter(regNum);
        if (verifyRes.success && verifyRes.data) {
          setRegisteredSupporter(verifyRes.data);
        } else {
          setRegisteredSupporter(response.data); // fallback
        }
        toast.success("Registration successful!");
        setShowPreviewModal(true);
        // Reset form
        setFormData({
          fullName: "",
          age: undefined,
          business: "",
          state: "",
          LG: "",
          ward: "",
          pollingUnit: "",
          phoneNumber: "",
        });
        setPhoto(null);
        setPhotoPreview("");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationNumber && registeredSupporter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-8 px-4">
        <div className="container max-w-4xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground">Your digital ID has been generated</p>
          </div>
          <div className="flex flex-col items-center gap-6">
            {/* Inline ID Card Preview */}
            <div className="w-full max-w-2xl">
              <IDCardPreview supporter={registeredSupporter} />
            </div>
            {/* Download as Image Button */}
            <Button className="w-full max-w-xs" onClick={() => {
              // Use the backend image export for download, like verify page
              const url = api.getExportUrl(registrationNumber, 'image');
              const link = document.createElement('a');
              link.href = url;
              link.download = `${registrationNumber}_idcard.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              Download as Image
            </Button>
            <Button variant="outline" asChild className="w-full max-w-xs">
              <Link href="/verify">Verify Registration</Link>
            </Button>
            <Button variant="ghost" onClick={() => { setRegistrationNumber(""); setShowPreviewModal(false); }} className="w-full max-w-xs">
              Register Another Supporter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-32 w-32 mx-auto mb-4 rounded-full object-cover" />
            <h1 className="text-4xl font-bold text-primary mb-2">{APP_TITLE}</h1>
            <p className="text-muted-foreground">Register as a supporter and get your digital ID</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Supporter Registration</CardTitle>
              <CardDescription>Fill in your details to register and receive your digital ID</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your age"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business">Business/Occupation</Label>
                    <Input
                      id="business"
                      name="business"
                      value={formData.business}
                      onChange={handleInputChange}
                      placeholder="Enter your business"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={handleStateChange}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="LG">Local Government *</Label>
                    <Select
                      value={formData.LG}
                      onValueChange={handleLGChange}
                      disabled={!formData.state || loadingLgas}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={loadingLgas ? "Loading LGAs..." : "Select your LG"} />
                      </SelectTrigger>
                      <SelectContent>
                        {lgas.map((lg) => (
                          <SelectItem key={lg} value={lg}>
                            {lg}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ward">Ward *</Label>
                    <Input
                      id="ward"
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      placeholder="Enter your ward"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pollingUnit">Polling Unit *</Label>
                    <Input
                      id="pollingUnit"
                      name="pollingUnit"
                      value={formData.pollingUnit}
                      onChange={handleInputChange}
                      placeholder="Enter your polling unit"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="08012345678"
                      required
                    />
                  </div>

                  {/* Email field removed as per request */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Photo *</Label>
                  <Input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    required
                  />
                  {photoPreview && (
                    <div className="mt-2 flex justify-center">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-lg border-2 border-primary"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/verify">Verify Registration</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center flex gap-4 justify-center">
            <Button variant="link" asChild>
              <Link href="/admin">Admin Login</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/">Home Page</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
