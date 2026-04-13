import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Explore from "./pages/Explore.tsx";
import Areas from "./pages/Areas.tsx";
import AreaDetail from "./pages/AreaDetail.tsx";
import Blogs from "./pages/Blogs.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import WriteBlog from "./pages/WriteBlog.tsx";
import Events from "./pages/Events.tsx";
import EventDetail from "./pages/EventDetail.tsx";
import BusinessDetail from "./pages/BusinessDetail.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./components/Dashboard.tsx";
import UserProfile from "./components/UserProfile.tsx";
import CampaignAnalytics from "./components/Campaignanalytics.tsx";
import ListYourBusiness from "./components/Listyourbusiness.tsx";
import SellProperty from "./components/SellProperty.tsx";
import BuyPropertiesPage from "./components/Buypropertiespage.tsx";
import RentPropertiesPage from "./components/Rentpropertiespage.tsx";
import PropertiesPage from "./components/PropertyPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/areas/:slug" element={<AreaDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/business/:slug" element={<BusinessDetail />} />
          <Route path="/search" element={<SearchResults />} />
            <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/analytics" element={<CampaignAnalytics />} />
             <Route path="/list-your-business" element={<ListYourBusiness />} />
             <Route path="/sell-your-property" element={<SellProperty />} />
             <Route path="/buy-property" element={<BuyPropertiesPage />} />
             <Route path="/rent-property" element={<RentPropertiesPage />} />
             <Route path="/properties" element={<PropertiesPage />} />



          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
