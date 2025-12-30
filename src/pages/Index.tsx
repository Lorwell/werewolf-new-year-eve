import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, ChevronRight, BookOpen, ScrollText, Mic, Sparkles } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import NewYearCelebration from "@/components/NewYearCelebration";

const Index = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAfterMidnight, setIsAfterMidnight] = useState(false);

  useEffect(() => {
    // 调试模式：直接显示彩蛋按钮
    setShowEasterEgg(true);
    setIsAfterMidnight(true); // 测试跳过倒计时直接显示祝福
    
    /* 正式版本：
    const checkTime = () => {
      const now = new Date();
      const countdownStart = new Date("2025-12-31T23:58:00");
      const midnight = new Date("2026-01-01T00:00:00");

      if (now >= countdownStart) {
        setShowEasterEgg(true);
      }

      if (now >= midnight) {
        setIsAfterMidnight(true);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
    */
  }, []);

  const handleEasterEggClick = () => {
    setShowCelebration(true);
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* 新年庆祝弹窗 */}
      {showCelebration && (
        <NewYearCelebration
          onClose={() => setShowCelebration(false)}
          skipCountdown={isAfterMidnight}
        />
      )}

      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 月亮 */}
        <div className="absolute top-12 right-8 w-20 h-20 rounded-full bg-moon/20 blur-xl animate-pulse-glow" />
        <div className="absolute top-14 right-10 w-16 h-16 rounded-full bg-moon/40 blur-sm" />
        
        {/* 星星 */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-moon/60 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* 树林剪影 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 pt-16 pb-24">
        {/* 彩蛋按钮 - 隐藏在标题旁边 */}
        {showEasterEgg && (
          <button
            onClick={handleEasterEggClick}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-yellow-400 hover:bg-red-600/40 hover:scale-110 transition-all duration-300 animate-pulse"
            title="新年惊喜"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        )}

        {/* 标题区域 */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Moon className="w-10 h-10 text-primary animate-float" />
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-foreground mb-3 text-glow-gold">
            狼人杀
          </h1>
          <p className="text-xl font-serif text-primary mb-2">
            跨年夜特别版
          </p>
          <p className="text-sm text-muted-foreground">
            12人局 · 白狼王守卫 · 警徽流
          </p>
        </div>

        {/* 快捷入口 */}
        <div className="space-y-3 mb-8">
          <Link
            to="/quickstart"
            className="flex items-center gap-4 p-4 rounded-xl glass-card border-glow hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">快速入门</h3>
              <p className="text-sm text-muted-foreground">角色、流程、术语一站式了解</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link
            to="/rules"
            className="flex items-center gap-4 p-4 rounded-xl glass-card hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <ScrollText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">游戏规则</h3>
              <p className="text-sm text-muted-foreground">发言、投票、胜负完整规则</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link
            to="/judge"
            className="flex items-center gap-4 p-4 rounded-xl glass-card hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-seer/20 flex items-center justify-center">
              <Mic className="w-6 h-6 text-seer" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">法官工具台</h3>
              <p className="text-sm text-muted-foreground">语音播报 & 发言计时器</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>

        {/* 底部提示 */}
        <div className="mt-auto text-center">
          <p className="text-xs text-muted-foreground/60">
            使用底部导航栏快速切换功能
          </p>
        </div>
      </div>

      {/* 底部导航占位 */}
      <div className="h-16" />
      
      {/* 导入底部导航 */}
      <BottomNav />
    </div>
  );
};

export default Index;
