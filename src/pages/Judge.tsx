import { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

const voiceCommands = [
  { id: "close-eyes", label: "天黑请闭眼", file: "close-eyes.mp3" },
  { id: "wolf-open", label: "狼人请睁眼", file: "wolf-open.mp3" },
  { id: "wolf-close", label: "狼人请闭眼", file: "wolf-close.mp3" },
  { id: "seer-open", label: "预言家请睁眼", file: "seer-open.mp3" },
  { id: "seer-close", label: "预言家请闭眼", file: "seer-close.mp3" },
  { id: "witch-open", label: "女巫请睁眼", file: "witch-open.mp3" },
  { id: "witch-close", label: "女巫请闭眼", file: "witch-close.mp3" },
  { id: "guard-open", label: "守卫请睁眼", file: "guard-open.mp3" },
  { id: "guard-close", label: "守卫请闭眼", file: "guard-close.mp3" },
  { id: "open-eyes", label: "天亮了请睁眼", file: "open-eyes.mp3" },
  { id: "vote-start", label: "开始投票", file: "vote-start.mp3" },
  { id: "last-words", label: "请发表遗言", file: "last-words.mp3" },
];

const Judge = () => {
  const [time, setTime] = useState(120);
  const [maxTime, setMaxTime] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayVoice = (id: string) => {
    setPlayingId(id);
    setTimeout(() => setPlayingId(null), 2000);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(maxTime);
  };

  const handleMaxTimeChange = (value: number[]) => {
    const newMax = value[0];
    setMaxTime(newMax);
    if (!isRunning) {
      setTime(newMax);
    }
  };

  return (
    <PageLayout title="法官工具台">
      <div className="px-4 py-6 space-y-6">
        {/* 计时器 */}
        <section>
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 flex items-center gap-2">
            <span>⏱️</span>
            发言计时器
          </h2>

          <Card className="bg-gradient-card border-primary/30">
            <CardContent className="py-6">
              <div className="text-center mb-6">
                <div
                  className={`text-6xl font-mono font-bold transition-colors ${
                    time <= 10 ? "text-accent animate-pulse" : "text-primary"
                  }`}
                >
                  {formatTime(time)}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  设定时间: {formatTime(maxTime)}
                </p>
              </div>

              <div className="flex justify-center gap-4 mb-6">
                <Button
                  size="lg"
                  variant={isRunning ? "destructive" : "default"}
                  onClick={() => setIsRunning(!isRunning)}
                  className="w-24"
                >
                  {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button size="lg" variant="outline" onClick={resetTimer}>
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  调整时长: {formatTime(maxTime)}
                </label>
                <Slider
                  value={[maxTime]}
                  onValueChange={handleMaxTimeChange}
                  min={30}
                  max={180}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30秒</span>
                  <span>3分钟</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 语音播报 */}
        <section>
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 flex items-center gap-2">
            <span>🎤</span>
            语音播报
          </h2>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                点击按钮播放对应语音（需上传音频文件）
              </p>

              <div className="grid grid-cols-2 gap-2">
                {voiceCommands.map((cmd) => (
                  <Button
                    key={cmd.id}
                    variant={playingId === cmd.id ? "default" : "secondary"}
                    className="h-auto py-3 text-sm"
                    onClick={() => handlePlayVoice(cmd.id)}
                  >
                    {cmd.label}
                  </Button>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                将MP3文件放入 public/audio/ 目录即可使用
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
};

export default Judge;
