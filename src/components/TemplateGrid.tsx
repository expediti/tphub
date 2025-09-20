import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import TemplateCard from "./TemplateCard";

const TemplateGrid = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Load templates from YOUR database
        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Database error:', error);
          return;
        }

        console.log('Loaded templates from database:', data); // Debug log
        setTemplates(data || []);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();

    // Auto-refresh every 10 seconds to show new uploads
    const interval = setInterval(fetchTemplates, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-4">Loading your templates...</p>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">No templates found in database</p>
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
          editor="CapCut"
          image={template.thumbnail_url || "/api/placeholder/400/225"}
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
