import { Toaster } from "@/components/ui/toaster"; 
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext"; // ✅ LEVEL 3 ADDED

// Page Imports - Exact Case Matching
import Index from "./pages/Index";
import IDScanner from "./pages/IDScanner"; 
import DriverSignup from "./pages/DriverSignup";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import DispensaryMenu from "./pages/DispensaryMenu"; 
import Dispensaries from "./pages/Dispensaries";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider> {/* ✅ LEVEL 3 WRAP START */}
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>

            {/* Main Home Page */}
            <Route path="/" element={<Index />} />

            {/* ID Scanner (Hidden Route) */}
            <Route path="/id-scan" element={<IDScanner />} />

            {/* Driver & Auth */}
            <Route path="/driver-signup" element={<DriverSignup />} />
            <Route path="/auth" element={<Auth />} />

            {/* Protected: Customer Only */}
            <Route
              path="/dispensaries"
              element={
                <ProtectedRoute allowedRole="customer">
                  <Dispensaries />
                </ProtectedRoute>
              }
            />

            {/* Menu for Specific Dispensary (also protected as customer area) */}
            <Route
              path="/dispensary/:id"
              element={
                <ProtectedRoute allowedRole="customer">
                  <DispensaryMenu />
                </ProtectedRoute>
              }
            />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider> {/* ✅ LEVEL 3 WRAP END */}
  </QueryClientProvider>
);

export default App;