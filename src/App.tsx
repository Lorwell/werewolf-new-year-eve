import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Roles from "./pages/Roles";
import RoleDetail from "./pages/RoleDetail";
import Flow from "./pages/Flow";
import Tips from "./pages/Tips";
import Rules from "./pages/Rules";
import Victory from "./pages/Victory";
import Judge from "./pages/Judge";
import Advanced from "./pages/Advanced";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/roles/:roleId" element={<RoleDetail />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/victory" element={<Victory />} />
          <Route path="/judge" element={<Judge />} />
          <Route path="/advanced" element={<Advanced />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
