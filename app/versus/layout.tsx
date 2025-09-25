import Navbar from "@/components/navbar";

export default function VersusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 h-full w-screen">
      <Navbar quiz="versus" />
      <div className="flex lg:w-2/3 text-center justify-center items-center">
        {children}
      </div>
    </section>
  );
}

