import { useState } from "react";
import { Search, Calendar, MapPin, Users, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import eventFoodFestival from "@/assets/event-food-festival.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";
import eventCultural from "@/assets/event-cultural.jpg";
import eventStartup from "@/assets/event-startup.jpg";

const eventCategories = [
  "Workshops", "Festivals", "Business Events", "Cultural Shows",
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
  },
  {
    title: "Digital Marketing Workshop for Small Businesses",
    description: "Learn essential digital marketing strategies to grow your business online. Covers social media, SEO, and online...",
    category: "Business Events",
    date: "2024-02-18 at 9:00 AM - 5:00 PM",
    venue: "Hotel Park Plaza",
    attendees: 150,
    price: "₹1,500",
    image: eventWorkshop,
    organizer: "Digital Punjab Academy",
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
  },
];

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [page, setPage] = useState(1);

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
              <input type="text" placeholder="Search events, workshops, festivals..." className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
            </div>
            <Button className="gap-2 bg-[hsl(270,60%,55%)] hover:bg-[hsl(270,60%,45%)]">
              <Search className="w-4 h-4" />
              Search Events
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <h3 className="font-bold text-foreground mb-4">Event Categories</h3>
            <div className="space-y-2">
              {eventCategories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <input type="checkbox" className="accent-[hsl(270,60%,55%)] rounded" />
                  {cat}
                </label>
              ))}
            </div>

            <div className="border-t border-border mt-6 pt-4">
              <h4 className="font-semibold text-foreground mb-3">Date Range</h4>
              <div className="space-y-2">
                {["Today", "This Week", "This Month"].map((d) => (
                  <label key={d} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <input type="radio" name="date-range" className="accent-[hsl(270,60%,55%)]" />
                    {d}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === "upcoming" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`px-5 py-2.5 text-sm font-medium transition-colors ${activeTab === "past" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Past Events
                </button>
              </div>
              <select className="border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground">
                <option>Sort by Date</option>
                <option>Sort by Popularity</option>
                <option>Sort by Price</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div key={event.title} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <span className="absolute top-3 left-3 bg-[hsl(270,60%,55%)] text-white text-xs font-medium px-2.5 py-1 rounded-md">
                      {event.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-foreground/70 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">
                      {event.price}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                    <div className="mt-3 space-y-1.5">
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {event.date}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> {event.venue}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> {event.attendees.toLocaleString()} attendees
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">by {event.organizer}</span>
                      <div className="flex items-center gap-2">
                        <button className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground">
                          <Share2 className="w-3.5 h-3.5" /> Share
                        </button>
                        <Button size="sm" className="bg-[hsl(270,60%,55%)] hover:bg-[hsl(270,60%,45%)]">View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${page === 1 ? "bg-[hsl(270,60%,55%)] text-white" : "border border-border hover:bg-muted"}`} onClick={() => setPage(1)}>1</button>
              <button className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${page === 2 ? "bg-[hsl(270,60%,55%)] text-white" : "border border-border hover:bg-muted"}`} onClick={() => setPage(2)}>2</button>
              <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
