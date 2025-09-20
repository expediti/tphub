import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <section className="py-8">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-foreground transition-fast" />
          </div>
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-xl text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth shadow-card hover:shadow-elegant"
          />
        </div>
      </div>
    </section>
  );
};

export default SearchBar;