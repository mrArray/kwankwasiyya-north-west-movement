import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import StatsCounter from "@/components/StatsCounter";
import { CheckCircle2, Download, Shield, Users, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded-full object-cover" />
            <span className="text-lg font-bold text-primary">{APP_TITLE}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/verify">Verify ID</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/about-movement">Munufar Kungiya</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e53935]/10 via-background to-[#fdeaea]/10">
        <div className="container py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{background: 'rgba(229,57,53,0.13)', color: '#e53935'}}>
                  <Zap className="h-4 w-4" style={{color: '#e53935'}} />
                  Digital Registration System
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Join the Kwankwasiyya Movement
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Register as a supporter of Senator Rabiu Musa Kwankwaso and receive your personalized digital ID card instantly. Be part of the movement shaping Northwest Nigeria's future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8">
                  <Link href="/register">
                    <Users className="h-5 w-5 mr-2" />
                    Register as Supporter
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8">
                  <Link href="/verify">
                    <Shield className="h-5 w-5 mr-2" />
                    Verify Registration
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0" style={{background: 'rgba(229,57,53,0.13)', borderRadius: '9999px', filter: 'blur(32px)'}} />
                <img
                  src={APP_LOGO}
                  alt="Kwankwasiyya Movement"
                  className="relative h-64 w-64 md:h-80 md:w-80 rounded-full object-cover border-4"
                  style={{borderColor: '#e53935', boxShadow: '0 8px 32px rgba(229,57,53,0.15)'}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96" style={{background: 'rgba(229,57,53,0.05)', borderRadius: '9999px', filter: 'blur(32px)', zIndex: -10}} />
        <div className="absolute bottom-0 left-0 w-96 h-96" style={{background: 'rgba(253,234,234,0.05)', borderRadius: '9999px', filter: 'blur(32px)', zIndex: -10}} />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Register with Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience a seamless digital registration process with instant ID generation and verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Instant Registration</CardTitle>
                <CardDescription>
                  Complete your registration in minutes and receive your digital ID immediately.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Digital ID Card</CardTitle>
                <CardDescription>
                  Get a personalized digital ID card with QR code for easy verification and download.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Verification</CardTitle>
                <CardDescription>
                  Verify your registration status anytime using your unique registration number.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to become a registered supporter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Fill Registration Form</h3>
              <p className="text-muted-foreground">
                Provide your personal details and upload your photo
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Get Registration Number</h3>
              <p className="text-muted-foreground">
                Receive your unique registration number instantly
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Download Digital ID</h3>
              <p className="text-muted-foreground">
                Download your personalized digital ID card as PDF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-4">About Kwankwasiyya Movement</CardTitle>
                <CardDescription className="text-base">
                  The Kwankwasiyya Movement Northwest is a political movement supporting Senator Rabiu Musa Kwankwaso,
                  dedicated to strengthening the supporter database and enhancing online visibility. Our digital
                  registration system enables every supporter to register online, upload their photo, and instantly
                  receive a personalized digital ID card.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Automated System</h4>
                      <p className="text-sm text-muted-foreground">
                        Fully automated registration and ID generation process
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Secure Database</h4>
                      <p className="text-sm text-muted-foreground">
                        Secure cloud storage for all supporter information
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">QR Verification</h4>
                      <p className="text-sm text-muted-foreground">
                        QR code on each ID for instant verification
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Admin Dashboard</h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive analytics and supporter management
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{background: '#e53935', color: '#fff'}}>
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the Movement?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Register now and be part of the change. Get your digital ID card in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" style={{background: '#fff', color: '#e53935', border: '2px solid #e53935'}} asChild className="text-lg px-8">
              <Link href="/register">
                <Users className="h-5 w-5 mr-2" style={{color: '#e53935'}} />
                Register Now
              </Link>
            </Button>
            <Button size="lg" style={{background: 'transparent', color: '#fff', border: '2px solid #fff'}} asChild className="text-lg px-8">
              <Link href="/verify">
                <Shield className="h-5 w-5 mr-2" style={{color: '#fff'}} />
                Verify Registration
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8 rounded-full object-cover" />
              <span className="text-sm text-muted-foreground">
                © 2025 Kwankwasiyya Movement Northwest. All rights reserved.
              </span>
            </div>
            <div className="flex gap-4">
              <Button variant="link" asChild>
                <Link href="/register">Register</Link>
              </Button>
              <Button variant="link" asChild>
                <Link href="/verify">Verify</Link>
              </Button>
              <Button variant="link" asChild>
                <Link href="/admin">Admin</Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
