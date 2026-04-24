import React, { useState, useRef } from 'react';
import ToolLayout from '../components/ToolLayout';
import { QRCodeSVG } from 'qrcode.react';

export default function QRPage() {
  const [text, setText] = useState('');
  const qrRef = useRef();

  const handleDownload = () => {
     if (!text) return;
     const svg = qrRef.current.querySelector('svg');
     // Ensure xmlns is present for standalone SVG processing
     if (!svg.getAttribute('xmlns')) {
         svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
     }
     const svgData = new XMLSerializer().serializeToString(svg);
     const canvas = document.createElement("canvas");
     const ctx = canvas.getContext("2d");
     const img = new Image();
     img.onload = () => {
         canvas.width = img.width;
         canvas.height = img.height;
         ctx.fillStyle = "white";
         ctx.fillRect(0, 0, canvas.width, canvas.height);
         ctx.drawImage(img, 0, 0);
         const pngFile = canvas.toDataURL("image/png");
         const downloadLink = document.createElement("a");
         downloadLink.download = "qrcode.png";
         downloadLink.href = pngFile;
         downloadLink.click();
     };
     img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <ToolLayout title="QR Code Generator">
       <div className="glass-panel p-8 rounded-[2rem] max-w-xl mx-auto flex flex-col items-center">
          <input 
             type="text"
             value={text}
             onChange={(e) => setText(e.target.value)}
             placeholder="Enter text or URL..."
             className="w-full bg-black/40 border border-white/10 focus:border-primary rounded-xl px-6 py-4 text-white placeholder-slate-500 outline-none transition-colors mb-8"
          />
          
          <div className="bg-white p-4 sm:p-6 rounded-2xl mb-8 flex items-center justify-center min-h-[180px] sm:min-h-[240px] w-full max-w-[240px]" ref={qrRef}>
              {text ? (
                 <div className="w-full aspect-square max-w-[200px]">
                    <QRCodeSVG value={text} size={null} level="H" style={{ width: '100%', height: '100%' }} />
                 </div>
              ) : (
                 <span className="text-slate-400 font-bold opacity-50">Preview</span>
              )}
          </div>
          
          <button 
             onClick={handleDownload}
             disabled={!text}
             className="w-full bg-primary text-[#004050] py-4 rounded-xl font-black uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00D1FF] transition-colors"
          >
             Download QR Image
          </button>
       </div>
    </ToolLayout>
  );
}
