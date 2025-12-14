import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ParentProfile from "./pages/ParentProfile";
import ChildProfile from "./pages/ChildProfile";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import GrowthNotebook from "./pages/GrowthNotebook";
import Planner from "./pages/Planner";
import Community from "./pages/Community";
import Experts from "./pages/Experts";
import Notifications from "./pages/Notifications";
import Content from "./pages/Content";
import Settings from "./pages/Settings";
import ExpertProfile from "./pages/ExpertProfile";
import ExpertDashboard from "./pages/ExpertDashboard";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/Raising-Children-App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/parent-profile" element={<ParentProfile />} />
          <Route path="/child-profile" element={<ChildProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/growth-notebook" element={<GrowthNotebook />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/community" element={<Community />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/content" element={<Content />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/expert-profile" element={<ExpertProfile />} />
          <Route path="/expert-dashboard" element={<ExpertDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
