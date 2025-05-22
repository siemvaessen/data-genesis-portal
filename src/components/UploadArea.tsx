
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, File } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  className?: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFilesSelected, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = Array.from(e.dataTransfer.files);
      onFilesSelected(fileList);
      toast({
        title: "Files received",
        description: `${fileList.length} file(s) ready for upload`,
      });
    }
  }, [onFilesSelected, toast]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      onFilesSelected(fileList);
      toast({
        title: "Files selected",
        description: `${fileList.length} file(s) ready for upload`,
      });
    }
  }, [onFilesSelected, toast]);
  
  return (
    <div 
      className={cn(
        "border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer text-center",
        isDragging 
          ? "bg-upload-hover border-upload-accent" 
          : "bg-upload-DEFAULT border-upload-border hover:bg-upload-hover",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <input 
        id="fileInput" 
        type="file" 
        multiple 
        onChange={handleFileInputChange} 
        className="hidden" 
      />
      
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="bg-white p-3 rounded-full">
          <Upload 
            className={cn(
              "h-8 w-8 text-upload-accent", 
              isDragging && "animate-pulse-slow"
            )} 
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-upload-text mb-1">
            {isDragging ? "Drop files here" : "Drag & drop files here"}
          </h3>
          <p className="text-sm text-gray-500">
            or click to browse your files
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
