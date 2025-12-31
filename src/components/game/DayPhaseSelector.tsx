import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface DayPhaseSelectorProps {
  day: number;
  onDayChange: (day: number) => void;
}

export function DayPhaseSelector({
  day,
  onDayChange,
}: DayPhaseSelectorProps) {
  return (
    <Card className="bg-gradient-card border-border/50">
      <div className="p-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">当前</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => onDayChange(Math.max(1, day - 1))}
                disabled={day <= 1}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-lg font-bold text-primary font-serif min-w-[60px] text-center">
                第 {day} 天
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => onDayChange(day + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
