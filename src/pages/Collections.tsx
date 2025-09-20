import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, TrendingUp, Clock, Heart } from 'lucide-react';

const collections = [
  {
    id: 'trending',
    title: 'Trending Now',
    description: 'Most popular templates this week',
    icon: TrendingUp,
    count: 25,
    templates: [
      { title: 'Viral Phonk Intro', editor: 'CapCut', image: '/api/placeholder/300/200' },
      { title: 'Instagram Story Pack', editor: 'After Effects', image: '/api/placeholder/300/200' },
      { title: 'YouTube Thumbnail', editor: 'Photoshop', image: '/api/placeholder/300/200' },
    ]
  },
  {
    id: 'new',
    title: 'Fresh Uploads',
    description: 'Latest templates added this week',
    icon: Sparkles,
    count: 15,
    templates: [
      { title: 'Modern Slideshow', editor: 'CapCut', image: '/api/placeholder/300/200' },
      { title: 'Glitch Transition', editor: 'After Effects', image: '/api/placeholder/300/200' },
      { title: 'Beat Sync Pack', editor: 'Premiere Pro', image: '/api/placeholder/300/200' },
    ]
  },
  {
    id: 'classics',
    title: 'All-Time Favorites',
    description: 'Most loved templates of all time',
    icon: Heart,
    count: 30,
    templates: [
      { title: 'Clean Intro Pack', editor: 'After Effects', image: '/api/placeholder/300/200' },
      { title: 'Social Media Kit', editor: 'CapCut', image: '/api/placeholder/300/200' },
      { title: 'Cinematic Titles', editor: 'Premiere Pro', image: '/api/placeholder/300/200' },
    ]
  },
  {
    id: 'recent',
    title: 'Recently Updated',
    description: 'Templates with latest improvements',
    icon: Clock,
    count: 20,
    templates: [
      { title: 'Podcast Intro', editor: 'CapCut', image: '/api/placeholder/300/200' },
      { title: 'Logo Reveal', editor: 'After Effects', image: '/api/placeholder/300/200' },
      { title: 'Event Promo', editor: 'DaVinci Resolve', image: '/api/placeholder/300/200' },
    ]
  }
];

const Collections = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Template Collections</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated collections of the best templates organized by theme and popularity
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Collections</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {collections.map((collection) => {
              const IconComponent = collection.icon;
              return (
                <Card key={collection.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {collection.title}
                          </CardTitle>
                          <CardDescription>{collection.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">{collection.count}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {collection.templates.map((template, index) => (
                        <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={template.image} 
                            alt={template.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    <Button className="w-full">
                      View Collection ({collection.count} templates)
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections[0].templates.map((template, index) => (
                <TemplateCard
                  key={index}
                  title={template.title}
                  editor={template.editor}
                  image={template.image}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections[1].templates.map((template, index) => (
                <TemplateCard
                  key={index}
                  title={template.title}
                  editor={template.editor}
                  image={template.image}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections[2].templates.map((template, index) => (
                <TemplateCard
                  key={index}
                  title={template.title}
                  editor={template.editor}
                  image={template.image}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Collections;
