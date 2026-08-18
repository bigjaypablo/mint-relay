import React from 'react';

export default function PassCard({ handle, position, wallet, inviteCode, joinedDate }) {
  const shortWallet = wallet ? `${wallet.slice(0, 4)}...${wallet.slice(-4)}` : '0x...';

  return (
    <div 
      id="pass-card"
      className="w-full max-w-md bg-[#09090B] border border-[#10B981]/40 rounded-2xl p-6 space-y-6 shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden font-mono"
    >
      {/* Background Accent Gradients */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#10B981]/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#059669]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex justify-between items-start relative z-10">
        <div>
          <span className="text-[10px] text-[#10B981] font-bold tracking-widest uppercase block">
            Cryptographic Waitlist Pass
          </span>
          <span className="text-xs text-[#71717A]">Verified On-Chain Ticket</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-extrabold text-[#FAFAFA] tracking-wider block">MINT RELAY</span>
          <span className="text-[9px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
            PHASE 1
          </span>
        </div>
      </div>

      {/* Token Logo & Identity Row */}
      <div className="flex items-center space-x-4 relative z-10 py-2">
        {/* Code-Generated Token Image Badge */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981]/30 via-[#059669]/20 to-[#000000] border border-[#10B981]/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0">
          <svg className="w-8 h-8 text-[#10B981]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>

        <div className="space-y-0.5 overflow-hidden">
          <h3 className="text-lg font-extrabold text-[#FAFAFA] truncate">{handle}</h3>
          <p className="text-xs text-[#10B981] font-bold tracking-wide">POSITION #{position}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#18181B] relative z-10" />

      {/* Metadata Grid */}
      <div className="grid grid-cols-3 gap-2 relative z-10 text-[11px]">
        <div>
          <p className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">Code</p>
          <p className="text-[#FAFAFA] font-bold truncate">{inviteCode}</p>
        </div>
        <div>
          <p className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">Wallet</p>
          <p className="text-[#FAFAFA] font-bold truncate">{shortWallet}</p>
        </div>
        <div>
          <p className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">Snapshot</p>
          <p className="text-[#FAFAFA] font-bold">{joinedDate}</p>
        </div>
      </div>

      {/* Bottom Security Bar */}
      <div className="pt-2 flex justify-between items-center text-[9px] text-[#52525B] border-t border-[#18181B]/50 relative z-10">
        <span>STATUS: ACTIVE QUEUE</span>
        <span>MINT-RELAY-V1</span>
      </div>
    </div>
  );
}
