import { useState, useMemo } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { terminologyData } from "@/data/terminology";
import { Search } from "lucide-react";

const Terminology = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return terminologyData;
    }
    const query = searchQuery.toLowerCase();
    return terminologyData
      .map((category) => ({
        ...category,
        terms: category.terms.filter(
          (item) =>
            item.term.toLowerCase().includes(query) ||
            item.meaning.toLowerCase().includes(query) ||
            item.tip.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.terms.length > 0);
  }, [searchQuery]);

  const totalTerms = useMemo(() => {
    return filteredData.reduce((sum, cat) => sum + cat.terms.length, 0);
  }, [filteredData]);

  return (
    <PageLayout title="狼人杀术语">
      <div className="px-4 py-6 space-y-6 pb-20">
        {/* Search Input */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm -mx-4 px-4 pt-2 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索术语、含义或提示..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-11 bg-card/80 border-border/50 focus-visible:ring-primary/30"
            />
          </div>
          {searchQuery && (
            <p className="text-xs text-muted-foreground mt-2 ml-1">
              找到 <span className="text-primary font-semibold">{totalTerms}</span> 个相关术语
            </p>
          )}
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">未找到相关术语</p>
            <p className="text-muted-foreground/60 text-xs mt-2">请尝试其他关键词</p>
          </div>
        ) : (
          filteredData.map((category) => (
          <section key={category.category}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{category.icon}</span>
              <h2 className="text-base font-serif font-semibold text-primary">{category.category}</h2>
              <span className="text-xs text-muted-foreground">({category.terms.length})</span>
            </div>
            <div className="space-y-2">
              {category.terms.map((item, index) => (
                <Card key={index} className="bg-gradient-card border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-semibold min-w-[90px] flex-shrink-0">
                        {item.term}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground/90 leading-relaxed">{item.meaning}</p>
                        <p className="text-xs text-muted-foreground mt-1.5">💡 {item.tip}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default Terminology;
