import { Toaster } from "@/components/ui/toaster"; 
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";

// Page Imports
import Index from "./pages/Index";
import IDScanner from "./pages/IDScanner"; 
import DriverSignup from "./pages/DriverSignup";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import DispensaryMenu from "./pages/DispensaryMenu"; 
import Dispensaries from "./pages/Dispensaries";
import Checkout from "./pages/Checkout"; // ✅ NEW
// (we will add Orders page later)

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>

            {/* Home */}
            <Route path="/" element={<Index />} />

            {/* ID Scanner */}
            <Route path="/id-scan" element={<IDScanner />} />

            {/* Driver & Auth */}
            <Route path="/driver-signup" element={<DriverSignup />} />
            <Route path="/auth" element={<Auth />} />

            {/* Customer Protected Routes */}
            <Route
              path="/dispensaries"
              element={
                <ProtectedRoute allowedRole="customer">
                  <Dispensaries />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dispensary/:id"
              element={
                <ProtectedRoute allowedRole="customer">
                  <DispensaryMenu />
                </ProtectedRoute>
              }
            />

            {/* ✅ CHECKOUT (ORDER SYSTEM STEP 1) */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRole="customer">
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;