import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Heart, Save, Share2, ArrowLeft, Play, Pause } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TemplateDetail = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setTemplate(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  const getEditorInfo = (editor: string) => {
    switch (editor?.toLowerCase()) {
      case 'vn':
        return { name: 'VN Video Editor', buttonText: 'Edit in VN', color: 'bg-blue-600 hover:bg-blue-700' };
      case 'aftereffects':
        return { name: 'After Effects', buttonText: 'Edit in AE', color: 'bg-purple-600 hover:bg-purple-700' };
      default:
        return { name: 'CapCut', buttonText: 'Edit in CapCut', color: 'bg-black hover:bg-gray-800' };
    }
  };

  const handleDownload = () => {
    if (template?.capcut_url) {
      window.open(template.capcut_url, '_blank');
    }
  };

  const toggleVideo = () => {
    const video = document.getElementById('preview-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Templates
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const editorInfo = getEditorInfo(template.editor);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Preview */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-black">
                {template.video_preview_url ? (
                  <>
                    <video
                      id="preview-video"
                      className="w-full h-full object-cover"
                      poster={template.thumbnail_url}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      controls={false}
                      loop
                    >
                      <source src={template.video_preview_url} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        onClick={toggleVideo}
                        size="lg"
                        className="bg-black/70 hover:bg-black/90 text-white rounded-full p-4"
                      >
                        {isPlaying ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8" />
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <img src={template.thumbnail_url} alt={template.title} className="w-full h-full object-cover" />
                )}
              </div>
            </Card>
          </div>

          {/* Template Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{template.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="px-2 py-1 bg-secondary rounded">{editorInfo.name}</span>
                <span>Duration: {Math.floor((template.duration_seconds || 15) / 60)}:{((template.duration_seconds || 15) % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Download Button */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Free Download</h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Download className="mr-1 h-4 w-4" />
                    {(template.downloads_count || 0).toLocaleString()}
                  </div>
                </div>
                
                <Button 
                  onClick={handleDownload}
                  className={`w-full h-12 text-lg text-white ${editorInfo.color}`}
                >
                  <Download className="mr-2 h-5 w-5" />
                  {editorInfo.buttonText}
                </Button>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Like ({template.likes_count || 0})
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {template.description && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TemplateDetail;
