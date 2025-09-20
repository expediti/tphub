import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Upload, CheckCircle } from 'lucide-react';

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccess(false);

    try {
      // Insert template WITHOUT editor lookup (simpler)
      const { data, error } = await supabase
        .from('templates')
        .insert({
          title: formData.title,
          slug: generateSlug(formData.title),
          description: formData.description,
          thumbnail_url: formData.thumbnailUrl,
          preview_image_url: formData.thumbnailUrl,
          video_preview_url: formData.videoUrl,
          template_file_url: formData.capcutUrl,
          editor_id: null, // Skip editor lookup
          duration_seconds: formData.duration,
          is_published: true,
          is_featured: true
        })
        .select();

      if (error) throw error;

      setSuccess(true);
      toast({
        title: 'Success! 🎉',
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

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Error ❌',
        description: `Upload failed: ${error.message}`,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Template Hub Admin</h1>
          <p className="text-muted-foreground">Upload new templates to your website</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Upload className="h-6 w-6" />
              Upload New Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-800">Template uploaded successfully! Check your website.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Template Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Viral Phonk Intro Template"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Amazing template perfect for Instagram Reels and TikTok videos."
                  required
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="thumbnailUrl">Image URL (Catbox) *</Label>
                <Input
                  id="thumbnailUrl"
                  type="url"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                  placeholder="https://files.catbox.moe/abc123.jpg"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="videoUrl">Video Preview URL (Catbox) *</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://files.catbox.moe/xyz789.mp4"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="capcutUrl">CapCut Template Link *</Label>
                <Input
                  id="capcutUrl"
                  type="url"
                  value={formData.capcutUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, capcutUrl: e.target.value }))}
                  placeholder="https://capcut.app/template/abc123"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (seconds)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    min="1"
                    max="300"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="phonk, viral, intro"
                    className="mt-1"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Uploading to Database...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Template
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
