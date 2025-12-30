import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const flowSteps = [
  {
    phase: "准备阶段",
    icon: "🎴",
    steps: [
      "法官洗牌并发放身份牌",
      "玩家确认自己的身份，不得展示给他人",
      "法官宣布游戏开始",
    ],
  },
  {
    phase: "警长竞选",
    icon: "👮",
    steps: [
      "法官宣布：想要竞选警长的玩家请举手",
      "竞选者按顺序发表竞选演讲（每人30秒）",
      "竞选者可以选择退水（放弃竞选）",
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
      "警长决定发言顺序（从某人开始，顺时针或逆时针）",
      "存活玩家依次发言（每人限时）",
      "发言结束后进入投票环节",
    ],
  },
  {
    phase: "投票放逐",
    icon: "🗳️",
    steps: [
      "警长宣布开始投票",
      "所有存活玩家同时投票（指向目标玩家）",
      "法官统计票数，宣布结果",
      "得票最高者被放逐（有遗言时间）",
      "票数相同时由警长决定或进行PK",
      "被放逐玩家离场，游戏进入下一夜",
    ],
  },
];

const badgeRules = [
  {
    title: "警徽流规则",
    content: [
      "警长死亡时必须移交警徽",
      "警长可指定警徽传递给场上任意存活玩家",
      "若警长被刀，在死亡前指定继承人",
      "若警长被投票放逐，在遗言中指定继承人",
      "新警长继承1.5票权重",
    ],
  },
  {
    title: "警徽撕毁",
    content: [
      "警长可选择撕毁警徽，使其失效",
      "警徽撕毁后不再有人拥有警长权力",
      "通常在警长认为无合适继承人时使用",
    ],
  },
];

const Flow = () => {
  return (
    <PageLayout title="游戏流程">
      <div className="px-4 py-6 space-y-6">
        {/* 流程步骤 */}
        <section className="space-y-4">
          {flowSteps.map((phase, index) => (
            <Card key={phase.phase} className="bg-gradient-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-base">
                  <span className="text-2xl">{phase.icon}</span>
                  <span className="text-primary font-serif">
                    {index + 1}. {phase.phase}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {phase.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
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
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 flex items-center gap-2">
            <span>🏅</span>
            警徽流详解
          </h2>
          
          <div className="space-y-4">
            {badgeRules.map((rule) => (
              <Card key={rule.title} className="bg-gradient-card border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-primary">
                    {rule.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {rule.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
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
          <h3 className="font-serif font-semibold text-primary mb-3 flex items-center gap-2">
            <span>🌙</span>
            夜间行动顺序
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto pb-2">
            <span className="bg-secondary px-2 py-1 rounded whitespace-nowrap">守卫</span>
            <span className="text-primary">→</span>
            <span className="bg-accent/20 text-accent px-2 py-1 rounded whitespace-nowrap">狼人</span>
            <span className="text-primary">→</span>
            <span className="bg-secondary px-2 py-1 rounded whitespace-nowrap">女巫</span>
            <span className="text-primary">→</span>
            <span className="bg-secondary px-2 py-1 rounded whitespace-nowrap">预言家</span>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Flow;
