import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

export default function PassCard({ handle, position, wallet, inviteCode, joinedDate }) {
  const cardRef = useRef(null);
  const avatarLetter = handle ? handle.replace('@', '').charAt(0).toUpperCase() : 'M';

  const downloadPass = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 0.95 });
      const link = document.createElement('a');
      link.download = `mint-relay-pass-${handle.replace('@', '')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export pass image:', err);
    }
  };

  return (
    <div className="w-full max-w-lg space-y-3 font-sans">
      
      {/* Visual Render Container */}
      <div 
        ref={cardRef} 
        className="w-full bg-[#09090B] border border-[#10B981]/30 rounded-2xl p-6 relative overflow-hidden emerald-glow-box"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-mono tracking-widest text-[#10B981] uppercase font-bold">Cryptographic Waitlist Pass</span>
          <span className="text-xs font-extrabold text-[#FAFAFA] tracking-wider">MINT RELAY</span>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#10B981]/10 border border-[#10B981]/40 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-[#10B981]">{avatarLetter}</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#FAFAFA] tracking-tight">{handle || '@username'}</h3>
            <p className="text-xs font-mono text-[#10B981] mt-0.5">
              POSITION #{position || '1'}
            </p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#18181B] mb-5"></div>

        <div className="grid grid-cols-3 gap-2 font-mono text-xs">
          <div>
            <p className="text-[#71717A] text-[9px] uppercase tracking-wider mb-1">Code</p>
            <p className="text-[#FAFAFA] truncate text-[11px]">{inviteCode || 'N/A'}</p>
          </div>
          <div>
            <p className="text-[#71717A] text-[9px] uppercase tracking-wider mb-1">Wallet</p>
            <p className="text-[#FAFAFA] truncate text-[11px]">{wallet ? `${wallet.slice(0, 4)}...${wallet.slice(-4)}` : 'Not linked'}</p>
          </div>
          <div>
            <p className="text-[#71717A] text-[9px] uppercase tracking-wider mb-1">Snapshot</p>
            <p className="text-[#FAFAFA] truncate text-[11px]">{joinedDate || '2026-08-18'}</p>
          </div>
        </div>
      </div>

      {/* Download Trigger */}
      <button 
        onClick={downloadPass}
        className="w-full py-2.5 bg-[#09090B] border border-[#27272A] text-[#FAFAFA] hover:text-[#10B981] hover:border-[#10B981]/40 text-xs font-mono rounded-xl transition-all duration-200 cursor-pointer"
      >
        ↓ Save Pass as Image (PNG)
      </button>
    </div>
  );
}
