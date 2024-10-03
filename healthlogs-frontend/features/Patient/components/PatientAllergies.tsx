import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { closeModalAndToast, formatDate } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { State } from "@/app/actions/appointment";
import { PatientAllergy } from "@/schema/PatientAllergy";
import { Textarea } from "@/components/ui/textarea";
import { AddAllergy } from "@/app/actions/allergy";
import { useToast } from "@/hooks/use-toast";
import { TriangleAlert } from "lucide-react";
const PatientAllergies = ({ patient }: { patient: any }) => {
  const { pending } = useFormStatus();

  const { toast } = useToast();
  const initialState: State = { message: "", errors: {} };

  // @ts-ignore
  const [allergyState, formActionAllergy] = useFormState(
    AddAllergy,
    initialState
  );
  const [openAllergy, setOpenAllergy] = useState(false);

  useEffect(() => {
    closeModalAndToast(
      allergyState,
      formActionAllergy,
      toast,
      openAllergy,
      setOpenAllergy,
      "Success",
      "The allergy has been added to the patient's record.",
      "Allergy added successfully!"
    );
  }, [allergyState.message, openAllergy]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            Allegies ({patient.patientAllergy.length})
          </p>
          <Dialog
            open={openAllergy}
            onOpenChange={(newOpen) => {
              setOpenAllergy(newOpen);
              if (!newOpen) {
                // Reset the state when closing the dialog
                // formActionAllergy(new FormData());
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>New Allergy</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Allergy</DialogTitle>
              </DialogHeader>
              <form action={formActionAllergy}>
                <div className="space-y-2">
                  <Label htmlFor="allergen">Allergen</Label>
                  <Select name="allergen">
                    <SelectTrigger
                      className={
                        allergyState?.errors?.allergen ? "border-red-500" : ""
                      }
                    >
                      <SelectValue placeholder="Select Allergen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"Food"}>Food</SelectItem>
                      <SelectItem value={"Drug"}>Drug</SelectItem>
                      <SelectItem value={"Environment"}>Environment</SelectItem>
                    </SelectContent>
                  </Select>
                  {allergyState?.errors?.allergen && (
                    <p className="text-red-500 text-sm">
                      {allergyState.errors.allergen[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Select name="severity">
                    <SelectTrigger
                      className={
                        allergyState?.errors?.severity ? "border-red-500" : ""
                      }
                    >
                      <SelectValue placeholder="Select Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"Very Mild"}>Very Mild</SelectItem>
                      <SelectItem value={"Mild"}>Mild</SelectItem>
                      <SelectItem value={"Moderate"}>Moderate</SelectItem>
                      <SelectItem value={"Severe"}>Severe</SelectItem>
                    </SelectContent>
                  </Select>
                  {allergyState?.errors?.severity && (
                    <p className="text-red-500 text-sm">
                      {allergyState.errors.severity[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reaction">Reaction</Label>
                  <Input
                    id="reaction"
                    type="text"
                    name="reaction"
                    className={
                      allergyState?.errors?.reaction ? "border-red-500" : ""
                    }
                  />
                  {allergyState?.errors?.reaction && (
                    <p className="text-red-500 text-sm">
                      {allergyState.errors.reaction[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2 hidden">
                  <Label htmlFor="patientId">Patient Id</Label>
                  <Input
                    id="patientId"
                    value={patient._id}
                    type="text"
                    name="patientId"
                    className={
                      allergyState?.errors?.patientId ? "border-red-500" : ""
                    }
                  />
                  {allergyState?.errors?.patientId && (
                    <p className="text-red-500 text-sm">
                      {allergyState.errors.patientId[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    className={
                      allergyState?.errors?.comment ? "border-red-500" : ""
                    }
                  />
                  {allergyState?.errors?.comment && (
                    <p className="text-red-500 text-sm">
                      {allergyState.errors.comment[0]}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="onset">Onset</Label>
                  <Select name="onset">
                    <SelectTrigger
                      className={
                        allergyState?.errors?.onset ? "border-red-500" : ""
                      }
                    >
                      <SelectValue placeholder="Select an onset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Childhood">Childhood</SelectItem>
                      <SelectItem value="Adulthood">Adulthood</SelectItem>
                    </SelectContent>
                  </Select>
                  {allergyState?.errors?.onset && (
                    <p className="text-red-500 text-sm">
                      {allergyState.errors.onset[0]}
                    </p>
                  )}
                </div>

                <DialogFooter className="mt-5">
                  <Button type="submit">
                    {pending ? "Adding..." : "Add Allergy"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {patient.patientAllergy.map((allergy: PatientAllergy) => (
              <TableRow key={allergy._id}>
                <TableCell>{allergy.allergen}</TableCell>
                <TableCell>{allergy.severity}</TableCell>
                <TableCell>{allergy.comment}</TableCell>
                <TableCell className="text-right">{allergy.onset}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PatientAllergies;
// <ul className="grid grid-cols-1 gap-y-8">
//   {patient.patientAllergy.map((allergy: PatientAllergy) => (
//     <li className="text-sm list-disc" key={allergy._id}>
//       <p className="font-semibold">{allergy.allergen}</p>
//       <div className="">
//         <div className="flex items-center space-x-3">
//           <TriangleAlert size={16} color="yellow" strokeWidth={1.7} />
//           <p className="font-semibold">{allergy.severity}</p>
//           <p className="font-extralight">{allergy.reaction}</p>
//           <p className="font-extralight">
//             {formatDate(allergy.date, "MM/DD/YYYY")}
//           </p>
//         </div>
//         {/* <p>{allergy.onset}</p> */}
//       </div>
//       <div className="h-20"></div>
//     </li>
//   ))}
// </ul>;
