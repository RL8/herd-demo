import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps {
  current: number;
  total: number;
  className?: string;
}

export function Progress({ current, total, className }: ProgressProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-700">
          Step {current} of {total}
        </span>
        <span className="text-xs text-gray-500">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-teal-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

