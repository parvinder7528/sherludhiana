import { useEffect, useState } from "react";
import Navbar from "./Navbar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  status: "Active" | "Pending";
  rating?: number;
  reviewCount?: number;
  views?: number;
  clicks?: number;
  image?: string;
}

interface ActivityItem {
  id: string;
  type: "coins" | "review" | "blog" | "visit";
  title: string;
  description: string;
  time: string;
  hasArrow?: boolean;
}

interface User {
  name: string;
  bio: string;
  location: string;
  rank: string;
  coins: number;
  reviews: number;
  blogs: number;
  followers: number;
  avatar?: string;
  businesses: Business[];
  activity: ActivityItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "sheharLudhianaUser";

const RANK_PROGRESSION = [
  { name: "Bronze Beginner", minCoins: 0, color: "#cd7f32" },
  { name: "Silver Explorer", minCoins: 500, color: "#7f77dd" },
  { name: "Gold Influencer", minCoins: 1500, color: "#d4a017" },
  { name: "Platinum Expert", minCoins: 3000, color: "#aaa" },
  { name: "Diamond Legend", minCoins: 5000, color: "#60c0e0" },
];

const CURRENT_PERKS = [
  "Access to exclusive events",
  "2x coin multiplier on reviews",
  "Priority business listing",
  "Featured blogger badge",
];

const DEFAULT_USER: User = {
  name: "Rahul Sharma",
  bio: "Exploring Ludhiana one place at a time | Food lover | Local guide",
  location: "Model Town, Ludhiana",
  rank: "Silver Explorer",
  coins: 1250,
  reviews: 24,
  blogs: 8,
  followers: 156,
  businesses: [
    {
      id: "b1",
      name: "Basant Restaurant",
      category: "Food & Dining",
      location: "Model Town",
      status: "Active",
      rating: 4.5,
      reviewCount: 128,
      views: 2450,
      clicks: 186,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
    },
    {
      id: "b2",
      name: "Ludhiana Fashion Hub",
      category: "Fashion & Shopping",
      location: "Sarabha Nagar",
      status: "Active",
      rating: 4.2,
      reviewCount: 89,
      views: 1890,
      clicks: 124,
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80",
    },
    {
      id: "b3",
      name: "Tech World",
      category: "Electronics",
      location: "Ferozepur Road",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    },
  ],
  activity: [
    { id: "a1", type: "coins", title: "Earned 50 Coins", description: "For completing your profile", time: "2 hours ago" },
    { id: "a2", type: "review", title: "Posted a Review", description: "Rated Basant Restaurant 5 stars", time: "1 day ago" },
    { id: "a3", type: "blog", title: "Published Blog", description: '"Top 10 Cafes in Ludhiana" is now live', time: "3 days ago", hasArrow: true },
    { id: "a4", type: "visit", title: "Visited Business", description: "Checked out Ludhiana Fashion Hub", time: "5 days ago" },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getRankInfo(coins: number) {
  let current = RANK_PROGRESSION[0];
  let next = RANK_PROGRESSION[1];
  for (let i = 0; i < RANK_PROGRESSION.length; i++) {
    if (coins >= RANK_PROGRESSION[i].minCoins) {
      current = RANK_PROGRESSION[i];
      next = RANK_PROGRESSION[i + 1] || RANK_PROGRESSION[i];
    }
  }
  const progressMax = next.minCoins - current.minCoins || 1;
  const progressVal = Math.min(coins - current.minCoins, progressMax);
  const pct = Math.round((progressVal / progressMax) * 100);
  const remaining = next.minCoins - coins;
  return { current, next, pct, remaining };
}

function activityIcon(type: ActivityItem["type"]) {
  const base = "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0";
  if (type === "coins") return <div className={`${base} bg-orange-100`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e07b3f" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>;
  if (type === "review") return <div className={`${base} bg-blue-50`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#378add" strokeWidth={2}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>;
  if (type === "blog") return <div className={`${base} bg-green-50`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d9e75" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg></div>;
  return <div className={`${base} bg-orange-50`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e07b3f" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function UserProfile() {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [bizTab, setBizTab] = useState<"All" | "Active" | "Pending">("All");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Partial<User> = JSON.parse(raw);
        setUser((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // fallback to default
    }
  }, []);

  const { current: rankCurrent, next: rankNext, pct: rankPct, remaining: rankRemaining } = getRankInfo(user.coins);

  const filteredBiz =
    bizTab === "All" ? user.businesses : user.businesses.filter((b) => b.status === bizTab);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-5">

        {/* ── Left Column ── */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">

          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Cover */}
            <div className="h-28 bg-gradient-to-br from-orange-400 via-red-400 to-orange-600" />
            {/* Avatar */}
            <div className="px-6 pb-5">
              <div className="relative -mt-12 mb-3 w-fit">
                <div className="w-20 h-20 rounded-full bg-orange-100 border-4 border-white flex items-center justify-center">
                  {user.avatar
                    ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    : <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e07b3f" strokeWidth={1.5}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  }
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2 2h10v2H7v-2z"/></svg>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 mt-0.5 leading-snug">{user.bio}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  {user.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  {user.rank}
                </span>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit Profile
                </button>
                <button className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  Share Profile
                </button>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-4 border-t border-gray-100">
              {[
                { val: user.coins.toLocaleString(), label: "Coins" },
                { val: user.reviews, label: "Reviews" },
                { val: user.blogs, label: "Blogs" },
                { val: user.followers, label: "Followers" },
              ].map((s) => (
                <div key={s.label} className="py-4 text-center border-r border-gray-100 last:border-r-0">
                  <p className="text-lg font-bold text-gray-900">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Settings card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d9e75" strokeWidth={2}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Settings</p>
                <p className="text-xs text-gray-500">Manage your account</p>
              </div>
            </div>
            {[
              { label: "Change Password", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
              { label: "Notifications", icon: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" },
              { label: "Privacy Settings", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
              { label: "Help & Support", icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <div className="flex items-center gap-3">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={1.5}><path d={item.icon}/></svg>
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
              </button>
            ))}
            <button className="w-full flex items-center justify-between py-3 mt-1 hover:bg-red-50 rounded-lg px-2 -mx-2 transition-colors">
              <div className="flex items-center gap-3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth={1.5}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                <span className="text-sm text-red-500 font-medium">Logout</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="col-span-12 md:col-span-8 flex flex-col gap-5">

          {/* Ranking card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7f77dd" strokeWidth={2}><path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0012 0V2z"/></svg>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">Your Ranking</p>
                <p className="text-xs text-gray-500">Level up by earning coins</p>
              </div>
            </div>

            {/* Rank progress */}
            <div className="bg-purple-50 rounded-xl p-4 mb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-purple-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7f77dd" strokeWidth={2}><circle cx="12" cy="8" r="6"/><path d="M9 12l2 2 4-4"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{rankCurrent.name}</p>
                    <p className="text-xs text-gray-500">{user.coins.toLocaleString()} coins earned</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Next rank</p>
                  <p className="text-sm font-semibold text-gray-800">{rankNext.name}</p>
                </div>
              </div>
              <div className="h-2 bg-purple-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${rankPct}%`, background: "linear-gradient(90deg, #7f77dd, #d4537e)" }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{user.coins.toLocaleString()} coins</span>
                <span>{rankRemaining > 0 ? `${rankRemaining} more to next rank` : "Max rank reached!"}</span>
              </div>
            </div>

            {/* Current Perks */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-900 mb-3">Current Perks</p>
              <div className="grid grid-cols-2 gap-2">
                {CURRENT_PERKS.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d9e75" strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Rank Progression */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Rank Progression</p>
              <div className="flex flex-col gap-2">
                {RANK_PROGRESSION.map((rank) => {
                  const isCompleted = user.coins >= rank.minCoins;
                  const isCurrent = rank.name === rankCurrent.name;
                  return (
                    <div
                      key={rank.name}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                        isCurrent
                          ? "border-purple-200 bg-purple-50"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: rank.color + "22" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={rank.color} strokeWidth={2}><circle cx="12" cy="12" r="10"/></svg>
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isCurrent ? "text-purple-700" : "text-gray-800"}`}>{rank.name}</p>
                          <p className="text-xs text-gray-400">{rank.minCoins}+ coins</p>
                        </div>
                      </div>
                      {isCurrent ? (
                        <span className="text-xs font-medium text-white bg-purple-500 px-2.5 py-0.5 rounded-full">Current</span>
                      ) : isCompleted ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d9e75" strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="mt-4 bg-orange-50 rounded-xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e07b3f" strokeWidth={2}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Pro Tip</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Write quality blogs and leave helpful reviews to earn coins faster. SEO-optimized blogs can earn up to 70 coins each!
                </p>
              </div>
            </div>
          </div>

          {/* Your Businesses */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e07b3f" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900">Your Businesses</p>
                  <p className="text-xs text-gray-500">{user.businesses.length} business listings</p>
                </div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Business
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 mb-4">
              {(["All", "Active", "Pending"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setBizTab(t)}
                  className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    bizTab === t
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {filteredBiz.map((biz) => (
                <div key={biz.id} className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-all">
                  <img
                    src={biz.image || "https://via.placeholder.com/120x90?text=Business"}
                    alt={biz.name}
                    className="w-28 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{biz.name}</p>
                        <p className="text-xs mt-0.5">
                          <span className="text-orange-500">{biz.category}</span>
                          <span className="text-gray-400"> • {biz.location}</span>
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                        biz.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {biz.status}
                      </span>
                    </div>

                    {biz.status === "Active" && biz.rating !== undefined && (
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth={1}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          <span className="font-medium text-gray-700">{biz.rating}</span>
                          <span>({biz.reviewCount} reviews)</span>
                        </span>
                        <span>{biz.views?.toLocaleString()} views</span>
                        <span>{biz.clicks} clicks</span>
                      </div>
                    )}

                    {biz.status === "Pending" && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-yellow-700 bg-yellow-50 rounded-lg px-3 py-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        Awaiting admin approval. You'll be notified once approved.
                      </div>
                    )}

                    {biz.status === "Active" && (
                      <div className="flex gap-3 mt-3">
                        {["Share", "Edit", "View"].map((action) => (
                          <button key={action} className="flex items-center gap-1 text-xs text-gray-600 hover:text-orange-500 transition-colors">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              {action === "Share" && <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>}
                              {action === "Edit" && <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>}
                              {action === "View" && <><circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/></>}
                            </svg>
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#378add" strokeWidth={2}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900">Recent Activity</p>
                  <p className="text-xs text-gray-500">Your latest actions</p>
                </div>
              </div>
              <button className="text-sm text-orange-500 hover:underline font-medium">View All</button>
            </div>

            <div className="flex flex-col gap-1">
              {user.activity.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 py-3.5 px-3 rounded-xl border transition-all ${
                    item.hasArrow ? "border-green-100 bg-green-50" : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  {activityIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${item.type === "blog" ? "text-green-600" : "text-gray-800"}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400">{item.time}</span>
                    {item.hasArrow && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white border border-orange-100 rounded-xl p-4 flex items-center gap-3 hover:border-orange-300 transition-all group">
                <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e07b3f" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-orange-500">Write Blog</p>
                  <p className="text-xs text-gray-400">Earn up to 70 coins</p>
                </div>
              </button>
              <button className="bg-white border border-blue-100 rounded-xl p-4 flex items-center gap-3 hover:border-blue-300 transition-all group">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#378add" strokeWidth={2}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-blue-500">Explore</p>
                  <p className="text-xs text-gray-400">Discover businesses</p>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}  