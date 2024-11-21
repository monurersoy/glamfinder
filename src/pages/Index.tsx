import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", session.user.id)
          .single();

        if (profile?.user_type === "customer") {
          navigate("/customer-dashboard");
        } else if (profile?.user_type === "business") {
          navigate("/business-dashboard");
        }
      }
    };

    checkSession();
  }, [session, navigate, supabase]);

  const handleSignup = async (type: "customer" | "business") => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const { error } = await supabase
          .from("profiles")
          .update({ user_type: type })
          .eq("id", session.user.id);

        if (error) {
          toast({
            title: "Error updating profile",
            description: "There was an error setting up your account.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Account created successfully",
          description: `Welcome to your ${type} account!`,
        });

        navigate(type === "customer" ? "/customer-dashboard" : "/business-dashboard");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect Beauty Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with top beauty professionals or showcase your salon services to eager customers.
            Join our community today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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