import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFileNameFromUrl } from "@/lib/utils";

const DocumentList = ({ patient }: { patient: any }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableCaption>PRN 163545 Uploaded Documents</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">File name</TableHead>
            {/* <TableHead>Type</TableHead> */}
            {/* <TableHead>Date</TableHead> */}
            {/* <TableHead className="text-right">Size</TableHead> */}
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* <TableRow>
            <TableCell className="font-medium">
              Screenshot from 2024-09-24 16-24-11.png
            </TableCell>
            <TableCell>Other</TableCell>
            <TableCell>10/01/2024</TableCell>
            <TableCell className="text-right">17 KB</TableCell>
          </TableRow> */}
          {patient.patientDocument[0].images.map((docs: any) => (
            <TableRow key={docs} className="items-center">
              <TableCell>{getFileNameFromUrl(docs)}</TableCell>
              <TableCell className="text-right">
                <Button>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentList;
