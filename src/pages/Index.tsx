import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import RecommendedSection from "@/components/RecommendedSection";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <RecommendedSection />
      <FeaturedBusinesses />
      <Footer />
    </div>
  );
};

export default Index;
