
import { Job } from "@/components/JobCard";

// Mock job data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions NI",
    location: "Belfast, Northern Ireland",
    description: "We're looking for a Frontend Developer with experience in React, TypeScript, and modern web technologies. You'll be working on developing responsive web applications and collaborating with UX designers and backend developers.",
    salary: "£35,000 - £45,000",
    datePosted: "Today",
    jobType: "Full-time",
    url: "#",
    skills: ["React", "TypeScript", "CSS", "HTML", "JavaScript"],
    companyLogo: "https://via.placeholder.com/40",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "Creative Digital",
    location: "Belfast, Northern Ireland",
    description: "Creative Digital is seeking a talented UI/UX Designer to join our team in Belfast. You will be responsible for creating intuitive user interfaces and experiences for web and mobile applications.",
    salary: "£30,000 - £40,000",
    datePosted: "Yesterday",
    jobType: "Full-time",
    url: "#",
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research", "Prototyping"],
  },
  {
    id: "3",
    title: "React Developer",
    company: "Northern Web Solutions",
    location: "Derry/Londonderry, Northern Ireland",
    description: "Join our growing team as a React Developer. You will be working on cutting-edge projects for clients across various industries. Experience with modern React patterns and state management is essential.",
    salary: "£32,000 - £42,000",
    datePosted: "2 days ago",
    jobType: "Permanent",
    url: "#",
    skills: ["React", "Redux", "JavaScript", "REST API", "Git"],
  },
  {
    id: "4",
    title: "Web Developer",
    company: "Digital Innovations",
    location: "Newry, Northern Ireland",
    description: "We're looking for a passionate Web Developer to help build amazing websites and web applications for our diverse client base. You should have strong skills in frontend technologies and some experience with backend development.",
    salary: "£28,000 - £35,000",
    datePosted: "3 days ago",
    jobType: "Full-time",
    url: "#",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
  },
  {
    id: "5",
    title: "Full Stack JavaScript Developer",
    company: "Tech Connect NI",
    location: "Belfast, Northern Ireland",
    description: "Tech Connect NI is seeking a Full Stack JavaScript Developer who can work on both frontend and backend development. Experience with Node.js and React is required. The ideal candidate will be comfortable working in an agile environment.",
    salary: "£40,000 - £50,000",
    datePosted: "4 days ago",
    jobType: "Contract",
    url: "#",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: "6",
    title: "Software Engineer",
    company: "Northern Code",
    location: "Belfast, Northern Ireland",
    description: "Northern Code is looking for a Software Engineer to join our dynamic team. You'll be working on developing high-quality software solutions for our clients. Strong problem-solving skills and experience with object-oriented programming are essential.",
    salary: "£35,000 - £45,000",
    datePosted: "5 days ago",
    jobType: "Full-time",
    url: "#",
    skills: ["Java", "Spring Boot", "SQL", "Git", "Agile"],
  },
  {
    id: "7",
    title: "Frontend Engineer",
    company: "Digital Solutions NI",
    location: "Antrim, Northern Ireland",
    description: "We are looking for a Frontend Engineer who can create intuitive and responsive user interfaces. You should have solid experience with modern JavaScript frameworks and CSS preprocessing tools.",
    salary: "£30,000 - £38,000",
    datePosted: "1 week ago",
    jobType: "Permanent",
    url: "#",
    skills: ["JavaScript", "Vue.js", "SCSS", "Webpack", "Jest"],
  },
  {
    id: "8",
    title: "Web Developer - Entry Level",
    company: "Green Media",
    location: "Lisburn, Northern Ireland",
    description: "Great opportunity for a graduate or junior developer to join our web development team. You'll be working on websites and web applications for a variety of clients while learning from experienced developers.",
    salary: "£24,000 - £28,000",
    datePosted: "1 week ago",
    jobType: "Full-time",
    url: "#",
    skills: ["HTML", "CSS", "JavaScript", "jQuery", "PHP"],
  },
  {
    id: "9",
    title: "UX/UI Designer",
    company: "User Experience NI",
    location: "Belfast, Northern Ireland",
    description: "User Experience NI is seeking a talented UX/UI Designer to join our team. You will be responsible for creating wireframes, prototypes, and visual designs for web and mobile applications.",
    salary: "£32,000 - £40,000",
    datePosted: "2 weeks ago",
    jobType: "Full-time",
    url: "#",
    skills: ["UI Design", "UX Research", "Sketch", "Adobe Creative Suite", "Prototyping"],
  },
  {
    id: "10",
    title: "JavaScript Developer",
    company: "Web Dynamics",
    location: "Bangor, Northern Ireland",
    description: "We're looking for a JavaScript Developer to join our team. You'll be working on developing and maintaining client-side applications using modern JavaScript frameworks.",
    salary: "£30,000 - £38,000",
    datePosted: "2 weeks ago",
    jobType: "Full-time",
    url: "#",
    skills: ["JavaScript", "Angular", "TypeScript", "RxJS", "Git"],
  },
  {
    id: "11",
    title: "React Native Developer",
    company: "Mobile Solutions NI",
    location: "Belfast, Northern Ireland",
    description: "Mobile Solutions NI is seeking an experienced React Native Developer to build cross-platform mobile applications. You should have strong knowledge of React Native and experience with mobile app development.",
    salary: "£38,000 - £48,000",
    datePosted: "2 weeks ago",
    jobType: "Full-time",
    url: "#",
    skills: ["React Native", "JavaScript", "iOS", "Android", "Redux"],
  },
  {
    id: "12",
    title: "WordPress Developer",
    company: "Web Creators NI",
    location: "Coleraine, Northern Ireland",
    description: "We're looking for a WordPress Developer to join our team. You'll be responsible for building and maintaining WordPress websites for our clients. Experience with custom theme and plugin development is required.",
    salary: "£28,000 - £35,000",
    datePosted: "3 weeks ago",
    jobType: "Full-time",
    url: "#",
    skills: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"],
  },
];

