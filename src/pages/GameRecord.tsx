import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { DayPhaseSelector } from "@/components/game/DayPhaseSelector";
import { PlayerCard, Player, PlayerIdentity, DeathReason } from "@/components/game/PlayerCard";
import { GameLog, LogEntry } from "@/components/game/GameLog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const STORAGE_KEY = "werewolf-game-record";

const identityLabels: Record<PlayerIdentity, string> = {
  "?": "未知",
  seer: "预言家",
  witch: "女巫",
  hunter: "猎人",
  guard: "守卫",
  villager: "平民",
  wolf: "狼人",
  whiteWolf: "白狼王",
};

const deathReasonLabels: Record<DeathReason, string> = {
  vote: "投票出局",
  poison: "疑似毒杀",
  milk: "疑似奶死",
  shot: "枪杀",
  explode: "狼王自爆",
  kill: "疑似被刀",
};

const createInitialPlayers = (): Player[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    identity: "?",
    isDead: false,
  }));
};

export default function GameRecord() {
  const [currentDay, setCurrentDay] = useState(1);
  const [players, setPlayers] = useState<Player[]>(createInitialPlayers());
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // 从 localStorage 加载数据
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentDay(data.currentDay || 1);
        setPlayers(data.players || createInitialPlayers());
        setLogs(data.logs || []);
      } catch (e) {
        console.error("Failed to load saved data:", e);
      }
    }
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    const data = {
      currentDay,
      players,
      logs,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [currentDay, players, logs]);

  const addLog = (content: string, type: LogEntry["type"]) => {
    const newLog: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      day: currentDay,
      phase: "night",
      content,
      type,
      timestamp: Date.now(),
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const handleIdentityChange = (playerId: number, identity: PlayerIdentity) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, identity } : p))
    );
    addLog(`#${playerId} 疑似${identityLabels[identity]}`, "identity");
  };

  const handleMarkDeadWithReason = (
    playerId: number,
    day: number,
    reason: DeathReason
  ) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === playerId
          ? { ...p, isDead: true, deathDay: day, deathReason: reason }
          : p
      )
    );
    addLog(`#${playerId} ${deathReasonLabels[reason]}`, "death");
  };

  const handleDeathReasonChange = (playerId: number, reason: DeathReason) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, deathReason: reason } : p))
    );
    addLog(`#${playerId} ${deathReasonLabels[reason]}`, "death");
  };

  const handleRevive = (playerId: number) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === playerId
          ? { ...p, isDead: false, deathDay: undefined, deathReason: undefined }
          : p
      )
    );
    addLog(`#${playerId} 复活`, "identity");
  };

  const handleNoteChange = (playerId: number, note: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, note } : p))
    );
    if (note) {
      addLog(`#${playerId} 备注: ${note}`, "note");
    }
  };

  const handleReset = () => {
    setCurrentDay(1);
    setPlayers(createInitialPlayers());
    setLogs([]);
    localStorage.removeItem(STORAGE_KEY);
    setResetDialogOpen(false);
  };

  return (
    <PageLayout title="对局记录">
      <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
        {/* 顶部控制栏 */}
        <div className="flex items-center justify-center gap-2 shrink-0">
          <DayPhaseSelector
            day={currentDay}
            onDayChange={setCurrentDay}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setResetDialogOpen(true)}
            className="shrink-0"
            title="重置游戏"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* 玩家卡片区域 */}
        <div className="flex gap-3 shrink-0">
          {/* 左侧玩家 1-6 */}
          <div className="w-1/3 space-y-2">
            {players.slice(0, 6).map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                currentDay={currentDay}
                onIdentityChange={handleIdentityChange}
                onMarkDeadWithReason={handleMarkDeadWithReason}
                onRevive={handleRevive}
                onDeathReasonChange={handleDeathReasonChange}
                onNoteChange={handleNoteChange}
              />
            ))}
          </div>

          {/* 中间留白区 */}
          <div className="flex-1 min-h-[200px] border border-dashed border-border/30 rounded-lg flex items-center justify-center">
            <p className="text-sm text-muted-foreground">记事区域</p>
          </div>

          {/* 右侧玩家 7-12 */}
          <div className="w-1/3 space-y-2">
            {players.slice(6, 12).map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                currentDay={currentDay}
                onIdentityChange={handleIdentityChange}
                onMarkDeadWithReason={handleMarkDeadWithReason}
                onRevive={handleRevive}
                onDeathReasonChange={handleDeathReasonChange}
                onNoteChange={handleNoteChange}
              />
            ))}
          </div>
        </div>

        {/* 底部日志 */}
        <div className="flex-1 min-h-0">
          <GameLog logs={logs} />
        </div>
      </div>

      {/* 重置确认对话框 */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认重置？</AlertDialogTitle>
            <AlertDialogDescription>
              此操作将清除所有游戏记录，包括玩家身份、死亡标记和日志。此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} className="bg-destructive">
              确认重置
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
}
