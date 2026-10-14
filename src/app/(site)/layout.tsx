import { SiteLayout } from "@/shared/layouts/SiteLayout";

export default function SiteRouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteLayout>{children}</SiteLayout>;
}
