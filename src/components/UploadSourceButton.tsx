
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

interface UploadSourceButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  className?: string;
}

const UploadSourceButton: React.FC<UploadSourceButtonProps> = ({ 
  icon: Icon, 
  label, 
  onClick,
  className
}) => {
  return (
    <Button 
      variant="outline" 
      className={cn(
        "flex items-center space-x-2 px-4 py-6 h-auto border-upload-border hover:bg-upload-hover transition-all",
        className
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 text-upload-accent" />
      <span>{label}</span>
    </Button>
  );
};

export default UploadSourceButton;
