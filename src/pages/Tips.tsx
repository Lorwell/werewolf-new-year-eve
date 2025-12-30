import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tips = [
  {
    role: "预言家",
    icon: "🔮",
    color: "seer",
    tips: [
      "第一晚优先查验发言积极的玩家",
      "跳预言家时注意验人顺序的逻辑性",
      "警上发言要有力，展示你的视角",
      "如果有悍跳（假预言家），冷静对线",
    ],
  },
  {
    role: "女巫",
    icon: "🧪",
    color: "seer",
    tips: [
      "解药珍贵，不要轻易首夜就用",
      "毒药留给关键时刻毒狼",
      "记住解药用在谁身上，这是信息",
      "被查杀时可以考虑报药",
    ],
  },
  {
    role: "猎人",
    icon: "🏹",
    color: "seer",
    tips: [
      "死亡时不要急着开枪，听完遗言再决定",
      "如果场上信息不明，可以选择不开枪",
      "被毒不能开枪，所以要保护好自己",
      "枪口要有明确理由，不能乱开",
    ],
  },
  {
    role: "守卫",
    icon: "🛡️",
    color: "seer",
    tips: [
      "首夜可以选择空守或守自己",
      "后续要根据场上情况守护关键角色",
      "不能连续两晚守同一人",
      "可以和女巫商量避免撞刀",
    ],
  },
  {
    role: "狼人",
    icon: "🐺",
    color: "wolf",
    tips: [
      "第一晚统一刀口，不要有分歧",
      "白天发言要有逻辑，不要太跳",
      "学会倒钩（假装好人投狼人）",
      "狼队友之间要配合，不要互踩",
    ],
  },
  {
    role: "白狼王",
    icon: "👑",
    color: "wolf",
    tips: [
      "技能只在被投票出局时有效",
      "被毒死或枪杀时无法发动技能",
      "可以考虑主动跳身份骗信任",
      "带人时要带走威胁最大的好人",
    ],
  },
  {
    role: "村民",
    icon: "👨‍🌾",
    color: "villager",
    tips: [
      "认真听每个人的发言，记录关键信息",
      "不要因为没技能就随便发言",
      "你的票很重要，投票要有理由",
      "可以选择跟票或归票给某人",
    ],
  },
];

const commonMistakes = [
  "不要说「我发誓」，这是场外话",
  "不要亮牌给其他人看",
  "不要在闭眼时偷看",
  "不要过度依赖表情判断",
  "不要因为某人声音大就觉得是狼",
  "不要放弃发言时间",
];

const Tips = () => {
  return (
    <PageLayout title="新手技巧">
      <div className="px-4 py-6 space-y-6">
        {/* 各角色技巧 */}
        <section className="space-y-4">
          {tips.map((item) => (
            <Card 
              key={item.role} 
              className={`bg-gradient-card border-${item.color}/30`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-foreground font-serif">{item.role}技巧</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* 常见错误 */}
        <section>
          <h2 className="text-lg font-serif font-semibold text-accent mb-4 flex items-center gap-2">
            <span>⚠️</span>
            新手常见错误
          </h2>
          
          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
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
          <h3 className="font-serif font-semibold text-primary mb-3 flex items-center gap-2">
            <span>💡</span>
            发言框架参考
          </h3>
          <div className="space-y-3 text-sm text-foreground/90">
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
      </div>
    </PageLayout>
  );
};

export default Tips;
