import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';  // ADD THIS
import TemplateCard from "./TemplateCard";

const TemplateGrid = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data, error } = await supabase
          .from('template_details')  // Use the view we created
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTemplates(data || []);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading templates...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          title={template.title}
          editor={template.editor_name}
          image={template.thumbnail_url}
          videoPreview={template.video_preview_url}
          downloads={template.downloads_count}
          likes={template.likes_count}
          duration={`${Math.floor(template.duration_seconds / 60)}:${(template.duration_seconds % 60).toString().padStart(2, '0')}`}
          tags={template.tag_names?.slice(0, 2) || []}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
