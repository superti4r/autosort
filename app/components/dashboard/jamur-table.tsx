import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

type JamurRow = {
  id: string;
  filePath: string;
  prediction: "A" | "B" | "C";
  probability: string;
  createdAt: string;
  updatedAt: string;
};

const sampleData: JamurRow[] = [
  {
    id: "1",
    filePath: "/uploads/jamur/a_001.jpg",
    prediction: "A",
    probability: '{"A":0.92,"B":0.05,"C":0.03}',
    createdAt: "2025-11-19 10:32",
    updatedAt: "2025-11-19 10:32",
  },
  {
    id: "2",
    filePath: "/uploads/jamur/b_010.jpg",
    prediction: "B",
    probability: '{"A":0.12,"B":0.80,"C":0.08}',
    createdAt: "2025-11-19 10:35",
    updatedAt: "2025-11-19 10:35",
  },
  {
    id: "3",
    filePath: "/uploads/jamur/c_021.jpg",
    prediction: "C",
    probability: '{"A":0.06,"B":0.18,"C":0.76}',
    createdAt: "2025-11-19 10:40",
    updatedAt: "2025-11-19 10:40",
  },
];

export function JamurTable() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-medium tracking-tight">
          Data Jamur Tersortir
        </h2>
        <p className="text-xs text-muted-foreground">
          Data hasil penyortiran jamur yang sudah tersimpan di database.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>File Path</TableHead>
            <TableHead>Prediction</TableHead>
            <TableHead>Probabilitas (JSON)</TableHead>
            <TableHead>Dibuat</TableHead>
            <TableHead>Diperbarui</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell className="max-w-xs truncate">
                {row.filePath}
              </TableCell>
              <TableCell>{row.prediction}</TableCell>
              <TableCell className="max-w-xs truncate font-mono text-xs">
                {row.probability}
              </TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>
          Data di atas hanya contoh. Ganti dengan data dari database.
        </TableCaption>
      </Table>
    </section>
  );
}
