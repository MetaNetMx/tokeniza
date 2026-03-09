import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import KYC from "./pages/KYC";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Portfolio from "./pages/dashboard/Portfolio";
import WalletPage from "./pages/dashboard/WalletPage";
import Transactions from "./pages/dashboard/Transactions";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import Marketplace from "./pages/dashboard/Marketplace";
import AssetDetail from "./pages/dashboard/AssetDetail";
import TokensPage from "./pages/dashboard/TokensPage";
import Academy from "./pages/dashboard/Academy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/kyc" element={<ProtectedRoute><KYC /></ProtectedRoute>} />

            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardHome />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="marketplace/:id" element={<AssetDetail />} />
              <Route path="tokens" element={<TokensPage />} />
              <Route path="academy" element={<Academy />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
