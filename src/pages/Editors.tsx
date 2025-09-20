import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import TemplateGrid from '@/components/TemplateGrid';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

const editors = [
  { id: 'capcut', name: 'CapCut', count: 150, description: 'Mobile video editing templates' },
  { id: 'after-effects', name: 'After Effects', count: 200, description: 'Professional motion graphics' },
  { id: 'premiere-pro', name: 'Premiere Pro', count: 120, description: 'Professional video editing' },
  { id: 'davinci-resolve', name: 'DaVinci Resolve', count: 80, description: 'Color grading and editing' },
  { id: 'filmora', name: 'Filmora', count: 90, description: 'Easy video editing' },
  { id: 'kinemaster', name: 'KineMaster', count: 60, description: 'Mobile editing suite' }
];

const categories = [
  'All', 'Intros', 'Transitions', 'Titles', 'Lower Thirds', 'Social Media', 
  'YouTube', 'Instagram', 'TikTok', 'Reels', 'Stories', 'Podcast'
];

const Editors = () => {
  const { editor } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentEditor = editor ? editors.find(e => e.id === editor) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        {currentEditor ? (
          // Single Editor View
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">{currentEditor.name} Templates</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {currentEditor.description}
              </p>
              <div className="flex items-center justify-center gap-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {currentEditor.count} Templates
                </Badge>
              </div>
            </div>

            <SearchBar />

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-64 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Categories</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              selectedCategory === category
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Templates Grid */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Showing {selectedCategory === 'All' ? currentEditor.count : '12'} templates
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <TemplateGrid />
              </div>
            </div>
          </div>
        ) : (
          // All Editors Overview
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Video Editors</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose your video editor and discover thousands of professional templates
              </p>
            </div>

            <SearchBar />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editors.map((editorItem) => (
                <Card key={editorItem.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {editorItem.name}
                      </CardTitle>
                      <Badge variant="secondary">{editorItem.count}</Badge>
                    </div>
                    <CardDescription>{editorItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <a href={`/editors/${editorItem.id}`}>
                        Browse Templates
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Editors;
