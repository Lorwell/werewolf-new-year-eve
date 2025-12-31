import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import QuickStart from "./pages/QuickStart";
import GameRules from "./pages/GameRules";
import Judge from "./pages/Judge";
import Terminology from "./pages/Terminology";
import GameRecord from "./pages/GameRecord";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const basename = "/";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game" element={<GameRecord />} />
          <Route path="/quickstart" element={<QuickStart />} />
          <Route path="/rules" element={<GameRules />} />
          <Route path="/judge" element={<Judge />} />
          <Route path="/terminology" element={<Terminology />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
