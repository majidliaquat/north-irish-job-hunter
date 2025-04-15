
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Job } from "@/components/JobCard";
import JobList from "@/components/JobList";
import { useToast } from "@/components/ui/use-toast";

interface SavedJobsProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onLogout: () => void;
}

const SavedJobs: React.FC<SavedJobsProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  // Get bookmarked jobs from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedJobs");
    if (savedBookmarks) {
      try {
        const bookmarkIds = JSON.parse(savedBookmarks);
        setBookmarkedJobs(new Set(bookmarkIds));
        
        // In a real app, we would fetch job details by IDs from API
        // For now, we'll use mock data
        const mockJobs: Job[] = [
          {
            id: "1",
            title: "Frontend Developer",
            company: "Tech Solutions NI",
            location: "Belfast, Northern Ireland",
            description: "We're looking for a Frontend Developer with experience in React, TypeScript, and modern web technologies.",
            salary: "£35,000 - £45,000",
            datePosted: "Today",
            jobType: "Full-time",
            url: "#",
            skills: ["React", "TypeScript", "CSS", "HTML", "JavaScript"],
          },
          {
            id: "5",
            title: "Full Stack JavaScript Developer",
            company: "Tech Connect NI",
            location: "Belfast, Northern Ireland",
            description: "Tech Connect NI is seeking a Full Stack JavaScript Developer who can work on both frontend and backend development.",
            salary: "£40,000 - £50,000",
            datePosted: "4 days ago",
            jobType: "Contract",
            url: "#",
            skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
          }
        ];
        
        // Filter mock jobs to only show bookmarked ones
        const filteredJobs = mockJobs.filter(job => bookmarkIds.includes(job.id));
        setSavedJobs(filteredJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing bookmarked jobs", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);
  
  const handleBookmark = (job: Job) => {
    setBookmarkedJobs(prevBookmarks => {
      const newBookmarks = new Set(prevBookmarks);
      
      if (newBookmarks.has(job.id)) {
        newBookmarks.delete(job.id);
        setSavedJobs(prevJobs => prevJobs.filter(j => j.id !== job.id));
        toast({
          title: "Job removed from bookmarks",
          description: `${job.title} at ${job.company} has been removed from your bookmarks.`,
        });
      }
      
      // Save to localStorage
      localStorage.setItem("bookmarkedJobs", JSON.stringify(Array.from(newBookmarks)));
      
      return newBookmarks;
    });
  };
  
  const handleExportJobs = () => {
    if (savedJobs.length === 0) {
      toast({
        title: "No jobs to export",
        description: "You don't have any saved jobs to export.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would use the same export function as the main page
    toast({
      title: "Jobs exported",
      description: "Your saved jobs have been exported to CSV.",
    });
  };
  
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col ai-gradient-bg">
      <Header user={user} onLogout={onLogout} />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>
        
        {savedJobs.length > 0 ? (
          <JobList 
            jobs={savedJobs} 
            loading={loading} 
            bookmarkedJobs={bookmarkedJobs}
            onBookmark={handleBookmark}
            onExportJobs={handleExportJobs}
          />
        ) : (
          <div className="glass-card p-8 text-center">
            <h2 className="text-xl font-medium mb-2">No saved jobs yet</h2>
            <p className="text-muted-foreground mb-6">
              When you find jobs you're interested in, bookmark them to save them here.
            </p>
            <button 
              onClick={() => navigate("/")} 
              className="px-6 py-2 bg-gradient-to-r from-job-blue to-job-light-blue text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Find Jobs
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedJobs;
