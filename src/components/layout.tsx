import Navbar from './Nav/Navbar';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" max-h-screen">
      <Navbar />
      <main className="flex-grow overflow-hidden">{children}</main>
    </div>
  );
}
