import { Link } from "react-router-dom";
import { Moon, ChevronRight, Users, GitBranch, Mic } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
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
            to="/roles"
            className="flex items-center gap-4 p-4 rounded-xl glass-card border-glow hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">角色介绍</h3>
              <p className="text-sm text-muted-foreground">了解各角色技能与阵营</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link
            to="/flow"
            className="flex items-center gap-4 p-4 rounded-xl glass-card hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">游戏流程</h3>
              <p className="text-sm text-muted-foreground">警徽流完整规则说明</p>
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
            滑动底部导航栏探索更多内容
          </p>
        </div>
      </div>

      {/* 底部导航占位 */}
      <div className="h-16" />
      
      {/* 导入底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border/50">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-1">
          <Link to="/" className="flex flex-col items-center justify-center w-full h-full py-1 text-primary">
            <svg className="w-5 h-5 mb-0.5 drop-shadow-[0_0_8px_hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-medium text-glow-gold">首页</span>
          </Link>
          <Link to="/roles" className="flex flex-col items-center justify-center w-full h-full py-1 text-muted-foreground hover:text-foreground">
            <Users className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">角色</span>
          </Link>
          <Link to="/flow" className="flex flex-col items-center justify-center w-full h-full py-1 text-muted-foreground hover:text-foreground">
            <GitBranch className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">流程</span>
          </Link>
          <Link to="/tips" className="flex flex-col items-center justify-center w-full h-full py-1 text-muted-foreground hover:text-foreground">
            <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-[10px] font-medium">技巧</span>
          </Link>
          <Link to="/rules" className="flex flex-col items-center justify-center w-full h-full py-1 text-muted-foreground hover:text-foreground">
            <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-[10px] font-medium">规则</span>
          </Link>
          <Link to="/victory" className="flex flex-col items-center justify-center w-full h-full py-1 text-muted-foreground hover:text-foreground">
            <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-[10px] font-medium">胜利</span>
          </Link>
          <Link to="/judge" className="flex flex-col items-center justify-center w-full h-full py-1 text-muted-foreground hover:text-foreground">
            <Mic className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">法官</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Index;
