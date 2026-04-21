import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Reusable image upload component for admin panels.
 * Uploads to Supabase Storage bucket "images".
 * Falls back to manual URL input if upload fails.
 * Props:
 *  - value: current image URL string
 *  - onChange: (url: string) => void
 *  - placeholder: input placeholder text
 *  - required: boolean
 *  - className: additional wrapper className
 */
export default function ImageUpload({ value, onChange, placeholder = 'Image URL', required = false, className = '' }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const fileRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      alert('Only JPG, PNG, and WebP files are supported.');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB.');
      return;
    }

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    // Upload to Supabase Storage
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        alert('Upload failed: ' + error.message + '\n\nPlease ensure the "images" bucket exists in Supabase Storage with public access.');
        setPreview(null);
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      onChange(publicUrl);
      setPreview(null); // Clear local preview, use the actual URL now
    } catch (err) {
      console.error('Unexpected upload error:', err);
      alert('Upload failed unexpectedly. Try pasting a URL instead.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const displayUrl = preview || value;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Mode Toggle */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${
            mode === 'upload' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/5 text-slate-500 border border-white/5 hover:text-white'
          }`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${
            mode === 'url' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/5 text-slate-500 border border-white/5 hover:text-white'
          }`}
        >
          Paste URL
        </button>
      </div>

      {mode === 'upload' ? (
        <div className="relative">
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full bg-[#0f141a] border border-dashed border-white/10 hover:border-primary/40 rounded-xl px-5 py-3 text-left text-sm transition-all disabled:opacity-50 flex items-center gap-3"
          >
            {uploading ? (
              <>
                <span className="material-symbols-outlined text-primary animate-spin text-lg">progress_activity</span>
                <span className="text-primary font-bold text-xs">Uploading to Supabase...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-slate-500 text-lg">cloud_upload</span>
                <span className="text-slate-500 text-xs font-bold">
                  {value ? 'Change image (JPG, PNG, WebP)' : 'Choose image (JPG, PNG, WebP)'}
                </span>
              </>
            )}
          </button>
          {/* Hidden required field to enforce validation when in upload mode */}
          {required && !value && (
            <input
              type="text"
              required
              value=""
              onChange={() => {}}
              className="absolute inset-0 opacity-0 pointer-events-none"
              tabIndex={-1}
            />
          )}
        </div>
      ) : (
        <input
          type="url"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#0f141a] border border-white/5 focus:border-primary/50 rounded-xl px-5 py-3 text-white outline-none transition-all placeholder:text-slate-600 text-sm"
        />
      )}

      {/* Preview */}
      {displayUrl && (
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0f141a]">
          <img
            src={displayUrl}
            alt="Preview"
            className="w-full h-32 object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14]/80 to-transparent flex items-end p-3">
            <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">check_circle</span>
              {preview ? 'Preview (uploading...)' : 'Image loaded'}
            </span>
          </div>
          {!preview && value && (
            <button
              type="button"
              onClick={() => { onChange(''); if (fileRef.current) fileRef.current.value = ''; }}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-white text-sm">close</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
