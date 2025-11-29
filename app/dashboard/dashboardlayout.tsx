import { LayoutWrapper } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWrapper showSidebar={true}>
      {children}
    </LayoutWrapper>
  );
}