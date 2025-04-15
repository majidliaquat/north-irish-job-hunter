
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileSummaryProps {
  profileData: {
    skills: string[];
    jobTitles: string[];
    education: string[];
    experience: { title: string; years: number }[];
    preferredLocations: string[];
  } | null;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ profileData }) => {
  if (!profileData) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">CV Analysis Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm mb-2">Skills</h3>
            <div className="flex flex-wrap gap-1">
              {profileData.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-2">Preferred Job Titles</h3>
            <div className="flex flex-wrap gap-1">
              {profileData.jobTitles.map((title) => (
                <Badge key={title} variant="outline">
                  {title}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-2">Experience</h3>
            <ul className="text-sm space-y-1">
              {profileData.experience.map((exp, index) => (
                <li key={index}>
                  {exp.title} ({exp.years} {exp.years === 1 ? 'year' : 'years'})
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-2">Preferred Locations</h3>
            <div className="flex flex-wrap gap-1">
              {profileData.preferredLocations.map((location) => (
                <Badge key={location} variant="outline">
                  {location}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
