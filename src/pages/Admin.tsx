import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    capcutUrl: '',
    duration: 15,
    tags: ''
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get CapCut editor ID
      const { data: editor } = await supabase
        .from('editors')
        .select('id')
        .eq('slug', 'capcut')
        .single();

      // Insert template
      const { error } = await supabase
        .from('templates')
        .insert({
          title: formData.title,
          slug: generateSlug(formData.title),
          description: formData.description,
          thumbnail_url: formData.thumbnailUrl,
          preview_image_url: formData.thumbnailUrl, // Same as thumbnail
          video_preview_url: formData.videoUrl,
          template_file_url: formData.capcutUrl,
          editor_id: editor?.id,
          duration_seconds: formData.duration,
          is_published: true,
          is_featured: true
        });

      if (error) throw error;

      // Add tags if provided
      if (formData.tags) {
        const tagNames = formData.tags.split(',').map(tag => tag.trim());
        for (const tagName of tagNames) {
          // Insert tag if not exists
          await supabase
            .from('tags')
            .upsert({ 
              name: tagName, 
              slug: generateSlug(tagName) 
            }, { 
              onConflict: 'slug' 
            });
        }
      }

      toast({
        title: 'Success!',
        description: 'Template uploaded successfully!'
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        thumbnailUrl: '',
        videoUrl: '',
        capcutUrl: '',
        duration: 15,
        tags: ''
      });

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload template',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Template</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Template Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Viral Phonk Intro Template"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Amazing template perfect for Instagram Reels and TikTok..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="thumbnailUrl">Image URL *</Label>
                <Input
                  id="thumbnailUrl"
                  type="url"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <Label htmlFor="videoUrl">Video Preview URL *</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://example.com/video.mp4"
                  required
                />
              </div>

              <div>
                <Label htmlFor="capcutUrl">CapCut App Link *</Label>
                <Input
                  id="capcutUrl"
                  type="url"
                  value={formData.capcutUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, capcutUrl: e.target.value }))}
                  placeholder="https://capcut.app/template/abc123"
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  min="1"
                  max="300"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="phonk, viral, intro, tiktok"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Template'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
