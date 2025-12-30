import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface NewYearCelebrationProps {
  onClose: () => void;
  skipCountdown?: boolean;
}

// 中国古诗词新年祝福
const BLESSINGS = [
  "爆竹声中一岁除，春风送暖入屠苏",
  "千门万户曈曈日，总把新桃换旧符",
  "但愿人长久，千里共婵娟",
  "海上生明月，天涯共此时",
  "春风得意马蹄疾，一日看尽长安花",
  "长风破浪会有时，直挂云帆济沧海",
  "天生我材必有用，千金散尽还复来",
  "会当凌绝顶，一览众山小",
  "山重水复疑无路，柳暗花明又一村",
  "莫愁前路无知己，天下谁人不识君",
  "潮平两岸阔，风正一帆悬",
  "沉舟侧畔千帆过，病树前头万木春",
];

const LANTERN_COLORS = [
  "from-red-500 to-red-700",
  "from-amber-500 to-orange-600",
  "from-yellow-400 to-amber-500",
];

// 烟花粒子
const Firework = ({ x, y, color }: { x: number; y: number; color: string }) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i * 30 * Math.PI) / 180,
    delay: Math.random() * 0.2,
  }));

  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-firework-particle"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
            transform: `rotate(${particle.angle}rad)`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// 飘落的祝福语
const FloatingBlessing = ({ text, delay, x }: { text: string; delay: number; x: number }) => (
  <div
    className="absolute text-base md:text-lg font-serif text-yellow-300 whitespace-nowrap opacity-0"
    style={{
      left: `${x}%`,
      top: "-50px",
      textShadow: "0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 100, 0, 0.5)",
      animation: `floatBlessing 12s ease-in-out ${delay}s infinite`,
    }}
  >
    {text}
  </div>
);

// 灯笼组件
const Lantern = ({ x, delay, colorClass }: { x: number; delay: number; colorClass: string }) => (
  <div
    className="absolute top-0"
    style={{ 
      left: `${x}%`,
      animation: `lanternSwing 4s ease-in-out ${delay}s infinite`,
      transformOrigin: "top center",
    }}
  >
    <div className="relative">
      {/* 灯笼绳 */}
      <div className="w-0.5 h-8 bg-yellow-600 mx-auto" />
      {/* 灯笼顶部 */}
      <div className="w-8 h-2 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-t-sm mx-auto" />
      {/* 灯笼主体 */}
      <div className={`w-12 h-16 bg-gradient-to-b ${colorClass} rounded-full mx-auto shadow-lg relative overflow-hidden`}>
        {/* 灯笼纹理 */}
        <div className="absolute inset-0 flex justify-around">
          <div className="w-px h-full bg-yellow-400/30" />
          <div className="w-px h-full bg-yellow-400/30" />
          <div className="w-px h-full bg-yellow-400/30" />
        </div>
        {/* 福字 */}
        <div className="absolute inset-0 flex items-center justify-center text-yellow-200 font-serif text-lg font-bold">
          福
        </div>
      </div>
      {/* 灯笼底部 */}
      <div className="w-8 h-2 bg-gradient-to-b from-yellow-600 to-yellow-500 rounded-b-sm mx-auto" />
      {/* 灯笼穗 */}
      <div className="flex justify-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="w-0.5 h-6 bg-yellow-500" 
            style={{ animation: `tasselSway 2s ease-in-out ${i * 0.1}s infinite` }} 
          />
        ))}
      </div>
    </div>
  </div>
);

// 金币/元宝动画
const GoldCoin = ({ x, delay }: { x: number; delay: number }) => (
  <div
    className="absolute opacity-0"
    style={{ 
      left: `${x}%`,
      top: "-30px",
      animation: `coinFall 6s ease-in ${delay}s infinite`,
    }}
  >
    <div 
      className="w-6 h-6 bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600 rounded-full shadow-lg"
      style={{ animation: "coinSpin 1s linear infinite" }}
    >
      <div className="absolute inset-1 border border-yellow-300/50 rounded-full" />
    </div>
  </div>
);

