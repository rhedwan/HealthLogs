"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getFileNameFromUrl } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Loader2, AlertCircle, Download } from "lucide-react";

interface DocumentListProps {
  patient: {
    patientDocument: Array<{
      images: string[];
    }>;
  };
}

const DocumentList: React.FC<DocumentListProps> = ({ patient }) => {
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    {}
  );
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageLoad = (imageUrl: string) => {
    setLoadingImages((prev) => ({ ...prev, [imageUrl]: false }));
    setImageErrors((prev) => ({ ...prev, [imageUrl]: false }));
  };

  const handleImageError = (imageUrl: string) => {
    setLoadingImages((prev) => ({ ...prev, [imageUrl]: false }));
    setImageErrors((prev) => ({ ...prev, [imageUrl]: true }));
  };

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = getFileNameFromUrl(imageUrl);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        {/* <TableCaption>PRN 163545 Uploaded Documents</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">File name</TableHead>
            <TableHead className="w-[200px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patient.patientDocument[0] &&
            patient.patientDocument[0].images.map((doc: string) => (
              <TableRow key={doc} className="items-center">
                <TableCell>{getFileNameFromUrl(doc)}</TableCell>
                <TableCell className="text-right flex items-center space-x-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="mr-2"
                        onClick={() =>
                          setLoadingImages((prev) => ({
                            ...prev,
                            [doc]: true,
                          }))
                        }
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl w-full p-0">
                      <DialogHeader className="p-6">
                        <DialogDescription>
                          <div className="relative w-full h-[calc(100vh-12rem) rounded-md overflow-hidden">
                            {loadingImages[doc] && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin" />
                              </div>
                            )}
                            {imageErrors[doc] ? (
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500">
                                <AlertCircle className="h-12 w-12 mb-2" />
                                <p>Failed to load image</p>
                              </div>
                            ) : (
                              <div className="flex justify-center">
                                <Image
                                  src={doc}
                                  alt={getFileNameFromUrl(doc)}
                                  className="mt-4"
                                  // fill
                                  width={400}
                                  height={400}
                                  style={{ objectFit: "contain" }}
                                  onLoadingComplete={() => handleImageLoad(doc)}
                                  onError={() => handleImageError(doc)}
                                />
                              </div>
                            )}
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <p className="text-sm text-gray-600 truncate">
                              {getFileNameFromUrl(doc)}
                            </p>
                            <Button onClick={() => handleDownload(doc)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={() => handleDownload(doc)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentList;
