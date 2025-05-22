
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface IATIRegistryFormProps {
  onBack: () => void;
  onNext: () => void;
}

const IATIRegistryForm: React.FC<IATIRegistryFormProps> = ({ onBack, onNext }) => {
  const { toast } = useToast();

  const handleNext = () => {
    // In a real application, this would validate and process the form
    toast({
      title: "Next Step",
      description: "Moving to validation & preview step",
    });
    onNext();
  };

  const handleDashboard = () => {
    toast({
      title: "Dashboard",
      description: "Navigating to dashboard",
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In and Connect IATI Registry</h2>
      <p className="text-center text-gray-600 mb-8">
        Link to the IATI Registry to simplify publishing.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="bg-teal-500 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <p className="font-medium mb-1">Your registration to IATI will take 24-hours to get verified. Till then, your data will be stored as Draft.</p>
            <p className="text-gray-600">
              You can publish your files to IATI from{" "}
              <a href="#" className="text-blue-600 underline">Your Data Hub</a> once you get verified.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Sign in*</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-teal-600 hover:bg-teal-700 h-12 w-full flex items-center justify-center gap-2"
            onClick={() => toast({ title: "Google Sign In", description: "Google authentication would start here" })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Sign in with Google
          </Button>
          
          <Button 
            className="bg-teal-600 hover:bg-teal-700 h-12 w-full flex items-center justify-center gap-2"
            onClick={() => toast({ title: "LinkedIn Sign In", description: "LinkedIn authentication would start here" })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
            </svg>
            Sign in with LinkedIn
          </Button>
          
          <Button 
            className="bg-teal-600 hover:bg-teal-700 h-12 w-full flex items-center justify-center gap-2"
            onClick={() => toast({ title: "OneDrive Sign In", description: "OneDrive authentication would start here" })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            </svg>
            Sign in with One Drive
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Connect to IATI Registry*</h3>
        <div className="space-y-4">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Publisher ID *" 
              className="h-12 pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <Input 
              type="text" 
              placeholder="IATI Registration Identifier *" 
              className="h-12 pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-500 pl-1 -mt-2">
            Not yet registered? Go <a href="#" className="text-blue-600">here</a>
          </div>
          
          <div className="relative">
            <Input 
              type="text" 
              placeholder="API Token *" 
              className="h-12 pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-500 pl-1 -mt-2">
            Learn how to find or generate your API key <a href="#" className="text-blue-600">here</a>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
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
          variant="outline"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center"
          onClick={handleNext}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </>
  );
};

export default IATIRegistryForm;
