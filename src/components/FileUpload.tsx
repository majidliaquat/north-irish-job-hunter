
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, FileType, Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  onFileProcessed: (extractedData: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileProcessed }) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file.",
      });
      return;
    }

    setFile(file);
  };

  const removeFile = () => {
    setFile(null);
  };

  const processFile = () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // Mock file processing - in a real implementation, this would call an API
    setTimeout(() => {
      const mockExtractedData = {
        skills: ["JavaScript", "React", "TypeScript", "Node.js", "UI/UX Design"],
        jobTitles: ["Frontend Developer", "React Developer", "Web Developer"],
        education: ["Bachelor's in Computer Science"],
        experience: [
          { title: "Frontend Developer", years: 2 },
          { title: "Web Designer", years: 1 }
        ],
        preferredLocations: ["Belfast", "Derry"]
      };
      
      onFileProcessed(mockExtractedData);
      setIsProcessing(false);
      
      toast({
        title: "CV processed successfully",
        description: "We've extracted information from your CV.",
      });
    }, 2000);
  };

  return (
    <Card className={`p-6 ${isDragging ? 'ring-2 ring-primary' : ''}`}>
      <div
        className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/80"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        {!file ? (
          <>
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              PDF, DOCX or TXT (MAX. 10MB)
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <FileType className="w-10 h-10 mb-3 text-job-blue" />
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <div className="flex mt-4 gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
              >
                <X className="mr-1 h-4 w-4" />
                Remove
              </Button>
              <Button 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  processFile();
                }}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Check className="mr-1 h-4 w-4" />
                    Process CV
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        <input 
          id="file-upload" 
          type="file" 
          className="hidden" 
          accept=".pdf,.docx,.doc,.txt" 
          onChange={handleFileChange}
        />
      </div>
    </Card>
  );
};

export default FileUpload;
