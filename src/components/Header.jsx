import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between items-center border-b border-[#18181B] pb-4">
      <div className="flex items-center space-x-2">
        <span className="font-bold tracking-wider text-base text-[#FAFAFA]">MINT RELAY</span>
      </div>
      <span className="text-[11px] font-mono text-[#71717A] bg-[#09090B] px-2.5 py-1 rounded-md border border-[#18181B]">
        Pre-Launch Waitlist
      </span>
    </header>
  );
}
