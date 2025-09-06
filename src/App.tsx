
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import HomepageV2 from "./pages/HomepageV2";
import Auth from "./pages/Auth";
import FamilySetup from "./pages/FamilySetup";
import PersonalInfo from "./pages/PersonalInfo";
import FamilyStructure from "./pages/FamilyStructure";
import DashboardLayout from "./pages/DashboardLayout";
import DailyBriefLayout from "./pages/DailyBriefLayout";
import VillageLayout from "./pages/VillageLayout";
import SmartCareAssistantLayout from "./pages/SmartCareAssistantLayout";
import PlannerInsightsLayout from "./pages/PlannerInsightsLayout";
import InsightsLayout from "./pages/InsightsLayout";
import HomeBaseToolkitLayout from "./pages/HomeBaseToolkitLayout";
import MessagesLayout from "./pages/MessagesLayout";
import Settings from "./pages/Settings";
import Invite from "./pages/Invite";
import NotFound from "./pages/NotFound";
import TopChallenges from "./pages/TopChallenges";
import Priorities from "./pages/Priorities";
import OnboardingSummary from "./pages/OnboardingSummary";
import Welcome from "./pages/Welcome";
import IntroFlow from "./pages/IntroFlow";
import OnboardingLayout from "./components/OnboardingLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/v2" element={<HomepageV2 />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
              <Route path="/intro" element={<ProtectedRoute><IntroFlow /></ProtectedRoute>} />
              
              {/* Onboarding Flow with Layout - Protected */}
              <Route path="/personal-info" element={<ProtectedRoute><OnboardingLayout><PersonalInfo /></OnboardingLayout></ProtectedRoute>} />
              <Route path="/family-setup" element={<ProtectedRoute><OnboardingLayout><FamilySetup /></OnboardingLayout></ProtectedRoute>} />
              <Route path="/family-structure" element={<ProtectedRoute><OnboardingLayout><FamilyStructure /></OnboardingLayout></ProtectedRoute>} />
              <Route path="/top-challenges" element={<ProtectedRoute><OnboardingLayout><TopChallenges /></OnboardingLayout></ProtectedRoute>} />
              <Route path="/priorities" element={<ProtectedRoute><OnboardingLayout><Priorities /></OnboardingLayout></ProtectedRoute>} />
              <Route path="/invite" element={<ProtectedRoute><OnboardingLayout><Invite /></OnboardingLayout></ProtectedRoute>} />
              <Route path="/onboarding-summary" element={<ProtectedRoute><OnboardingLayout><OnboardingSummary /></OnboardingLayout></ProtectedRoute>} />
              
              {/* Main App Routes - Protected */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
              <Route path="/daily-brief" element={<ProtectedRoute><DailyBriefLayout /></ProtectedRoute>} />
              <Route path="/village" element={<ProtectedRoute><VillageLayout /></ProtectedRoute>} />
              <Route path="/smart-care-assistant" element={<ProtectedRoute><SmartCareAssistantLayout /></ProtectedRoute>} />
              <Route path="/planner-insights" element={<ProtectedRoute><PlannerInsightsLayout /></ProtectedRoute>} />
              <Route path="/insights" element={<ProtectedRoute><InsightsLayout /></ProtectedRoute>} />
              <Route path="/home-base-toolkit" element={<ProtectedRoute><HomeBaseToolkitLayout /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><MessagesLayout /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
