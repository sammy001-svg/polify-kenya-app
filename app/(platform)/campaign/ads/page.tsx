'use client';

import { useState, useEffect, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MonitorPlay, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { createAd, getMyActiveAd, Advertisement } from './actions';

const initialState = {
    error: '',
    success: false
};

export default function AdsManagerPage() {
    const { toast } = useToast();
    const [currentAd, setCurrentAd] = useState<Advertisement | null>(null);
    const [previewUrl, setPreviewUrl] = useState('');
    
    // Server Action Hook
    const [state, formAction, isPending] = useActionState(createAd, initialState);

    useEffect(() => {
        async function loadAd() {
            const ad = await getMyActiveAd();
            setCurrentAd(ad);
        }
        loadAd();
    }, [state.success]); // Reload when success changes

    useEffect(() => {
        if (state.error) {
            toast({ title: "Error", description: state.error, variant: "destructive" });
        }
        if (state.success) {
            toast({ title: "Success", description: "Your ad is now live on the Civic Feed!" });
            // content reset handled by form reset or just showing current ad update
            const form = document.querySelector('form') as HTMLFormElement;
            if(form) form.reset();
            setPreviewUrl('');
        }
    }, [state, toast]);


    return (
        <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-border pb-6">
                <Link href="/campaign" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <MonitorPlay className="w-6 h-6 text-kenya-gold" />
                        Ad Manager
                    </h1>
                    <p className="text-sm text-brand-text-muted">Manage your landscape flyers appearing on the Civic Feed.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="space-y-6">
                    <Card className="border-kenya-gold/30">
                        <CardHeader>
                            <CardTitle>Post New Advertisement</CardTitle>
                            <CardDescription>
                                Uploading a new ad will automatically archive your current active ad.
                                Only one ad can be active at a time.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={formAction} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Headline / Title</label>
                                    <Input 
                                        name="title" 
                                        placeholder="e.g. Rally at Uhuru Park this Friday!" 
                                        required 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Image URL (Landscape)</label>
                                    <Input 
                                        name="image_url" 
                                        placeholder="https://..." 
                                        required 
                                        onChange={(e) => setPreviewUrl(e.target.value)}
                                    />
                                    <p className="text-xs text-brand-text-muted">
                                        Recommended size: 1920x1080px or 16:9 aspect ratio.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Target Link (Optional)</label>
                                    <Input 
                                        name="target_url" 
                                        placeholder="https://mysite.com or /profile" 
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button 
                                        type="submit" 
                                        className="w-full bg-kenya-gold text-black hover:bg-kenya-gold/90 font-bold"
                                        disabled={isPending}
                                    >
                                        {isPending ? 'Publishing...' : 'Publish Ad & Go Live'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Section */}
                <div className="space-y-6">
                    <h3 className="font-bold text-lg text-brand-text-muted uppercase tracking-wider">Preview</h3>
                    
                    {/* Live Preview of Input */}
                    {previewUrl && (
                         <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-dashed border-kenya-gold/50 bg-black/40">
                             <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+Image+URL')}
                             />
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                 <span className="bg-black/50 px-3 py-1 text-xs text-white uppercase font-bold backdrop-blur-md rounded-full">
                                     Preview
                                 </span>
                             </div>
                         </div>
                    )}

                    {/* Current Active Ad Details */}
                    {currentAd && !previewUrl && (
                        <Card className="bg-brand-surface-secondary border-none">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        Currently Active
                                    </CardTitle>
                                    <span className="text-xs font-mono text-brand-text-muted">
                                        Posted: {new Date(currentAd.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                                    <Image 
                                        src={currentAd.image_url} 
                                        alt={currentAd.title} 
                                        fill 
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{currentAd.title}</h4>
                                    {currentAd.target_url && (
                                        <a href={currentAd.target_url} target="_blank" className="text-sm text-blue-400 flex items-center gap-1 hover:underline">
                                            {currentAd.target_url} <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {!currentAd && !previewUrl && (
                        <div className="h-48 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-brand-text-muted">
                            <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                            <p>No active ads running.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
