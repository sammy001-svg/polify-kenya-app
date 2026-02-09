"use client";

import { useState } from "react";
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
import { Loader2, Plus } from "lucide-react";
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
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        title,
        description,
        category,
        impact_statement: impact,
        target_amount: parseFloat(targetAmount),
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
    setImageFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Start Crowdfunding
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-brand-surface border-border text-brand-text">
        <DialogHeader>
          <DialogTitle>Create Crowdfunding Campaign</DialogTitle>
          <DialogDescription>
            Raise funds for a cause. Tell people why they should support you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Community Library Project"
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Target Amount (KES)
            </label>
            <Input
              id="amount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="e.g. 50000"
              required
              min="100"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="category"
              className="text-xs font-black uppercase tracking-widest text-brand-text-muted"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 bg-brand-surface border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="Community">Community Project</option>
              <option value="Emergency">Emergency Relief</option>
              <option value="Medical">Medical Support</option>
              <option value="Climate">Climate Action</option>
              <option value="Education">Education & Skills</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="description"
              className="text-xs font-black uppercase tracking-widest text-brand-text-muted"
            >
              Detailed Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your campaign..."
              className="min-h-[100px] bg-brand-surface border-white/10 rounded-xl"
              required
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="impact"
              className="text-xs font-black uppercase tracking-widest text-brand-text-muted"
            >
              Impact Statement
            </label>
            <Input
              id="impact"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              placeholder="How will this money change lives?"
              className="bg-brand-surface border-white/10 h-10"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="image"
              className="text-xs font-black uppercase tracking-widest text-brand-text-muted"
            >
              Campaign Image
            </label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="bg-brand-surface border-white/10 h-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-brand-primary/10 file:text-brand-primary cursor-pointer"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="bg-brand-primary text-white"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              Create Campaign
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
