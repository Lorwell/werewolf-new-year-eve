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

// 夜晚行动步骤
const nightActions = [
  { role: "守卫", action: "选择守护一名玩家", note: "首夜建议空守，避免与女巫解药冲突" },
  { role: "狼人", action: "睁眼确认同伴，统一意见刀杀一人", note: "" },
  { role: "女巫", action: "获知被刀玩家，可选择使用解药（救）或毒药（毒）", note: "两者每局各仅一次" },
  { role: "预言家", action: "查验一名玩家身份（好人/狼人）", note: "" },
  { role: "猎人", action: "仅在首夜睁眼确认身份", note: "之后夜晚全程闭眼" },
];

// 第一天白天子流程
const dayOneSubsections = [
  {
    title: "公布死讯",
    icon: "📢",
    steps: [
      "法官宣布昨晚死亡情况",
      "若无人死亡 → 平安夜",
      "若有人死亡 → 公布死者编号",
      "首夜死亡者可发表遗言（后续夜晚死亡者无遗言）",
    ],
  },
  {
    title: "上警环节",
    icon: "👮",
    steps: [
      "想竞选警长的玩家举手【上警】",
      "上警玩家依次发言（通常30–60秒）",
      "阐述身份、逻辑或查验信息",
      "所有存活玩家投票选出警长",
      "得票最多者当选警长，获得警徽（拥有归票权，投票计为1.5票）",
      "若平票，则进行PK发言后再次投票",
      "若仍平票，则本局无警长",
    ],
  },
  {
    title: "自由发言与投票",
    icon: "🗣️",
    steps: [
      "警长决定发言顺序（通常从死者下家或警长下家开始）",
      "所有玩家依次发言分析局势",
      "发言结束后进行投票",
      "得票最高者出局并发表遗言（无论是否首夜）",
    ],
  },
];

// 白狼王自爆规则
const whiteWolfExplode = {
  title: "白狼王自爆",
  icon: "💥",
  note: "白狼王可在白天任意时刻选择自爆",
  effect: "亮明身份，指定带走一名玩家，立即终止当前白天流程，直接进入黑夜",
};

// 流程步骤
const flowSteps = [
  {
    phase: "第一夜（首夜）",
    icon: "🌙",
    intro: "所有玩家闭眼，法官依次唤醒以下角色使用技能：",
  },
  {
    phase: "第一天白天",
    icon: "☀️",
    intro: "天亮了，请睁眼！",
  },
  {
    phase: "后续日夜循环",
    icon: "🔄",
    steps: [
      "重复【夜晚行动 → 白天讨论 → 投票放逐】流程",
      "直至达成任一阵营的胜利条件",
    ],
  },
];

// 警徽流规则
const badgeRules = [
  {
    title: "警徽流规则",
    content: [
      "警长死亡时可以移交警徽",
      "警长可指定警徽传递给场上任意存活玩家",
      "新警长继承1.5票权重",
    ],
  },
  {
    title: "警徽撕毁",
    content: ["警长可选择撕毁警徽，使其失效", "警徽撕毁后不再有人拥有警长权力", "通常在警长认为无合适继承人时使用"],
  },
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
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="roles" className="text-xs">角色一览</TabsTrigger>
            <TabsTrigger value="flow" className="text-xs">游戏流程</TabsTrigger>
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
          <TabsContent value="flow" className="space-y-4">
            {/* 第一夜 */}
            <section>
              <Card className="bg-gradient-card border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-3 text-sm">
                    <span className="text-xl">🌙</span>
                    <span className="text-primary font-serif">第一夜（首夜）</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <p className="text-xs text-muted-foreground">所有玩家闭眼，法官依次唤醒以下角色使用技能：</p>
                  <ol className="space-y-2">
                    {nightActions.map((action, index) => (
                      <li key={index} className="bg-background/30 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground">{action.role}</p>
                            <p className="text-xs text-foreground/80 mt-0.5">{action.action}</p>
                            {action.note && (
                              <p className="text-xs text-muted-foreground mt-1 italic">💡 {action.note}</p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </section>

            {/* 第一天白天 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">☀️</span>
                <h2 className="text-base font-serif font-semibold text-primary">第一天白天</h2>
              </div>
              {dayOneSubsections.map((subsection, index) => (
                <Card key={subsection.title} className="bg-gradient-card border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-xs text-seer">
                      <span>{subsection.icon}</span>
                      <span>（{index + 1}）{subsection.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ol className="space-y-1.5">
                      {subsection.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2 text-xs">
                          <span className="w-4 h-4 rounded-full bg-seer/20 text-seer text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </span>
                          <span className="text-foreground/90">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}

              {/* 白狼王自爆 */}
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/50 border-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xs text-accent">
                    <span>{whiteWolfExplode.icon}</span>
                    <span>⚠️ {whiteWolfExplode.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <p className="text-xs text-foreground/90">{whiteWolfExplode.note}</p>
                  <p className="text-xs text-accent font-medium">{whiteWolfExplode.effect}</p>
                </CardContent>
              </Card>
            </section>

            {/* 后续日夜循环 */}
            <section>
              <Card className="bg-gradient-card border-villager/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-3 text-sm">
                    <span className="text-xl">🔄</span>
                    <span className="text-villager font-serif">后续日夜循环</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-xs">
                      <span className="text-villager mt-0.5">•</span>
                      <span className="text-foreground/90">重复【夜晚行动 → 白天讨论 → 投票放逐】流程</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs">
                      <span className="text-villager mt-0.5">•</span>
                      <span className="text-foreground/90">直至达成任一阵营的胜利条件</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
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
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default QuickStart;
