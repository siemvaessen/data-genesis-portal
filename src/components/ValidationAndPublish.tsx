
import React from 'react';
import ValidationTable, { FileData } from './ValidationTable';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ValidationAndPublishProps {
  files: FileData[];
  onBack: () => void;
  onComplete: () => void;
}

const ValidationAndPublish: React.FC<ValidationAndPublishProps> = ({ files, onBack, onComplete }) => {
  const { toast } = useToast();
  const [filesList, setFilesList] = React.useState<FileData[]>(files);

  const handlePublishToggle = (fileId: string) => {
    setFilesList(prev => prev.map(file => {
      if (file.id === fileId) {
        const newStatus = file.publishStatus === 'published' ? 'draft' : 'published';
        
        toast({
          title: newStatus === 'published' ? 'File Published' : 'File Unpublished',
          description: `${file.displayName || file.name} has been ${newStatus === 'published' ? 'published to IATI Registry' : 'set to draft status'}`,
        });
        
        return {
          ...file,
          publishStatus: newStatus
        };
      }
      return file;
    }));
  };

  const handleDashboard = () => {
    toast({
      title: "Dashboard",
      description: "Navigating to dashboard",
    });
  };

  const handleComplete = () => {
    toast({
      title: "Process Complete",
      description: "All files have been processed successfully",
    });
    onComplete();
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Validate & Publish Files</h2>
      <p className="text-center text-gray-600 mb-8">
        Review your files, check validity, and publish to the IATI Registry.
      </p>
      
      {filesList.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-gray-500">No files available for validation and publishing.</p>
        </div>
      ) : (
        <ValidationTable files={filesList} onPublishToggle={handlePublishToggle} />
      )}
      
      <div className="flex justify-between mt-8">
        <div>
          <Button
            variant="default"
            className="bg-teal-600 hover:bg-teal-700 mr-2"
            onClick={handleDashboard}
          >
            Go to Dashboard
          </Button>
          
          <Button
            variant="outline"
            onClick={onBack}
          >
            Go Back
          </Button>
        </div>
        
        <Button
          variant="default"
          className="px-8"
          onClick={handleComplete}
        >
          Complete
        </Button>
      </div>
    </>
  );
};

export default ValidationAndPublish;