const NewYearCelebration = ({ onClose, skipCountdown = false }: NewYearCelebrationProps) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(skipCountdown);
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  // 计算到2026年的剩余时间
  const calculateTimeLeft = useCallback(() => {
    const newYear = new Date("2026-01-01T00:00:00").getTime();
    const now = new Date().getTime();
    return Math.max(0, Math.floor((newYear - now) / 1000));
  }, []);

  // 倒计时逻辑
  useEffect(() => {
    if (skipCountdown) {
      setShowCelebration(true);
      return;
    }

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        setShowCelebration(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, skipCountdown]);

  // 烟花效果
  useEffect(() => {
    if (!showCelebration) return;

    const colors = ["#ff0000", "#ffd700", "#ff6b00", "#ff1493", "#00ff00", "#00ffff"];
    
    const createFirework = () => {
      const newFirework = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 50 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setFireworks(prev => [...prev.slice(-10), newFirework]);
    };

    // 初始烟花
    for (let i = 0; i < 5; i++) {
      setTimeout(createFirework, i * 200);
    }

    const interval = setInterval(createFirework, 800);
    return () => clearInterval(interval);
  }, [showCelebration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 overflow-hidden">
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {!showCelebration ? (
        // 倒计时界面
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center animate-fade-in">
            <p className="text-xl text-yellow-400 mb-4 font-serif">距离2026年还有</p>
            <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-500 to-red-500 font-serif animate-pulse">
              {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
            </div>
            <p className="text-2xl text-yellow-400 mt-6 font-serif animate-pulse">
              {timeLeft !== null && timeLeft <= 10 ? "新年即将到来！" : "新年快乐"}
            </p>
          </div>

          {/* 倒计时时的装饰灯笼 */}
          <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
            {[10, 30, 50, 70, 90].map((x, i) => (
              <Lantern key={i} x={x} delay={i * 0.3} colorClass={LANTERN_COLORS[i % LANTERN_COLORS.length]} />
            ))}
          </div>
        </div>
      ) : (
        // 庆祝界面
        <div className="relative min-h-screen overflow-hidden">
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/50 via-black to-red-900/30" />
          
          {/* 灯笼装饰 */}
          <div className="absolute top-0 left-0 right-0 h-40 overflow-visible">
            {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((x, i) => (
              <Lantern key={i} x={x} delay={i * 0.2} colorClass={LANTERN_COLORS[i % LANTERN_COLORS.length]} />
            ))}
          </div>

          {/* 烟花效果 */}
          {fireworks.map(fw => (
            <Firework key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
          ))}

          {/* 金币飘落 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <GoldCoin key={i} x={Math.random() * 100} delay={i * 0.5} />
            ))}
          </div>

          {/* 主标题 */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20">
            <div className="text-center animate-celebration-appear">
              {/* 装饰图案 */}
              <div className="text-6xl mb-4 animate-bounce">🐍</div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-red-500 mb-4 animate-glow-pulse">
                2026
              </h1>
              <p className="text-3xl md:text-5xl font-serif text-yellow-400 mb-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                新年快乐
              </p>
              
              {/* 装饰分隔线 */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
                <span className="text-2xl text-red-500">🧧</span>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
              </div>

              {/* 祝福语卡片 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md mx-auto px-4">
                {BLESSINGS.slice(0, 9).map((blessing, i) => (
                  <div
                    key={blessing}
                    className="px-3 py-2 bg-gradient-to-br from-red-600/80 to-red-800/80 rounded-lg border border-yellow-500/30 shadow-lg animate-fade-in-up"
                    style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                  >
                    <span className="text-yellow-200 font-serif text-sm md:text-base">{blessing}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 飘动的祝福语 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {BLESSINGS.map((blessing, i) => (
              <FloatingBlessing
                key={i}
                text={blessing}
                delay={i * 1.5}
                x={Math.random() * 80 + 10}
              />
            ))}
          </div>

          {/* 底部装饰 */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-red-900/50 to-transparent" />
        </div>
      )}
    </div>
  );
};

export default NewYearCelebration;
