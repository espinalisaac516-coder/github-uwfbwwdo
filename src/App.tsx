import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_MODE } from "@/config";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/lib/cart-context";

import CartDrawer from "@/components/CartDrawer";
import FloatingCart from "@/components/FloatingCart"; // remove if not using

// Pages
import Index from "./pages/Index";
import IDScanner from "./pages/IDScanner";
import DriverSignup from "./pages/DriverSignup";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import DispensaryMenu from "./pages/DispensaryMenu";
import Dispensaries from "./pages/Dispensaries";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation"; // ✅ FIXED

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>

            {/* Global Cart */}
{APP_MODE.deliveryEnabled && <CartDrawer />}
{APP_MODE.deliveryEnabled && <FloatingCart />}

            <Routes>

              {/* Home */}
              <Route path="/" element={<Index />} />

              {/* ID Scanner */}
              <Route path="/id-scan" element={<IDScanner />} />

              {/* Driver Signup */}
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

              <Route
                path="/dispensary/:id"
                element={
                  <ProtectedRoute allowedRole="customer">
                    <DispensaryMenu />
                  </ProtectedRoute>
                }
              />

              {/* Checkout */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute allowedRole="customer">
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* Order Confirmation */}
              <Route
                path="/order-confirmed/:id"
                element={
                  <ProtectedRoute allowedRole="customer">
                    <OrderConfirmation />
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