import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RegistrarServiceWorker } from "@/components/lab/RegistrarServiceWorker";
import { LabShell } from "@/components/lab/LabShell";
import { EstadoOffline } from "@/components/lab/EstadoOffline";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <RegistrarServiceWorker />
      <LabShell>{children}</LabShell>
      <EstadoOffline />
    </>
  );
}
