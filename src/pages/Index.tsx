
import React, { useState } from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import ProfileSummary from "@/components/ProfileSummary";
import FilterBar from "@/components/FilterBar";
import JobList from "@/components/JobList";
import { Job } from "@/components/JobCard";
import { searchJobs, exportJobs } from "@/services/jobService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem("bookmarkedJobs") || "[]"))
  );
  const [filters, setFilters] = useState({
    location: "All Northern Ireland",
    salary: [20000, 100000] as [number, number],
    datePosted: "Any time",
    jobType: "Any type",
    experienceLevel: "Any level",
    industry: "Any industry",
    sponsorshipAvailable: false,
    keywords: "",
  });

  const handleFileProcessed = (extractedData: any) => {
    setProfileData(extractedData);
    
    // After processing the file, search for jobs
    searchJobsWithFilters(extractedData);
  };

  const searchJobsWithFilters = async (data = profileData) => {
    setLoading(true);
    try {
      const results = await searchJobs(filters, data);
      setJobs(results);
      
      if (results.length > 0) {
        toast({
          title: "Jobs found!",
          description: `Found ${results.length} jobs matching your profile.`,
        });
      } else {
        toast({
          title: "No jobs found",
          description: "Try adjusting your filters for better results.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search jobs. Please try again.",
        variant: "destructive",
      });
      console.error("Job search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    searchJobsWithFilters();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      location: "All Northern Ireland",
      salary: [20000, 100000] as [number, number],
      datePosted: "Any time",
      jobType: "Any type",
      experienceLevel: "Any level",
      industry: "Any industry",
      sponsorshipAvailable: false,
      keywords: "",
    };
    setFilters(resetFilters);
    searchJobsWithFilters();
  };

  const handleBookmark = (job: Job) => {
    setBookmarkedJobs(prevBookmarks => {
      const newBookmarks = new Set(prevBookmarks);
      
      if (newBookmarks.has(job.id)) {
        newBookmarks.delete(job.id);
        toast({
          title: "Job removed from bookmarks",
          description: `${job.title} at ${job.company} has been removed from your bookmarks.`,
        });
      } else {
        newBookmarks.add(job.id);
        toast({
          title: "Job bookmarked!",
          description: `${job.title} at ${job.company} has been added to your bookmarks.`,
        });
      }
      
      // Save to localStorage
      localStorage.setItem("bookmarkedJobs", JSON.stringify(Array.from(newBookmarks)));
      
      return newBookmarks;
    });
  };

  const handleExportJobs = () => {
    if (jobs.length === 0) {
      toast({
        title: "No jobs to export",
        description: "Please search for jobs first before exporting.",
        variant: "destructive",
      });
      return;
    }
    
    exportJobs(jobs, 'csv');
    
    toast({
      title: "Jobs exported",
      description: "Your job search results have been exported to CSV.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-8 flex-1">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Northern Irish Job Hunter</h1>
          <p className="text-xl text-muted-foreground">
            Upload your CV and discover the perfect job opportunities in Northern Ireland
          </p>
        </div>

        <div className="mb-8">
          <FileUpload onFileProcessed={handleFileProcessed} />
        </div>

        {profileData && (
          <>
            <ProfileSummary profileData={profileData} />
            
            <FilterBar 
              filters={filters} 
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
            
            <JobList 
              jobs={jobs} 
              loading={loading} 
              bookmarkedJobs={bookmarkedJobs}
              onBookmark={handleBookmark}
              onExportJobs={handleExportJobs}
            />
          </>
        )}
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Northern Irish Job Hunter. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
