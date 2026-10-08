'use client';

interface ScrollDownProps {
  targetId?: string;
}

export default function ScrollDown({ targetId }: ScrollDownProps) {
  const handleScroll = () => {
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={handleScroll}
      aria-label="Scroll down to content"
      className="group relative flex flex-col items-center gap-2 cursor-pointer border-none bg-transparent outline-none transition-transform duration-300 hover:scale-105"
    >
      <div className="relative flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1 transition-colors duration-300 group-hover:border-white">
        <span className="h-2 w-1 rounded-full bg-white animate-bounce" />
      </div>

      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 group-hover:text-white">
        Scroll
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-4 w-4 text-white/70 transition-transform duration-300 group-hover:translate-y-1 group-hover:text-white"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  );
}