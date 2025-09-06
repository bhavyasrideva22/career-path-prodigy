import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  sectionName: string;
}

export function ProgressBar({ current, total, sectionName }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{sectionName}</span>
        <span className="text-sm text-muted-foreground">
          {current} of {total}
        </span>
      </div>
      <div className="w-full bg-progress-bg rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            "h-full bg-progress-fill transition-all duration-500 ease-out rounded-full",
            "bg-gradient-to-r from-primary to-primary-light"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}