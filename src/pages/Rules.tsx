import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const speakingRules = [
  {
    title: "发言时间",
    icon: "⏱️",
    rules: [
      "每人发言限时 60-120 秒（由法官决定）",
      "竞选警长演讲限时 30 秒",
      "遗言时间 30 秒",
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
    ],
  },
  {
    title: "场外话禁令",
    icon: "🚫",
    rules: [
      "不能说"我发誓"、"我对天发誓"等场外话",
      "不能以游戏外的信息作为依据",
      "不能用现实关系影响判断",
      "不能偷看他人的身份牌",
      "不能在闭眼时偷看或说话",
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
    ],
  },
];

const etiquette = [
  "尊重每位玩家，不人身攻击",
  "死亡后安静旁观，不暗示场上玩家",
  "保持良好的游戏态度",
  "输赢只是游戏，友谊第一",
  "新手多包容，老手多指导",
];

const Rules = () => {
  return (
    <PageLayout title="发言规则">
      <div className="px-4 py-6 space-y-6">
        {/* 发言规则 */}
        <section className="space-y-4">
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
        </section>

        {/* 投票规则 */}
        <section className="space-y-4">
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
        </section>

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
