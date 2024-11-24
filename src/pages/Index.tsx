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
            title: "Profil güncellenirken hata oluştu",
            description: "Hesabınız oluşturulurken bir hata oluştu.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Hesap başarıyla oluşturuldu",
          description: `${type === "customer" ? "Müşteri" : "İşletme"} hesabınıza hoş geldiniz!`,
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
            Mükemmel Güzellik Hizmetinizi Bulun
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En iyi güzellik uzmanlarıyla bağlantı kurun veya salonunuzun hizmetlerini
            müşterilerinize gösterin. Topluluğumuza bugün katılın!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Müşteriler İçin</CardTitle>
              <CardDescription>
                Bölgenizdeki güzellik hizmetlerini keşfedin ve randevu alın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>✨ Yerel güzellik salonlarını inceleyin</li>
                <li>📅 Kolay randevu alma</li>
                <li>⭐ Yorumları okuyun ve yazın</li>
                <li>💫 Kişiselleştirilmiş öneriler alın</li>
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleSignup("customer")}
                  >
                    Müşteri Olarak Kaydol
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Müşteri Kaydı</DialogTitle>
                    <DialogDescription>
                      Güzellik hizmetleri almak için hesabınızı oluşturun
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
              <CardTitle>Güzellik Uzmanları İçin</CardTitle>
              <CardDescription>
                İşletmenizi büyütün ve daha fazla müşteriye ulaşın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-gray-600">
                <li>🏪 İşletme profilinizi oluşturun</li>
                <li>📊 Randevuları yönetin</li>
                <li>💼 Hizmetlerinizi sergileyin</li>
                <li>📈 Müşteri tabanınızı büyütün</li>
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleSignup("business")}
                  >
                    İşletme Olarak Kaydol
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>İşletme Kaydı</DialogTitle>
                    <DialogDescription>
                      Yeni müşterilere ulaşmak için işletme hesabınızı oluşturun
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