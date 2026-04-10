import { useState } from "react";

const CATEGORIES = [
  "Restaurant & Food",
  "Retail & Shopping",
  "Health & Medical",
  "Beauty & Salon",
  "Education & Coaching",
  "Automotive",
  "Home Services",
  "Hotels & Travel",
  "Finance & Banking",
  "Electronics & Repair",
  "Clothing & Fashion",
  "Gym & Fitness",
  "Legal Services",
  "Real Estate",
  "Other",
];

const AREAS = [
  // Model Town & Civil Lines
  "Model Town",
  "Civil Lines",
  "Sarabha Nagar",
  "BRS Nagar",
  "Gurdev Nagar",
  "Shastri Nagar",
  // South Ludhiana
  "Dugri",
  "Pakhowal Road",
  "Ferozepur Road",
  "South City",
  "Sundar Nagar",
  "Rajguru Nagar",
  // East Ludhiana
  "GT Road",
  "Jawahar Nagar",
  "Haibowal",
  "Mundian",
  "Dhandari",
  "Sherpur",
  // West Ludhiana
  "Focal Point",
  "Shimlapuri",
  "Vishwakarma Nagar",
  "Basti Jodhewal",
  "Barewal",
  // North Ludhiana
  "Khanna Road",
  "Giaspura",
  "Tibba Road",
  "Tajpur Road",
  "Wariana",
  // Central Ludhiana
  "Chaura Bazar",
  "Ghumar Mandi",
  "Gulabi Bagh",
  "Clock Tower",
  "Aamloh Road",
  // Industrial & Outskirts
  "Sahnewal",
  "Doraha",
  "Raikot Road",
  "Ludhiana Cantt",
  "Samrala Road",
  "Malerkotla Road",
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const defaultHours = DAYS.map((day) => ({
  day,
  open: true,
  from: day === "Sunday" ? "10:00" : "09:00",
  to: day === "Sunday" ? "16:00" : "18:00",
}));

export default function ListYourBusiness() {
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [hours, setHours] = useState(defaultHours);
  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggleDay = (idx: number) => {
    setHours((prev) => prev.map((h, i) => (i === idx ? { ...h, open: !h.open } : h)));
  };

  const updateHour = (idx: number, field: string, value: string) => {
    setHours((prev) => prev.map((h, i) => (i === idx ? { ...h, [field]: value } : h)));
  };

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files).slice(0, 5));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!businessName.trim()) errs.businessName = "Business name is required";
    if (!category) errs.category = "Please select a category";
    if (description.length < 50) errs.description = "Description must be at least 50 characters";
    if (!phone || phone.length !== 10) errs.phone = "Enter a valid 10-digit phone number";
    if (!address.trim()) errs.address = "Address is required";
    if (!area) errs.area = "Please select an area";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl text-green-500">✓</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Listing Submitted!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-7">
            Our team will review your listing within 24 hours. Once approved, your business will be live on Shehar Ludhiana.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Submit Another Business
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-3xl w-full">

        {/* Header */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl">
            🏪
          </div>
        </div>
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">List Your Business</h1>
        <p className="text-center text-gray-500 text-sm mb-7">
          Join thousands of businesses on Shehar Ludhiana and reach more customers
        </p>

        {/* How it Works */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-500 font-bold text-base">ℹ</span>
            <span className="text-blue-800 font-bold text-sm">How it works</span>
          </div>
          <ul className="list-disc list-inside text-blue-700 text-sm space-y-1 pl-1">
            <li>Fill out the business form below</li>
            <li>Our team will review your listing within 24 hours</li>
            <li>Once approved, your business will be live on our platform</li>
            <li>Start receiving customer reviews and inquiries</li>
          </ul>
        </div>

        {/* Business Name + Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-300 ${errors.businessName ? "border-red-400" : "border-gray-300"}`}
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-orange-300 ${errors.category ? "border-red-400" : "border-gray-300"}`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Description <span className="text-red-500">*</span>{" "}
            <span className="text-gray-400 font-normal">(minimum 50 characters)</span>
          </label>
          <textarea
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none resize-y min-h-28 focus:ring-2 focus:ring-orange-300 ${errors.description ? "border-red-400" : "border-gray-300"}`}
            placeholder="Describe your business, services, and what makes you unique..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-gray-400 text-xs mt-1">{description.length}/50</p>
          {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
        </div>

        {/* Phone + WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className={`flex items-center border rounded-lg overflow-hidden ${errors.phone ? "border-red-400" : "border-gray-300"}`}>
              <span className="bg-gray-50 border-r border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-600">+91</span>
              <input
                className="flex-1 px-3 py-2.5 text-sm text-gray-900 outline-none"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="bg-gray-50 border-r border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-600">+91</span>
              <input
                className="flex-1 px-3 py-2.5 text-sm text-gray-900 outline-none"
                placeholder="WhatsApp number (optional)"
                maxLength={10}
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-300"
            placeholder="business@example.com (optional)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Address + Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none resize-y h-24 focus:ring-2 focus:ring-orange-300 ${errors.address ? "border-red-400" : "border-gray-300"}`}
              placeholder="Complete business address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Area <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-orange-300 ${errors.area ? "border-red-400" : "border-gray-300"}`}
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">Select Area</option>
              {AREAS.map((a) => <option key={a}>{a}</option>)}
            </select>
            {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
          </div>
        </div>

        {/* Opening Hours */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Opening Hours</label>
          <div className="space-y-2.5">
            {hours.map((h, idx) => (
              <div key={h.day} className="flex items-center gap-3 flex-wrap">
                <span className="w-24 text-sm font-medium text-gray-700">{h.day}</span>
                <label className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer min-w-16">
                  <input
                    type="checkbox"
                    checked={h.open}
                    onChange={() => toggleDay(idx)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  Open
                </label>
                {h.open ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={h.from}
                      onChange={(e) => updateHour(idx, "from", e.target.value)}
                      className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-300"
                    />
                    <span className="text-gray-500 text-xs">to</span>
                    <input
                      type="time"
                      value={h.to}
                      onChange={(e) => updateHour(idx, "to", e.target.value)}
                      className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm italic">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Business Photos */}
        <div className="mb-7">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business Photos (Maximum 5)
          </label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-9 px-5 cursor-pointer hover:border-orange-400 transition-colors gap-3">
            <span className="text-4xl text-gray-400">🖼</span>
            <span className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-2.5 rounded-lg text-sm transition-colors">
              Choose Photos
            </span>
            <p className="text-gray-500 text-xs text-center">
              Upload high-quality photos of your business, products, or services
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handlePhotos}
            />
          </label>
          {photos.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {photos.map((f) => (
                <span key={f.name} className="bg-gray-100 border border-gray-200 rounded-md px-2.5 py-1 text-xs text-gray-600">
                  {f.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors tracking-wide"
        >
          Submit Business Listing
        </button>
      </div>
    </div>
  );
}