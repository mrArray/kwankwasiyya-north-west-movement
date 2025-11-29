import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_LOGO, APP_TITLE } from "@/const";
import IDCardPreview from "@/components/IDCardPreview";
import { api, Supporter, getImageUrl } from "@/lib/api";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Verify() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [supporter, setSupporter] = useState<Supporter | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registrationNumber.trim()) {
      toast.error("Please enter a registration number");
      return;
    }

    setIsVerifying(true);
    setSupporter(null);
    setNotFound(false);

    try {
      const response = await api.verifySupporter(registrationNumber.trim());

      if (response.success && response.data) {
        setSupporter(response.data);
        toast.success("Supporter verified successfully!");
      }
    } catch (error) {
      setNotFound(true);
      toast.error("Registration number not found");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReset = () => {
    setRegistrationNumber("");
    setSupporter(null);
    setNotFound(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-32 w-32 mx-auto mb-4 rounded-full object-cover" />
            <h1 className="text-4xl font-bold text-primary mb-2">Verify Registration</h1>
            <p className="text-muted-foreground">Check the authenticity of a supporter registration</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Verification</CardTitle>
              <CardDescription>Enter the registration number to verify</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    placeholder="Enter registration number"
                    disabled={isVerifying}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isVerifying} className="flex-1">
                    {isVerifying ? "Verifying..." : "Verify"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              </form>
              {supporter && (
                <>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-8 w-8" />
                      <span className="text-xl font-semibold">Verified Supporter</span>
                    </div>
                    <IDCardPreview supporter={supporter} />
                  </div>
                  <div className="mt-8 flex gap-2">
                    <Button asChild className="flex-1">
                      <a href={api.getExportUrl(supporter.registrationNumber, 'image')} target="_blank" rel="noopener noreferrer">
                        Download ID Card
                      </a>
                    </Button>
                    <Button variant="outline" onClick={handleReset} className="flex-1">
                      Verify Another
                    </Button>
                  </div>
                </>
              )}

              {notFound && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-center gap-2 text-destructive">
                    <XCircle className="h-8 w-8" />
                    <span className="text-xl font-semibold">Not Found</span>
                  </div>

                  <div className="border border-destructive rounded-lg p-4 text-center">
                    <p className="text-muted-foreground">
                      The registration number <span className="font-semibold">{registrationNumber}</span> was not found in our database.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Please check the number and try again, or register as a new supporter.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleReset} className="flex-1">
                      Try Again
                    </Button>
                    <Button asChild className="flex-1">
                      <Link href="/register">Register Now</Link>
                    </Button>
                  </div>
                </div>
              )}
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
