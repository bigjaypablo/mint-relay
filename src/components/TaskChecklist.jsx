import React from 'react';

export default function TaskChecklist({ tasks, toggleTask }) {
  const taskList = [
    { key: 'follow', label: 'Follow the project account on X' },
    { key: 'like', label: 'Like the announcement post' },
    { key: 'repost', label: 'Quote or repost with your own comment' },
    { key: 'telegram', label: 'Join the official Telegram' }
  ];

  return (
    <section className="bg-[#09090B] border border-[#18181B] p-6 rounded-2xl space-y-4">
      <h2 className="text-xs font-mono uppercase tracking-wider text-[#71717A]">2. Complete Tasks</h2>
      
      <div className="space-y-2.5">
        {taskList.map((task) => (
          <div 
            key={task.key} 
            onClick={() => toggleTask(task.key)}
            className="flex items-center justify-between p-3.5 rounded-xl border border-[#18181B] bg-black hover:border-[#27272A] cursor-pointer transition"
          >
            <span className="text-sm text-[#FAFAFA]">{task.label}</span>
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
              tasks[task.key] ? 'bg-[#FAFAFA] border-[#FAFAFA] text-black' : 'border-[#27272A] bg-transparent'
            }`}>
              {tasks[task.key] && (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#71717A] leading-relaxed pt-1">
        Each task opens in a new tab. Mark it done once completed — we're not asking for copy-pasted replies or scripted comments, so write your own.
      </p>
    </section>
  );
}
