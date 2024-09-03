"use client";

// import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateRecordForm() {
//   const router = useRouter();
//   const { patientId } = router.query;
  const patientId  = "routeraahquery";

  const [formData, setFormData] = useState({
    vistType: "Out Patient",
    department: "",
    description: "",
    temperature: "",
    bloodPressure: "",
    weight: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    console.log({
      patient: patientId,
      ...formData,
      physicalExamination: {
        temperature: formData.temperature,
        bloodPressure: formData.bloodPressure,
        weight: parseFloat(formData.weight),
      },
    });
    // After successful submission, redirect to the patient's dashboard
    // router.push(`/dashboard/patient/${patientId}`)
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Patient Record</CardTitle>
        <CardDescription>
          Enter the details for the new patient record.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="vistType">Visit Type</Label>
            <Select
              name="vistType"
              value={formData.vistType}
              onValueChange={handleSelectChange("vistType")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Out Patient">Out Patient</SelectItem>
                <SelectItem value="In Patient">In Patient</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
                <SelectItem value="Follow-Up">Follow-Up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              name="department"
              value={formData.department}
              onValueChange={handleSelectChange("department")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
                <SelectItem value="Obstetrics and Gynecology">
                  Obstetrics and Gynecology
                </SelectItem>
                <SelectItem value="Oncology">Oncology</SelectItem>
                <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                <SelectItem value="Radiology">Radiology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter patient's complaints and observations"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Physical Examination</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  name="temperature"
                  placeholder="e.g., 98.6°F"
                  value={formData.temperature}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  name="bloodPressure"
                  placeholder="e.g., 120/80 mmHg"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="Weight in kg"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Create Record
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
