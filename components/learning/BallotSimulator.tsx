'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
// import Image from 'next/image';

interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string; // Ideally an image URL or icon
  photo: string;
}

const MOCK_CANDIDATES: Candidate[] = [
  { id: 'c1', name: 'John Kamau', party: 'Vision Party', symbol: '🦁', photo: '/placeholder-avatar.jpg' },
  { id: 'c2', name: 'Amina Mohamed', party: 'Unity Alliance', symbol: '🕊️', photo: '/placeholder-avatar.jpg' },
  { id: 'c3', name: 'David Omondi', party: 'Progressive Movement', symbol: '🌅', photo: '/placeholder-avatar.jpg' },
  { id: 'c4', name: 'Sarah Wanjiku', party: 'Green Future', symbol: '🌳', photo: '/placeholder-avatar.jpg' },
];

export function BallotSimulator() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isSpoilt, setIsSpoilt] = useState(false); // Simulate spoilt vote logic if needed (e.g. marking 2)
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // For this simple simulator, we just allow selecting one.
  // To simulate "spoilt", we could add a mode where users can click multiple?
  // Let's keep it simple: valid vote vs no vote.

  const handleVote = (id: string) => {
    if (submitted) return;
    if (selectedCandidate === id) {
      setSelectedCandidate(null); // Unselect
    } else {
      setSelectedCandidate(id);
    }
  };

  const castBallot = () => {
    setSubmitted(true);
    if (!selectedCandidate) {
      setFeedback('Error: You did not mark any candidate. This would be an invalid vote.');
      setIsSpoilt(true);
    } else {
      setFeedback('Success! Your vote has been correctly marked and cast.');
      setIsSpoilt(false);
    }
  };

  const reset = () => {
    setSelectedCandidate(null);
    setSubmitted(false);
    setFeedback(null);
    setIsSpoilt(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-brand-surface border border-border rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center border-b border-border pb-4">
          PRESIDENTIAL BALLOT PAPER
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 font-bold text-sm text-brand-text-muted px-4 mb-2">
            <div className="col-span-2">Photo</div>
            <div className="col-span-5">Candidate Name</div>
            <div className="col-span-3">Party Symbol</div>
            <div className="col-span-2 text-center">Mark Here</div>
          </div>

          {MOCK_CANDIDATES.map((candidate) => (
            <div 
              key={candidate.id}
              className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg border-2 transition-all ${
                selectedCandidate === candidate.id 
                  ? 'border-kenya-green bg-kenya-green/10' 
                  : 'border-border bg-brand-surface-secondary hover:border-brand-text-muted'
              }`}
              onClick={() => handleVote(candidate.id)}
            >
               <div className="col-span-2 relative h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                  {/* Placeholder for candidate photo */}
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-black">
                    {candidate.name[0]}
                  </div>
               </div>
               <div className="col-span-5 font-bold">{candidate.name}<br/><span className="text-xs font-normal text-brand-text-muted">{candidate.party}</span></div>
               <div className="col-span-3 text-2xl">{candidate.symbol}</div>
               <div className="col-span-2 flex justify-center">
                  <div className="w-8 h-8 border-2 border-black bg-white rounded flex items-center justify-center text-black">
                     {selectedCandidate === candidate.id && (
                        <span className="text-2xl font-bold">X</span>
                     )}
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-4">
            {!submitted ? (
                <Button onClick={castBallot} size="lg" className="w-full sm:w-auto bg-brand-highlight hover:bg-brand-highlight/80 text-white">
                    Cast Your Vote
                </Button>
            ) : (
                <Button onClick={reset} variant="outline" size="lg" className="w-full sm:w-auto">
                    Try Again
                </Button>
            )}
        </div>
      </div>

      {submitted && (
        <Card className={`border-l-4 ${isSpoilt ? 'border-l-kenya-red' : 'border-l-kenya-green'} bg-brand-surface`}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {isSpoilt ? <AlertCircle className="text-kenya-red" /> : <CheckCircle className="text-kenya-green" />}
                    {isSpoilt ? 'Invalid Vote' : 'Valid Vote'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{feedback}</p>
                {!isSpoilt && (
                    <div className="mt-4 p-4 bg-brand-surface-secondary rounded-lg text-sm">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-400" />
                            Did you know?
                        </h4>
                        <p>A vote is only valid if you mark clearly inside ONE box corresponding to your chosen candidate. Any other marks or writing outside the box can make your vote &quot;spoilt&quot;.</p>
                    </div>
                )}
                 {isSpoilt && (
                    <div className="mt-4 p-4 bg-brand-surface-secondary rounded-lg text-sm">
                        <h4 className="font-bold mb-2 text-kenya-red">Why this would be rejected:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>You didn&apos;t mark any candidate.</li>
                            <li>(In real life) Marking more than one box.</li>
                            <li>(In real life) Writing your name or signature on the paper.</li>
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
      )}
    </div>
  );
}
