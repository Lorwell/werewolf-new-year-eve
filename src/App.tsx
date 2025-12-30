import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuickStart from "./pages/QuickStart";
import GameRules from "./pages/GameRules";
import Judge from "./pages/Judge";
import Terminology from "./pages/Terminology";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const basename = "/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
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
