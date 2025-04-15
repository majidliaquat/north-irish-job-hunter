
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ExternalLink, MapPin, Calendar, Banknote } from "lucide-react";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  datePosted: string;
  jobType: string;
  url: string;
  skills?: string[];
  companyLogo?: string;
}

interface JobCardProps {
  job: Job;
  onBookmark: (job: Job) => void;
  isBookmarked: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onBookmark, isBookmarked }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={`job-card ${isBookmarked ? 'job-card-saved' : ''}`}>
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold line-clamp-1">{job.title}</h3>
          <p className="text-muted-foreground">{job.company}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBookmark(job)}
          className={isBookmarked ? 'text-job-blue' : ''}
        >
          <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-job-blue' : ''}`} />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 my-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          {job.datePosted}
        </div>
        {job.salary && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Banknote className="h-3.5 w-3.5 mr-1" />
            {job.salary}
          </div>
        )}
      </div>

      <Badge variant="secondary" className="mb-3">
        {job.jobType}
      </Badge>

      <div className={`${expanded ? '' : 'line-clamp-3'} text-sm mb-4`}>
        {job.description}
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-2">
        <Button
          variant="link"
          size="sm"
          className="h-8 p-0"
          onClick={toggleExpand}
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
        <Button size="sm" className="h-8" onClick={() => window.open(job.url, '_blank')}>
          Apply
          <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
};

export default JobCard;
