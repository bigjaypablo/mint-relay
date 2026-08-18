import React from 'react';

export default function AllocationRules({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#09090B] border border-[#18181B] max-w-lg w-full max-h-[85vh] overflow-y-auto rounded-2xl p-6 space-y-6 text-sm text-[#FAFAFA]">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-[#18181B] pb-4">
          <h2 className="font-bold text-base tracking-tight">Mint Relay — Allocation Rules</h2>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-[#71717A] hover:text-[#FAFAFA] font-mono text-xs px-2 py-1 rounded border border-[#18181B]"
            >
              ESC
            </button>
          )}
        </div>

        {/* Core Principles */}
        <section className="space-y-2">
          <h3 className="text-xs font-mono uppercase text-[#71717A] tracking-wider">1. Core Philosophy</h3>
          <p className="text-[#71717A] leading-relaxed text-xs">
            This waitlist establishes queue position and referral attribution prior to launch. Registration does not guarantee an automated token drop; conversion into actual token allocation depends on task completion accuracy and adherence to distribution cutoffs.
          </p>
        </section>

        {/* Tiering Breakdown */}
        <section className="space-y-3">
          <h3 className="text-xs font-mono uppercase text-[#71717A] tracking-wider">2. Allocation Tiering Structure</h3>
          <div className="space-y-2 font-mono text-xs">
            <div className="p-3 bg-black border border-[#18181B] rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-[#FAFAFA]">Tier 1: Leaderboard</p>
                <p className="text-[10px] text-[#71717A]">Top 100 Verified Referrers</p>
              </div>
              <span className="text-xs font-semibold text-[#FAFAFA]">2.5x Weight</span>
            </div>

            <div className="p-3 bg-black border border-[#18181B] rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-[#FAFAFA]">Tier 2: Early Queue</p>
                <p className="text-[10px] text-[#71717A]">Positions #1 – #1,000 + 4/4 Tasks</p>
              </div>
              <span className="text-xs font-semibold text-[#FAFAFA]">1.5x Weight</span>
            </div>

            <div className="p-3 bg-black border border-[#18181B] rounded-xl flex justify-between items-center">
              <div>
                <p className="font-bold text-[#FAFAFA]">Tier 3: Standard Waitlist</p>
                <p className="text-[10px] text-[#71717A]">All Verified Registrants</p>
              </div>
              <span className="text-xs font-semibold text-[#FAFAFA]">1.0x Weight</span>
            </div>
          </div>
        </section>

        {/* Anti-Sybil & Verification Rules */}
        <section className="space-y-2">
          <h3 className="text-xs font-mono uppercase text-[#71717A] tracking-wider">3. Sybil & Bot Filtering</h3>
          <ul className="list-disc list-inside text-xs text-[#71717A] space-y-1.5 leading-relaxed">
            <li>Duplicate X handles or public Solana wallet addresses are rejected at the database level.</li>
            <li>Inert or newly created alt accounts attempting referral loops are flagged and disqualified during the pre-TGE snapshot audit.</li>
            <li>Self-referrals (referring secondary accounts owned by the same user) void all accumulated referral points for that handle.</li>
          </ul>
        </section>

        {/* Distribution Execution */}
        <section className="space-y-2">
          <h3 className="text-xs font-mono uppercase text-[#71717A] tracking-wider">4. Snapshot & Claim Mechanics</h3>
          <p className="text-[#71717A] leading-relaxed text-xs">
            A public snapshot of the waitlist table will be taken prior to distribution. Verified wallet addresses will either be submitted to the project's whitelist or allocated claiming rights directly through the official TGE portal. No signatures or private authorizations are ever required to hold your waitlist rank.
          </p>
        </section>

        {onClose && (
          <button 
            onClick={onClose}
            className="w-full py-3 bg-[#FAFAFA] text-black font-semibold rounded-xl text-xs hover:bg-[#E4E4E7] transition"
          >
            I Understand
          </button>
        )}

      </div>
    </div>
  );
}
