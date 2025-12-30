import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const victoryConditions = [
  {
    camp: "狼人阵营",
    icon: "🐺",
    color: "accent",
    bgClass: "bg-accent/10 border-accent/30",
    conditions: [
      "狼人数量等于或大于好人数量时，狼人获胜",
      "即使只剩1狼1好人，狼人也算获胜",
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
      "包括普通狼人和白狼王",
      "神职和村民都算好人阵营",
    ],
  },
];

const specialCases = [
  {
    title: "同归于尽",
    icon: "💥",
    description: "当最后一只狼被放逐时白狼王发动技能带走最后一个好人，判定为狼人获胜",
  },
  {
    title: "警长计票",
    icon: "🏅",
    description: "警长的1.5票可能影响投票结果，合理利用可以扭转局势",
  },
  {
    title: "守卫与女巫同守",
    icon: "⚔️",
    description: "如果守卫守护的人同时被女巫用解药救，该玩家会因"奶死"而死亡",
  },
  {
    title: "毒死与枪杀",
    icon: "☠️",
    description: "被女巫毒死的猎人不能开枪，被狼刀的猎人可以开枪",
  },
  {
    title: "白狼王技能限制",
    icon: "👑",
    description: "白狼王只有在被投票放逐时才能带人，被毒死、枪杀、自爆时不能发动",
  },
  {
    title: "自爆规则",
    icon: "💣",
    description: "狼人可以选择在白天自爆身份，自爆后直接进入黑夜，不进行投票",
  },
];

const Victory = () => {
  return (
    <PageLayout title="胜利条件">
      <div className="px-4 py-6 space-y-6">
        {/* 胜利条件 */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif font-semibold text-primary flex items-center gap-2">
            <span>🏆</span>
            胜负判定
          </h2>
          
          {victoryConditions.map((camp) => (
            <Card key={camp.camp} className={camp.bgClass}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="text-2xl">{camp.icon}</span>
                  <span className={`font-serif text-${camp.color}`}>{camp.camp}获胜</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {camp.conditions.map((condition, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className={`text-${camp.color} mt-1`}>•</span>
                      <span className="text-foreground/90">{condition}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* 人数对照表 */}
        <section>
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 flex items-center gap-2">
            <span>📊</span>
            人数对照表
          </h2>
          
          <Card className="bg-gradient-card border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="px-4 py-3 text-left text-muted-foreground font-medium">场上人数</th>
                    <th className="px-4 py-3 text-center text-accent font-medium">狼人</th>
                    <th className="px-4 py-3 text-center text-seer font-medium">好人</th>
                    <th className="px-4 py-3 text-right text-muted-foreground font-medium">局势</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  <tr>
                    <td className="px-4 py-2 text-foreground">12人</td>
                    <td className="px-4 py-2 text-center text-accent">5</td>
                    <td className="px-4 py-2 text-center text-seer">7</td>
                    <td className="px-4 py-2 text-right text-villager">好人优势</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-foreground">10人</td>
                    <td className="px-4 py-2 text-center text-accent">4</td>
                    <td className="px-4 py-2 text-center text-seer">6</td>
                    <td className="px-4 py-2 text-right text-villager">好人优势</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-foreground">8人</td>
                    <td className="px-4 py-2 text-center text-accent">3</td>
                    <td className="px-4 py-2 text-center text-seer">5</td>
                    <td className="px-4 py-2 text-right text-primary">均势</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-foreground">6人</td>
                    <td className="px-4 py-2 text-center text-accent">2</td>
                    <td className="px-4 py-2 text-center text-seer">4</td>
                    <td className="px-4 py-2 text-right text-primary">均势</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-foreground">4人</td>
                    <td className="px-4 py-2 text-center text-accent">2</td>
                    <td className="px-4 py-2 text-center text-seer">2</td>
                    <td className="px-4 py-2 text-right text-accent">狼人获胜</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>

        {/* 特殊情况 */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif font-semibold text-primary flex items-center gap-2">
            <span>⚡</span>
            特殊情况说明
          </h2>
          
          <div className="grid gap-3">
            {specialCases.map((item) => (
              <Card key={item.title} className="bg-gradient-card border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Victory;
