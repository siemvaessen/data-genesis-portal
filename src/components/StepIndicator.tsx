
import React from 'react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  className
}) => {
  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div 
                className={cn(
                  "h-[2px] w-8", 
                  index < currentStep ? "bg-upload-accent" : "bg-gray-200"
                )}
              />
            )}
            <div 
              className={cn(
                "rounded-full flex items-center justify-center font-medium text-sm", 
                index + 1 === currentStep 
                  ? "w-8 h-8 bg-upload-accent text-white" 
                  : index + 1 < currentStep
                    ? "w-8 h-8 bg-upload-accent text-white"
                    : "w-8 h-8 bg-gray-100 text-gray-500 border border-gray-200"
              )}
            >
              {index + 1}
            </div>
          </React.Fragment>
        ))}
      </div>
      <p className="text-sm font-medium text-gray-700">
        Step {currentStep} of {totalSteps}: Upload Data Files
      </p>
    </div>
  );
};

export default StepIndicator;
