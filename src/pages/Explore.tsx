import { useState } from "react";
import { Search, Grid3X3, List, MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import bizRestaurant from "@/assets/biz-restaurant.jpg";
import bizMall from "@/assets/biz-mall.jpg";
import bizHospital from "@/assets/biz-hospital.jpg";
import bizGym from "@/assets/biz-gym.jpg";

const categories = [
  "Hosiery & Garments", "Textile & Fabrics", "Food & Dining", "Fashion & Shopping",
  "Healthcare", "Education", "Fitness & Wellness", "Beauty & Salon",
  "Automotive", "Real Estate", "Professional Services", "Entertainment",
  "Home Services", "Travel & Tourism",
];

const areas = [
  "Model Town", "Sarabha Nagar", "Dugri", "Ferozepur Road",
  "Civil Lines", "PAU Campus", "BRS Nagar", "Kidwai Nagar",
];

const businesses = [
  { name: "Punjab Grill Restaurant", category: "Fine Dining", image: bizRestaurant, rating: 4.8, reviews: 234, price: "₹₹₹", location: "Model Town", distance: "2.1 km", isOpen: true },
  { name: "Fashion Hub Mall", category: "Shopping", image: bizMall, rating: 4.6, reviews: 189, price: "₹₹", location: "Sarabha Nagar", distance: "3.2 km", isOpen: true },
  { name: "LifeCare Hospital", category: "Healthcare", image: bizHospital, rating: 4.9, reviews: 156, price: "₹₹₹₹", location: "Civil Lines", distance: "4.5 km", isOpen: true },
  { name: "Gold Gym Fitness", category: "Fitness", image: bizGym, rating: 4.7, reviews: 98, price: "₹₹", location: "Dugri", distance: "1.8 km", isOpen: true },
  { name: "Kulcha King", category: "Street Food", image: bizRestaurant, rating: 4.5, reviews: 412, price: "₹", location: "Ferozepur Road", distance: "0.8 km", isOpen: true },
  { name: "Trident Limited", category: "Textile & Fabrics", image: bizMall, rating: 4.9, reviews: 623, price: "₹₹₹₹", location: "Focal Point", distance: "3.2 km", isOpen: true },
];

const Explore = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">Explore Ludhiana Businesses</h1>
          <p className="text-muted-foreground mb-8">Discover amazing local businesses in your area</p>
          
          <div className="bg-background rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search businesses, services, products..."
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button className="gap-2">
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <h3 className="font-bold text-foreground mb-4">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-primary"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-foreground mb-3">Area</h4>
              <div className="space-y-2">
                {areas.map((area) => (
                  <label key={area} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <input type="radio" name="area" className="accent-primary" />
                    {area}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Results</h2>
                <p className="text-sm text-muted-foreground">Found {businesses.length} businesses</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-muted" : "bg-background"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-muted" : "bg-background"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <select className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground">
                  <option>Sort by Relevance</option>
                  <option>Rating: High to Low</option>
                  <option>Distance: Nearest</option>
                </select>
              </div>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-4"}>
              {businesses.map((biz) => (
                <div key={biz.name} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    {biz.isOpen && (
                      <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">
                        Open Now
                      </span>
                    )}
                    <div className="absolute top-3 right-3 bg-foreground/70 text-primary-foreground px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                      {biz.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{biz.name}</h3>
                        <p className="text-sm text-muted-foreground">{biz.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(biz.rating) ? "fill-primary text-primary" : "text-muted"}`} />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({biz.reviews})</span>
                      <span className="text-sm text-muted-foreground ml-2">{biz.price}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {biz.location} • {biz.distance}
                      </span>
                      <span className="text-primary font-medium">View on Map</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
