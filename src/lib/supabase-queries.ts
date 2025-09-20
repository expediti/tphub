import { supabase } from './supabase';

export interface Template {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  preview_image_url: string;
  video_preview_url?: string;
  template_file_url: string;
  editor_name: string;
  creator_name: string;
  creator_avatar: string;
  duration_seconds: number;
  downloads_count: number;
  likes_count: number;
  is_free: boolean;
  price: number;
  category_names: string[];
  tag_names: string[];
}

// Fetch all templates
export const fetchTemplates = async (): Promise<Template[]> => {
  const { data, error } = await supabase
    .from('template_details')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Fetch templates by editor
export const fetchTemplatesByEditor = async (editorSlug: string): Promise<Template[]> => {
  const { data, error } = await supabase
    .from('template_details')
    .select('*')
    .eq('editor_slug', editorSlug)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Fetch single template
export const fetchTemplate = async (slug: string): Promise<Template | null> => {
  const { data, error } = await supabase
    .from('template_details')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
};

// Search templates
export const searchTemplates = async (query: string): Promise<Template[]> => {
  const { data, error } = await supabase
    .from('template_details')
    .select('*')
    .textSearch('search_vector', query)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};
