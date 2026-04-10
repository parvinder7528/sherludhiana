import { Star, ArrowRight, MapPin, Clock } from "lucide-react";

interface BusinessCardProps {
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount?: number;
  price: string;
  isOpen?: boolean;
  location?: string;
  hours?: string;
  variant?: "compact" | "detailed";
}

const BusinessCard = ({
  name,
  category,
  image,
  rating,
  reviewCount,
  price,
  isOpen = true,
  location,
  hours,
  variant = "compact",
}: BusinessCardProps) => {
  if (variant === "detailed") {
    return (
      <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          <div className="absolute top-3 right-3 bg-foreground/70 text-primary-foreground px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            {rating}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
          {reviewCount && (
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted"}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-1">({reviewCount})</span>
            </div>
          )}
          {location && (
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {location}
            </p>
          )}
          {hours && (
            <p className="text-sm text-primary mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {hours}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group cursor-pointer">
      <div className="relative h-44 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        {isOpen && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md">
            Open Now
          </span>
        )}
        <div className="absolute top-3 right-3 bg-foreground/70 text-primary-foreground px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          {rating}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{category}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-muted-foreground">{price}</span>
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
