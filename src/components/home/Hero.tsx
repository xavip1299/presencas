import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-gothic text-6xl md:text-7xl mb-6 text-offwhite">Dura Praxis</h1>
      <Image
        src="/dura_praxis.jpg"   // coloca o ficheiro em /public
        alt="Logo Praxe"
        width={420}
        height={420}
        className="mb-6"
        priority
      />
      <h2 className="font-gothic text-5xl md:text-6xl text-offwhite">Sed Praxis</h2>
    </section>
  );
}
