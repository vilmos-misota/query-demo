import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

function Skeletons({ count = 3, height = 350 }) {
  const cssHeight = `h-[${height}px]`;
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className={`w-full ${cssHeight}`} />
      ))}
    </>
  );
}

export { Skeleton, Skeletons };
