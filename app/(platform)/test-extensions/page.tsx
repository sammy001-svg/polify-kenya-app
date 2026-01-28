"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { io } from "socket.io-client";
import videojs from "video.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function TestExtensions() {
  const { getRootProps, getInputProps } = useDropzone();

  React.useEffect(() => {
    // Test socket.io import
    const socket = io("http://localhost:3000", { autoConnect: false });
    console.log("Socket client initialized", socket);

    // Test video.js import
    console.log('Video.js loaded', videojs);
  }, []);

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-2xl font-bold">Extension Verification</h1>
      <p>This is a test page to verify that the app&apos;s extensions are working correctly.</p>

      {/* Test Lucide & Tailwind Merge */}
      <div className={cn("p-4 border rounded", "bg-blue-50")}>
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6 text-blue-500" />
          <span>Icons & Utilities working</span>
        </div>
      </div>

      {/* Test Framer Motion */}
      <motion.div animate={{ x: 10 }} className="p-4 bg-green-100 rounded">
        Framer Motion Animation
      </motion.div>

      {/* Test React Dropzone */}
      <div
        {...getRootProps()}
        className="p-8 border-2 border-dashed rounded bg-gray-50"
      >
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here (Dropzone verification)</p>
      </div>
    </div>
  );
}
