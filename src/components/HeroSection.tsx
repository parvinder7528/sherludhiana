import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ludhiana.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Ludhiana cityscape at sunset"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-foreground/50" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-2">
          Discover Ludhiana's
        </h1>
        <p className="text-4xl md:text-6xl font-extrabold text-primary mb-4">
          Best Places
        </p>
        <p className="text-lg text-primary-foreground/90 mb-8">
          Your local guide to restaurants, shops, services, and events in the Manchester of India
        </p>

        <div className="bg-background rounded-full flex items-center p-2 max-w-2xl mx-auto shadow-xl">
          <input
            type="text"
            placeholder="Search for restaurants, shops, services..."
            className="flex-1 px-6 py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button className="rounded-full px-6 gap-2" onClick={handleSearch}>
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <Button size="lg" onClick={() => navigate("/explore")}>
            List Your Business Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-background/20 border-primary-foreground/30 text-primary-foreground hover:bg-background/30"
            onClick={() => navigate("/explore")}
          >
            Explore Businesses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
