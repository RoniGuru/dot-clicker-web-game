export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-color h-screen">
      {/* <Navbar /> */}
      <main>{children}</main>
    </div>
  );
}
