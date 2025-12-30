import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const speakingRules = [
  {
    title: "发言时间",
    icon: "⏱️",
    rules: [
      "每人发言限时 60-120 秒（由法官决定）",
      "竞选警长演讲限时 30 秒",
      "遗言时间 30 秒",
      "PK发言时间 30 秒",
      "倒计时结束必须停止发言",
    ],
  },
  {
    title: "发言顺序",
    icon: "🔢",
    rules: [
      "由警长决定从谁开始发言",
      "按顺时针或逆时针顺序进行",
      "死亡玩家不参与讨论（有遗言除外）",
      "发言时其他人不得插嘴",
      "预言家单飞时不上警直接发言",
    ],
  },
  {
    title: "场外话禁令",
    icon: "🚫",
    rules: [
      "不能说「我发誓」、「我对天发誓」等场外话",
      "不能以游戏外的信息作为依据",
      "不能用现实关系影响判断",
      "不能偷看他人的身份牌",
      "不能在闭眼时偷看或说话",
      "不能使用明示暗示身份的语言",
    ],
  },
];

const votingRules = [
  {
    title: "投票规则",
    icon: "🗳️",
    rules: [
      "投票时所有人同时举手指向目标",
      "可以选择弃票（不投任何人）",
      "警长票算作 1.5 票",
      "得票最高者被放逐",
      "平票时由警长决定或进行 PK",
      "票型分析是重要的找狼手段",
    ],
  },
  {
    title: "PK规则",
    icon: "⚔️",
    rules: [
      "平票玩家进行 PK 发言",
      "每人 30 秒 PK 时间",
      "PK 后再次投票",
      "再次平票则均安全（视规则而定）",
      "PK中要有理有据地自证",
    ],
  },
  {
    title: "警徽流",
    icon: "🏅",
    rules: [
      "警长死亡时可指定警徽继承人",
      "警徽流：预先安排验人顺序",
      "通过警徽传递信息给好人阵营",
      "撕警徽：警长可选择不传递警徽",
      "两金水情况下可考虑撕警徽",
    ],
  },
];

const speakingTechniques = [
  {
    title: "发言框架",
    icon: "📝",
    rules: [
      "开场：表明身份立场，亮明态度",
      "分析：点评前面玩家的发言逻辑",
      "结论：给出你认为的狼人或好人",
      "呼吁：号召大家投票的方向",
      "收尾：留下记忆点，强化观点",
    ],
  },
  {
    title: "预言家发言技巧",
    icon: "🔮",
    rules: [
      "真预言家必须坚定表达正确信息",
      "面对悍跳狼时不能退缩",
      "用逻辑论证证明自己的身份",
      "发言时的态度和语气很关键",
      "配合验人结果构建可信度",
    ],
  },
  {
    title: "好人发言技巧",
    icon: "👨‍🌾",
    rules: [
      "发言逻辑清晰，立场明确",
      "通过分析票型和发言识别狼人",
      "配合神职角色，提供关键信息",
      "避免盲目跟风投票",
      "通过提问引导话题",
    ],
  },
  {
    title: "狼人发言技巧",
    icon: "🐺",
    rules: [
      "模仿好人的发言模式",
      "悍跳时要自信有力",
      "学会倒钩增加可信度",
      "狼队之间不要互踩",
      "利用信息差制造混乱",
    ],
  },
];

const psychologyTactics = [
  {
    title: "心理博弈基础",
    icon: "🧠",
    rules: [
      "狼人杀是社交与心理的双重博弈",
      "通过观察微表情和语气变化判断",
      "理解不同角色的心理特点",
      "掌握心理战的运用时机",
      "避免情绪化发言暴露信息",
    ],
  },
  {
    title: "识别狼人技巧",
    icon: "🔍",
    rules: [
      "观察投票行为模式",
      "分析查杀和金水的真实性",
      "注意发言的逻辑漏洞",
      "利用验人结果构建狼队画像",
      "对比前后发言的一致性",
    ],
  },
  {
    title: "应对篡改发言",
    icon: "🛡️",
    rules: [
      "识别发言篡改的常见手法",
      "通过对比分析发现矛盾",
      "建立发言可信度评估体系",
      "避免被虚假信息误导",
      "及时纠正被篡改的信息",
    ],
  },
];

const etiquette = [
  "尊重每位玩家，不人身攻击",
  "死亡后安静旁观，不暗示场上玩家",
  "保持良好的游戏态度",
  "输赢只是游戏，友谊第一",
  "新手多包容，老手多指导",
  "遵守游戏规则，合理使用技能",
  "不要使用场外话影响判断",
  "认真对待每一局游戏",
];

const Rules = () => {
  return (
    <PageLayout title="发言规则">
      <div className="px-4 py-6 space-y-6">
        <Tabs defaultValue="speaking" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="speaking" className="text-xs">发言</TabsTrigger>
            <TabsTrigger value="voting" className="text-xs">投票</TabsTrigger>
            <TabsTrigger value="techniques" className="text-xs">技巧</TabsTrigger>
            <TabsTrigger value="psychology" className="text-xs">心理</TabsTrigger>
          </TabsList>

          {/* 发言规则 */}
          <TabsContent value="speaking" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-primary flex items-center gap-2">
              <span>💬</span>
              发言规范
            </h2>
            
            {speakingRules.map((section) => (
              <Card key={section.title} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-xl">{section.icon}</span>
                    <span className="text-foreground font-serif">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-foreground/90">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 投票规则 */}
          <TabsContent value="voting" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-primary flex items-center gap-2">
              <span>🗳️</span>
              投票规范
            </h2>
            
            {votingRules.map((section) => (
              <Card key={section.title} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-xl">{section.icon}</span>
                    <span className="text-foreground font-serif">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-foreground/90">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 发言技巧 */}
          <TabsContent value="techniques" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-seer flex items-center gap-2">
              <span>💡</span>
              发言技巧
            </h2>
            
            {speakingTechniques.map((section) => (
              <Card key={section.title} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-xl">{section.icon}</span>
                    <span className="text-foreground font-serif">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-seer mt-1">•</span>
                        <span className="text-foreground/90">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* 心理战术 */}
          <TabsContent value="psychology" className="space-y-4">
            <h2 className="text-lg font-serif font-semibold text-accent flex items-center gap-2">
              <span>🧠</span>
              心理战术
            </h2>
            
            {psychologyTactics.map((section) => (
              <Card key={section.title} className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-xl">{section.icon}</span>
                    <span className="text-foreground font-serif">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-foreground/90">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* 游戏礼仪 */}
        <section>
          <h2 className="text-lg font-serif font-semibold text-villager mb-4 flex items-center gap-2">
            <span>🤝</span>
            游戏礼仪
          </h2>
          
          <Card className="bg-villager/10 border-villager/30">
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {etiquette.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-villager mt-0.5">✓</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
};

export default Rules;
