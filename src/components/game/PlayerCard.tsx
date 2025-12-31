import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  HelpCircle,
  Shield,
  User,
  Skull,
  Trash2,
  Edit3,
  Sun,
  Moon,
  Eye,
  Sparkles,
  Crosshair,
  Crown,
  Beaker,
  Heart,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type PlayerIdentity =
  | "?"
  | "seer"
  | "witch"
  | "hunter"
  | "guard"
  | "villager"
  | "wolf"
  | "whiteWolf";

export type DeathReason =
  | "vote"
  | "poison"
  | "milk"
  | "shot"
  | "explode"
  | "kill";

export interface Player {
  id: number;
  identity: PlayerIdentity;
  isDead: boolean;
  deathDay?: number;
  deathReason?: DeathReason;
  note?: string;
}

interface PlayerCardProps {
  player: Player;
  currentDay: number;
  onIdentityChange: (playerId: number, identity: PlayerIdentity) => void;
  onMarkDeadWithReason: (playerId: number, day: number, reason: DeathReason) => void;
  onRevive: (playerId: number) => void;
  onDeathReasonChange: (playerId: number, reason: DeathReason) => void;
  onNoteChange: (playerId: number, note: string) => void;
}

const identityConfig = {
  "?": {
    label: "未知",
    icon: HelpCircle,
    color: "text-muted-foreground",
    borderColor: "border-border",
    bgColor: "bg-card",
  },
  seer: {
    label: "预言家",
    icon: Eye,
    color: "text-seer",
    borderColor: "border-seer/50",
    bgColor: "bg-gradient-to-br from-blue-950/80 to-blue-900/40",
  },
  witch: {
    label: "女巫",
    icon: Sparkles,
    color: "text-purple-400",
    borderColor: "border-purple-500/50",
    bgColor: "bg-gradient-to-br from-purple-950/80 to-purple-900/40",
  },
  hunter: {
    label: "猎人",
    icon: Crosshair,
    color: "text-orange-400",
    borderColor: "border-orange-500/50",
    bgColor: "bg-gradient-to-br from-orange-950/80 to-orange-900/40",
  },
  guard: {
    label: "守卫",
    icon: Shield,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/50",
    bgColor: "bg-gradient-to-br from-cyan-950/80 to-cyan-900/40",
  },
  villager: {
    label: "平民",
    icon: User,
    color: "text-villager",
    borderColor: "border-villager/50",
    bgColor: "bg-gradient-to-br from-green-950/80 to-green-900/40",
  },
  wolf: {
    label: "狼人",
    icon: Skull,
    color: "text-wolf",
    borderColor: "border-wolf/50",
    bgColor: "bg-gradient-to-br from-red-950/80 to-red-900/40",
  },
  whiteWolf: {
    label: "白狼王",
    icon: Crown,
    color: "text-yellow-400",
    borderColor: "border-yellow-500/50",
    bgColor: "bg-gradient-to-br from-yellow-950/80 to-yellow-900/40",
  },
};

const deathReasonConfig: Record<
  DeathReason,
  { label: string; icon: any; confirmed: boolean }
> = {
  vote: {
    label: "投票出局",
    icon: CheckCircle,
    confirmed: true,
  },
  poison: {
    label: "疑似毒杀",
    icon: Beaker,
    confirmed: false,
  },
  milk: {
    label: "疑似奶死",
    icon: Heart,
    confirmed: false,
  },
  shot: {
    label: "枪杀",
    icon: Crosshair,
    confirmed: true,
  },
  explode: {
    label: "狼王自爆",
    icon: Zap,
    confirmed: true,
  },
  kill: {
    label: "疑似被刀",
    icon: Skull,
    confirmed: false,
  },
};

export function PlayerCard({
  player,
  currentDay,
  onIdentityChange,
  onMarkDeadWithReason,
  onRevive,
  onDeathReasonChange,
  onNoteChange,
}: PlayerCardProps) {
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [noteInput, setNoteInput] = useState(player.note || "");

  const config = identityConfig[player.identity];
  const Icon = config.icon;

  const handleNoteSave = () => {
    onNoteChange(player.id, noteInput);
    setNoteDialogOpen(false);
  };

  return (
    <>
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          config.borderColor,
          config.bgColor,
          player.isDead && "opacity-60 bg-black/40"
        )}
      >
        <div className="p-2">
          <div className="flex items-center justify-between">
            {/* 头像区域 - 点击弹出身份和死亡标记菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 flex-1 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", config.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">#{player.id}</span>
                    <span className={cn("text-xs", config.color)}>{config.label}</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 max-h-[38vh] overflow-y-auto">
                {/* 标记身份组 */}
                <div className="px-2 py-1.5 text-xs text-muted-foreground font-medium">标记身份</div>
                <DropdownMenuItem onClick={() => onIdentityChange(player.id, "?")}>
                  <HelpCircle className="w-4 h-4 mr-2 text-muted-foreground" />
                  未知
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onIdentityChange(player.id, "seer")}>
                  <Eye className="w-4 h-4 mr-2 text-seer" />
                  预言家
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onIdentityChange(player.id, "witch")}>
                  <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                  女巫
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onIdentityChange(player.id, "hunter")}>
                  <Crosshair className="w-4 h-4 mr-2 text-orange-400" />
                  猎人
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onIdentityChange(player.id, "guard")}>
                  <Shield className="w-4 h-4 mr-2 text-cyan-400" />
                  守卫
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onIdentityChange(player.id, "villager")}>
                  <User className="w-4 h-4 mr-2 text-villager" />
                  平民
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onIdentityChange(player.id, "wolf")}>
                  <Skull className="w-4 h-4 mr-2 text-wolf" />
                  狼人
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onIdentityChange(player.id, "whiteWolf")}>
                  <Crown className="w-4 h-4 mr-2 text-yellow-400" />
                  白狼王
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* 标记死亡组 */}
                <div className="px-2 py-1.5 text-xs text-muted-foreground font-medium">标记死亡</div>
                {(Object.entries(deathReasonConfig) as [DeathReason, typeof deathReasonConfig[DeathReason]][]).map(
                  ([reason, config]) => {
                    const Icon = config.icon;
                    const isSelected = player.isDead && player.deathReason === reason;
                    return (
                      <DropdownMenuItem
                        key={reason}
                        onClick={() => {
                          if (player.isDead) {
                            onDeathReasonChange(player.id, reason);
                          } else {
                            onMarkDeadWithReason(player.id, currentDay, reason);
                          }
                        }}
                        className={isSelected ? "bg-primary/20" : ""}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {config.label}
                        {isSelected && <CheckCircle className="w-3 h-3 ml-auto text-primary" />}
                      </DropdownMenuItem>
                    );
                  }
                )}

                {/* 死亡后可以复活 */}
                {player.isDead && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onRevive(player.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      取消死亡
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />

                {/* 备注 */}
                <DropdownMenuItem onClick={() => setNoteDialogOpen(true)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  添加备注
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {player.isDead && (
            <Badge
              variant="destructive"
              className="absolute top-1 right-1 text-xs px-1.5 py-0"
            >
              {player.deathDay}天 {player.deathReason ? deathReasonConfig[player.deathReason].label : "出局"}
            </Badge>
          )}
        </div>
      </Card>

      <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>玩家 #{player.id} 备注</DialogTitle>
          </DialogHeader>
          <Textarea
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="输入备注信息..."
            rows={3}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleNoteSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
