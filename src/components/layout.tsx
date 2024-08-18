import Navbar from './navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <div className="h-screen w-screen">
        <Navbar />
        <main>{children}</main>
      </div>
    </body>
  );
}
