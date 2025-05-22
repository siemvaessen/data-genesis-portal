
import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import UploadArea from './UploadArea';
import UploadSourceButton from './UploadSourceButton';
import InfoBox from './InfoBox';
import IATIRegistryForm from './IATIRegistryForm';
import ValidationAndPublish, { FileData } from './ValidationAndPublish';
import { Button } from '@/components/ui/button';
import { Upload, Folder, Cloud, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FileWithMetadata extends File {
  fileType?: 'activity' | 'organisation';
  displayName?: string;
}

const FileUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithMetadata[]>([]);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [uploadState, setUploadState] = useState<'initial' | 'uploading' | 'uploaded'>('initial');
  const { toast } = useToast();
  
  const [processedFiles, setProcessedFiles] = useState<FileData[]>([]);

  const handleFilesSelected = (files: File[]) => {
    // Convert to FileWithMetadata
    const filesWithMetadata: FileWithMetadata[] = files.map(file => ({
      ...file,
      fileType: undefined,
      displayName: file.name,
    }));
    setSelectedFiles(filesWithMetadata);
    setUploadState('uploading');
    
    toast({
      title: "Files received",
      description: `${files.length} file(s) ready for configuration`,
    });
  };

  const updateFileMetadata = (index: number, field: 'fileType' | 'displayName', value: any) => {
    setSelectedFiles(prev => {
      const updated = [...prev];
      if (field === 'fileType') {
        updated[index].fileType = value as 'activity' | 'organisation';
      } else if (field === 'displayName') {
        updated[index].displayName = value as string;
      }
      return updated;
    });
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
    // Check if all files have been configured
    const isAllConfigured = selectedFiles.every(file => file.fileType && file.displayName);
    
    if (!isAllConfigured) {
      toast({
        title: "Configuration Required",
        description: "Please set file type for all files",
        variant: "destructive",
      });
      return;
    }
    
    setUploadState('uploaded');
    setCurrentStep(2);
    
    // Prepare files for the validation step
    const filesWithData: FileData[] = selectedFiles.map((file, index) => ({
      id: `file-${index}`,
      name: file.name,
      displayName: file.displayName || file.name,
      fileType: file.fileType || 'activity',
      uploadDate: new Date().toLocaleDateString(),
      isValid: Math.random() > 0.2, // Randomly determine validity for demo purposes
      publishStatus: 'draft',
      xmlUrl: '#',
      iatiRegistryUrl: '#',
      iatiOrgRegistryUrl: '#'
    }));
    
    setProcessedFiles(filesWithData);
    
    toast({
      title: "Continue",
      description: `Proceeding to step 2`,
    });
  };

  const handleBack = () => {
    if (currentStep === 2) setCurrentStep(1);
    else if (currentStep === 3) setCurrentStep(2);
  };
  
  const handleProceedToValidation = () => {
    setCurrentStep(3);
    toast({
      title: "Files Processed",
      description: "Your files are ready for validation and publishing",
    });
  };
  
  const handleCompleteProcess = () => {
    toast({
      title: "Process Completed",
      description: "All files have been processed successfully",
    });
    // Reset to initial state or redirect to dashboard
    setCurrentStep(1);
    setSelectedFiles([]);
    setProcessedFiles([]);
    setUploadState('initial');
  };

  const renderInitialUploadUI = () => (
    <>
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
    </>
  );

  const renderFileConfiguration = () => (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-4">
        <p className="text-sm text-blue-700 flex items-center">
          <Upload className="w-4 h-4 mr-2" />
          Please configure your files before continuing
        </p>
      </div>

      {selectedFiles.map((file, index) => (
        <div key={index} className="p-4 bg-white rounded-lg border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <Label htmlFor={`display-name-${index}`}>Display Name</Label>
              <Input 
                id={`display-name-${index}`}
                value={file.displayName || ''} 
                onChange={(e) => updateFileMetadata(index, 'displayName', e.target.value)}
                placeholder="Enter a display name"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`file-type-${index}`}>File Type</Label>
              <Select 
                onValueChange={(value) => updateFileMetadata(index, 'fileType', value)}
                value={file.fileType}
              >
                <SelectTrigger id={`file-type-${index}`} className="w-full">
                  <SelectValue placeholder="Select file type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activity">Activity File</SelectItem>
                  <SelectItem value="organisation">Organisation File</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          onClick={() => {
            setSelectedFiles([]);
            setUploadState('initial');
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={5} 
        className="mb-8" 
      />
      
      {currentStep === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Data Files</h2>
          
          {uploadState === 'initial' && renderInitialUploadUI()}
          
          {uploadState !== 'initial' && renderFileConfiguration()}
          
          {(selectedFiles.length > 0 || uploadState !== 'initial') && (
            <div className="mt-8">
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
          )}
        </>
      )}

      {currentStep === 2 && (
        <IATIRegistryForm 
          onBack={handleBack} 
          onNext={handleProceedToValidation}
        />
      )}
      
      {currentStep === 3 && (
        <ValidationAndPublish
          files={processedFiles}
          onBack={handleBack}
          onComplete={handleCompleteProcess}
        />
      )}
    </div>
  );
};

export default FileUpload;
