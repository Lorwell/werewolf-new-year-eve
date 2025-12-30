import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface RoleCardProps {
  name: string;
  camp: "wolf" | "seer" | "villager";
  icon: ReactNode;
  count?: number;
  skills: string[];
  notes?: string[];
}

const campStyles = {
  wolf: "card-wolf",
  seer: "card-seer",
  villager: "card-villager",
};

const campLabels = {
  wolf: "狼人阵营",
  seer: "神职阵营",
  villager: "平民阵营",
};

const RoleCard = ({ name, camp, icon, count, skills, notes }: RoleCardProps) => {
  return (
    <div className={cn(
      "rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02]",
      campStyles[camp]
    )}>
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-background/30 flex items-center justify-center text-2xl flex-shrink-0">
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-serif font-semibold text-foreground">
              {name}
            </h3>
            {count && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-background/30 text-muted-foreground">
                ×{count}
              </span>
            )}
          </div>
          
          <span className="text-xs text-muted-foreground mb-2 block">
            {campLabels[camp]}
          </span>
          
          <div className="space-y-1.5">
            <div>
              <span className="text-xs text-primary font-medium">技能：</span>
              <ul className="text-sm text-foreground/90 mt-0.5 space-y-0.5">
                {skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-primary mt-1">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {notes && notes.length > 0 && (
              <div className="mt-2 pt-2 border-t border-border/30">
                <span className="text-xs text-accent font-medium">注意：</span>
                <ul className="text-xs text-muted-foreground mt-0.5 space-y-0.5">
                  {notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-accent mt-0.5">!</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
