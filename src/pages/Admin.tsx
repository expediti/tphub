import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnail_url: '',
    video_preview_url: '',
    capcut_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('templates').insert([form]);
      if (error) throw error;
      
      alert('Template uploaded! ✅');
      setForm({ title: '', description: '', thumbnail_url: '', video_preview_url: '', capcut_url: '' });
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl mb-4">Upload Template</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
        </div>
        <div>
          <Label>Image URL</Label>
          <Input value={form.thumbnail_url} onChange={(e) => setForm({...form, thumbnail_url: e.target.value})} />
        </div>
        <div>
          <Label>Video URL</Label>
          <Input value={form.video_preview_url} onChange={(e) => setForm({...form, video_preview_url: e.target.value})} />
        </div>
        <div>
          <Label>CapCut URL</Label>
          <Input value={form.capcut_url} onChange={(e) => setForm({...form, capcut_url: e.target.value})} />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Uploading...' : 'Upload Template'}
        </Button>
      </form>
    </div>
  );
};

export default Admin;
