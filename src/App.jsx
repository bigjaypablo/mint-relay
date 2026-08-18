import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import TaskChecklist from './components/TaskChecklist';
import PassCard from './components/PassCard';
import AllocationRules from './components/AllocationRules';
import ShareButton from './components/ShareButton';
import Leaderboard from './components/Leaderboard';

export default function App() {
  const [handle, setHandle] = useState('');
  const [referrer, setReferrer] = useState('');
  const [wallet, setWallet] = useState('');
  
  const [handleError, setHandleError] = useState('');
  const [referrerError, setReferrerError] = useState('');
  const [walletError, setWalletError] = useState('');

  const [tasks, setTasks] = useState({
    follow: false,
    like: false,
    repost: false,
    telegram: false
  });

  const [totalRegistrants, setTotalRegistrants] = useState(0);
  const [userPosition, setUserPosition] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchRegistrantCount();

    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref');
    if (refParam) {
      setReferrer(refParam.replace('@', ''));
    }
  }, []);

  const fetchRegistrantCount = async () => {
    const { count, error } = await supabase
      .from('registrants')
      .select('*', { count: 'exact', head: true });

    if (!error && count !== null) {
      setTotalRegistrants(count);
    }
  };

  const sanitizeHandle = (input) => {
    let clean = input.trim();
    if (clean.includes('x.com/') || clean.includes('twitter.com/')) {
      clean = clean.split('/').pop().split('?')[0];
    }
    return clean.replace('@', '');
  };

  const validateXHandle = (val, setError) => {
    const clean = sanitizeHandle(val);
    const handleRegex = /^[a-zA-Z0-9_]{1,15}$/;

    if (!clean) {
      setError('Username is required.');
      return false;
    }

    if (!handleRegex.test(clean)) {
      setError('Up to 15 letters, digits or underscores.');
      return false;
    }

    setError('');
    return true;
  };

  const validateSolanaWallet = (val) => {
    const clean = val.trim();
    // Base58 Solana public key regex (32 to 44 characters)
    const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

    if (!clean) {
      setWalletError('Solana wallet address is required.');
      return false;
    }

    if (!solanaRegex.test(clean)) {
      setWalletError('Please enter a valid public Solana wallet address.');
      return false;
    }

    setWalletError('');
    return true;
  };

  const handleHandleChange = (e) => {
    const raw = e.target.value;
    const clean = sanitizeHandle(raw);
    setHandle(clean);
    if (raw.trim()) validateXHandle(clean, setHandleError);
    else setHandleError('');
  };

  const handleReferrerChange = (e) => {
    const raw = e.target.value;
    const clean = sanitizeHandle(raw);
    setReferrer(clean);
    if (clean) {
      const handleRegex = /^[a-zA-Z0-9_]{1,15}$/;
      if (!handleRegex.test(clean)) {
        setReferrerError(`@${clean} isn't a valid invite handle.`);
      } else {
        setReferrerError('');
      }
    } else {
      setReferrerError('');
    }
  };

  const handleWalletChange = (e) => {
    const val = e.target.value.trim();
    setWallet(val);
    if (val) {
      validateSolanaWallet(val);
    } else {
      setWalletError('');
    }
  };

  const toggleTask = (key) => {
    setTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const isHandleValid = validateXHandle(handle, setHandleError);
    const isWalletValid = validateSolanaWallet(wallet);

    if (!isHandleValid || !isWalletValid) return;

    setLoading(true);

    const formattedHandle = `@${handle.toLowerCase()}`;
    const formattedReferrer = referrer.trim() ? `@${referrer.trim().toLowerCase()}` : null;
    const cleanWallet = wallet.trim();

    const { data, error } = await supabase
      .from('registrants')
      .insert([
        {
          x_handle: formattedHandle,
          referred_by: formattedReferrer,
          wallet_address: cleanWallet,
          tasks_completed: tasks
        }
      ])
      .select('position')
      .single();

    setLoading(false);

    if (error) {
      if (error.code === '23505') {
        setHandleError('This X handle is already registered.');
      } else {
        setErrorMsg(error.message || 'Failed to submit registration.');
      }
      return;
    }

    if (data) {
      setUserPosition(data.position);
      setRegistered(true);
      fetchRegistrantCount();
    }
  };

  const completedCount = Object.values(tasks).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] px-4 py-12 max-w-xl mx-auto space-y-8 font-sans relative overflow-hidden selection:bg-[#10B981] selection:text-black">
      
      {/* Background Radial Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#10B981]/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-[#059669]/10 rounded-full blur-[100px] pointer-events-none" />

      <Header />

      {/* Hero */}
      <section className="space-y-3 relative z-10 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-mono mb-1 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span>Mint Relay Phase 1 Live</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FAFAFA]">
          Reserve your spot on <span className="shimmer-text">Mint Relay</span>
        </h1>
        <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-md">
          Complete tasks, submit your public wallet address, and claim your waitlist pass.
        </p>
      </section>

      <StatsGrid 
        registrants={totalRegistrants}
        tasksDone={completedCount}
        totalTasks={4}
        position={userPosition || (totalRegistrants + 1)}
      />

      <Leaderboard />

      {/* Main Form */}
      <form onSubmit={handleRegister} className="space-y-6 relative z-10">
        
        {errorMsg && (
          <div className="p-4 bg-red-950/50 border border-red-500/50 rounded-xl text-red-300 text-xs font-mono backdrop-blur-md shadow-lg shadow-red-950/50">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* 01. IDENTITY */}
        <section className="bg-[#09090B]/80 border border-[#18181B] hover:border-[#10B981]/40 transition-all duration-300 p-6 rounded-2xl space-y-4 backdrop-blur-xl emerald-glow-box">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-[#10B981] rounded-full"></span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-bold">01. Your Identity</h2>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[#18181B] text-[#71717A]">required</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#71717A] mb-1.5">Your X username</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#71717A] font-mono text-sm">@</span>
                <input 
                  type="text" 
                  placeholder="username"
                  value={handle}
                  onChange={handleHandleChange}
                  className={`w-full bg-[#000000]/60 border ${handleError ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20' : 'border-[#27272A] focus:border-[#10B981] focus:ring-[#10B981]/20'} rounded-xl pl-9 pr-4 py-3 text-sm text-[#FAFAFA] placeholder-[#52525B] focus:outline-none focus:ring-1 transition-all font-mono`}
                />
              </div>
              {handleError && (
                <p className="text-[11px] font-mono text-red-400 mt-1.5 animate-fade-in">{handleError}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-[#71717A] mb-1.5">Invite code · optional</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#71717A] font-mono text-sm">@</span>
                <input 
                  type="text" 
                  placeholder="referrer"
                  value={referrer}
                  onChange={handleReferrerChange}
                  className={`w-full bg-[#000000]/60 border ${referrerError ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20' : 'border-[#27272A] focus:border-[#10B981] focus:ring-[#10B981]/20'} rounded-xl pl-9 pr-4 py-3 text-sm text-[#FAFAFA] placeholder-[#52525B] focus:outline-none focus:ring-1 transition-all font-mono`}
                />
              </div>
              {referrerError && (
                <p className="text-[11px] font-mono text-red-400 mt-1.5 animate-fade-in">{referrerError}</p>
              )}
            </div>
          </div>
        </section>

        {/* 02. TASKS */}
        <TaskChecklist tasks={tasks} toggleTask={toggleTask} />

        {/* 03. WALLET */}
        <section className="bg-[#09090B]/80 border border-[#18181B] hover:border-[#10B981]/40 transition-all duration-300 p-6 rounded-2xl space-y-4 backdrop-blur-xl emerald-glow-box">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-[#10B981] rounded-full"></span>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-bold">03. Destination Wallet</h2>
          </div>
          <div>
            <label className="block text-xs font-mono text-[#71717A] mb-1.5">Solana Public Address</label>
            <input 
              type="text" 
              placeholder="e.g. BHKtkYoz..."
              value={wallet}
              onChange={handleWalletChange}
              className={`w-full bg-[#000000]/60 border ${walletError ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/20' : 'border-[#27272A] focus:border-[#10B981] focus:ring-[#10B981]/20'} rounded-xl px-4 py-3 text-xs font-mono text-[#FAFAFA] placeholder-[#52525B] focus:outline-none focus:ring-1 transition-all`}
            />
            {walletError && (
              <p className="text-[11px] font-mono text-red-400 mt-1.5 animate-fade-in">{walletError}</p>
            )}
          </div>
        </section>

        {/* SUBMIT CTA */}
        <div className="space-y-3 pt-2">
          <button 
            type="submit"
            disabled={loading || registered}
            className="w-full py-4 bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] text-black font-extrabold rounded-xl text-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all cursor-pointer disabled:opacity-50 font-mono tracking-wider uppercase"
          >
            {loading ? 'Writing to DB...' : registered ? '✓ Spot Claimed' : '⚡ Confirm Registration'}
          </button>

          <p className="text-[11px] text-[#71717A] text-center">
            Review our{' '}
            <button 
              type="button" 
              onClick={() => setShowRules(true)} 
              className="underline text-[#10B981]"
            >
              Allocation Rules
            </button>
          </p>
        </div>
      </form>

      {/* POST REGISTRATION SCREEN */}
      {registered && (
        <section className="pt-8 space-y-5 flex flex-col items-center border-t border-[#18181B] animate-float">
          <div className="w-full text-center space-y-1">
            <span className="text-xs font-mono text-[#10B981] tracking-widest uppercase">Pass Confirmed</span>
            <h2 className="text-xl font-bold text-[#FAFAFA]">Welcome to Mint Relay</h2>
          </div>

          <PassCard 
            handle={`@${handle}`}
            position={userPosition}
            wallet={wallet}
            inviteCode={handle}
            joinedDate={new Date().toISOString().split('T')[0]}
          />

          <ShareButton handle={handle} position={userPosition} />
        </section>
      )}

      {showRules && <AllocationRules onClose={() => setShowRules(false)} />}

    </div>
  );
}
