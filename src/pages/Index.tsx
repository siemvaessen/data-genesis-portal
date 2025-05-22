
import FileUpload from '../components/FileUpload';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Data Upload and Publishing Portal</h1>
          <p className="text-gray-600">
            Upload your data files, validate them, and publish to our database in five easy steps.
          </p>
        </div>
        
        <FileUpload />
      </div>
    </div>
  );
};

export default Index;
