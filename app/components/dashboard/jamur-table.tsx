"use client";

import * as React from "react";
import { Download, Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Grade = "A" | "B" | "C";

type JamurRow = {
  id: string;
  filePath: string;
  prediction: Grade;
  probability: Record<Grade, number>;
  createdAt: string;
  updatedAt: string;
  conveyor: string;
};

const sampleData: JamurRow[] = [
  {
    id: "JM-2025-0001",
    filePath: "/uploads/jamur/A_23012025_091500.jpg",
    prediction: "A",
    probability: { A: 0.93, B: 0.04, C: 0.03 },
    createdAt: "23 Jan 2025 • 09:15",
    updatedAt: "23 Jan 2025 • 09:15",
    conveyor: "Tray 01",
  },
  {
    id: "JM-2025-0002",
    filePath: "/uploads/jamur/B_23012025_091612.jpg",
    prediction: "B",
    probability: { A: 0.15, B: 0.78, C: 0.07 },
    createdAt: "23 Jan 2025 • 09:16",
    updatedAt: "23 Jan 2025 • 09:16",
    conveyor: "Tray 02",
  },
  {
    id: "JM-2025-0003",
    filePath: "/uploads/jamur/A_23012025_091659.jpg",
    prediction: "A",
    probability: { A: 0.88, B: 0.08, C: 0.04 },
    createdAt: "23 Jan 2025 • 09:16",
    updatedAt: "23 Jan 2025 • 09:16",
    conveyor: "Tray 03",
  },
  {
    id: "JM-2025-0004",
    filePath: "/uploads/jamur/C_23012025_091742.jpg",
    prediction: "C",
    probability: { A: 0.07, B: 0.19, C: 0.74 },
    createdAt: "23 Jan 2025 • 09:17",
    updatedAt: "23 Jan 2025 • 09:17",
    conveyor: "Tray 02",
  },
  {
    id: "JM-2025-0005",
    filePath: "/uploads/jamur/B_23012025_091830.jpg",
    prediction: "B",
    probability: { A: 0.12, B: 0.81, C: 0.07 },
    createdAt: "23 Jan 2025 • 09:18",
    updatedAt: "23 Jan 2025 • 09:18",
    conveyor: "Tray 01",
  },
];

const gradeMeta: Record<
  Grade,
  { label: string; tone: string; description: string }
> = {
  A: {
    label: "Grade A",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    description: "Siap distribusi premium",
  },
  B: {
    label: "Grade B",
    tone: "bg-amber-50 text-amber-700 border-amber-100",
    description: "Untuk pasar lokal",
  },
  C: {
    label: "Grade C",
    tone: "bg-rose-50 text-rose-700 border-rose-100",
    description: "Perlu pengecekan manual",
  },
};

export function JamurTable() {
  const [search, setSearch] = React.useState("");
  const [gradeFilter, setGradeFilter] = React.useState<Grade | "all">("all");

  const gradeSummary = React.useMemo(() => {
    return sampleData.reduce(
      (acc, row) => {
        acc[row.prediction] += 1;
        return acc;
      },
      { A: 0, B: 0, C: 0 },
    );
  }, []);

  const filteredRows = React.useMemo(() => {
    return sampleData.filter((row) => {
      const matchesGrade =
        gradeFilter === "all" || row.prediction === gradeFilter;
      const matchesSearch =
        row.id.toLowerCase().includes(search.toLowerCase()) ||
        row.filePath.toLowerCase().includes(search.toLowerCase());
      return matchesGrade && matchesSearch;
    });
  }, [gradeFilter, search]);

  function handleExport() {
    const csvHeader = [
      "id",
      "file_path",
      "prediction",
      "probability_A",
      "probability_B",
      "probability_C",
      "conveyor",
      "created_at",
      "updated_at",
    ];
    const rows = filteredRows.map((row) => [
      row.id,
      row.filePath,
      row.prediction,
      row.probability.A,
      row.probability.B,
      row.probability.C,
      row.conveyor,
      row.createdAt,
      row.updatedAt,
    ]);
    const csvContent = [csvHeader, ...rows]
      .map((columns) => columns.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "data-jamur.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-base font-semibold tracking-tight">
          Data Jamur Tersortir
        </h2>
        <p className="text-sm text-muted-foreground">
          Pantau hasil sortir terbaru berikut probabilitas prediksi model.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(gradeSummary) as Grade[]).map((grade) => {
          const meta = gradeMeta[grade];
          return (
            <Card key={grade} className="border border-border/70">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{meta.label}</span>
                  <Badge
                    variant="outline"
                    className={`rounded-full border px-2 py-0 ${meta.tone}`}
                  >
                    {gradeSummary[grade]} batch
                  </Badge>
                </div>
                <CardDescription>{meta.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card className="border border-border/70">
        <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Riwayat sortir</CardTitle>
            <CardDescription>
              {filteredRows.length} data ditampilkan dari {sampleData.length}{" "}
              total batch hari ini.
            </CardDescription>
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari ID atau nama file"
                className="pl-9"
                aria-label="Cari data jamur"
              />
            </div>
            <Select
              value={gradeFilter}
              onValueChange={(value) => setGradeFilter(value as Grade | "all")}
            >
              <SelectTrigger className="sm:w-[160px]">
                <SelectValue placeholder="Filter grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua grade</SelectItem>
                <SelectItem value="A">Grade A</SelectItem>
                <SelectItem value="B">Grade B</SelectItem>
                <SelectItem value="C">Grade C</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 gap-2"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              Ekspor CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Probabilitas</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead>Conveyor</TableHead>
                  <TableHead>Dibuat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRows.map((row) => {
                  const meta = gradeMeta[row.prediction];
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`rounded-full border px-3 py-1 text-xs ${meta.tone}`}
                        >
                          {meta.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {(["A", "B", "C"] as Grade[]).map((grade, index) => (
                          <span key={grade}>
                            {grade}{" "}
                            {Math.round(row.probability[grade] * 100)
                              .toString()
                              .padStart(2, "0")}
                            %
                            {index < 2 && (
                              <span className="text-muted-foreground/60">
                                {" "}
                                •{" "}
                              </span>
                            )}
                          </span>
                        ))}
                      </TableCell>
                      <TableCell className="max-w-xs truncate font-mono text-xs">
                        {row.filePath}
                      </TableCell>
                      <TableCell className="text-sm">{row.conveyor}</TableCell>
                      <TableCell className="text-sm">{row.createdAt}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableCaption>
                Data contoh untuk tampilan. Sambungkan dengan database atau API
                Anda untuk menampilkan data asli.
              </TableCaption>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
