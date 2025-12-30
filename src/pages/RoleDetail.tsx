import { useParams, Link } from "react-router-dom";
import { getRoleById } from "@/data/roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Trophy, Swords, Lightbulb, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const campColors: Record<string, string> = {
  wolf: "text-accent",
  seer: "text-seer",
  villager: "text-villager",
  special: "text-primary",
};

const campBgColors: Record<string, string> = {
  wolf: "bg-accent/10 border-accent/30",
  seer: "bg-seer/10 border-seer/30",
  villager: "bg-villager/10 border-villager/30",
  special: "bg-primary/10 border-primary/30",
};

const RoleDetail = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const role = getRoleById(roleId || "");

  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">角色未找到</p>
          <Link to="/roles" className="text-primary hover:underline">
            返回角色列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="px-4 py-3 max-w-lg mx-auto flex items-center gap-3">
          <Link 
            to="/roles" 
            className="p-1 -ml-1 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Link>
          <h1 className="text-lg font-serif font-semibold text-primary">
            {role.name}
          </h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* 角色头部 */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-card border border-border/50 flex items-center justify-center text-4xl mx-auto mb-4">
            {role.icon}
          </div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
            {role.name}
          </h2>
          <span className={cn("text-sm font-medium", campColors[role.camp])}>
            {role.campName}
          </span>
        </div>

        {/* 角色描述 */}
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="pt-4">
            <p className="text-foreground/90 leading-relaxed">
              {role.description}
            </p>
          </CardContent>
        </Card>

        {/* 胜利条件 */}
        <Card className={cn("border", campBgColors[role.camp])}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className={cn("w-5 h-5", campColors[role.camp])} />
              <span className={campColors[role.camp]}>胜利条件</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90">{role.winCondition}</p>
          </CardContent>
        </Card>

        {/* 技能说明 */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Swords className="w-5 h-5 text-primary" />
              <span className="text-primary">技能说明</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {role.skills.map((skill, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 常用套路 */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="w-5 h-5 text-primary" />
              <span className="text-primary">常用套路</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {role.strategies.map((strategy, index) => (
                <div key={index}>
                  <h4 className="font-medium text-foreground mb-1">
                    {strategy.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {strategy.content}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 注意事项 */}
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="w-5 h-5 text-accent" />
              <span className="text-accent">注意事项</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {role.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-0.5">!</span>
                  <span className="text-foreground/90">{note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 返回按钮 */}
        <div className="pt-4 pb-8">
          <Link
            to="/roles"
            className="block w-full py-3 text-center rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            返回角色列表
          </Link>
        </div>
      </main>
    </div>
  );
};

export default RoleDetail;
