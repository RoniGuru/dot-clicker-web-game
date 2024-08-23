export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-screen">
      {/* <Navbar /> */}
      <main>{children}</main>
    </div>
  );
}
