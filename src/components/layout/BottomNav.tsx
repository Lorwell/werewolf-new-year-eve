import { Link, useLocation } from "react-router-dom";
import { Home, Users, GitBranch, Lightbulb, MessageSquare, Trophy, Mic, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "首页", icon: Home },
  { path: "/roles", label: "角色", icon: Users },
  { path: "/flow", label: "流程", icon: GitBranch },
  { path: "/tips", label: "技巧", icon: Lightbulb },
  { path: "/rules", label: "规则", icon: MessageSquare },
  { path: "/advanced", label: "进阶", icon: Rocket },
  { path: "/victory", label: "胜利", icon: Trophy },
  { path: "/judge", label: "法官", icon: Mic },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border/50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "w-5 h-5 mb-0.5 transition-all duration-300",
                  isActive && "drop-shadow-[0_0_8px_hsl(var(--primary))]"
                )} 
              />
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "text-glow-gold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
