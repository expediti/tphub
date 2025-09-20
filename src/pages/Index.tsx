import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import Categories from "@/components/Categories";
import TemplateGrid from "@/components/TemplateGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold">
                Professional Templates for <span className="text-primary">Creators</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover thousands of high-quality templates for CapCut, After Effects, 
                Premiere Pro and more. Save time and create stunning content.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <Categories />
          </div>
        </section>

        {/* Featured Templates */}
        <section className="py-16">
          <div className="container mx-auto px-4 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Featured Templates</h2>
              <p className="text-muted-foreground">
                Hand-picked templates from our top creators
              </p>
            </div>
            <TemplateGrid />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
