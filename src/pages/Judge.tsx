import { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";

const Judge = () => {
  const [time, setTime] = useState(120);
  const [maxTime, setMaxTime] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
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
      </div>
    </PageLayout>
  );
};

export default Judge;
