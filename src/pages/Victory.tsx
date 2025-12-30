import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const boardConfig = {
  total: 12,
  wolves: { total: 4, normal: 3, king: 1 },
  good: { total: 8, gods: 4, villagers: 4 },
};

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

        {/* 板子配置 */}
        <section>
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 flex items-center gap-2">
            <span>📊</span>
            本局板子配置
          </h2>
          
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                  <div className="text-accent font-serif font-semibold mb-2 flex items-center gap-2">
                    <span>🐺</span>
                    狼人阵营
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">普通狼人</span>
                      <span className="text-accent font-medium">{boardConfig.wolves.normal}只</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">白狼王</span>
                      <span className="text-accent font-medium">{boardConfig.wolves.king}只</span>
                    </div>
                    <div className="flex justify-between border-t border-accent/20 pt-1 mt-2">
                      <span className="text-foreground font-medium">合计</span>
                      <span className="text-accent font-bold">{boardConfig.wolves.total}只</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-seer/10 rounded-lg p-4 border border-seer/30">
                  <div className="text-seer font-serif font-semibold mb-2 flex items-center gap-2">
                    <span>✨</span>
                    好人阵营
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">神职</span>
                      <span className="text-seer font-medium">{boardConfig.good.gods}人</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">平民</span>
                      <span className="text-villager font-medium">{boardConfig.good.villagers}人</span>
                    </div>
                    <div className="flex justify-between border-t border-seer/20 pt-1 mt-2">
                      <span className="text-foreground font-medium">合计</span>
                      <span className="text-seer font-bold">{boardConfig.good.total}人</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                总人数：<span className="text-primary font-semibold">{boardConfig.total}人</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 人数对照表 */}
        <section>
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 flex items-center gap-2">
            <span>📈</span>
            局势变化参考
          </h2>
          
          <Card className="bg-gradient-card border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="px-4 py-3 text-left text-muted-foreground font-medium">存活</th>
                    <th className="px-4 py-3 text-center text-accent font-medium">狼人</th>
                    <th className="px-4 py-3 text-center text-seer font-medium">神职</th>
                    <th className="px-4 py-3 text-center text-villager font-medium">平民</th>
                    <th className="px-4 py-3 text-right text-muted-foreground font-medium">局势</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  <tr>
                    <td className="px-4 py-2 text-foreground">开局</td>
                    <td className="px-4 py-2 text-center text-accent">4</td>
                    <td className="px-4 py-2 text-center text-seer">4</td>
                    <td className="px-4 py-2 text-center text-villager">4</td>
                    <td className="px-4 py-2 text-right text-villager">好人优势</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-foreground">中期</td>
                    <td className="px-4 py-2 text-center text-accent">3</td>
                    <td className="px-4 py-2 text-center text-seer">2</td>
                    <td className="px-4 py-2 text-center text-villager">3</td>
                    <td className="px-4 py-2 text-right text-primary">均势</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-foreground">紧张</td>
                    <td className="px-4 py-2 text-center text-accent">2</td>
                    <td className="px-4 py-2 text-center text-seer">1</td>
                    <td className="px-4 py-2 text-center text-villager">2</td>
                    <td className="px-4 py-2 text-right text-accent">狼人优势</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-foreground">屠边</td>
                    <td className="px-4 py-2 text-center text-accent">2</td>
                    <td className="px-4 py-2 text-center text-seer">0</td>
                    <td className="px-4 py-2 text-center text-villager">2</td>
                    <td className="px-4 py-2 text-right text-accent font-bold">狼人获胜</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            * 屠边局：杀光所有神职或所有平民即狼人获胜
          </p>
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
