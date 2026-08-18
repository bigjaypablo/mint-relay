import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    
    // Fetch all non-null referrers to compute aggregate leaderboard counts
    const { data, error } = await supabase
      .from('registrants')
      .select('referred_by')
      .not('referred_by', 'is', null);

    if (!error && data) {
      const counts = {};
      data.forEach(item => {
        const ref = item.referred_by;
        counts[ref] = (counts[ref] || 0) + 1;
      });

      const sorted = Object.entries(counts)
        .map(([handle, count]) => ({ handle, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setLeaders(sorted);
    }
    setLoading(false);
  };

  return (
    <section className="bg-[#09090B]/80 border border-[#18181B] rounded-2xl p-6 space-y-4 backdrop-blur-xl emerald-glow-box font-mono">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-4 bg-[#10B981] rounded-full"></span>
          <h2 className="text-xs uppercase tracking-widest text-[#10B981] font-bold">Top Referrers</h2>
        </div>
        <span className="text-[10px] text-[#71717A]">Tier 1 Multiplier (2.5x)</span>
      </div>

      {loading ? (
        <div className="text-center py-4 text-xs text-[#71717A]">Loading rankings...</div>
      ) : leaders.length === 0 ? (
        <div className="text-center py-4 text-xs text-[#71717A]">No referrals recorded yet. Be the first!</div>
      ) : (
        <div className="space-y-2">
          {leaders.map((leader, index) => (
            <div 
              key={leader.handle} 
              className="flex justify-between items-center p-2.5 rounded-xl bg-[#000000]/60 border border-[#18181B] text-xs"
            >
              <div className="flex items-center space-x-3">
                <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                  index === 0 ? 'bg-[#10B981] text-black' : 'bg-[#18181B] text-[#71717A]'
                }`}>
                  #{index + 1}
                </span>
                <span className="text-[#FAFAFA]">{leader.handle}</span>
              </div>
              <span className="text-[#10B981] font-bold">{leader.count} invite{leader.count > 1 ? 's' : ''}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
