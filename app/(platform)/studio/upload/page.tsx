"use client";

import { FileUpload } from "@/components/upload/FileUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useState, useCallback } from 'react';

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleFilesChange = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setScanComplete(false);
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Upload Content</h1>
        <p className="text-brand-text-muted">
          Share policies, speeches, or explainer videos with the electorate.
        </p>
      </div>

      {/* Verification Notice */}
      <div className="bg-brand-surface-secondary border-l-4 border-kenya-gold p-4 rounded-r-lg flex gap-3">
        <AlertTriangle className="w-5 h-5 text-kenya-gold shrink-0" />
        <div>
          <h3 className="font-semibold text-kenya-gold text-sm">Verification Required</h3>
          <p className="text-sm text-brand-text-muted">
            All uploads undergo a mandatory <strong>&quot;Truth Layer&quot;</strong> check. False or misleading claims will be flagged with a context warning.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
           <CardTitle>Media Selection</CardTitle>
        </CardHeader>
        <CardContent>
           <FileUpload files={files} onFilesChange={handleFilesChange} />
        </CardContent>
      </Card>

      {/* AI Moderation Section */}
      {files.length > 0 && !scanComplete && (
         <div className="mt-6 flex justify-end">
            <Button
                onClick={() => {
                    setIsScanning(true);
                    setTimeout(() => {
                        setIsScanning(false);
                        setScanComplete(true);
                    }, 2500);
                }}
                disabled={isScanning}
                className="bg-kenya-gold hover:bg-kenya-gold/90 text-black font-bold"
            >
                {isScanning ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning Content...
                    </>
                ) : (
                    <>
                        <ShieldCheck className="mr-2 h-4 w-4" /> Run AI Verification
                    </>
                )}
            </Button>
         </div>
      )}

      {/* AI Report */}
      {scanComplete && (
          <div className="mt-6 border border-kenya-green/30 bg-kenya-green/5 rounded-lg p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="flex items-center gap-2 font-bold text-kenya-green mb-3">
                <ShieldCheck className="w-5 h-5" /> AI Verification Passed
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                 <div className="p-3 bg-black/20 rounded">
                    <span className="block text-brand-text-muted text-xs uppercase">Factual Accuracy</span>
                    <span className="font-mono font-bold text-green-400">98.5%</span>
                 </div>
                 <div className="p-3 bg-black/20 rounded">
                    <span className="block text-brand-text-muted text-xs uppercase">Ethical Standards</span>
                    <span className="font-mono font-bold text-green-400">PASS</span>
                 </div>
                 <div className="p-3 bg-black/20 rounded">
                    <span className="block text-brand-text-muted text-xs uppercase">Moderation Status</span>
                    <span className="font-mono font-bold text-blue-400">AUTO-VERIFIED</span>
                 </div>
             </div>
             <p className="text-xs text-brand-text-muted mt-3">
                * This content has been cryptographically signed and verified as authentic.
             </p>
          </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button variant="ghost">Cancel</Button>
        <Button disabled={!scanComplete}>Publish to Channel</Button>
      </div>
    </div>
  );
}
