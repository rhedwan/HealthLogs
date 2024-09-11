import { ChartJSData } from "@/schema/Dashboard";
import { BloodAndWeightChart } from "@/schema/PatientChart";

export const exportToCSV = (data: ChartJSData, name: string) => {
  // Convert chart data to CSV
  const csvContent = [
    ["Month", ...data.datasets.map((ds) => ds.label)].join(","),
    ...data.labels.map((label, i) =>
      [label, ...data.datasets.map((ds) => ds.data[i])].join(",")
    ),
  ].join("\n");

  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a download link and trigger the download
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${name}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
export const exportToCSVRecharts = (data: BloodAndWeightChart[]) => {
  const headers = ["Date", "Weight", "Systolic", "Diastolic"];
  const csvContent = [
    headers.join(","),
    ...data.map((visit) =>
      [visit.date, visit.weight, visit.systolic, visit.diastolic].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "visit_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
