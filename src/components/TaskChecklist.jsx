import React, { useState } from 'react';

export default function TaskChecklist({ tasks, setTasks }) {
  const [openedTasks, setOpenedTasks] = useState({});
  const [verifyingId, setVerifyingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  const taskList = [
    {
      id: 'follow',
      title: 'Follow @0xNormadOnChain',
      description: 'Follow our core handle on X to unlock the next task.',
      url: 'https://x.com/0xNormadOnChain'
    },
    {
      id: 'repost',
      title: 'Like & Repost Announcement',
      description: 'Repost the official mint announcement post on X.',
      url: 'https://x.com/i/status/2089831764428538099'
    },
    {
      id: 'like',
      title: 'Comment on Announcement',
      description: 'Leave a reply or tag 2 web3 friends on the post.',
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
    setOpenedTasks(prev => ({ ...prev, [id]: true }));
    setErrorMessage(prev => ({ ...prev, [id]: null }));
  };

  const handleVerifyTask = (id, index) => {
    if (index > 0) {
      const prevTaskId = taskList[index - 1].id;
      if (!tasks[prevTaskId]) {
        setErrorMessage(prev => ({ 
          ...prev, 
          [id]: 'Complete and verify the previous task first.' 
        }));
        return;
      }
    }

    if (!openedTasks[id]) {
      setErrorMessage(prev => ({ 
        ...prev, 
        [id]: 'Click "Open ↗" to complete the task first.' 
      }));
      return;
    }

    setVerifyingId(id);
    setErrorMessage(prev => ({ ...prev, [id]: null }));

    setTimeout(() => {
      setVerifyingId(null);
      setTasks(prev => ({ ...prev, [id]: true }));
    }, 2000);
  };

  const completedCount = Object.values(tasks).filter(Boolean).length;

  return (
    <section className="bg-[#09090B]/80 border border-[#18181B] hover:border-[#10B981]/40 transition-all duration-300 p-4 sm:p-6 rounded-2xl space-y-4 backdrop-blur-xl emerald-glow-box font-mono">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-4 bg-[#10B981] rounded-full"></span>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#10B981]">02. Verification Tasks</h2>
        </div>
        <span className="text-[10px] text-[#71717A] uppercase tracking-widest px-2 py-0.5 rounded bg-[#18181B] border border-[#27272A]">
          {completedCount}/4 Verified
        </span>
      </div>

      <p className="text-xs text-[#A1A1AA] leading-relaxed">
        Complete tasks step-by-step. Click <span className="text-[#FAFAFA] font-bold">Open ↗</span> to launch the link, then click <span className="text-[#10B981] font-bold">Verify Task</span>.
      </p>

      <div className="space-y-3 pt-1">
        {taskList.map((task, index) => {
          const isDone = tasks[task.id];
          const isPreviousDone = index === 0 || tasks[taskList[index - 1].id];
          const isLocked = !isPreviousDone;
          const isCurrentlyVerifying = verifyingId === task.id;
          const hasOpened = openedTasks[task.id];

          return (
            <div 
              key={task.id}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 space-y-3 ${
                isDone 
                  ? 'bg-[#10B981]/10 border-[#10B981]/40' 
                  : isLocked
                  ? 'bg-[#000000]/20 border-[#18181B] opacity-50'
                  : 'bg-[#000000]/40 border-[#27272A] hover:border-[#10B981]/50'
              }`}
            >
              {/* TASK TITLE & NUMBER */}
              <div className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold border shrink-0 mt-0.5 ${
                  isDone 
                    ? 'bg-[#10B981] border-[#10B981] text-black' 
                    : isLocked 
                    ? 'bg-[#18181B] border-[#27272A] text-[#52525B]'
                    : 'bg-[#18181B] border-[#10B981]/50 text-[#10B981]'
                }`}>
                  {isDone ? '✓' : index + 1}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xs font-bold leading-snug break-words ${isLocked ? 'text-[#71717A]' : 'text-[#FAFAFA]'}`}>
                      {task.title}
                    </h3>
                    {isDone && (
                      <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30 shrink-0">
                        Done
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#A1A1AA] leading-normal break-words">
                    {task.description}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS (STACKED ON MOBILE, SIDE-BY-SIDE ON TABLET+) */}
              <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#18181B]/60">
                {!isDone && (
                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => handleOpenTask(task.id, task.url)}
                    className={`flex-1 sm:flex-none px-3 py-1.5 border text-[10px] font-bold rounded-lg transition-all text-center disabled:opacity-30 disabled:cursor-not-allowed ${
                      hasOpened 
                        ? 'bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981]' 
                        : 'bg-[#18181B] hover:bg-[#27272A] border-[#27272A] text-[#FAFAFA]'
                    }`}
                  >
                    {hasOpened ? 'Opened ↗' : 'Open Link ↗'}
                  </button>
                )}

                <button
                  type="button"
                  disabled={isLocked || isDone || isCurrentlyVerifying}
                  onClick={() => handleVerifyTask(task.id, index)}
                  className={`flex-1 sm:flex-none px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all text-center ${
                    isDone
                      ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 cursor-default'
                      : isLocked
                      ? 'bg-[#18181B] text-[#52525B] border border-[#18181B] cursor-not-allowed'
                      : 'bg-[#10B981] hover:bg-[#059669] text-black cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  }`}
                >
                  {isDone ? 'Verified ✓' : isCurrentlyVerifying ? 'Verifying...' : 'Verify Task'}
                </button>
              </div>

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
