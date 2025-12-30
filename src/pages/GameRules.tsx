import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// 发言规则
const speakingRules = [
  {
    title: "发言时间",
    icon: "⏱️",
    rules: [
      "每人发言限时 60-120 秒",
      "竞选警长演讲限时 30 秒",
      "遗言时间 30 秒",
      "PK发言时间 30 秒",
    ],
  },
  {
    title: "发言顺序",
    icon: "🔢",
    rules: [
      "由警长决定从谁开始发言",
      "按顺时针或逆时针顺序进行",
      "死亡玩家不参与讨论",
      "发言时其他人不得插嘴",
    ],
  },
  {
    title: "场外话禁令",
    icon: "🚫",
    rules: [
      "不能说「我发誓」等场外话",
      "不能以游戏外信息作为依据",
      "不能偷看他人的身份牌",
      "不能在闭眼时偷看或说话",
    ],
  },
];

// 投票规则
const votingRules = [
  {
    title: "投票规则",
    icon: "🗳️",
    rules: [
      "可以选择弃票",
      "警长票算作 1.5 票",
      "得票最高者被放逐",
      "票型分析是重要的找狼手段",
    ],
  },
  {
    title: "PK规则",
    icon: "⚔️",
    rules: [
      "平票玩家进行 PK 发言",
      "每人 30 秒 PK 时间",
      "最多进行一轮 PK",
      "再次平票则直接进入黑夜",
    ],
  },
  {
    title: "警徽流",
    icon: "🏅",
    rules: [
      "警长死亡时可指定警徽继承人",
      "通过警徽传递信息给好人阵营",
      "撕警徽：警长可选择不传递警徽",
    ],
  },
];

// 胜利条件
const victoryConditions = [
  {
    camp: "狼人阵营",
    icon: "🐺",
    color: "accent",
    bgClass: "bg-accent/10 border-accent/30",
    conditions: [
      "屠边局：杀光所有神职 或 杀光所有平民",
      "屠城局：狼人数量 ≥ 好人数量",
      "白狼王的带人技能可以加速胜利",
    ],
  },
  {
    camp: "好人阵营",
    icon: "✨",
    color: "seer",
    bgClass: "bg-seer/10 border-seer/30",
    conditions: [
      "所有狼人全部出局时，好人获胜",
      "包括3只普通狼人和1只白狼王",
      "神职和村民都算好人阵营",
    ],
  },
];

// 板子配置
const boardConfig = {
  total: 12,
  wolves: { total: 4, normal: 3, king: 1 },
  good: { total: 8, gods: 4, villagers: 4 },
};

// 特殊情况
const specialCases = [
  {
    title: "同归于尽",
    icon: "💥",
    description: "当最后一只狼被放逐时白狼王发动技能带走最后一个好人，判定为狼人获胜",
  },
  {
    title: "守卫与女巫同守",
    icon: "⚔️",
    description: "如果守卫守护的人同时被女巫用解药救，该玩家会因「奶死」而死亡",
  },
  {
    title: "毒死与枪杀",
    icon: "☠️",
    description: "被女巫毒死的猎人不能开枪，被狼刀的猎人可以开枪",
  },
  {
    title: "白狼王技能",
    icon: "👑",
    description: "白狼王被投票放逐或自爆时可带走一名玩家，被毒死、枪杀时不能发动",
  },
  {
    title: "自爆规则",
    icon: "💣",
    description: "狼人可以选择在白天自爆身份，自爆后直接进入黑夜，不进行投票",
  },
];

// 游戏逻辑问答
const gameLogic = [
  {
    question: "狼人杀存在逻辑吗？",
    answer: "狼人杀游戏确实存在逻辑基础。好人阵营通过信息交换和推理获胜，狼人需要模仿好人，干扰信息交流。逻辑分析比纯直觉判断更可靠。",
  },
  {
    question: "为什么有查杀走查杀？",
    answer: "当预言家验出狼人时，好人阵营应该相信验人结果，投票放逐被查杀的玩家。这种机制的合理性在于信任预言家的验人能力。",
  },
  {
    question: "如何成为明牌好人？",
    answer: "发言逻辑清晰，立场明确。通过分析票型和发言识别狼人，配合神职角色提供关键信息，避免盲目跟风投票。",
  },
  {
    question: "玩狼人经常站错边怎么办？",
    answer: "分析站错边的原因，学会识别场上局势。调整心态，理性分析，通过积累经验不断提升判断力。",
  },
];

