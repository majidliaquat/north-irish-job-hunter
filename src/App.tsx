
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import SavedJobs from "./pages/SavedJobs";
import UserProfile from "./pages/UserProfile";
import BackgroundEffects from "./components/BackgroundEffects";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  
  // Simulated auth check on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('nijobhunter-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('nijobhunter-user');
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('nijobhunter-user');
    setUser(null);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="nijobhunter-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BackgroundEffects />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index user={user} onLogout={handleLogout} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/signup" element={<Signup setUser={setUser} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
              <Route path="/saved-jobs" element={<SavedJobs user={user} onLogout={handleLogout} />} />
              <Route path="/profile" element={<UserProfile user={user} setUser={setUser} onLogout={handleLogout} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
