import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/lib/cart-context";

import CartDrawer from "@/components/CartDrawer";
import FloatingCart from "@/components/FloatingCart"; // 🔥 PRO CART BUTTON

// Pages
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
    <AuthProvider>
      <CartProvider> {/* 🔥 REQUIRED FOR useCart */}

        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>

            {/* 🔥 GLOBAL CART DRAWER */}
            <CartDrawer />

            {/* 🔥 FLOATING PRO CART BUTTON */}
            <FloatingCart />

            <Routes>

              {/* Home */}
              <Route path="/" element={<Index />} />

              {/* ID Scanner */}
              <Route path="/id-scan" element={<IDScanner />} />

              {/* Driver */}
              <Route path="/driver-signup" element={<DriverSignup />} />

              {/* Auth */}
              <Route path="/auth" element={<Auth />} />

              {/* Protected Customer Area */}
              <Route
                path="/dispensaries"
                element={
                  <ProtectedRoute allowedRole="customer">
                    <Dispensaries />
                  </ProtectedRoute>
                }
              />

              {/* Dispensary Menu */}
              <Route
                path="/dispensary/:id"
                element={
                  <ProtectedRoute allowedRole="customer">
                    <DispensaryMenu />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />

            </Routes>

          </BrowserRouter>

        </TooltipProvider>

      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;