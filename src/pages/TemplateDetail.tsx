import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { 
  Download, 
  Heart, 
  Bookmark, 
  Share2, 
  Play, 
  Star, 
  Calendar,
  User,
  Eye,
  ArrowLeft
} from 'lucide-react';

const TemplateDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [template, setTemplate] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTemplate();
      if (user) {
        checkUserActions();
      }
    }
  }, [id, user]);

  const fetchTemplate = async () => {
    // Mock template data - replace with actual Supabase query
    const mockTemplate = {
      id: id,
      title: 'Viral Phonk Intro Template',
      description: 'High-energy phonk intro perfect for TikTok, Instagram Reels, and YouTube Shorts. Features dynamic transitions, beat-synced animations, and customizable text.',
      editor: 'CapCut',
      category: 'Intros',
      tags: ['phonk', 'viral', 'intro', 'tiktok', 'reels'],
      price: 0,
      is_free: true,
      downloads: 15420,
      likes: 1240,
      rating: 4.8,
      created_at: '2024-01-15',
      preview_url: '/api/placeholder/800/450',
      thumbnail: '/api/placeholder/400/225',
      creator: {
        name: 'CreativeStudio',
        avatar: '/api/placeholder/40/40'
      },
      files: [
        { name: 'phonk-intro.capcut', size: '2.4 MB' },
        { name: 'assets.zip', size: '15.6 MB' }
      ],
      requirements: ['CapCut v3.0+', 'Mobile or Desktop'],
      duration: '15 seconds',
      resolution: '1080x1920 (9:16)'
    };
    
    setTemplate(mockTemplate);
    setLoading(false);
  };

  const checkUserActions = async () => {
    if (!user || !id) return;
    
    // Check if user liked this template
    const { data: likeData } = await supabase
      .from('user_likes')
      .select('id')
      .eq('user_id', user.id)
      .eq('template_id', id)
      .single();
    
    setIsLiked(!!likeData);

    // Check if user saved this template
    const { data: saveData } = await supabase
      .from('user_saves')
      .select('id')
      .eq('user_id', user.id)
      .eq('template_id', id)
      .single();
    
    setIsSaved(!!saveData);
  };

  const handleLike = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to like templates',
        variant: 'destructive'
      });
      return;
    }

    if (isLiked) {
      await supabase
        .from('user_likes')
        .delete()
        .eq('user_id', user.id)
        .eq('template_id', id);
    } else {
      await supabase
        .from('user_likes')
        .insert({ user_id: user.id, template_id: id });
    }
    
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? 'Removed from likes' : 'Added to likes',
      description: isLiked ? 'Template removed from your likes' : 'Template added to your likes'
    });
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to save templates',
        variant: 'destructive'
      });
      return;
    }

    if (isSaved) {
      await supabase
        .from('user_saves')
        .delete()
        .eq('user_id', user.id)
        .eq('template_id', id);
    } else {
      await supabase
        .from('user_saves')
        .insert({ user_id: user.id, template_id: id });
    }
    
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? 'Removed from saved' : 'Saved for later',
      description: isSaved ? 'Template removed from your saved list' : 'Template saved to your collection'
    });
  };

  const handleDownload = async () => {
    // Track download in database
    if (user) {
      await supabase
        .from('downloads')
        .insert({ user_id: user.id, template_id: id });
    }
    
    toast({
      title: 'Download Started',
      description: 'Your template download has begun'
    });
  };

  const relatedTemplates = [
    { title: 'Beat Drop Transition', editor: 'CapCut', image: '/api/placeholder/300/200' },
    { title: 'Phonk Beat Sync', editor: 'CapCut', image: '/api/placeholder/300/200' },
    { title: 'Viral Outro Pack', editor: 'CapCut', image: '/api/placeholder/300/200' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center flex-col space-y-4">
          <h1 className="text-2xl font-bold">Template Not Found</h1>
          <Button asChild>
            <Link to="/editors">Browse Templates</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/editors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview */}
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <img 
                src={template.preview_url} 
                alt={template.title}
                className="w-full h-full object-cover"
              />
              <Button 
                size="lg" 
                className="absolute inset-0 m-auto w-16 h-16 rounded-full"
              >
                <Play className="h-6 w-6" />
              </Button>
            </div>

            {/* Template Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{template.title}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {template.creator.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(template.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {template.downloads.toLocaleString()} downloads
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{template.editor}</Badge>
                  <Badge variant="outline">{template.category}</Badge>
                  {template.is_free && <Badge>Free</Badge>}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{template.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-5 w-5" />
                  <span>{template.likes}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="space-y-6">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {template.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {template.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">#{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Duration</h4>
                        <p className="text-muted-foreground">{template.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Resolution</h4>
                        <p className="text-muted-foreground">{template.resolution}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Requirements</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {template.requirements.map((req: string, index: number) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="files">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {template.files.map((file: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{file.size}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{template.is_free ? 'Free Download' : `$${template.price}`}</span>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">{template.downloads.toLocaleString()}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-5 w-5" />
                  {template.is_free ? 'Download Free' : 'Purchase & Download'}
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={handleLike}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={handleSave}
                  >
                    <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creator Card */}
            <Card>
              <CardHeader>
                <CardTitle>Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <img 
                    src={template.creator.avatar} 
                    alt={template.creator.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{template.creator.name}</p>
                    <p className="text-sm text-muted-foreground">Template Creator</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Related Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedTemplates.map((relatedTemplate, index) => (
                  <div key={index} className="flex gap-3">
                    <img 
                      src={relatedTemplate.image} 
                      alt={relatedTemplate.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{relatedTemplate.title}</h4>
                      <p className="text-sm text-muted-foreground">{relatedTemplate.editor}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TemplateDetail;
