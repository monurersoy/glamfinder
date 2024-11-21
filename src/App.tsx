import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Index from "./pages/Index";
import Salons from "./pages/Salons";
import CustomerDashboard from "./pages/CustomerDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";

const queryClient = new QueryClient();
const supabase = createClient(
  "https://tqtrgmwhsxsuekddfzdb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxdHJnbXdoc3hzdWVrZGRmemRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMjU3NDAsImV4cCI6MjA0NzgwMTc0MH0.1ZQXoG0PWRDuSmNlxmNFlNyY1R0obYbmqIVzQXWrEiw"
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/salons" element={<Salons />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;