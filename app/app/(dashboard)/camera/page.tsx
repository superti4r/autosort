export default function CameraPage() {
  return (
    <section className="flex flex-1 flex-col gap-3">
      <div>
        <h2 className="text-sm font-medium tracking-tight">Lihat Kamera</h2>
        <p className="text-xs text-muted-foreground">
          Tampilan kamera conveyor secara langsung dari perangkat.
        </p>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-xl border bg-black/60">
        <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
          <span>Stream kamera akan ditampilkan di sini</span>
          <span className="text-[10px] opacity-70">
            Ganti dengan komponen video atau WebRTC sesuai implementasi.
          </span>
        </div>
      </div>
    </section>
  );
}
