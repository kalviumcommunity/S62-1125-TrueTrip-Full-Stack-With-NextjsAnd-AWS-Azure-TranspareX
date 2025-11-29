import { LayoutWrapper } from "@/components";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWrapper showSidebar={false}>
      {children}
    </LayoutWrapper>
  );
}