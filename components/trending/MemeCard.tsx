"use client";

import { useState } from "react";
import { type PoliticalMeme } from "@/lib/demo-data";
import { CIVIC_CREATORS } from "@/lib/creators";
import { ContentTypeBadge } from "@/components/creators/ContentTypeBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Laugh, CheckCircle2, Share2, Info, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface MemeCardProps {
  meme: PoliticalMeme;
}

export function MemeCard({ meme }: MemeCardProps) {
  const [showContext, setShowContext] = useState(false);
  const [activeReaction, setActiveReaction] = useState<'fire' | 'lol' | 'facts' | null>(null);
  const creator = meme.creatorId ? CIVIC_CREATORS.find(c => c.id === meme.creatorId) : null;

  const handleReact = (type:  'fire' | 'lol' | 'facts') => {
    setActiveReaction(activeReaction === type ? null : type);
  };

  return (
    <Card className="group bg-brand-surface border-border hover:border-kenya-gold/50 transition-all overflow-hidden">
      <CardContent className="p-0">
        {/* Meme Caption Area */}
        <div className="relative aspect-square bg-linear-to-br from-brand-highlight to-brand-surface-secondary flex items-center justify-center p-6">
          <p className="text-2xl md:text-3xl font-bold text-center leading-tight">
            {meme.caption}
          </p>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-kenya-red rounded-full text-[10px] font-bold uppercase tracking-wide">
            {meme.category}
          </div>
          
          {/* Content Type Badge */}
          <div className="absolute top-3 right-3">
            <ContentTypeBadge type={meme.contentType} size="sm" />
          </div>
          
          {/* Get Context Button */}
          <HoverCard open={showContext} onOpenChange={setShowContext}>
            <HoverCardTrigger asChild>
              <button 
                className="absolute bottom-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black/90 transition-colors"
                onClick={() => setShowContext(!showContext)}
              >
                <Info className="w-4 h-4 text-white" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-brand-surface border-kenya-gold/30 shadow-xl">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-kenya-gold uppercase">The Real Story</h4>
                <p className="text-sm text-brand-text">{meme.context}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        {/* Reactions & Share */}
        <div className="p-4 space-y-3">
          {/* Reaction Buttons */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => handleReact('fire')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                  activeReaction === 'fire' 
                    ? 'border-orange-500 bg-orange-500/20 text-orange-400' 
                    : 'border-border bg-brand-surface-secondary hover:border-orange-500/50'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span className="text-xs font-bold">{meme.reactions.fire.toLocaleString()}</span>
              </button>
              
              <button
                onClick={() => handleReact('lol')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                  activeReaction === 'lol' 
                    ? 'border-kenya-gold bg-kenya-gold/20 text-kenya-gold' 
                    : 'border-border bg-brand-surface-secondary hover:border-kenya-gold/50'
                }`}
              >
                <Laugh className="w-4 h-4" />
                <span className="text-xs font-bold">{meme.reactions.lol.toLocaleString()}</span>
              </button>
              
              <button
                onClick={() => handleReact('facts')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                  activeReaction === 'facts' 
                    ? 'border-green-500 bg-green-500/20 text-green-400' 
                    : 'border-border bg-brand-surface-secondary hover:border-green-500/50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold">{meme.reactions.facts.toLocaleString()}</span>
              </button>
            </div>

            <Button size="sm" variant="secondary" className="gap-2">
              <Share2 className="w-3.5 h-3.5" />
              <span className="text-xs">{meme.shares}</span>
            </Button>
          </div>

          {/* Creator Attribution */}
          {creator && (
            <div className="pt-3 border-t border-border">
              <a 
                href={`/creators/${creator.id}`}
                className="flex items-center gap-2 hover:bg-brand-surface-highlight p-2 rounded-lg transition-colors group/creator"
              >
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {creator.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-brand-text group-hover/creator:text-white transition-colors truncate">
                      {creator.name}
                    </p>
                    {creator.isVerified && (
                      <BadgeCheck className="w-3 h-3 text-kenya-green shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-brand-text-muted truncate">{creator.username}</p>
                </div>
              </a>
            </div>
          )}

          {/* Timestamp */}
          <p className="text-xs text-brand-text-muted">{meme.timestamp}</p>
        </div>
      </CardContent>
    </Card>
  );
}
