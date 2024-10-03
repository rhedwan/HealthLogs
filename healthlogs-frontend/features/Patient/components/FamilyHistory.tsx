"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PatientFamilyHistory } from "@/schema/PatientFamilyHistory";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { closeModalAndToast } from "@/lib/utils";
import { AddFamilyHistory, State } from "@/app/actions/FamilyHistory";
import SaveButton from "@/components/system/SaveButton";

const FamilyHistory = ({ patient }: { patient: any }) => {
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const initialState: State = { message: "", errors: {} };
  const [state, formActionFamilyHistory] = useFormState(
    AddFamilyHistory,
    initialState
  );
  const [open, setOpen] = useState(false);
  const [relatives, setRelatives] = useState<string[]>([]);
  const [newRelative, setNewRelative] = useState("");

  useEffect(() => {
    closeModalAndToast(
      // @ts-ignore
      state,
      formActionFamilyHistory,
      toast,
      open,
      setOpen,
      "Success",
      "New Family History added",
      "Family History added successfully!"
    );
  }, [state.message, open]);

  const handleAddRelative = () => {
    if (newRelative.trim()) {
      setRelatives([...relatives, newRelative.trim()]);
      setNewRelative("");
    }
  };

  const handleRemoveRelative = (index: number) => {
    setRelatives(relatives.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            Family History ({patient.patientFamilyHistory.length})
          </p>
          <Dialog
            open={open}
            onOpenChange={(newOpen) => {
              setOpen(newOpen);
              if (!newOpen) {
                setRelatives([]);
                setNewRelative("");
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>New History</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Family History</DialogTitle>
              </DialogHeader>
              <form action={formActionFamilyHistory}>
                <div className="space-y-2 hidden">
                  <Label htmlFor="patientId">Patient Id</Label>
                  <Input
                    id="patientId"
                    value={patient._id}
                    type="text"
                    name="patientId"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    type="text"
                    name="description"
                    className={
                      state?.errors?.description ? "border-red-500" : ""
                    }
                  />
                  {state?.errors?.description && (
                    <p className="text-red-500 text-sm">
                      {state.errors.description[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relatives">Relatives</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="newRelative"
                      type="text"
                      value={newRelative}
                      onChange={(e) => setNewRelative(e.target.value)}
                      placeholder="Add a relative"
                    />
                    <Button type="button" onClick={handleAddRelative}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {relatives.map((relative, index) => (
                      <Badge
                        key={index}
                        className="flex items-center space-x-1"
                      >
                        <span>{relative}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRelative(index)}
                          className="text-xs font-bold"
                        >
                          ×
                        </button>
                        <input
                          type="hidden"
                          name="relatives"
                          value={relative}
                        />
                      </Badge>
                    ))}
                  </div>
                  {state?.errors?.relatives && (
                    <p className="text-red-500 text-sm">
                      {state.errors.relatives[0]}
                    </p>
                  )}
                </div>
                <DialogFooter className="mt-5">
                  {/* <Button type="submit" disabled={relatives.length === 0}>
                    {pending ? "Saving..." : "Save"}
                  </Button> */}
                  <SaveButton text="Save" loadingText="Saving" />
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {patient.patientFamilyHistory.map(
              (history: PatientFamilyHistory) => (
                <TableRow key={history._id} className="items-center">
                  <TableCell>{history.description}</TableCell>
                  <TableCell className="flex justify-end">
                    <div className="flex flex-wrap gap-2">
                      {history.relatives.map((relative, index) => (
                        <Badge key={index}>{relative}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FamilyHistory;
