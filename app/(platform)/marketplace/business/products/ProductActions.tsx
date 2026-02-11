"use client";

import { useState, useRef } from "react";
import { Plus, X, Upload } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
 } from "@/components/ui/select";
import { createMarketplaceItem } from "../../business-actions";
import Image from "next/image";

export function ProductActions({ businessId }: { businessId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFiles = [...selectedFiles, ...filesArray];
      setSelectedFiles(newFiles);

      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]); // Cleanup memory
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      
      if (selectedFiles.length < 3) {
          alert("Please add at least 3 images.");
          return;
      }

      setIsSubmitting(true);
      const formData = new FormData(e.currentTarget);
      
      try {
          // Append files manually to FormData
          selectedFiles.forEach((file) => {
              formData.append("images", file);
          });

          // Call the server action
          await createMarketplaceItem(formData, businessId);
          
          // Success
          setIsOpen(false);
          setSelectedFiles([]);
          setPreviews([]);
      } catch (error: unknown) {
          console.error("Submission error:", error);
          let errorMessage = "Unknown error";
          
          if (error instanceof Error) {
            errorMessage = error.message;
          } else if (typeof error === "string") {
            errorMessage = error;
          }

          // Show a helpful error message
          if (errorMessage.includes("relation \"marketplace_items\" does not exist") || errorMessage.includes("column \"images\"")) {
             alert("Database Error: Please run the latest migration script in Supabase.");
          } else if (errorMessage.includes("storage")) {
             alert("Storage Error: Ensure the 'marketplace' bucket exists.");
          } else {
             alert(`Failed to create product: ${errorMessage}`);
          }
      } finally {
          setIsSubmitting(false);
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-kenya-green hover:bg-kenya-deep text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-brand-surface border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription className="text-white/60">
            List a new item for sale. Include at least 3 images.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Product Name</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Organic Avocados"
              className="bg-white/5 border-white/10"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="price">Price (KES)</Label>
                <Input
                id="price"
                name="price"
                type="number"
                placeholder="0.00"
                className="bg-white/5 border-white/10"
                required
                />
             </div>
             <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" required>
                    <SelectTrigger className="bg-white/5 border-white/10 w-full">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-surface border-white/10 text-white">
                        {["Agriculture", "Handicrafts", "Services", "Clothing", "Tech", "Other"].map((cat) => (
                            <SelectItem key={cat} value={cat} className="focus:bg-white/10 focus:text-white cursor-pointer hover:bg-white/10">
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea
                id="description"
                name="description"
                placeholder="Describe your product..."
                className="flex min-h-[100px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
            />
          </div>

          <div className="space-y-4">
            <Label>Product Images (Min 3)</Label>
            <div className="grid grid-cols-3 gap-4">
                {previews.map((src, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group">
                        <Image src={src} alt="Preview" fill className="object-cover" />
                        <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-colors"
                >
                    <Upload className="w-6 h-6 text-white/40 mb-2" />
                    <span className="text-xs text-white/40">Upload Image</span>
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept="image/*"
            />
            {selectedFiles.length < 3 && (
                <p className="text-xs text-red-400">Please select at least 3 images ({selectedFiles.length}/3)</p>
            )}
          </div>

          <DialogFooter>
            <Button 
                type="submit" 
                disabled={isSubmitting || selectedFiles.length < 3} 
                className="bg-kenya-green text-white w-full"
            >
              {isSubmitting ? "Creating Product..." : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
