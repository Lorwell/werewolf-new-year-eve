import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const wolfStrategies = [
  {
    title: "悍跳技巧",
    icon: "🎭",
    content: [
      "悍跳是狼人重要战术手段",
      "模拟预言家发言模式，要自信有力",
      "在警上制造混乱和怀疑",
      "配合狼队进行战术协同",
      "准备好验人报告的逻辑",
      "学会应对真预言家的质问",
    ],
  },
  {
    title: "倒钩技巧",
    icon: "🪝",
    content: [
      "倒钩是假装好人投狼人的战术",
      "可以增加自己的可信度",
      "牺牲狼队友换取信任",
      "在关键时刻使用效果更好",
      "配合其他狼人制造混乱",
    ],
  },
  {
    title: "深水策略",
    icon: "🌊",
    content: [
      "深水狼是隐藏很深的狼人",
      "发言少但质量高",
      "避免过早暴露身份",
      "在关键时刻发力",
      "通过投票行为配合狼队",
    ],
  },
  {
    title: "狼队配合",
    icon: "🐺",
    content: [
      "夜间统一刀口，不要有分歧",
      "利用打手势交流制定战术",
      "根据板子配置调整策略",
      "狼队之间不要互踩",
      "合理分配角色：悍跳狼、深水狼、打手狼",
    ],
  },
];

const godStrategies = [
  {
    title: "预言家策略",
    icon: "🔮",
    content: [
      "真预言家必须坚定表达正确信息",
      "面对悍跳狼时不能退缩",
      "用逻辑论证证明自己的身份",
      "合理运用警徽流验人策略",
      "发言时的态度和语气很关键",
      "区分真预言家与悍跳狼",
    ],
  },
  {
    title: "女巫策略",
    icon: "🧪",
    content: [
      "解药和毒药都是珍贵资源",
      "首夜救人要看板子配置决定",
      "毒药留给确定的狼人",
      "记住解药用在谁身上",
      "被查杀时可以考虑报药",
      "关键时刻用毒药逆转局势",
    ],
  },
  {
    title: "猎人策略",
    icon: "🏹",
    content: [
      "作为强神需要高调亮相",
      "掌握关键时刻的技能发动时机",
      "通过发言逻辑和推理识别狼人",
      "配合警长流，发挥1.5票归票权",
      "被毒不能开枪，保护好自己",
      "枪口要有明确理由",
    ],
  },
  {
    title: "守卫策略",
    icon: "🛡️",
    content: [
      "首夜可以空守或守自己",
      "根据场上情况守护关键角色",
      "不能连续两晚守同一人",
      "可以和女巫商量避免撞刀",
      "保护预言家是首要任务",
    ],
  },
];

const psychologyTactics = [
  {
    title: "识别狼人",
    strategies: [
      "通过发言逻辑识别狼人",
      "观察投票行为模式",
      "分析查杀和金水的真实性",
      "利用验人结果构建狼队画像",
      "对比前后发言的一致性",
      "注意发言的细节和漏洞",
    ],
  },
  {
    title: "心理博弈",
    strategies: [
      "狼人杀是社交与心理的双重博弈",
      "通过观察微表情和语气变化判断",
      "理解不同角色的心理特点",
      "掌握心理战的运用时机",
      "通过语气和态度传达信息",
      "避免情绪化发言暴露信息",
    ],
  },
  {
    title: "应对策略",
    strategies: [
      "识别发言篡改的常见手法",
      "通过对比分析发现矛盾",
      "建立发言可信度评估体系",
      "避免被虚假信息误导",
      "双查杀情况下如何自证清白",
      "及时纠正被篡改的信息",
    ],
  },
];

const specialSituations = [
  {
    title: "警徽流详解",
    icon: "🏅",
    content: "警徽流是预言家通过指定验人顺序和警徽传递来传递信息的战术。警长死亡时可以通过警徽传递告诉好人阵营重要信息。如果验出两个金水，可以考虑撕警徽避免被狼人利用。",
  },
  {
    title: "双查杀应对",
    icon: "⚡",
    content: "当你被两个预言家同时查杀时，需要冷静分析。通过发言自证清白，配合验人结果进行辩解，展示自己的逻辑和立场，避免被误认为是狼人。",
  },
  {
    title: "预言家单飞",
    icon: "🦅",
    content: "预言家单飞是指不上警直接发言。这种情况下投票策略需要调整，需要通过其他方式建立信任。单飞有时可以避免被狼人集火。",
  },
  {
    title: "平票处理",
    icon: "⚖️",
    content: "平票时由警长决定谁出局或进入PK。PK发言每人30秒，要有理有据地自证。再次平票则均安全（视规则而定）。",
  },
];

