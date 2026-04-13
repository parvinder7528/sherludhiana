import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Calendar, MapPin, Users, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import eventFoodFestival from "@/assets/event-food-festival.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";
import eventCultural from "@/assets/event-cultural.jpg";
import eventStartup from "@/assets/event-startup.jpg";

const eventCategories = [
  "All", "Workshops", "Festivals", "Business Events", "Cultural Shows",
  "Food Events", "Sports", "Education", "Entertainment",
];

const events = [
  {
    title: "Ludhiana Food Festival 2024",
    description: "A grand celebration of Punjabi cuisine featuring local restaurants, street food vendors, and cooking competitions.",
    category: "Food Events",
    date: "2024-02-15 at 10:00 AM - 8:00 PM",
    venue: "Rakh Bagh Ground",
    attendees: 2500,
    price: "Free Entry",
    image: eventFoodFestival,
    organizer: "Ludhiana Food Association",
    slug: "ludhiana-food-festival-2024",
  },
  {
    title: "Digital Marketing Workshop for Small Businesses",
    description: "Learn essential digital marketing strategies to grow your business online. Covers social media, SEO, and online advertising.",
    category: "Business Events",
    date: "2024-02-18 at 9:00 AM - 5:00 PM",
    venue: "Hotel Park Plaza",
    attendees: 150,
    price: "₹1,500",
    image: eventWorkshop,
    organizer: "Digital Punjab Academy",
    slug: "digital-marketing-workshop",
  },
  {
    title: "Ludhiana Cultural Heritage Festival",
    description: "Celebrate the rich cultural heritage of Punjab with traditional dance, music, and art exhibitions.",
    category: "Cultural Shows",
    date: "2024-02-20 at 4:00 PM - 10:00 PM",
    venue: "Nehru Rose Garden",
    attendees: 1800,
    price: "₹200",
    image: eventCultural,
    organizer: "Ludhiana Cultural Society",
    slug: "ludhiana-food-festival-2024",
  },
  {
    title: "Startup Pitch Competition 2024",
    description: "Young entrepreneurs showcase their innovative business ideas to investors and mentors for funding opportunities.",
    category: "Business Events",
    date: "2024-02-25 at 2:00 PM - 7:00 PM",
    venue: "Ludhiana Management Association",
    attendees: 300,
    price: "₹500",
    image: eventStartup,
    organizer: "Punjab Startup Hub",
    slug: "digital-marketing-workshop",
  },
];

const Events = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");

  const filtered = events.filter((e) => {
    const matchCategory = selectedCategory === "All" || e.category === selectedCategory;
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleSearch = () => {
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-muted py-12">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ludhiana Events & Activities</h1>
          <p className="text-muted-foreground mb-8">Discover exciting events, workshops, and festivals happening in your city</p>

          <div className="bg-background rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events, workshops, festivals..."
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button className="gap-2 bg-[hsl(270,60%,55%)] hover:bg-[hsl(270,60%,45%)]" onClick={handleSearch}>
              <Search className="w-4 h-4" /> Search Events
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <h3 className="font-bold text-foreground mb-4">Event Categories</h3>
            <div className="space-y-2">
              {eventCategories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <input type="radio" name="event-cat" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="accent-[hsl(270,60%,55%)]" />
                  {cat === "All" ? "All Categories" : cat}
                </label>
              ))}
            </div>

            <div className="border-t border-border mt-6 pt-4">
              <h4 className="font-semibold text-foreground mb-3">Date Range</h4>
              <div className="space-y-2">
                {["", "Today", "This Week", "This Month"].map((d) => (
                  <label key={d || "all"} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <input type="radio" name="date-range" checked={selectedDate === d} onChange={() => setSelectedDate(d)} className="accent-[hsl(270,60%,55%)]" />
                    {d || "All Dates"}
                  </label>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6" onClick={() => { setSelectedCategory("All"); setSelectedDate(""); setSearch(""); }}>
              Clear Filters
            </Button>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button onClick={() => setActiveTab("upcoming")} className={`px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === "upcoming" ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
                  Upcoming Events
                </button>
                <button onClick={() => setActiveTab("past")} className={`px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === "past" ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
                  Past Events
                </button>
              </div>
              <select className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground">
                <option>Sort by Date</option>
                <option>Sort by Popularity</option>
                <option>Sort by Price</option>
              </select>
            </div>

            <p className="text-sm text-muted-foreground mb-4">Showing {filtered.length} events</p>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground">No events found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((event) => (
                  <Link to={`/events/${event.slug}`} key={event.title} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group block">
                    <div className="relative h-48 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      <span className="absolute top-3 left-3 bg-[hsl(270,60%,55%)] text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">{event.category}</span>
                      <span className="absolute top-3 right-3 bg-foreground/70 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">{event.price}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                      <div className="mt-3 space-y-1.5">
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {event.date}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {event.venue}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {event.attendees.toLocaleString()} attendees</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground">by {event.organizer}</span>
                        <span className="text-sm text-[hsl(270,60%,55%)] font-medium">View Details →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
