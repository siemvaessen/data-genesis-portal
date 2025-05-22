
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download, File } from 'lucide-react';

interface TemplateFile {
  name: string;
  description: string;
  downloadUrl: string;
}

interface InfoBoxProps {
  className?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ className }) => {
  const templates: TemplateFile[] = [
    {
      name: "Basic Data Template",
      description: "A simple template for standard data uploads",
      downloadUrl: "#"
    },
    {
      name: "Advanced Data Template",
      description: "Comprehensive template with additional fields",
      downloadUrl: "#"
    }
  ];

  return (
    <div className={cn("bg-white border rounded-lg p-6", className)}>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <File className="mr-2 h-5 w-5 text-upload-accent" />
        Gold Standard Files
      </h3>
      
      <p className="text-gray-600 mb-4">
        Our gold standard files ensure your data meets all requirements. If you're not sure where to start, download one of our templates below.
      </p>
      
      <div className="space-y-3">
        {templates.map((template, index) => (
          <div 
            key={index}
            className="bg-gray-50 border rounded-md p-3 flex justify-between items-center"
          >
            <div>
              <h4 className="font-medium">{template.name}</h4>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center text-upload-accent hover:text-upload-text hover:bg-upload-hover"
              onClick={() => window.open(template.downloadUrl, '_blank')}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBox;
