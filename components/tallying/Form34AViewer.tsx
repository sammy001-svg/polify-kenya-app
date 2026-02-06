"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileCheck, Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Form34AViewerProps {
    stationName: string;
    candidateName: string;
    votes: number;
}

export function Form34AViewer({ stationName, candidateName, votes }: Form34AViewerProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Mock Form 34A URL - in production this would be real specific to the station
    const mockFormUrl = "https://images.unsplash.com/photo-1618059737785-5b4869503463?q=80&w=1000&auto=format&fit=crop";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] text-kenya-green hover:text-white hover:bg-kenya-green/20 px-2 gap-1 border border-kenya-green/30">
                    <FileCheck className="w-3 h-3" /> Verify Form 34A
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-brand-surface border-white/10 text-white h-[90vh] flex flex-col">
                <DialogHeader className="border-b border-white/10 pb-4">
                    <DialogTitle className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                            <FileCheck className="w-5 h-5 text-kenya-green" />
                            FORM 34A VERIFICATION
                        </span>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="w-4 h-4" /> Download
                        </Button>
                    </DialogTitle>
                    <div className="flex gap-6 text-sm text-gray-400 mt-2 font-mono">
                        <span>POLLING STATION: <span className="text-white">{stationName}</span></span>
                        <span>CANDIDATE: <span className="text-white">{candidateName}</span></span>
                        <span>RECORDED VOTES: <span className="text-white">{votes}</span></span>
                    </div>
                </DialogHeader>
                
                <div className="flex-1 relative bg-white/5 rounded-lg overflow-hidden mt-4 group">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Image 
                            src={mockFormUrl} 
                            alt="Form 34A" 
                            fill 
                            className="object-contain"
                        />
                    </div>
                    
                    {/* Watermark */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 rotate-45">
                        <span className="text-9xl font-black text-white">OFFICIAL COPY</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
