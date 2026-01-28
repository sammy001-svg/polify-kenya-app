"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/components/ui/button';

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export function FileUpload({ files, onFilesChange }: FileUploadProps) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesChange([...files, ...acceptedFiles]);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (name: string) => {
    onFilesChange(files.filter(f => f.name !== name));
  };

  return (
    <div className="space-y-6">
      {/* Drop Area */}
      <div 
        {...getRootProps()} 
        className={cn(
            "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors",
            isDragActive ? "border-kenya-red bg-kenya-red/10" : "border-border hover:border-brand-text-muted hover:bg-brand-surface-secondary"
        )}
      >
        <input {...getInputProps()} />
        <div className="w-16 h-16 bg-brand-surface-highlight rounded-full flex items-center justify-center mb-4">
             <UploadCloud className="w-8 h-8 text-brand-text" />
        </div>
        <p className="text-lg font-medium text-center mb-1">
            {isDragActive ? "Drop the files here..." : "Drag & drop files here, or click to select files"}
        </p>
        <p className="text-sm text-brand-text-muted text-center">
            Supports MP4, MOV, PDF (Policies), and PNG (Infographics)
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
          <div className="space-y-2">
              <h3 className="text-sm font-semibold text-brand-text-muted uppercase">Selected Files</h3>
              {files.map((file) => (
                  <div key={file.name} className="flex items-center justify-between p-3 bg-brand-surface-secondary rounded-lg shadow-sm border border-border">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-highlight rounded flex items-center justify-center">
                              <File className="w-5 h-5 text-brand-text-muted" />
                          </div>
                          <div>
                              <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                              <p className="text-xs text-brand-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)}>
                          <X className="w-4 h-4" />
                      </Button>
                  </div>
              ))}
              
              <div className="pt-4 flex justify-end">
                <Button className="w-full md:w-auto">
                    Upload {files.length} files
                </Button>
              </div>
          </div>
      )}
    </div>
  );
}
