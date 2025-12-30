import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { roles } from "@/data/roles";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

// 角色样式
const campStyles: Record<string, string> = {
  wolf: "card-wolf",
  seer: "card-seer",
  villager: "card-villager",
  special: "bg-gradient-to-br from-amber-950/80 to-amber-900/40 border-amber-700/50",
};

// 流程步骤
const flowSteps = [
  {
    phase: "准备阶段",
    icon: "🎴",
    steps: ["法官洗牌并发放身份牌", "玩家确认自己的身份，不得展示给他人", "法官宣布游戏开始"],
  },
  {
    phase: "警长竞选",
    icon: "👮",
    steps: [
      "法官宣布：想要竞选警长的玩家请举手",
      "竞选者按顺序发表竞选演讲（每人30秒）",
      "非竞选者投票选出警长",
      "得票最高者当选警长，票数相同则PK",
      "警长获得1.5票权重和决定发言顺序的权力",
    ],
  },
  {
    phase: "夜间阶段",
    icon: "🌙",
    steps: [
      "法官宣布：天黑请闭眼",
      "守卫行动：选择守护一名玩家",
      "狼人行动：睁眼确认同伴，商议杀人目标",
      "女巫行动：查看死亡玩家，选择是否救人或毒人",
      "预言家行动：选择查验一名玩家身份",
      "法官宣布：天亮了，请睁眼",
    ],
  },
  {
    phase: "白天阶段",
    icon: "☀️",
    steps: [
      "法官公布昨晚死亡情况",
      "死亡玩家发表遗言（可选）",
      "警长决定发言顺序",
      "存活玩家依次发言（每人限时）",
      "发言结束后进入投票环节",
    ],
  },
  {
    phase: "投票放逐",
    icon: "🗳️",
    steps: [
      "警长宣布开始投票",
      "所有存活玩家同时投票",
      "法官统计票数，宣布结果",
      "得票最高者被放逐（有遗言时间）",
      "票数相同时由警长决定或进行PK",
    ],
  },
];

// 警徽流规则
const badgeRules = [
  {
    title: "警徽流规则",
    content: [
      "警长死亡时必须移交警徽",
      "警长可指定警徽传递给场上任意存活玩家",
      "新警长继承1.5票权重",
    ],
  },
  {
    title: "警徽撕毁",
    content: ["警长可选择撕毁警徽，使其失效", "警徽撕毁后不再有人拥有警长权力", "通常在警长认为无合适继承人时使用"],
  },
];

// 术语
const terminology = [
  { term: "神民狼", meaning: "神职、平民、狼人的简称" },
  { term: "上警", meaning: "竞选警长的行为" },
  { term: "警徽流", meaning: "预言家指定验人顺序和警徽传递" },
  { term: "金水", meaning: "被预言家验为好人的玩家" },
  { term: "银水", meaning: "被女巫救过的玩家" },
  { term: "查杀", meaning: "被预言家验为狼人的玩家" },
  { term: "悍跳", meaning: "狼人假装预言家跳身份" },
  { term: "对跳", meaning: "两个预言家互相对抗" },
  { term: "倒钩", meaning: "狼人假装好人投狼人" },
  { term: "深水", meaning: "隐藏很深不发言的狼人" },
  { term: "归票", meaning: "号召大家投同一个人" },
  { term: "撕警徽", meaning: "警长死亡时不传递警徽" },
];

// 常见错误
const commonMistakes = [
  "不要说「我发誓」，这是场外话",
  "不要亮牌给其他人看",
  "不要在闭眼时偷看",
  "不要盲目跳身份",
  "不要放弃发言时间",
  "不要盲目跟风投票",
];

