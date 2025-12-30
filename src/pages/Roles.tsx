import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { roles } from "@/data/roles";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const campStyles: Record<string, string> = {
  wolf: "card-wolf",
  seer: "card-seer",
  villager: "card-villager",
  special: "bg-gradient-to-br from-amber-950/80 to-amber-900/40 border-amber-700/50",
};

const Roles = () => {
  const wolfRoles = roles.filter(r => r.camp === "wolf");
  const seerRoles = roles.filter(r => r.camp === "seer");
  const villagerRoles = roles.filter(r => r.camp === "villager");
  const specialRoles = roles.filter(r => r.camp === "special");

  const RoleCard = ({ role }: { role: typeof roles[0] }) => (
    <Link
      to={`/roles/${role.id}`}
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        campStyles[role.camp]
      )}
    >
      <div className="w-12 h-12 rounded-full bg-background/30 flex items-center justify-center text-2xl flex-shrink-0">
        {role.icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-serif font-semibold text-foreground">
          {role.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {role.shortDesc}
        </p>
      </div>

      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    </Link>
  );

  return (
    <PageLayout title="角色介绍">
      <div className="px-4 py-6 space-y-6">
        {/* 狼人阵营 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <h2 className="text-lg font-serif font-semibold text-accent">狼人阵营</h2>
          </div>
          <div className="space-y-3">
            {wolfRoles.map(role => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </section>

        {/* 神职阵营 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-seer" />
            <h2 className="text-lg font-serif font-semibold text-seer">神职阵营</h2>
          </div>
          <div className="space-y-3">
            {seerRoles.map(role => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </section>

        {/* 平民阵营 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-villager" />
            <h2 className="text-lg font-serif font-semibold text-villager">平民阵营</h2>
          </div>
          <div className="space-y-3">
            {villagerRoles.map(role => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </section>

        {/* 特殊身份 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <h2 className="text-lg font-serif font-semibold text-primary">特殊身份</h2>
          </div>
          <div className="space-y-3">
            {specialRoles.map(role => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Roles;
