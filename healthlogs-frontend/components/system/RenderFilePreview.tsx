"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Upload, FileIcon, FileTextIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { uploadFiles } from "@/app/actions/UploadDocument";

interface PreviewFile {
  name: string;
  url: string;
  type: string;
}

export const RenderFilePreview = (file: PreviewFile) => {
  if (file.type.startsWith("image/")) {
    return (
      <Image
        src={file.url}
        alt={file.name}
        width={300}
        height={300}
        className="w-full h-32 object-cover rounded-md"
      />
    );
  } else if (file.type === "application/pdf") {
    return (
      <iframe
        src={file.url}
        title={file.name}
        className="w-full h-32 rounded-md"
      />
    );
  } else if (file.type.startsWith("text/")) {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-md">
        <FileTextIcon className="h-12 w-12 text-gray-400" />
      </div>
    );
  } else {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-md">
        <FileIcon className="h-12 w-12 text-gray-400" />
      </div>
    );
  }
};
