import React from 'react';

export default function TaskChecklist({ tasks, toggleTask }) {
  const taskList = [
    {
      id: 'follow',
      title: 'Follow @0xNormadOnChain',
      description: 'Follow the core team account on X for official updates.',
      url: 'https://x.com/0xNormadOnChain'
    },
    {
      id: 'repost',
      title: 'Like & Repost Announcement',
      description: 'Interact with the main announcement post on X.',
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
      title: 'Join Telegram Announcement Channel',
      description: 'Stay tuned for real-time snapshot announcements.',
      url: 'https://t.me/MintRelay'
    }
  ];

  return (
    <section className="bg-[#09090B]/80 border border-[#18181B] hover:border-[#10B981]/40 transition-all duration-300 p-6 rounded-2xl space-y-4 backdrop-blur-xl emerald-glow-box font-mono">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-4 bg-[#10B981] rounded-full"></span>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#10B981]">02. Verification Tasks</h2>
        </div>
        <span className="text-[10px] text-[#71717A] uppercase tracking-widest px-2 py-0.5 rounded bg-[#18181B]">
          {Object.values(tasks).filter(Boolean).length}/4 Done
        </span>
      </div>

      <p className="text-xs text-[#A1A1AA] leading-relaxed">
        Open each link below to complete the action. Tick the checkbox once finished to unlock registration.
      </p>

      <div className="space-y-3 pt-1">
        {taskList.map((task, index) => {
          const isDone = tasks[task.id];
          return (
            <div 
              key={task.id}
              className={`p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                isDone 
                  ? 'bg-[#10B981]/10 border-[#10B981]/40 text-[#FAFAFA]' 
                  : 'bg-[#000000]/40 border-[#27272A] text-[#A1A1AA] hover:border-[#52525B]'
              }`}
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                    isDone 
                      ? 'bg-[#10B981] border-[#10B981] text-black font-extrabold' 
                      : 'border-[#52525B] hover:border-[#10B981]'
                  }`}
                >
                  {isDone && '✓'}
                </button>
                <div className="truncate">
                  <p className="text-xs font-bold text-[#FAFAFA] truncate">
                    {index + 1}. {task.title}
                  </p>
                  <p className="text-[10px] text-[#71717A] truncate">{task.description}</p>
                </div>
              </div>

              <a
                href={task.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (!isDone) toggleTask(task.id);
                }}
                className="px-3 py-1.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] hover:border-[#10B981]/50 text-[#FAFAFA] text-[10px] font-bold rounded-lg transition-all shrink-0 flex items-center space-x-1"
              >
                <span>Open</span>
                <span>↗</span>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
