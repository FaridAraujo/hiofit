export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth pages don't use the global Header/Footer
  return <>{children}</>;
}
