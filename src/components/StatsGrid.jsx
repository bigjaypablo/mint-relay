import React from 'react';

export default function StatsGrid({ registrants, tasksDone, totalTasks, position }) {
  return (
    <section className="grid grid-cols-3 gap-3 font-mono text-center">
      <div className="bg-[#09090B] border border-[#18181B] p-4 rounded-xl">
        <p className="text-xl font-semibold text-[#FAFAFA]">{registrants}</p>
        <p className="text-[10px] text-[#71717A] uppercase tracking-wider mt-1">Registrants</p>
      </div>
      <div className="bg-[#09090B] border border-[#18181B] p-4 rounded-xl">
        <p className="text-xl font-semibold text-[#FAFAFA]">{tasksDone}/{totalTasks}</p>
        <p className="text-[10px] text-[#71717A] uppercase tracking-wider mt-1">Tasks Done</p>
      </div>
      <div className="bg-[#09090B] border border-[#18181B] p-4 rounded-xl">
        <p className="text-xl font-semibold text-[#FAFAFA]">#{position}</p>
        <p className="text-[10px] text-[#71717A] uppercase tracking-wider mt-1">Your Position</p>
      </div>
    </section>
  );
}
