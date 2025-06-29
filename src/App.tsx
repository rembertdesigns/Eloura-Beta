
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import HomepageV2 from "./pages/HomepageV2";
import Auth from "./pages/Auth";
import FamilySetup from "./pages/FamilySetup";
import PersonalInfo from "./pages/PersonalInfo";
import FamilyStructure from "./pages/FamilyStructure";
import KidsSummary from "./pages/KidsSummary";
import DashboardPage from "./pages/Dashboard";
import Invite from "./pages/Invite";
import NotFound from "./pages/NotFound";
import TopChallenges from "./pages/TopChallenges";
import Priorities from "./pages/Priorities";
import OnboardingSummary from "./pages/OnboardingSummary";
import DailyBrief from "./pages/DailyBrief";
import Village from "./pages/Village";
import SmartCareAssistant from "./pages/SmartCareAssistant";
import PlannerInsights from "./pages/PlannerInsights";
import HomeBaseToolkit from "./pages/HomeBaseToolkit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/v2" element={<HomepageV2 />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/family-setup" element={<FamilySetup />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/family-structure" element={<FamilyStructure />} />
            <Route path="/kids-summary" element={<KidsSummary />} />
            <Route path="/top-challenges" element={<TopChallenges />} />
            <Route path="/priorities" element={<Priorities />} />
            <Route path="/onboarding-summary" element={<OnboardingSummary />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/daily-brief" element={<DailyBrief />} />
            <Route path="/village" element={<Village />} />
            <Route path="/smart-care-assistant" element={<SmartCareAssistant />} />
            <Route path="/planner-insights" element={<PlannerInsights />} />
            <Route path="/home-base-toolkit" element={<HomeBaseToolkit />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
