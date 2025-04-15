
import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Map, 
  Banknote, 
  Clock, 
  Briefcase, 
  Award, 
  Building, 
  RefreshCw,
  SlidersHorizontal
} from "lucide-react";

interface Filters {
  location: string;
  salary: [number, number];
  datePosted: string;
  jobType: string;
  experienceLevel: string;
  industry: string;
  sponsorshipAvailable: boolean;
  keywords: string;
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onResetFilters: () => void;
}

export const locations = [
  "All Northern Ireland",
  "Belfast",
  "Derry/Londonderry",
  "Newry",
  "Lisburn",
  "Bangor",
  "Craigavon",
  "Newtownabbey",
  "Coleraine",
  "Antrim",
  "Omagh",
  "Enniskillen",
];

export const dateOptions = [
  "Any time",
  "Today",
  "Last 3 days",
  "Last week",
  "Last 2 weeks",
  "Last month",
];

export const jobTypes = [
  "Any type", 
  "Full-time", 
  "Part-time", 
  "Contract", 
  "Temporary", 
  "Permanent",
  "Remote"
];

export const experienceLevels = [
  "Any level",
  "Entry level",
  "Junior level",
  "Mid level",
  "Senior level",
  "Executive",
];

export const industries = [
  "Any industry",
  "IT & Software",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Engineering",
  "Marketing",
  "Construction",
];

const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  const handleChange = (key: keyof Filters, value: any) => {
    setTempFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSalaryChange = (value: number[]) => {
    setTempFilters(prev => ({
      ...prev,
      salary: [value[0], value[1]]
    }));
  };

  const applyFilters = () => {
    onFilterChange(tempFilters);
  };

  const resetFilters = () => {
    onResetFilters();
    setTempFilters(filters);
  };

  const formatSalary = (value: number) => {
    return `£${value.toLocaleString()}`;
  };

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
        {showFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          <div>
            <div className="flex items-center mb-2 gap-2">
              <Map className="h-4 w-4 text-job-blue" />
              <span className="text-sm font-medium">Location</span>
            </div>
            <Select 
              value={tempFilters.location}
              onValueChange={value => handleChange('location', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center mb-2 gap-2">
              <Banknote className="h-4 w-4 text-job-green" />
              <span className="text-sm font-medium">Salary Range</span>
            </div>
            <Accordion type="single" collapsible defaultValue="salary">
              <AccordionItem value="salary" className="border-none">
                <AccordionTrigger className="py-2">
                  {formatSalary(tempFilters.salary[0])} - {formatSalary(tempFilters.salary[1])}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <Slider
                      value={[tempFilters.salary[0], tempFilters.salary[1]]}
                      min={10000}
                      max={150000}
                      step={5000}
                      onValueChange={handleSalaryChange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{formatSalary(tempFilters.salary[0])}</span>
                      <span>{formatSalary(tempFilters.salary[1])}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <div className="flex items-center mb-2 gap-2">
              <Clock className="h-4 w-4 text-job-blue" />
              <span className="text-sm font-medium">Date Posted</span>
            </div>
            <Select 
              value={tempFilters.datePosted}
              onValueChange={value => handleChange('datePosted', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center mb-2 gap-2">
              <Briefcase className="h-4 w-4 text-job-yellow" />
              <span className="text-sm font-medium">Job Type</span>
            </div>
            <Select 
              value={tempFilters.jobType}
              onValueChange={value => handleChange('jobType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center mb-2 gap-2">
              <Award className="h-4 w-4 text-job-green" />
              <span className="text-sm font-medium">Experience Level</span>
            </div>
            <Select 
              value={tempFilters.experienceLevel}
              onValueChange={value => handleChange('experienceLevel', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center mb-2 gap-2">
              <Building className="h-4 w-4 text-job-blue" />
              <span className="text-sm font-medium">Industry</span>
            </div>
            <Select 
              value={tempFilters.industry}
              onValueChange={value => handleChange('industry', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium">Sponsorship Available</span>
            </div>
            <Select 
              value={tempFilters.sponsorshipAvailable.toString()}
              onValueChange={value => handleChange('sponsorshipAvailable', value === 'true')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sponsorship options" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No / Don't care</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium">Additional Keywords</span>
            </div>
            <Input
              placeholder="E.g. remote, graduate, senior"
              value={tempFilters.keywords}
              onChange={e => handleChange('keywords', e.target.value)}
            />
          </div>
        </div>
      )}

      {showFilters && (
        <div className="flex justify-end">
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
