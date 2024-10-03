import { useState, useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Upload, FileIcon, FileTextIcon, Loader } from "lucide-react";
import Image from "next/image";
import { uploadFiles } from "@/app/actions/UploadDocument";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { TableHead } from "@/components/ui/table";
import DocumentList from "@/features/documents/components/DocumentList";
import Link from "next/link";

export default function FileUploader() {
  return (
    <div>
      <div className="flex justify-end items-center w-full border-2 border-red-500 ">
        <Link href={"documents/upload"}>
          <Button className="bg-[#7457D3] hover:bg-[#5E45A8]">Upload</Button>
        </Link>
      </div>
      <DocumentList />
    </div>
  );
}
