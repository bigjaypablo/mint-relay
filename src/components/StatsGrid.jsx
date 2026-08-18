import React from 'react';

export default function StatsGrid({ registrants, tasksDone, totalTasks, position, referralCount = 0 }) {
  const multiplier = referralCount > 0 ? '2.5x' : '1.0x';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
      {/* Total Queue Size */}
      <div className="bg-[#09090B]/80 border border-[#18181B] p-4 rounded-xl backdrop-blur-md emerald-glow-box">
        <p className="text-[10px] uppercase text-[#71717A] font-bold tracking-wider mb-1">Total Queue</p>
        <p className="text-xl font-extrabold text-[#FAFAFA]">{registrants}</p>
      </div>

      {/* User Queue Spot */}
      <div className="bg-[#09090B]/80 border border-[#18181B] p-4 rounded-xl backdrop-blur-md emerald-glow-box">
        <p className="text-[10px] uppercase text-[#71717A] font-bold tracking-wider mb-1">Queue Spot</p>
        <p className="text-xl font-extrabold text-[#10B981]">#{position}</p>
      </div>

      {/* Referrals Count (Starts at 0) */}
      <div className="bg-[#09090B]/80 border border-[#18181B] p-4 rounded-xl backdrop-blur-md emerald-glow-box">
        <p className="text-[10px] uppercase text-[#71717A] font-bold tracking-wider mb-1">Referrals</p>
        <p className="text-xl font-extrabold text-[#FAFAFA]">{referralCount}</p>
      </div>

      {/* Allocation Multiplier */}
      <div className="bg-[#09090B]/80 border border-[#18181B] p-4 rounded-xl backdrop-blur-md emerald-glow-box">
        <p className="text-[10px] uppercase text-[#71717A] font-bold tracking-wider mb-1">Multiplier</p>
        <p className="text-xl font-extrabold text-[#10B981]">{multiplier}</p>
      </div>
    </div>
  );
}
