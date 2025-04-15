
import React from "react";
import JobCard, { Job } from "./JobCard";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  bookmarkedJobs: Set<string>;
  onBookmark: (job: Job) => void;
  onExportJobs: () => void;
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  loading,
  bookmarkedJobs,
  onBookmark,
  onExportJobs,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Searching for relevant jobs...</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground mb-2">No jobs found matching your criteria.</p>
        <p className="text-muted-foreground text-sm">Try adjusting your filters or uploading a different CV.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {jobs.length} Jobs Found
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onExportJobs}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Export Results
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isBookmarked={bookmarkedJobs.has(job.id)}
            onBookmark={onBookmark}
          />
        ))}
      </div>
    </>
  );
};

export default JobList;
