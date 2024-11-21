import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [userType, setUserType] = useState<"customer" | "business" | null>(null);

  const handleSignup = async (type: "customer" | "business") => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect Beauty Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with top beauty professionals or showcase your salon services to eager customers.
            Join our community today!
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Customer Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>For Customers</CardTitle>
              <CardDescription>
                Discover and book beauty services in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>✨ Browse local beauty salons</li>
                <li>📅 Easy appointment booking</li>
                <li>⭐ Read and write reviews</li>
                <li>💫 Get personalized recommendations</li>
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleSignup("customer")}
                  >
                    Sign Up as Customer
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Customer Sign Up</DialogTitle>
                    <DialogDescription>
                      Create your account to start booking beauty services
                    </DialogDescription>
                  </DialogHeader>
                  <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="light"
                    providers={[]}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Business Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>For Beauty Professionals</CardTitle>
              <CardDescription>
                Grow your business and reach more clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>🏪 Create your business profile</li>
                <li>📊 Manage appointments</li>
                <li>💼 Showcase your services</li>
                <li>📈 Grow your client base</li>
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleSignup("business")}
                  >
                    Sign Up as Business
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Business Sign Up</DialogTitle>
                    <DialogDescription>
                      Create your business account to start reaching new clients
                    </DialogDescription>
                  </DialogHeader>
                  <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="light"
                    providers={[]}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;