import { PieChartData } from "@/schema/Dashboard";

export const exportToCSV = (data: PieChartData, name: string) => {
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
