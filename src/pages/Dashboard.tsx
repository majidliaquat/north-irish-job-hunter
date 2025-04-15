
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Clock, Heart, Search, User, BarChart4 } from "lucide-react";

interface DashboardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col ai-gradient-bg">
      <Header user={user} onLogout={onLogout} />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome back, {user.name}!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-job-blue/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-job-blue" />
                Job Search
              </CardTitle>
              <CardDescription>Find your next opportunity</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span>Recent searches</span>
                  <span className="text-muted-foreground">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Applications</span>
                  <span className="text-muted-foreground">3</span>
                </div>
              </div>
              <button 
                onClick={() => navigate("/")} 
                className="mt-4 w-full py-2 bg-job-blue/10 hover:bg-job-blue/20 text-job-blue rounded-md transition-colors"
              >
                Search Jobs
              </button>
            </CardContent>
          </Card>
          
          <Card className="glass-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-500" />
                Saved Jobs
              </CardTitle>
              <CardDescription>Jobs you've bookmarked</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span>Total saved</span>
                  <span className="text-muted-foreground">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Recently added</span>
                  <span className="text-muted-foreground">2</span>
                </div>
              </div>
              <button 
                onClick={() => navigate("/saved-jobs")} 
                className="mt-4 w-full py-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 rounded-md transition-colors"
              >
                View Saved Jobs
              </button>
            </CardContent>
          </Card>
          
          <Card className="glass-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-500" />
                Profile
              </CardTitle>
              <CardDescription>Your information</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span>Email</span>
                  <span className="text-muted-foreground">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>CV uploaded</span>
                  <span className="text-muted-foreground">Yes</span>
                </div>
              </div>
              <button 
                onClick={() => navigate("/profile")} 
                className="mt-4 w-full py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 rounded-md transition-colors"
              >
                Edit Profile
              </button>
            </CardContent>
          </Card>
          
          <Card className="glass-card overflow-hidden md:col-span-2 lg:col-span-3">
            <CardHeader className="bg-gradient-to-r from-job-blue/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <BarChart4 className="h-5 w-5 text-job-blue" />
                Job Market Insights
              </CardTitle>
              <CardDescription>Current trends in Northern Ireland</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="font-medium text-muted-foreground">Top Skills</div>
                  <ul className="mt-2 space-y-1">
                    <li>React.js</li>
                    <li>TypeScript</li>
                    <li>Node.js</li>
                  </ul>
                </div>
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="font-medium text-muted-foreground">Top Locations</div>
                  <ul className="mt-2 space-y-1">
                    <li>Belfast</li>
                    <li>Derry/Londonderry</li>
                    <li>Newry</li>
                  </ul>
                </div>
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="font-medium text-muted-foreground">Average Salary</div>
                  <ul className="mt-2 space-y-1">
                    <li>Junior: £25,000</li>
                    <li>Mid-level: £35,000</li>
                    <li>Senior: £50,000</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
