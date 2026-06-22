import Link from "next/link";
import { Compass, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <Compass className="mb-6 h-20 w-20 text-muted-foreground/40" />
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-2 text-2xl font-bold">Halaman Tidak Ditemukan</h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Sepertinya kamu tersesat di hutan belantara. Halaman yang kamu cari
        tidak ada atau sudah dipindahkan.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Ke Beranda
          </Button>
        </Link>
        <Link href="/artikel">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Jelajahi Artikel
          </Button>
        </Link>
      </div>
    </div>
  );
}