const QuickStart = () => {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const wolfRoles = roles.filter((r) => r.camp === "wolf");
  const seerRoles = roles.filter((r) => r.camp === "seer");
  const villagerRoles = roles.filter((r) => r.camp === "villager");
  const specialRoles = roles.filter((r) => r.camp === "special");

  const toggleRole = (roleId: string) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const RoleCard = ({ role }: { role: (typeof roles)[0] }) => {
    const isExpanded = expandedRole === role.id;
    
    return (
      <div className={cn("rounded-xl border transition-all duration-300", campStyles[role.camp])}>
        <button
          onClick={() => toggleRole(role.id)}
          className="w-full flex items-center gap-3 p-4"
        >
          <div className="w-10 h-10 rounded-full bg-background/30 flex items-center justify-center text-xl flex-shrink-0">
            {role.icon}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-base font-serif font-semibold text-foreground">{role.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{role.shortDesc}</p>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          )}
        </button>
        
        {isExpanded && (
          <div className="px-4 pb-4 space-y-3 animate-fade-in">
            <p className="text-sm text-foreground/80">{role.description}</p>
            
            <div>
              <h4 className="text-xs font-medium text-primary mb-1">技能</h4>
              <ul className="space-y-1">
                {role.skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                    <span className="text-primary">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-xs text-muted-foreground bg-background/20 rounded-lg p-2">
              <span className="text-primary font-medium">胜利条件：</span>
              {role.winCondition}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <PageLayout title="快速入门">
      <div className="px-4 py-6 space-y-6">
        <Tabs defaultValue="roles" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="roles" className="text-xs">角色一览</TabsTrigger>
            <TabsTrigger value="flow" className="text-xs">游戏流程</TabsTrigger>
            <TabsTrigger value="tips" className="text-xs">新手必知</TabsTrigger>
          </TabsList>

          {/* 角色一览 */}
          <TabsContent value="roles" className="space-y-6">
            {/* 狼人阵营 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <h2 className="text-base font-serif font-semibold text-accent">狼人阵营</h2>
              </div>
              <div className="space-y-2">
                {wolfRoles.map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
            </section>

            {/* 神职阵营 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-seer" />
                <h2 className="text-base font-serif font-semibold text-seer">神职阵营</h2>
              </div>
              <div className="space-y-2">
                {seerRoles.map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
            </section>

            {/* 平民阵营 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-villager" />
                <h2 className="text-base font-serif font-semibold text-villager">平民阵营</h2>
              </div>
              <div className="space-y-2">
                {villagerRoles.map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
            </section>

            {/* 特殊身份 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <h2 className="text-base font-serif font-semibold text-primary">特殊身份</h2>
              </div>
              <div className="space-y-2">
                {specialRoles.map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
            </section>
          </TabsContent>

          {/* 游戏流程 */}
          <TabsContent value="flow" className="space-y-6">
            {/* 流程步骤 */}
            <section className="space-y-3">
              {flowSteps.map((phase, index) => (
                <Card key={phase.phase} className="bg-gradient-card border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-3 text-sm">
                      <span className="text-xl">{phase.icon}</span>
                      <span className="text-primary font-serif">
                        {index + 1}. {phase.phase}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ol className="space-y-1.5">
                      {phase.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2 text-xs">
                          <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </span>
                          <span className="text-foreground/90">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* 警徽流规则 */}
            <section>
              <h2 className="text-base font-serif font-semibold text-primary mb-3 flex items-center gap-2">
                <span>🏅</span>
                警徽流详解
              </h2>
              <div className="space-y-3">
                {badgeRules.map((rule) => (
                  <Card key={rule.title} className="bg-gradient-card border-primary/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs text-primary">{rule.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-1">
                        {rule.content.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs">
                            <span className="text-primary mt-0.5">•</span>
                            <span className="text-foreground/90">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* 夜间顺序提示 */}
            <section className="glass-card p-4 rounded-xl border-glow">
              <h3 className="font-serif font-semibold text-primary mb-3 flex items-center gap-2 text-sm">
                <span>🌙</span>
                夜间行动顺序
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground overflow-x-auto pb-2">
                <span className="bg-secondary px-2 py-1 rounded whitespace-nowrap">守卫</span>
                <span className="text-primary">→</span>
                <span className="bg-accent/20 text-accent px-2 py-1 rounded whitespace-nowrap">狼人</span>
                <span className="text-primary">→</span>
                <span className="bg-secondary px-2 py-1 rounded whitespace-nowrap">女巫</span>
                <span className="text-primary">→</span>
                <span className="bg-secondary px-2 py-1 rounded whitespace-nowrap">预言家</span>
              </div>
            </section>
          </TabsContent>

          {/* 新手必知 */}
          <TabsContent value="tips" className="space-y-6">
            {/* 术语表 */}
            <section>
              <h2 className="text-base font-serif font-semibold text-primary flex items-center gap-2 mb-3">
                <span>📖</span>
                狼人杀术语
              </h2>
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 gap-2">
                    {terminology.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 text-xs border-b border-border/30 pb-2 last:border-0 last:pb-0">
                        <span className="text-primary font-medium min-w-[60px]">{item.term}</span>
                        <span className="text-foreground/80">{item.meaning}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 常见错误 */}
            <section>
              <h2 className="text-base font-serif font-semibold text-accent flex items-center gap-2 mb-3">
                <span>⚠️</span>
                新手避坑
              </h2>
              <Card className="bg-accent/10 border-accent/30">
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs">
                        <span className="text-accent mt-0.5">✗</span>
                        <span className="text-foreground/90">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* 发言框架 */}
            <section className="glass-card p-4 rounded-xl border-glow">
              <h3 className="font-serif font-semibold text-primary mb-3 flex items-center gap-2 text-sm">
                <span>💡</span>
                发言框架参考
              </h3>
              <div className="space-y-2 text-xs text-foreground/90">
                <div>
                  <span className="text-primary font-medium">开场：</span>
                  <span className="text-muted-foreground">表明身份或站边</span>
                </div>
                <div>
                  <span className="text-primary font-medium">分析：</span>
                  <span className="text-muted-foreground">点评其他玩家的发言</span>
                </div>
                <div>
                  <span className="text-primary font-medium">结论：</span>
                  <span className="text-muted-foreground">给出你认为的狼人或好人</span>
                </div>
                <div>
                  <span className="text-primary font-medium">呼吁：</span>
                  <span className="text-muted-foreground">号召大家投票的方向</span>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default QuickStart;
