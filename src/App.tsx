import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { BottomNav } from "@/components/layout/BottomNav";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import CreateBatchPage from "./pages/batches/CreateBatchPage";
import BatchDetailPage from "./pages/batches/BatchDetailPage";
import BatchComparisonPage from "./pages/batches/BatchComparisonPage";
import ProductStoryPage from "./pages/product/ProductStoryPage";
import VerifyPage from "./pages/product/VerifyPage";
import SecurityMonitoringPage from "./pages/security/SecurityMonitoringPage";
import DashboardAnalyticsPage from "./pages/DashboardAnalyticsPage";
import BatchesListPage from "./pages/batches/BatchesListPage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/settings/SettingsPage";
import NotFound from "./pages/NotFound";
import './i18n/config';

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <ThemeProvider defaultTheme="system" storageKey="authit-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <DynamicBreadcrumb />
            <div className="pb-20">
              <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/batches" 
            element={
              <ProtectedRoute>
                <BatchesListPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/batches/create"
            element={
              <ProtectedRoute>
                <CreateBatchPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/batches/:id" 
            element={
              <ProtectedRoute>
                <BatchDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/batches/compare" 
            element={
              <ProtectedRoute>
                <BatchComparisonPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/security"
            element={
              <ProtectedRoute>
                <SecurityMonitoringPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/analytics" 
            element={
              <ProtectedRoute>
                <DashboardAnalyticsPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/product/:batchId" element={<ProductStoryPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route 
            path="/dashboard/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          {/* Organization profile removed - redirects handled in navigation */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <BottomNav />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
