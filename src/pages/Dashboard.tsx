import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Bookmark } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [likedTemplates, setLikedTemplates] = useState([]);
  const [savedTemplates, setSavedTemplates] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserTemplates();
    }
  }, [user]);

  const fetchUserTemplates = async () => {
    // Fetch liked templates
    const { data: liked } = await supabase
      .from('user_likes')
      .select('template_id, templates(*)')
      .eq('user_id', user?.id);
    
    // Fetch saved templates
    const { data: saved } = await supabase
      .from('user_saves')
      .select('template_id, templates(*)')
      .eq('user_id', user?.id);

    setLikedTemplates(liked || []);
    setSavedTemplates(saved || []);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.email}! Manage your favorite templates here.
          </p>
        </div>

        <Tabs defaultValue="liked" className="space-y-6">
          <TabsList>
            <TabsTrigger value="liked" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Liked Templates
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Saved Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="liked">
            <Card>
              <CardHeader>
                <CardTitle>Liked Templates</CardTitle>
                <CardDescription>Templates you've liked</CardDescription>
              </CardHeader>
              <CardContent>
                {likedTemplates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {likedTemplates.map((item: any) => (
                      <TemplateCard
                        key={item.template_id}
                        title={item.templates.title}
                        editor={item.templates.editor}
                        image={item.templates.image}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No liked templates yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved Templates</CardTitle>
                <CardDescription>Templates you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {savedTemplates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedTemplates.map((item: any) => (
                      <TemplateCard
                        key={item.template_id}
                        title={item.templates.title}
                        editor={item.templates.editor}
                        image={item.templates.image}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No saved templates yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
