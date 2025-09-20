import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import TemplateCard from "./TemplateCard";

const TemplateGrid = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data, error } = await supabase
          .from('templates')
          .select(`
            *,
            editors (
              name,
              slug
            )
          `)
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;
        
        setTemplates(data || []);
      } catch (error: any) {
        console.error('Error fetching templates:', error);
        setError(error.message);
        
        // Fallback to hardcoded templates if database fails
        const fallbackTemplates = [
          {
            id: '1',
            title: "Viral Phonk Intro",
            description: "High-energy phonk intro perfect for TikTok",
            thumbnail_url: "/api/placeholder/400/225",
            video_preview_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            template_file_url: "https://capcut.app/template/example1",
            duration_seconds: 15,
            downloads_count: 15420,
            likes_count: 1240,
            editors: { name: "CapCut" }
          },
          {
            id: '2',
            title: "Instagram Story Pack",
            description: "Perfect for Instagram stories and reels",
            thumbnail_url: "/api/placeholder/400/225",
            video_preview_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            template_file_url: "https://capcut.app/template/example2",
            duration_seconds: 12,
            downloads_count: 8330,
            likes_count: 892,
            editors: { name: "After Effects" }
          }
        ];
        setTemplates(fallbackTemplates);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();

    // Refresh templates every 30 seconds to show new uploads
    const interval = setInterval(fetchTemplates, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-4">Loading templates...</p>
      </div>
    );
  }

  if (error && templates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Error loading templates: {error}</p>
        <p className="text-muted-foreground">Please try refreshing the page.</p>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">No templates found</p>
        <p className="text-sm text-muted-foreground">Upload your first template via the admin panel!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          title={template.title}
          editor={template.editors?.name || 'CapCut'}
          image={template.thumbnail_url}
          videoPreview={template.video_preview_url}
          downloads={template.downloads_count || 0}
          likes={template.likes_count || 0}
          duration={template.duration_seconds 
            ? `${Math.floor(template.duration_seconds / 60)}:${(template.duration_seconds % 60).toString().padStart(2, '0')}`
            : '0:15'
          }
          tags={[]}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
