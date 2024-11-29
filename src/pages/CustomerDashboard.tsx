import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const CustomerDashboard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

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

      if (profile?.user_type !== "customer") {
        navigate("/business-dashboard");
      }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Müşteri Panelinize Hoş Geldiniz</CardTitle>
          <CardDescription>Yakınınızdaki güzellik hizmetlerini bulup randevu oluşturun</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={() => navigate("/salons")}>Salon Ara</Button>
            <Button variant="outline" onClick={handleSignOut}>Çıkış Yap</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboard;