import React, { useState } from 'react';

export default function TaskChecklist({ tasks, setTasks }) {
  const [verifyingId, setVerifyingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  const taskList = [
    {
      id: 'follow',
      title: 'Follow @0xNormadOnChain',
      description: 'Follow the core account on X to unlock the next task.',
      url: 'https://x.com/0xNormadOnChain'
    },
    {
      id: 'repost',
      title: 'Like & Repost Announcement',
      description: 'Repost the official announcement on X.',
      url: 'https://x.com/i/status/2089831764428538099'
    },
    {
      id: 'like',
      title: 'Comment on Announcement',
      description: 'Leave a reply or tag 2 friends on the announcement post.',
      url: 'https://x.com/i/status/2089831764428538099'
    },
    {
      id: 'telegram',
      title: 'Join Telegram Channel',
      description: 'Join the main community channel on Telegram.',
      url: 'https://t.me/MintRelay'
    }
  ];

  const handleOpenTask = (id, url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setErrorMessage(prev => ({ ...prev, [id]: null }));
  };

  const handleVerifyTask = (id, index) => {
    // Prevent verifying out of order
    if (index > 0) {
      const prevTaskId = taskList[index - 1].id;
      if (!tasks[prevTaskId]) {
        setErrorMessage(prev => ({ 
          ...prev, 
          [id]: 'Please complete and verify the previous task first.' 
        }));
        return;
      }
    }

    setVerifyingId(id);
    setErrorMessage(prev => ({ ...prev, [id]: null }));

    // Simulate verification check API call
    setTimeout(() => {
      setVerifyingId(null);

      // Successfully verify task
      setTasks(prev => ({ ...prev, [id]: true }));
    }, 1200);
  };

  const completedCount = Object.values(tasks).filter(Boolean).length;

  return (
    <section className="bg-[#09090B]/80 border border-[#18181B] hover:border-[#10B981]/40 transition-all duration-300 p-6 rounded-2xl space-y-4 backdrop-blur-xl emerald-glow-box font-mono">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-4 bg-[#10B981] rounded-full"></span>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#10B981]">02. Verification Tasks</h2>
        </div>
        <span className="text-[10px] text-[#71717A] uppercase tracking-widest px-2 py-0.5 rounded bg-[#18181B]">
          {completedCount}/4 Verified
        </span>
      </div>

      <p className="text-xs text-[#A1A1AA] leading-relaxed">
        Complete tasks step-by-step from top to bottom. Click <span className="text-[#FAFAFA] font-bold">Open</span> to perform the action, then click <span className="text-[#10B981] font-bold">Verify Task</span>.
      </p>

      <div className="space-y-3 pt-1">
        {taskList.map((task, index) => {
          const isDone = tasks[task.id];
          const isPreviousDone = index === 0 || tasks[taskList[index - 1].id];
          const isLocked = !isPreviousDone;
          const isCurrentlyVerifying = verifyingId === task.id;

          return (
            <div 
              key={task.id}
              className={`p-4 rounded-xl border transition-all duration-200 space-y-2 ${
                isDone 
                  ? 'bg-[#10B981]/10 border-[#10B981]/40' 
                  : isLocked
                  ? 'bg-[#000000]/20 border-[#18181B] opacity-50'
                  : 'bg-[#000000]/40 border-[#27272A] hover:border-[#10B981]/50'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold border shrink-0 ${
                    isDone 
                      ? 'bg-[#10B981] border-[#10B981] text-black' 
                      : isLocked 
                      ? 'bg-[#18181B] border-[#27272A] text-[#52525B]'
                      : 'bg-[#18181B] border-[#10B981]/50 text-[#10B981]'
                  }`}>
                    {isDone ? '✓' : index + 1}
                  </div>

                  <div className="truncate">
                    <p className={`text-xs font-bold truncate ${isLocked ? 'text-[#71717A]' : 'text-[#FAFAFA]'}`}>
                      {task.title}
                    </p>
                    <p className="text-[10px] text-[#71717A] truncate">{task.description}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0">
                  {!isDone && (
                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() => handleOpenTask(task.id, task.url)}
                      className="px-2.5 py-1.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#FAFAFA] text-[10px] font-bold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Open ↗
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={isLocked || isDone || isCurrentlyVerifying}
                    onClick={() => handleVerifyTask(task.id, index)}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                      isDone
                        ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 cursor-default'
                        : isLocked
                        ? 'bg-[#18181B] text-[#52525B] border border-[#18181B] cursor-not-allowed'
                        : 'bg-[#10B981] hover:bg-[#059669] text-black cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    }`}
                  >
                    {isDone ? '✓ Verified' : isCurrentlyVerifying ? 'Verifying...' : 'Verify Task'}
                  </button>
                </div>
              </div>

              {/* Error Warning */}
              {errorMessage[task.id] && (
                <div className="text-[10px] text-red-400 bg-red-950/40 border border-red-500/30 p-2 rounded-lg animate-fade-in">
                  ⚠️ {errorMessage[task.id]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
