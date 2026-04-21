/**
 * Utility to ensure image URLs are valid and provide fallbacks.
 * Specifically handles Supabase Storage public URLs.
 */

const PROJECT_ID = 'iinyzjumtaqnaiomezao';
const DEFAULT_BUCKET = 'images';

export const getSupabaseUrl = (pathOrUrl) => {
  if (!pathOrUrl) return null;
  
  // If it's already a full URL (http/https), check if it's a Supabase URL
  if (pathOrUrl.startsWith('http')) {
    // If it's a Supabase storage URL, ensure it has the /public/ part
    if (pathOrUrl.includes('supabase.co/storage/v1/object/') && !pathOrUrl.includes('/public/')) {
       return pathOrUrl.replace('/object/', '/object/public/');
    }
    return pathOrUrl;
  }
  
  // If it's just a path (e.g., "uploads/image.png"), construct the full public URL
  return `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/${DEFAULT_BUCKET}/${pathOrUrl}`;
};

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop';

export const handleImageError = (e) => {
  e.target.src = FALLBACK_IMAGE;
  e.target.onerror = null; // Prevent infinite loop
};
