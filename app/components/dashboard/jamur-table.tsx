"use client";

import * as React from "react";
import { Download } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  file_path: string;
  prediction: Grade;
  probability: Record<Grade, number>;
  createdAt: string;
  updatedAt: string;
};

const sampleData: JamurRow[] = [
  {
    id: "JM-2025-0001",
    file_path: "/uploads/jamur/A_23012025_091500.jpg",
    prediction: "A",
    probability: { A: 0.93, B: 0.04, C: 0.03 },
    createdAt: "2025-01-23T09:15:00",
    updatedAt: "2025-01-23T09:15:00",
  },
  {
    id: "JM-2025-0002",
    file_path: "/uploads/jamur/B_23012025_091612.jpg",
    prediction: "B",
    probability: { A: 0.15, B: 0.78, C: 0.07 },
    createdAt: "2025-01-23T09:16:00",
    updatedAt: "2025-01-23T09:16:00",
  },
  {
    id: "JM-2025-0003",
    file_path: "/uploads/jamur/A_23012025_091659.jpg",
    prediction: "A",
    probability: { A: 0.88, B: 0.08, C: 0.04 },
    createdAt: "2025-01-23T09:16:00",
    updatedAt: "2025-01-23T09:16:00",
  },
  {
    id: "JM-2025-0004",
    file_path: "/uploads/jamur/C_23012025_091742.jpg",
    prediction: "C",
    probability: { A: 0.07, B: 0.19, C: 0.74 },
    createdAt: "2025-01-23T09:17:00",
    updatedAt: "2025-01-23T09:17:00",
  },
  {
    id: "JM-2025-0005",
    file_path: "/uploads/jamur/B_23012025_091830.jpg",
    prediction: "B",
    probability: { A: 0.12, B: 0.81, C: 0.07 },
    createdAt: "2025-01-23T09:18:00",
    updatedAt: "2025-01-23T09:18:00",
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

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type JamurFilterBarProps = {
  gradeFilter: Grade | "all";
  onGradeChange: (value: Grade | "all") => void;
  totalCount: number;
  filteredCount: number;
  onExport: () => void;
};

function JamurFilterBar({
  gradeFilter,
  onGradeChange,
  totalCount,
  filteredCount,
  onExport,
}: JamurFilterBarProps) {
  return (
    <div className="gap-4 md:flex md:items-center md:justify-between">
      <div>
        <CardTitle>Riwayat</CardTitle>
      </div>
      <div className="mt-3 flex w-full flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center sm:justify-end">
        <Select
          value={gradeFilter}
          onValueChange={(value) => onGradeChange(value as Grade | "all")}
        >
          <SelectTrigger className="sm:w-[160px]">
            <SelectValue placeholder="Filter grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="A">Grade A</SelectItem>
            <SelectItem value="B">Grade B</SelectItem>
            <SelectItem value="C">Grade C</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 gap-2"
          onClick={onExport}
        >
          <Download className="h-4 w-4" />
          Ekspor CSV
        </Button>
      </div>
    </div>
  );
}

type JamurHistoryTableProps = {
  rows: JamurRow[];
};

function JamurHistoryTable({ rows }: JamurHistoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Probabilitas</TableHead>
            <TableHead>File</TableHead>
            <TableHead>Dibuat</TableHead>
            <TableHead>Diperbarui</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
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
                        <span className="text-muted-foreground/60"> • </span>
                      )}
                    </span>
                  ))}
                </TableCell>
                <TableCell className="max-w-xs truncate font-mono text-xs">
                  {row.file_path}
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(row.createdAt)}
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(row.updatedAt)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export function JamurTable() {
  const [gradeFilter, setGradeFilter] = React.useState<Grade | "all">("all");

  const filteredRows = React.useMemo(() => {
    return sampleData.filter((row) => {
      if (gradeFilter === "all") return true;
      return row.prediction === gradeFilter;
    });
  }, [gradeFilter]);

  function handleExport() {
    const csvHeader = [
      "id",
      "file_path",
      "prediction",
      "probability_A",
      "probability_B",
      "probability_C",
      "created_at",
      "updated_at",
    ];
    const rows = filteredRows.map((row) => [
      row.id,
      row.file_path,
      row.prediction,
      row.probability.A,
      row.probability.B,
      row.probability.C,
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
    anchor.download = "history-jamur.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-base font-semibold tracking-tight">
          Data Jamur
        </h2>
        <p className="text-sm text-muted-foreground">
          Riwayat prediksi jamur yang telah diproses oleh sistem.
        </p>
      </div>

      <Card className="border border-border/70">
        <CardHeader>
          <JamurFilterBar
            gradeFilter={gradeFilter}
            onGradeChange={setGradeFilter}
            totalCount={sampleData.length}
            filteredCount={filteredRows.length}
            onExport={handleExport}
          />
        </CardHeader>
        <CardContent className="px-0">
          <JamurHistoryTable rows={filteredRows} />
        </CardContent>
      </Card>
    </section>
  );
}