export interface JobFilters {
  location?: string;
  salary?: [number, number];
  datePosted?: string;
  jobType?: string;
  experienceLevel?: string;
  industry?: string;
  sponsorshipAvailable?: boolean;
  keywords?: string;
}

export const searchJobs = (filters: JobFilters, profileData: any): Promise<Job[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      let filteredJobs = [...mockJobs];
      
      // Apply filters
      if (filters.location && filters.location !== 'All Northern Ireland') {
        filteredJobs = filteredJobs.filter(job => 
          job.location.includes(filters.location!)
        );
      }
      
      if (filters.salary) {
        filteredJobs = filteredJobs.filter(job => {
          // Extract salary range from string (e.g., "£30,000 - £40,000")
          const salaryText = job.salary;
          const salaryMatch = salaryText.match(/£([\d,]+) - £([\d,]+)/);
          
          if (salaryMatch) {
            const minSalary = parseInt(salaryMatch[1].replace(/,/g, ''));
            const maxSalary = parseInt(salaryMatch[2].replace(/,/g, ''));
            
            return (
              (minSalary >= filters.salary![0] && minSalary <= filters.salary![1]) ||
              (maxSalary >= filters.salary![0] && maxSalary <= filters.salary![1])
            );
          }
          
          return true;
        });
      }
      
      if (filters.datePosted && filters.datePosted !== 'Any time') {
        filteredJobs = filteredJobs.filter(job => {
          if (filters.datePosted === 'Today') {
            return job.datePosted === 'Today';
          } else if (filters.datePosted === 'Last 3 days') {
            return ['Today', 'Yesterday', '2 days ago'].includes(job.datePosted);
          } else if (filters.datePosted === 'Last week') {
            return !job.datePosted.includes('week') || job.datePosted.includes('1 week');
          } else if (filters.datePosted === 'Last 2 weeks') {
            return !job.datePosted.includes('week') || 
                  (job.datePosted.includes('week') && parseInt(job.datePosted) <= 2);
          } else if (filters.datePosted === 'Last month') {
            return true; // All our mock data is within the last month
          }
          return true;
        });
      }
      
      if (filters.jobType && filters.jobType !== 'Any type') {
        filteredJobs = filteredJobs.filter(job => 
          job.jobType === filters.jobType
        );
      }
      
      if (filters.keywords) {
        const keywords = filters.keywords.toLowerCase().split(' ');
        filteredJobs = filteredJobs.filter(job => {
          const jobText = `${job.title} ${job.description} ${job.company} ${job.skills?.join(' ')}`.toLowerCase();
          return keywords.some(keyword => jobText.includes(keyword));
        });
      }
      
      // If we have profile data, boost jobs that match the profile
      if (profileData) {
        filteredJobs = filteredJobs.map(job => {
          let relevanceScore = 0;
          
          // Boost score for title matches
          profileData.jobTitles.forEach((title: string) => {
            if (job.title.toLowerCase().includes(title.toLowerCase())) {
              relevanceScore += 5;
            }
          });
          
          // Boost score for skill matches
          if (job.skills && profileData.skills) {
            profileData.skills.forEach((skill: string) => {
              if (job.skills!.some(s => s.toLowerCase() === skill.toLowerCase())) {
                relevanceScore += 3;
              }
            });
          }
          
          // Boost score for location matches
          if (profileData.preferredLocations) {
            profileData.preferredLocations.forEach((location: string) => {
              if (job.location.includes(location)) {
                relevanceScore += 2;
              }
            });
          }
          
          return { ...job, relevanceScore };
        }).sort((a, b) => (b as any).relevanceScore - (a as any).relevanceScore);
      }
      
      resolve(filteredJobs);
    }, 1500);
  });
};

export const exportJobs = (jobs: Job[], format: 'csv' | 'pdf'): void => {
  if (format === 'csv') {
    const headers = [
      'Title',
      'Company',
      'Location',
      'Description',
      'Salary',
      'Date Posted',
      'Job Type',
      'URL',
      'Skills',
    ];
    
    const csvContent = [
      headers.join(','),
      ...jobs.map(job => [
        `"${job.title}"`,
        `"${job.company}"`,
        `"${job.location}"`,
        `"${job.description.replace(/"/g, '""')}"`,
        `"${job.salary}"`,
        `"${job.datePosted}"`,
        `"${job.jobType}"`,
        `"${job.url}"`,
        `"${job.skills ? job.skills.join(', ') : ''}"`,
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'job_listings.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // For PDF, in a real app we'd use a library like jsPDF
    // This is just a placeholder
    alert('PDF export would be implemented using a library like jsPDF');
  }
};
