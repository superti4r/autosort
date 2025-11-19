import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

type LogRow = {
  id: string;
  event: string;
  detail: string;
  createdAt: string;
};

const sampleLogs: LogRow[] = [
  {
    id: "1",
    event: "CONVEYOR_START",
    detail: "Conveyor mulai bergerak",
    createdAt: "2025-11-19 10:30",
  },
  {
    id: "2",
    event: "DETEKSI_JAMUR",
    detail: "Jamur terdeteksi pada sensor ultrasonic",
    createdAt: "2025-11-19 10:31",
  },
  {
    id: "3",
    event: "SORTIR_SELESAI",
    detail: "Jamur grade A berhasil disortir",
    createdAt: "2025-11-19 10:32",
  },
];

export function LogTable() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-medium tracking-tight">
          Log Pergerakan Mesin
        </h2>
        <p className="text-xs text-muted-foreground">
          Data log pergerakan mesin yang ditangkap dari serial monitor.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Detail</TableHead>
            <TableHead>Waktu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleLogs.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.event}</TableCell>
              <TableCell className="max-w-md truncate">{row.detail}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>
          Data di atas hanya contoh. Ganti dengan data log dari database atau
          dari serial monitor.
        </TableCaption>
      </Table>
    </section>
  );
}
