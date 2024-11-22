import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import SalonSetupForm from "@/components/SalonSetupForm";

const BusinessDashboard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const [hasSalon, setHasSalon] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserType = async () => {
      if (!session?.user?.id) {
        navigate("/");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("user_type")
        .eq("id", session.user.id)
        .single();

      if (profile?.user_type !== "business") {
        navigate("/customer-dashboard");
      }

      // Check if user has a salon - modified to handle no results
      const { data: salons } = await supabase
        .from("salons")
        .select("id")
        .eq("owner_id", session.user.id);

      setHasSalon(salons && salons.length > 0);
    };

    checkUserType();
  }, [session, navigate, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast({
      title: "Başarıyla çıkış yapıldı",
      description: "Hesabınızdan çıkış yaptınız.",
    });
  };

  if (hasSalon === null) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!hasSalon ? (
        <Card>
          <CardHeader>
            <CardTitle>Salonunuzu Oluşturun</CardTitle>
            <CardDescription>
              Başlamak için salonunuz hakkında bilgi verin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SalonSetupForm />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>İşletme Panelinize Hoş Geldiniz</CardTitle>
            <CardDescription>Salonunuzu ve hizmetlerinizi yönetin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={() => navigate("/manage-salon")}>Salonu Yönet</Button>
              <Button variant="outline" onClick={handleSignOut}>
                Çıkış Yap
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessDashboard;