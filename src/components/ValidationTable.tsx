
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export interface FileData {
  id: string;
  name: string;
  displayName: string;
  fileType: 'activity' | 'organisation';
  uploadDate: string;
  isValid: boolean;
  publishStatus: 'draft' | 'published';
  xmlUrl?: string;
  iatiRegistryUrl?: string;
  iatiOrgRegistryUrl?: string;
}

interface ValidationTableProps {
  files: FileData[];
  onPublishToggle: (fileId: string) => void;
}

const ValidationTable: React.FC<ValidationTableProps> = ({ files, onPublishToggle }) => {
  const { toast } = useToast();

  const handleDownloadXML = (file: FileData) => {
    toast({
      title: "Download XML",
      description: `Downloading ${file.name} XML file`,
    });
  };

  const handleOpenLink = (url: string, linkType: string) => {
    toast({
      title: "Open Link",
      description: `Opening ${linkType} link in a new tab`,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>File Type</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Validity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>{file.displayName || file.name}</span>
                </div>
              </TableCell>
              <TableCell>
                {file.fileType === 'activity' ? 'Activity File' : 'Organisation File'}
              </TableCell>
              <TableCell>{file.uploadDate}</TableCell>
              <TableCell>
                <Badge variant={file.isValid ? 'default' : 'destructive'} className={file.isValid ? 'bg-green-500' : ''}>
                  {file.isValid ? 'Valid' : 'Invalid'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={file.publishStatus === 'published' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-amber-100 text-amber-800 border-amber-200'}>
                  {file.publishStatus === 'published' ? 'Published' : 'Draft'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 px-2" 
                    onClick={() => handleDownloadXML(file)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    XML
                  </Button>
                  
                  {file.iatiRegistryUrl && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 px-2" 
                      onClick={() => handleOpenLink(file.iatiRegistryUrl!, 'IATI Registry')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Registry
                    </Button>
                  )}
                  
                  {file.iatiOrgRegistryUrl && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 px-2" 
                      onClick={() => handleOpenLink(file.iatiOrgRegistryUrl!, 'IATI Org Registry')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Org Registry
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant={file.publishStatus === 'published' ? 'destructive' : 'default'}
                    className={`h-8 px-3 ${file.publishStatus === 'published' ? '' : 'bg-teal-600 hover:bg-teal-700'}`}
                    onClick={() => onPublishToggle(file.id)}
                    disabled={!file.isValid}
                  >
                    {file.publishStatus === 'published' ? 'Unpublish' : 'Publish'}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ValidationTable;
