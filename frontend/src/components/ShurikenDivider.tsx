export function ShurikenDivider() {
  return (
    <div className="relative flex items-center justify-center gap-5 py-6" aria-hidden="true">
      <span className="neon-line w-20 md:w-44" />
      <svg
        viewBox="0 0 100 100"
        className="animate-spin-slow size-9 text-purple-500/80 drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M50 2 L61 39 L98 50 L61 61 L50 98 L39 61 L2 50 L39 39 Z M50 42 a8 8 0 1 0 0.01 0 Z"
        />
      </svg>
      <span className="neon-line w-20 md:w-44" />
    </div>
  );
}
