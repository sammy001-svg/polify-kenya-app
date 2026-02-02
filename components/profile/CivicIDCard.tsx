import { QrCode, Fingerprint, Shield, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CivicIDCardProps {
  user: {
    fullName: string;
    role: string;
    id: string;
    civicId?: string;
    username?: string;
    avatarUrl?: string;
    ward?: string;
  };
}

export function CivicIDCard({ user }: CivicIDCardProps) {
  return (
    <div className="relative w-full aspect-video md:aspect-[1.586/1] bg-linear-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] border border-white/10 group select-none">
      
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-kenya-green/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

      {/* Header */}
      <div className="relative z-10 p-6 flex justify-between items-start">
        <div className="flex items-center gap-3">
           <div className="w-10 h-7 rounded-[2px] overflow-hidden flex flex-col shadow-md border border-white/20 shrink-0">
             <div className="h-[30%] bg-black w-full" />
             <div className="h-[40%] bg-kenya-red w-full border-y-[1.5px] border-white z-10" />
             <div className="h-[30%] bg-kenya-green w-full" />
           </div>
           <div className="w-px h-8 bg-white/10" />
           <Shield className="w-8 h-8 text-white fill-kenya-red/20" />
           <div className="flex flex-col">
             <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Republic of Kenya</span>
             <span className="text-sm font-black text-white tracking-widest">CIVIC IDENTIFICATION</span>
           </div>
        </div>
        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center backdrop-blur-xs border border-white/10">
           <QrCode className="w-8 h-8 text-white/80" />
        </div>
      </div>

      {/* User Details */}
      <div className="relative z-10 px-6 mt-2 flex items-end justify-between">
         <div className="flex gap-4 items-end">
            <div className="relative">
                <Avatar className="w-24 h-24 border-2 border-kenya-green shadow-lg ring-4 ring-black/50">
                    <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                    <AvatarFallback className="bg-gray-800 text-2xl font-black text-gray-500">
                        {user.fullName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-kenya-green text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white max-w-fit">
                    <Zap className="w-3 h-3 fill-black" /> ACTIVE
                </div>
            </div>
            
            <div className="pb-1 space-y-0.5">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">@{user.username || 'citizen'}</div>
                <h3 className="text-xl md:text-2xl font-black text-white leading-none whitespace-nowrap">{user.fullName}</h3>
                <div className="flex items-center gap-3 pt-1">
                     <div>
                        <div className="text-[9px] text-gray-500 uppercase">Role</div>
                        <div className="text-xs font-bold text-kenya-gold">{user.role}</div>
                     </div>
                     <div className="w-px h-6 bg-white/10" />
                     <div>
                        <div className="text-[9px] text-gray-500 uppercase">Ward</div>
                        <div className="text-xs font-bold text-white">{user.ward || 'Westlands'}</div>
                     </div>
                </div>
            </div>
         </div>
      </div>

      {/* Footer / ID Number */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-md border-t border-white/5 flex justify-between items-center">
         <div className="font-mono text-xs text-gray-500 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-gray-600" />
            <span>ID: {user.civicId || user.id}</span>
         </div>
         <div className="h-2 w-24 bg-linear-to-r from-kenya-red via-white to-kenya-green rounded-full opacity-50" />
      </div>
      
      {/* Holographic shine effect */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:animate-shine pointer-events-none" />
    </div>
  );
}
