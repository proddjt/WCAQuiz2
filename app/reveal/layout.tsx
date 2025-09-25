import Navbar from "@/components/navbar";

export default function RevealLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 h-full w-screen">
      <Navbar quiz="reveal" />
      <div className="flex lg:w-2/3 w-9/10 text-center justify-center items-center">
        {children}
      </div>
    </section>
  );
}
