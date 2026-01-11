import { useAtom } from "jotai";
import { isLoadingAtom, textLoadingAtom } from "@/stores";

const Loading = ({ forceShow = false }: { forceShow?: boolean }) => {
  const [isLoading] = useAtom(isLoadingAtom);
  const [textLoading] = useAtom(textLoadingAtom);

  if (!isLoading && !forceShow) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-300/20 backdrop-blur-sm transition-all duration-300">
      <div className="group relative flex flex-col items-center justify-center p-8 bg-base-100/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 dark:border-white/5 overflow-hidden min-w-[200px]">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 pointer-events-none"></div>

        {/* Animated Spinner or Graphic */}
        <div className="relative z-10 mb-5">
          <span className="loading loading-infinity loading-lg text-primary scale-150 drop-shadow-lg"></span>
        </div>

        {/* Loading Text */}
        <p className="relative z-10 text-xs font-bold tracking-[0.3em] uppercase text-base-content/80 animate-pulse">
          {textLoading || "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Loading;
