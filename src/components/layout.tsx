export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-500 h-screen">
      {/* <Navbar /> */}
      <main>{children}</main>
    </div>
  );
}
