
import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import UploadArea from './UploadArea';
import UploadSourceButton from './UploadSourceButton';
import InfoBox from './InfoBox';
import { Button } from '@/components/ui/button';
import { Upload, Folder, Cloud } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FileUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleLocalUpload = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleGoogleDriveUpload = () => {
    toast({
      title: "Google Drive",
      description: "Google Drive integration would open here",
    });
  };

  const handleOneDriveUpload = () => {
    toast({
      title: "OneDrive",
      description: "OneDrive integration would open here",
    });
  };

  const handleContinue = () => {
    toast({
      title: "Continue",
      description: `Proceeding to step 2 with ${selectedFiles.length} files`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator currentStep={1} totalSteps={5} className="mb-8" />
      
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Data Files</h2>
      
      <UploadArea 
        onFilesSelected={handleFilesSelected} 
        className="mb-6"
      />
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <UploadSourceButton 
          icon={Folder} 
          label="Local Upload" 
          onClick={handleLocalUpload}
        />
        <UploadSourceButton 
          icon={Cloud} 
          label="Google Drive" 
          onClick={handleGoogleDriveUpload}
        />
        <UploadSourceButton 
          icon={Cloud}
          label="OneDrive" 
          onClick={handleOneDriveUpload}
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mb-8 bg-white border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Selected Files ({selectedFiles.length})</h3>
          <ul className="max-h-40 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <li key={index} className="text-sm py-1 border-b last:border-b-0 flex justify-between">
                <span className="truncate max-w-[80%]">{file.name}</span>
                <span className="text-gray-500">{(file.size / 1024).toFixed(0)} KB</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <InfoBox className="mb-8" />
      
      <div className="flex justify-end">
        <Button 
          className="px-8"
          disabled={selectedFiles.length === 0}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
