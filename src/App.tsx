import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Explore from "./pages/Explore.tsx";
import Areas from "./pages/Areas.tsx";
import Blogs from "./pages/Blogs.tsx";
import WriteBlog from "./pages/WriteBlog.tsx";
import Events from "./pages/Events.tsx";
import NotFound from "./pages/NotFound.tsx";
import ListYourBusiness from "./components/Listyourbusiness.tsx";
import LoginPage from "./components/Login.tsx";
import Dashboard from "./components/Dashboard.tsx";
import CampaignAnalytics from "./components/Campaignanalytics.tsx";
import UserProfile from "./components/UserProfile.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/analytics" element={<CampaignAnalytics />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/events" element={<Events />} />
          <Route path="/list-your-business" element={<ListYourBusiness />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
