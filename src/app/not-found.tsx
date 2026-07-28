import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 animate-blob-morph rounded-full bg-[radial-gradient(circle,rgb(124_107_255/0.28),transparent_68%)] blur-[100px]" />
        <div className="absolute inset-0 grid-veil" />
      </div>

      <div className="container text-center">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="mb-5 text-display-md font-semibold text-balance">
          This page didn&rsquo;t{" "}
          <span className="font-display italic text-iris-soft">ship</span>.
        </h1>
        <p className="mx-auto mb-9 max-w-md text-[0.9375rem] leading-relaxed text-ash text-pretty">
          The link is broken or the page has moved. The work is still where you left it.
        </p>
        <Button variant="primary" size="lg" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to the portfolio
          </Link>
        </Button>
      </div>
    </section>
  );
}
