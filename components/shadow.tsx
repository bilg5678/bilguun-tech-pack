export const Shadow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute flex items-center justify-center top-0 left-0 z-[60] bg-white/90  w-[100vw] h-[100vh]">
      {children}
    </div>
  );
};
