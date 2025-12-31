import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showNav?: boolean;
}

const PageLayout = ({ children, title, showNav = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {title && (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/30">
          <div className="px-4 py-3 max-w-lg mx-auto">
            <h1 className="text-lg font-serif font-semibold text-primary text-center">
              {title}
            </h1>
          </div>
        </header>
      )}

      <main className={`max-w-lg mx-auto ${showNav ? 'pb-20' : ''}`}>
        {children}
      </main>

      {showNav && <BottomNav />}
    </div>
  );
};

export default PageLayout;
