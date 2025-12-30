import PageLayout from "@/components/layout/PageLayout";
import RoleCard from "@/components/roles/RoleCard";

const Roles = () => {
  return (
    <PageLayout title="角色介绍">
      <div className="px-4 py-6 space-y-6">
        {/* 狼人阵营 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <h2 className="text-lg font-serif font-semibold text-accent">狼人阵营</h2>
            <span className="text-xs text-muted-foreground ml-auto">共5只</span>
          </div>
          
          <div className="space-y-3">
            <RoleCard
              name="普通狼人"
              camp="wolf"
              icon="🐺"
              count={4}
              skills={[
                "每晚可以与同伴一起选择杀死一名玩家",
                "白天隐藏身份，引导投票",
              ]}
              notes={[
                "需要与队友配合，统一刀口",
                "尽量不要第一晚就暴露同伴",
              ]}
            />
            
            <RoleCard
              name="白狼王"
              camp="wolf"
              icon="👑"
              count={1}
              skills={[
                "拥有普通狼人的所有能力",
                "被投票出局时可带走一名玩家",
                "被毒死或猎人带走时不能发动技能",
              ]}
              notes={[
                "自爆时不能发动技能",
                "带人技能仅限被投票放逐时",
              ]}
            />
          </div>
        </section>

        {/* 神职阵营 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-seer" />
            <h2 className="text-lg font-serif font-semibold text-seer">神职阵营</h2>
            <span className="text-xs text-muted-foreground ml-auto">共4人</span>
          </div>
          
          <div className="space-y-3">
            <RoleCard
              name="预言家"
              camp="seer"
              icon="🔮"
              count={1}
              skills={[
                "每晚可以查验一名玩家的身份",
                "获知该玩家是好人还是狼人",
              ]}
              notes={[
                "白狼王查验结果显示为狼人",
                "记录好每晚的查验结果",
              ]}
            />
            
            <RoleCard
              name="女巫"
              camp="seer"
              icon="🧪"
              count={1}
              skills={[
                "拥有一瓶解药，可救活当晚被刀的玩家",
                "拥有一瓶毒药，可毒死任意一名玩家",
                "每晚最多使用一瓶药水",
              ]}
              notes={[
                "解药和毒药全局各只有一瓶",
                "不能同一晚既救人又毒人",
                "首夜可以自救（本局规则）",
              ]}
            />
            
            <RoleCard
              name="猎人"
              camp="seer"
              icon="🏹"
              count={1}
              skills={[
                "被狼人杀死或被投票放逐时可开枪带走一人",
                "开枪是可选行为，可以选择不开枪",
              ]}
              notes={[
                "被女巫毒死时不能开枪",
                "开枪前要仔细考虑，避免误杀好人",
              ]}
            />
            
            <RoleCard
              name="守卫"
              camp="seer"
              icon="🛡️"
              count={1}
              skills={[
                "每晚可以守护一名玩家免受狼人袭击",
                "不能连续两晚守护同一人",
                "可以守护自己",
              ]}
              notes={[
                "守卫的保护对女巫的毒无效",
                "如果守卫和女巫同时作用于同一人，该玩家死亡",
              ]}
            />
          </div>
        </section>

        {/* 平民阵营 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-villager" />
            <h2 className="text-lg font-serif font-semibold text-villager">平民阵营</h2>
            <span className="text-xs text-muted-foreground ml-auto">共3人</span>
          </div>
          
          <div className="space-y-3">
            <RoleCard
              name="村民"
              camp="villager"
              icon="👨‍🌾"
              count={3}
              skills={[
                "没有特殊技能",
                "通过投票和发言帮助好人阵营",
                "分析场上信息，找出狼人",
              ]}
              notes={[
                "村民是好人阵营的重要票数",
                "认真听发言，不要乱投票",
              ]}
            />
          </div>
        </section>

        {/* 阵营说明 */}
        <section className="glass-card p-4 rounded-xl">
          <h3 className="font-serif font-semibold text-primary mb-3">阵营归属</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-foreground">狼人阵营：</span>
              <span className="text-muted-foreground">普通狼人×4、白狼王×1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-seer" />
              <span className="text-foreground">好人阵营：</span>
              <span className="text-muted-foreground">预言家、女巫、猎人、守卫、村民×3</span>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Roles;
