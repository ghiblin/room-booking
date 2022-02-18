import { ReactNode } from "react";
import Navbar from "./navbar";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 64px)" }}>{children}</main>
    </>
  );
}
