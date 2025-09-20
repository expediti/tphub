import { Badge } from "@/components/ui/badge";

const categories = [
  "All Templates",
  "Phonk",
  "Insta Story", 
  "Post",
  "Viral Types",
  "Reels",
  "TikTok",
  "YouTube",
  "Podcast",
  "Aesthetic"
];

const Categories = () => {
  return (
    <section className="py-6 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth hover:scale-105 ${
                index === 0 
                  ? 'bg-foreground text-background shadow-elegant' 
                  : 'bg-secondary text-secondary-foreground hover:bg-accent border border-border shadow-card hover:shadow-elegant'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;