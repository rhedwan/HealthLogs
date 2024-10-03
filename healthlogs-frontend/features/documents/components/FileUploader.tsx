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
export const FileUploader = ({ patientId }: { patientId: string }) => {
  const { toast } = useToast();
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newPreviewFiles = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setPreviewFiles((prev) => [...prev, ...newPreviewFiles]);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemove = (index: number) => {
    setPreviewFiles((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const result = await uploadFiles(formData, patientId);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        setPreviewFiles([]);
        setSelectedFiles([]);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const renderFilePreview = (file: PreviewFile) => {
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

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-16 w-16 text-gray-400" />
        <p className="mt-4 text-lg text-gray-600">
          Drag and drop files here, or click to select files
        </p>
      </div>
      <Input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        multiple
        accept="image/*"
      />
      {previewFiles.length > 0 && (
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Selected Files</h2>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div className="grid grid-cols-2 gap-4">
              {previewFiles.map((file, index) => (
                <div key={index} className="relative group">
                  {renderFilePreview(file)}
                  <p className="mt-2 text-sm text-gray-600 truncate">
                    {file.name}
                  </p>
                  <button
                    onClick={() => handleRemove(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {previewFiles.length} file(s) selected
        </p>
        {previewFiles.length > 0 && (
          <Button
            type="button"
            onClick={handleUpload}
            className="flex items-center space-x-2 px-6 py-3 text-lg"
            disabled={uploading}
          >
            {uploading ? (
              <span>Uploading...</span>
            ) : (
              <>
                <Upload className="h-6 w-6" /> <span>Upload Files</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
