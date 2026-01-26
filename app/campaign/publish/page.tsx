'use client';

import { useState } from 'react';
import { CONTENT_TYPES, CONTENT_TAGS, ContentType, ContentTag } from '@/lib/campaign-posts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Upload, 
  Video, 
  Send,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function PublishPage() {
  const [selectedType, setSelectedType] = useState<ContentType>('video');
  const [selectedTag, setSelectedTag] = useState<ContentTag>('Update');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
       {/* Header */}
       <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
             <div className="flex items-center gap-4">
                <Link href="/campaign" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">Content Studio</h1>
                    <p className="text-sm text-brand-text-muted">Create engaging updates for your constituents.</p>
                </div>
            </div>
            <Button className="bg-kenya-red hover:bg-kenya-red/90 text-white gap-2">
                <Send className="w-4 h-4" /> Publish Now
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* 1. Content Type Selector */}
                <section className="space-y-3">
                    <h3 className="font-bold text-lg">1. Select Content Format</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {CONTENT_TYPES.map((type) => (
                            <div 
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 text-center h-32 ${
                                    selectedType === type.id 
                                    ? 'bg-brand-surface-secondary border-kenya-green ring-2 ring-kenya-green/20' 
                                    : 'bg-brand-surface border-border hover:border-brand-text-muted'
                                }`}
                            >
                                <span className="text-3xl">{type.icon}</span>
                                <span className="text-sm font-bold">{type.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. Content Details */}
                <section className="space-y-4">
                    <h3 className="font-bold text-lg">2. Create Content</h3>
                    <Card className="border-border">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Headline / Title</label>
                                <Input 
                                    placeholder="e.g., Why I Voted NO on the Finance Bill" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-lg font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold">Content Classification (Mandatory)</label>
                                <div className="flex flex-wrap gap-2">
                                    {CONTENT_TAGS.map((tag) => (
                                        <Badge 
                                            key={tag}
                                            variant={selectedTag === tag ? 'default' : 'outline'}
                                            className={`cursor-pointer px-3 py-1.5 ${
                                                selectedTag === tag 
                                                ? 'bg-brand-text text-brand-surface' 
                                                : 'text-brand-text-muted hover:border-brand-text'
                                            }`}
                                            onClick={() => setSelectedTag(tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <p className="text-xs text-brand-text-muted">
                                    *Correct tagging helps voters filter content effectively.
                                </p>
                            </div>

                            {selectedType === 'video' || selectedType === 'highlight' ? (
                                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-brand-surface-secondary/30">
                                    <div className="w-16 h-16 rounded-full bg-brand-surface-secondary flex items-center justify-center">
                                        <Video className="w-8 h-8 text-brand-text-muted" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold">Upload Vertical Video (9:16)</p>
                                        <p className="text-sm text-brand-text-muted mb-4">Max size 500MB. MP4, MOV.</p>
                                        <Button variant="outline" className="gap-2">
                                            <Upload className="w-4 h-4" /> Select File
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Post Body</label>
                                    <Textarea 
                                        placeholder="Write your update here..." 
                                        className="min-h-[200px]"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                            )}

                             {(selectedType === 'video' || selectedType === 'highlight') && (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Caption / Description</label>
                                    <Textarea 
                                        placeholder="Add a caption..." 
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                             )}
                        </CardContent>
                    </Card>
                </section>
            </div>

            {/* Preview Section */}
            <div>
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                     <Eye className="w-5 h-5 text-brand-text-muted" /> Mobile Preview
                 </h3>
                 <div className="border-4 border-brand-text rounded-3xl overflow-hidden bg-brand-bg relative h-[600px] shadow-2xl mx-auto max-w-[320px]">
                     {/* StatusBar */}
                     <div className="h-6 bg-brand-text text-white text-[10px] flex items-center justify-between px-4">
                         <span>9:41</span>
                         <div className="flex gap-1">
                             <div className="w-3 h-3 rounded-full bg-white/20"/>
                             <div className="w-3 h-3 rounded-full bg-white/20"/>
                         </div>
                     </div>

                     {/* Feed Item Preview */}
                     <div className="p-4">
                         <div className="flex items-center gap-3 mb-3">
                             <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
                             <div>
                                 <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-1" />
                                 <div className="w-16 h-3 bg-gray-100 rounded animate-pulse" />
                             </div>
                         </div>
                         
                         {/* Content Preview */}
                         <div className="aspect-4/5 bg-brand-surface-secondary rounded-xl mb-3 overflow-hidden flex items-center justify-center relative">
                             {(selectedType === 'video' || selectedType === 'highlight') ? (
                                  <div className="flex flex-col items-center text-brand-text-muted">
                                      <Video className="w-12 h-12 mb-2" />
                                      <span className="text-xs">Video Preview</span>
                                  </div>
                             ) : (
                                 <div className="p-4 text-left w-full h-full text-xs">
                                     <h4 className="font-bold text-sm mb-2">{title || 'Post Title'}</h4>
                                     <p className="text-brand-text-muted line-clamp-6">{content || 'Post content will appear here...'}</p>
                                 </div>
                             )}
                             
                             {/* Tag Overlay */}
                             <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-md text-xs font-bold">
                                 {selectedTag}
                             </div>
                         </div>

                         {/* Actions */}
                         <div className="flex items-center justify-between mb-2">
                             <div className="flex gap-4">
                                 <div className="w-6 h-6 rounded bg-gray-200" />
                                 <div className="w-6 h-6 rounded bg-gray-200" />
                                 <div className="w-6 h-6 rounded bg-gray-200" />
                             </div>
                         </div>
                         <div className="w-32 h-3 bg-gray-100 rounded mb-2" />
                         <div className="w-full h-12 bg-gray-50 rounded" />
                     </div>
                     
                     <div className="absolute bottom-0 left-0 right-0 p-4 bg-brand-surface/90 backdrop-blur border-t border-border text-center">
                         <p className="text-xs text-brand-text-muted">
                             This is how your post will appear in the Civic Feed.
                         </p>
                     </div>
                 </div>
            </div>
        </div>
    </div>
  );
}
