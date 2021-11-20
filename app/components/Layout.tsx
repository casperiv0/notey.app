import type * as React from "react";
import { Sidebar } from "./sidebar/Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main style={{ gridTemplateColumns: "300px auto" }} className="grid">
      <Sidebar />

      {children}
    </main>
  );
};