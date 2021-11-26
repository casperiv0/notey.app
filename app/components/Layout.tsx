import type * as React from "react";
import { Sidebar } from "./sidebar/Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid responsive-layout">
      <Sidebar />

      {children}
    </main>
  );
};