// 游戏礼仪
const etiquette = [
  "尊重每位玩家，不人身攻击",
  "死亡后安静旁观，不暗示场上玩家",
  "保持良好的游戏态度",
  "输赢只是游戏，友谊第一",
];

const GameRules = () => {
  return (
    <PageLayout title="游戏规则">
      <div className="px-4 py-6 space-y-6">
        <Tabs defaultValue="speaking" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="speaking" className="text-xs">发言</TabsTrigger>
            <TabsTrigger value="voting" className="text-xs">投票</TabsTrigger>
            <TabsTrigger value="victory" className="text-xs">胜负</TabsTrigger>
            <TabsTrigger value="special" className="text-xs">特殊</TabsTrigger>
          </TabsList>

          {/* 发言规则 */}
          <TabsContent value="speaking" className="space-y-4">
            <h2 className="text-base font-serif font-semibold text-primary flex items-center gap-2">
              <span>💬</span>
              发言规范
            </h2>
            
            {speakingRules.map((section) => (
              <Card key={section.title} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{section.icon}</span>
                    <span className="text-foreground font-serif">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1.5">
                    {section.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-foreground/90">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* 游戏礼仪 */}
            <Card className="bg-villager/10 border-villager/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <span className="text-lg">🤝</span>
                  <span className="text-villager font-serif">游戏礼仪</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-1.5">
                  {etiquette.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs">
                      <span className="text-villager mt-0.5">✓</span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 投票规则 */}
          <TabsContent value="voting" className="space-y-4">
            <h2 className="text-base font-serif font-semibold text-primary flex items-center gap-2">
              <span>🗳️</span>
              投票规范
            </h2>
            
            {votingRules.map((section) => (
              <Card key={section.title} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{section.icon}</span>
                    <span className="text-foreground font-serif">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1.5">
                    {section.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-foreground/90">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 胜负判定 */}
          <TabsContent value="victory" className="space-y-4">
            <h2 className="text-base font-serif font-semibold text-primary flex items-center gap-2">
              <span>🏆</span>
              胜负判定
            </h2>
            
            {victoryConditions.map((camp) => (
              <Card key={camp.camp} className={camp.bgClass}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <span className="text-xl">{camp.icon}</span>
                    <span className={`font-serif text-${camp.color}`}>{camp.camp}获胜</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1.5">
                    {camp.conditions.map((condition, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs">
                        <span className={`text-${camp.color} mt-0.5`}>•</span>
                        <span className="text-foreground/90">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* 板子配置 */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <span className="text-lg">📊</span>
                  <span className="text-primary font-serif">本局板子配置</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-accent/10 rounded-lg p-3 border border-accent/30">
                    <div className="text-accent font-serif font-semibold mb-1 flex items-center gap-1 text-xs">
                      <span>🐺</span>
                      狼人阵营
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">普通狼人</span>
                        <span className="text-accent font-medium">{boardConfig.wolves.normal}只</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">白狼王</span>
                        <span className="text-accent font-medium">{boardConfig.wolves.king}只</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-seer/10 rounded-lg p-3 border border-seer/30">
                    <div className="text-seer font-serif font-semibold mb-1 flex items-center gap-1 text-xs">
                      <span>✨</span>
                      好人阵营
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">神职</span>
                        <span className="text-seer font-medium">{boardConfig.good.gods}人</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">平民</span>
                        <span className="text-villager font-medium">{boardConfig.good.villagers}人</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 text-center text-xs text-muted-foreground">
                  总人数：<span className="text-primary font-semibold">{boardConfig.total}人</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 特殊情况 */}
          <TabsContent value="special" className="space-y-4">
            <h2 className="text-base font-serif font-semibold text-primary flex items-center gap-2">
              <span>⚡</span>
              特殊情况
            </h2>
            
            <div className="space-y-2">
              {specialCases.map((item) => (
                <Card key={item.title} className="bg-gradient-card border-border/50">
                  <CardContent className="py-3 px-4">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <h4 className="font-medium text-foreground mb-0.5 text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 常见问题 */}
            <h2 className="text-base font-serif font-semibold text-primary flex items-center gap-2 mt-6">
              <span>❓</span>
              常见问题
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              {gameLogic.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-xs text-foreground hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-foreground/80">
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

export default GameRules;
