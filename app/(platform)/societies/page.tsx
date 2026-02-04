import React from 'react';
import { SocietiesList } from '@/components/societies/SocietiesList';
import { Users } from 'lucide-react';

export default function SocietiesPage() {
  return (
    <div className="min-h-screen space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-orange-500/10 mb-1">
                <Users className="w-6 h-6 text-orange-500" />
             </div>
             <h1 className="text-3xl font-black bg-white bg-clip-text text-transparent w-fit">
               Kenyan Groups
             </h1>
        </div>
        <p className="text-brand-text-muted max-w-2xl ml-1">
          Explore registered societies and community groups across Kenya. Connect with Youth, Women, Disability, and Special Interest groups at national and grassroot levels.
        </p>
      </div>

      <SocietiesList />
    </div>
  );
}
