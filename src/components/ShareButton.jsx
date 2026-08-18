import React from 'react';

export default function ShareButton({ handle, position }) {
  const cleanHandle = handle.replace('@', '');
  const refLink = `https://mintrelay.com/?ref=${cleanHandle}`;
  const tweetText = `Just reserved my position #${position} on @MintRelay waitlist ⚡\n\nNo wallet connect required. Claim your spot before snapshot:\n\n${refLink}`;
  
  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  return (
    <a
      href={twitterIntentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full py-3 px-4 bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all duration-200"
    >
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      <span>Share Position to X</span>
    </a>
  );
}
