import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skull, HelpCircle, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

export type LogType = "death" | "identity" | "note";

export interface LogEntry {
  id: string;
  day: number;
  phase: "day" | "night";
  content: string;
  type: LogType;
  timestamp: number;
}

interface GameLogProps {
  logs: LogEntry[];
}

const logTypeConfig = {
  death: {
    icon: Skull,
    label: "死亡",
    color: "text-wolf/70",
    bgColor: "bg-wolf/5",
  },
  identity: {
    icon: HelpCircle,
    label: "身份",
    color: "text-seer/70",
    bgColor: "bg-seer/5",
  },
  note: {
    icon: Edit3,
    label: "备注",
    color: "text-muted-foreground/70",
    bgColor: "bg-muted/30",
  },
};

export function GameLog({ logs }: GameLogProps) {
  // 按时间倒序排列（最新的在上面）
  const sortedLogs = [...logs].sort((a, b) => b.timestamp - a.timestamp);

  if (logs.length === 0) {
    return (
      <Card className="bg-card/40 border-border/30 backdrop-blur-sm h-full flex flex-col">
        <div className="px-3 py-2 border-b border-border/20 shrink-0">
          <h3 className="text-xs font-semibold text-primary/80 font-serif">事迹记录</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 text-center text-muted-foreground/70">
          <div>
            <HelpCircle className="w-8 h-8 mx-auto mb-1 opacity-40" />
            <p className="text-xs">暂无记录</p>
            <p className="text-[10px] mt-1">点击玩家卡片开始记录游戏信息</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-card/40 border-border/30 backdrop-blur-sm h-full flex flex-col">
      <div className="px-3 py-2 border-b border-border/20 shrink-0">
        <h3 className="text-xs font-semibold text-primary/80 font-serif">事迹记录</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {sortedLogs.map((log) => {
            const config = logTypeConfig[log.type];

            return (
              <div
                key={log.id}
                className={cn(
                  "flex items-start gap-1.5 p-1.5 rounded-sm text-xs",
                  config.bgColor
                )}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-muted-foreground/70">
                      第{log.day}天
                    </span>
                    <span className="text-foreground/80 break-words">{log.content}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}
