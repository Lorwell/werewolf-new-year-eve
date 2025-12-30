import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      "真预言家必须坚定表达正确信息",
      "通过逻辑论证证明预言家身份",
      "发言时的态度和语气很关键",
      "配合验人结果构建可信度",
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
      "首夜救人要看板子配置决定",
      "毒药是好人阵营的重要资源",
    ],
  },
  {
    role: "猎人",
    icon: "🏹",
    color: "seer",
    tips: [
      "作为强神需要明确自身定位",
      "死亡时不要急着开枪，听完遗言再决定",
      "如果场上信息不明，可以选择不开枪",
      "被毒不能开枪，所以要保护好自己",
      "枪口要有明确理由，不能乱开",
      "配合警长流，发挥1.5票归票权的作用",
      "关键时刻的技能发动时机很重要",
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
      "守卫是保护预言家的关键角色",
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
      "狼人需要模仿好人，干扰信息交流",
      "掌握悍跳、倒钩、深水等不同打法",
      "利用打手势交流制定战术",
      "根据板子配置调整策略",
    ],
  },
  {
    role: "白狼王",
    icon: "👑",
    color: "wolf",
    tips: [
      "被投票出局或自爆时可带走一名玩家",
      "被毒死或枪杀时无法发动技能",
      "可以考虑主动跳身份骗信任",
      "带人时要带走威胁最大的好人",
      "自爆可以打断好人节奏",
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
      "平民跳预言家容易造成混乱",
      "平民应通过逻辑分析帮助好人阵营",
      "学会分析票型和发言识别狼人",
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
  "不要盲目跳身份",
  "不要发言逻辑混乱",
  "不要缺乏耐心急于表现",
  "不要因为站错边就放弃分析",
  "不要做暴民或愚民",
  "不要盲目跟风投票",
];

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
  { term: "踩", meaning: "发言时质疑某个玩家" },
  { term: "捞", meaning: "发言时帮助某个玩家" },
  { term: "归票", meaning: "号召大家投同一个人" },
  { term: "跟票", meaning: "跟随别人的投票" },
  { term: "撕警徽", meaning: "警长死亡时不传递警徽" },
  { term: "单飞", meaning: "预言家不上警直接发言" },
  { term: "双查杀", meaning: "同时被两个预言家查杀" },
  { term: "民及民以上", meaning: "表示自己至少是好人" },
  { term: "强神别惹我", meaning: "暗示自己是有技能的神职" },
];

const learningPath = [
  {
    level: "初级阶段",
    icon: "🌱",
    color: "villager",
    items: [
      "熟悉基本规则和角色技能",
      "学习基本的逻辑推理方法",
      "掌握简单的发言技巧",
      "理解游戏流程",
      "学会听取他人发言",
    ],
  },
  {
    level: "中级阶段",
    icon: "🌿",
    color: "seer",
    items: [
      "深入学习各角色的进阶玩法",
      "掌握心理战术的基本运用",
      "学会分析复杂局面",
      "培养团队配合意识",
      "开始理解票型分析",
    ],
  },
  {
    level: "高级阶段",
    icon: "🌳",
    color: "primary",
    items: [
      "精通多种战术策略",
      "具备强大的心理博弈能力",
      "能够阅读复杂场况",
      "掌握节奏控制能力",
      "成为可信赖的队友",
    ],
  },
];

const improvementTips = [
  { tip: "多练习", desc: "经常游戏实践，积累经验" },
  { tip: "多观察", desc: "观察高手的玩法和发言" },
  { tip: "多思考", desc: "每局结束后总结反思" },
  { tip: "多学习", desc: "阅读攻略，学习理论" },
  { tip: "多交流", desc: "与其他玩家讨论心得" },
];

const Tips = () => {
  return (
    <PageLayout title="新手技巧">
      <div className="px-4 py-6 space-y-6">
        <Tabs defaultValue="roles" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="roles" className="text-xs">角色</TabsTrigger>
            <TabsTrigger value="terms" className="text-xs">术语</TabsTrigger>
            <TabsTrigger value="mistakes" className="text-xs">避坑</TabsTrigger>
            <TabsTrigger value="path" className="text-xs">进阶</TabsTrigger>
          </TabsList>

          {/* 各角色技巧 */}
          <TabsContent value="roles" className="space-y-4">
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
          </TabsContent>

          {/* 术语解释 */}
          <TabsContent value="terms" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-primary flex items-center gap-2">
              <span>📖</span>
              狼人杀术语大全
            </h2>
            
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {terminology.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm border-b border-border/30 pb-2 last:border-0 last:pb-0">
                      <span className="text-primary font-medium min-w-[80px]">{item.term}</span>
                      <span className="text-foreground/80">{item.meaning}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 常见错误 */}
          <TabsContent value="mistakes" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-accent flex items-center gap-2">
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

            {/* 发言框架 */}
            <div className="glass-card p-4 rounded-xl border-glow">
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
            </div>
          </TabsContent>

          {/* 进阶路径 */}
          <TabsContent value="path" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-primary flex items-center gap-2">
              <span>📈</span>
              学习路径
            </h2>
            
            {learningPath.map((stage) => (
              <Card key={stage.level} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-xl">{stage.icon}</span>
                    <span className={`text-${stage.color} font-serif`}>{stage.level}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stage.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className={`text-${stage.color} mt-1`}>•</span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* 提升技巧 */}
            <div className="glass-card p-4 rounded-xl border-glow">
              <h3 className="font-serif font-semibold text-seer mb-3 flex items-center gap-2">
                <span>🚀</span>
                提升技巧
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {improvementTips.map((item, index) => (
                  <div key={index} className="bg-background/50 rounded-lg p-3">
                    <div className="text-seer font-medium text-sm">{item.tip}</div>
                    <div className="text-muted-foreground text-xs mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Tips;
