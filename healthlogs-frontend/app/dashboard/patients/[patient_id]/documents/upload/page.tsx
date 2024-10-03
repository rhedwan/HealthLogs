import GoBackButton from "@/components/system/BackButton";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/features/documents/components/FileUploader";
import react from "react";

export default function Page({ params }: { params: { patient_id: string } }) {
  const { patient_id } = params;
  return (
    <div>
      <div className="my-3 flex justify-start">
        <Button className="bg-white hover:bg-white text-black">
          <GoBackButton />
        </Button>
      </div>
      <FileUploader patientId={patient_id} />
    </div>
  );
}
