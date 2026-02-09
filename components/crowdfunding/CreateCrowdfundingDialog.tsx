/* cSpell:ignore supabase */
"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { createCampaign } from "@/app/(platform)/crowdfunding/actions";
import { useToast } from "@/components/ui/use-toast";

export function CreateCrowdfundingDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("Community");
  const [impact, setImpact] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB.",
        variant: "destructive",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const removeImage = () => {
    setImageFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!title.trim() || !description.trim() || !targetAmount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(targetAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Target amount must be a positive number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("crowdfunding")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("crowdfunding")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      const res = await createCampaign({
        title: title.trim(),
        description: description.trim(),
        category,
        impact_statement: impact.trim(),
        target_amount: amount,
        image_url: imageUrl,
      });

      if (res.error) throw new Error(res.error);

      setOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Campaign created successfully!",
      });
      router.refresh();
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTargetAmount("");
    setCategory("Community");
    setImpact("");
    removeImage();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) resetForm(); // Optional: reset on close too if desired
    }}>
      <DialogTrigger asChild>
        <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20 transition-all hover:scale-[1.02]">
          <Plus className="w-4 h-4 mr-2" />
          Start Crowdfunding
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-brand-surface border-white/10 text-brand-text shadow-2xl backdrop-blur-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
            Create Campaign
          </DialogTitle>
          <DialogDescription className="text-brand-text-muted">
            Launch a new initiative. Describe your cause clearly to garner support.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">
              Title <span className="text-kenya-red">*</span>
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Community Library Project"
              className="bg-brand-surface-secondary/50 border-white/10 focus:border-brand-primary/50 transition-colors"
              required
              disabled={loading}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">
                Target (KES) <span className="text-kenya-red">*</span>
              </label>
              <Input
                id="amount"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="50,000"
                className="bg-brand-surface-secondary/50 border-white/10 focus:border-brand-primary/50"
                required
                min="100"
                disabled={loading}
              />
            </div>
            
            <div className="grid gap-2">
              <label
                htmlFor="category"
                className="text-xs font-bold uppercase tracking-wider text-brand-text-muted"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 bg-brand-surface-secondary/50 border border-white/10 rounded-md px-3 text-sm text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-primary/50 appearance-none"
                disabled={loading}
              >
                <option value="Community">Community Project</option>
                <option value="Emergency">Emergency Relief</option>
                <option value="Medical">Medical Support</option>
                <option value="Climate">Climate Action</option>
                <option value="Education">Education & Skills</option>
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="description"
              className="text-xs font-bold uppercase tracking-wider text-brand-text-muted"
            >
              Description <span className="text-kenya-red">*</span>
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell your story. Why is this important?"
              className="min-h-[100px] bg-brand-surface-secondary/50 border-white/10 focus:border-brand-primary/50 resize-none"
              required
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="impact"
              className="text-xs font-bold uppercase tracking-wider text-brand-text-muted"
            >
              Impact Statement
            </label>
            <Input
              id="impact"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              placeholder="e.g. Will provide books for 500 children"
              className="bg-brand-surface-secondary/50 border-white/10 focus:border-brand-primary/50"
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="image"
              className="text-xs font-bold uppercase tracking-wider text-brand-text-muted block"
            >
              Cover Image
            </label>
            <div className="relative group cursor-pointer h-32 w-full rounded-md border border-dashed border-white/20 overflow-hidden hover:border-brand-primary/50 transition-colors">
               <Input
                 ref={fileInputRef}
                 id="image"
                 type="file"
                 accept="image/*"
                 onChange={handleFileChange}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                 disabled={loading}
               />
               {previewUrl ? (
                 <div className="absolute inset-0 z-10">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded-md">Change Image</span>
                   </div>
                 </div>
               ) : (
                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brand-text-muted">
                   <Upload className="w-6 h-6" />
                   <span className="text-xs font-medium">Click to upload cover image</span>
                 </div>
               )}
            </div>
            {previewUrl && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="w-fit text-xs text-kenya-red hover:text-kenya-red/80 h-auto p-0"
                disabled={loading}
              >
                Remove Image
              </Button>
            )}
          </div>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-brand-primary hover:bg-brand-primary/90 text-white min-w-[140px]"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {loading ? "Creating..." : "Launch Campaign"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
