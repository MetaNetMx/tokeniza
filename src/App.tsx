import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import IssuerLayout from "@/components/issuer/IssuerLayout";

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
import UserSettings from "./pages/dashboard/UserSettings";

// Issuer pages
import IssuerHome from "./pages/issuer/IssuerHome";
import CreateToken from "./pages/issuer/CreateToken";
import IssuerAssets from "./pages/issuer/IssuerAssets";
import IssuerInvestors from "./pages/issuer/IssuerInvestors";
import IssuerReports from "./pages/issuer/IssuerReports";
import IssuerCompliance from "./pages/issuer/IssuerCompliance";
import IssuerSettings from "./pages/issuer/IssuerSettings";

// Public pages
import Calculator from "./pages/Calculator";
import Empresas from "./pages/Empresas";
import BlogHome from "./pages/blog/BlogHome";
import BlogArticle from "./pages/blog/BlogArticle";
import AcademyHome from "./pages/academy/AcademyHome";
import CourseDetail from "./pages/academy/CourseDetail";
import LessonPage from "./pages/academy/LessonPage";

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

            {/* Public pages */}
            <Route path="/calculadora" element={<Calculator />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/blog/:articleId" element={<BlogArticle />} />

            {/* Investor Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardHome />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="marketplace/:id" element={<AssetDetail />} />
              <Route path="tokens" element={<TokensPage />} />
              <Route path="academy" element={<Academy />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>

            {/* Academy (inside dashboard) */}
            <Route path="/academia" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<AcademyHome />} />
              <Route path="curso/:courseId" element={<CourseDetail />} />
              <Route path="leccion/:courseId/:lessonId" element={<LessonPage />} />
            </Route>

            {/* Issuer Dashboard */}
            <Route path="/emisor" element={<ProtectedRoute><IssuerLayout /></ProtectedRoute>}>
              <Route index element={<IssuerHome />} />
              <Route path="create" element={<CreateToken />} />
              <Route path="assets" element={<IssuerAssets />} />
              <Route path="investors" element={<IssuerInvestors />} />
              <Route path="reports" element={<IssuerReports />} />
              <Route path="compliance" element={<IssuerCompliance />} />
              <Route path="settings" element={<IssuerSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