const proTips = [
  {
    title: "虚张声势",
    desc: "在适当时机展示自信，让对手产生怀疑",
  },
  {
    title: "反复推理",
    desc: "通过多次逻辑验证，找出矛盾点",
  },
  {
    title: "逆转局势",
    desc: "在不利情况下找到突破口",
  },
  {
    title: "模拟对手",
    desc: "站在对手角度思考他们的策略",
  },
  {
    title: "情感战术",
    desc: "利用情感和语气传达信息",
  },
  {
    title: "节奏控制",
    desc: "掌控场上节奏，引导讨论方向",
  },
];

const gameLogic = [
  {
    question: "狼人杀存在逻辑吗？",
    answer: "狼人杀游戏确实存在逻辑基础。好人阵营通过信息交换和推理获胜，狼人需要模仿好人，干扰信息交流。逻辑分析比纯直觉判断更可靠，但也需要结合心理战术。",
  },
  {
    question: "为什么有查杀走查杀？",
    answer: "查杀走查杀是游戏机制的一部分。当预言家验出狼人时，好人阵营应该相信验人结果，投票放逐被查杀的玩家。这种机制的合理性在于信任预言家的验人能力。",
  },
  {
    question: "如何成为明牌好人？",
    answer: "发言逻辑清晰，立场明确。通过分析票型和发言识别狼人，配合神职角色提供关键信息，避免盲目跟风投票。让其他玩家能够信任你的判断。",
  },
  {
    question: "玩狼人经常站错边怎么办？",
    answer: "分析站错边的原因，学会识别场上局势。调整心态，理性分析，不要因为一次失误就放弃。通过积累经验不断提升判断力。",
  },
];

const Advanced = () => {
  return (
    <PageLayout title="进阶攻略">
      <div className="px-4 py-6 space-y-6">
        <Tabs defaultValue="wolf" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="wolf" className="text-xs">狼人</TabsTrigger>
            <TabsTrigger value="god" className="text-xs">神职</TabsTrigger>
            <TabsTrigger value="psychology" className="text-xs">心理</TabsTrigger>
            <TabsTrigger value="special" className="text-xs">特殊</TabsTrigger>
          </TabsList>

          {/* 狼人策略 */}
          <TabsContent value="wolf" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-accent flex items-center gap-2">
              <span>🐺</span>
              狼人阵营策略
            </h2>
            
            {wolfStrategies.map((strategy) => (
              <Card key={strategy.title} className="bg-accent/10 border-accent/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-xl">{strategy.icon}</span>
                    <span className="text-accent font-serif">{strategy.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 神职策略 */}
          <TabsContent value="god" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-seer flex items-center gap-2">
              <span>✨</span>
              神职阵营策略
            </h2>
            
            {godStrategies.map((strategy) => (
              <Card key={strategy.title} className="bg-seer/10 border-seer/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-xl">{strategy.icon}</span>
                    <span className="text-seer font-serif">{strategy.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-seer mt-1">•</span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 心理战术 */}
          <TabsContent value="psychology" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-primary flex items-center gap-2">
              <span>🧠</span>
              心理战术
            </h2>
            
            {psychologyTactics.map((tactic) => (
              <Card key={tactic.title} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-primary font-serif text-base">
                    {tactic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tactic.strategies.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* 高手技巧 */}
            <div className="glass-card p-4 rounded-xl border-glow">
              <h3 className="font-serif font-semibold text-primary mb-3 flex items-center gap-2">
                <span>🎯</span>
                老玩家技巧
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {proTips.map((tip, index) => (
                  <div key={index} className="bg-background/50 rounded-lg p-3">
                    <div className="text-primary font-medium text-sm">{tip.title}</div>
                    <div className="text-muted-foreground text-xs mt-1">{tip.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 特殊情况 */}
          <TabsContent value="special" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-villager flex items-center gap-2">
              <span>📋</span>
              特殊情况处理
            </h2>
            
            {specialSituations.map((situation) => (
              <Card key={situation.title} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-xl">{situation.icon}</span>
                    <span className="text-foreground font-serif">{situation.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/90">{situation.content}</p>
                </CardContent>
              </Card>
            ))}

            {/* 常见问题 */}
            <h2 className="text-lg font-serif font-semibold text-primary flex items-center gap-2 mt-6">
              <span>❓</span>
              游戏逻辑问答
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              {gameLogic.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-sm text-foreground hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-foreground/80">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Advanced;
