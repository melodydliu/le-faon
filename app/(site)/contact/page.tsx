import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { Photo } from "@/components/ui/Photo";
import { pageMedia } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Write to Le Faon about a piece, sizing, or an inquiry you have sent. We reply personally.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="px-gutter grid gap-14 py-14 lg:grid-cols-12 lg:gap-12 lg:py-24">
      <div className="flex flex-col gap-10 lg:col-span-5 lg:col-start-2">
        <header className="flex flex-col gap-3">
          <h1 className="display-lg">Write to us</h1>
          <p className="max-w-[56ch] text-pretty text-secondary">
            About a piece, sizing, or an inquiry you’ve sent. We reply personally. To ask about specific pieces, you can
            also{" "}
            <Link href="/catalog" className="link-quiet text-ink">
              begin an inquiry
            </Link>
            .
          </p>
          <p className="label mt-2 text-secondary">
            Or by email <span aria-hidden="true">·</span>{" "}
            <span className="tracking-normal normal-case text-ink select-all">{site.contactEmail}</span>
          </p>
        </header>
        <ContactForm />
      </div>

      <div className="relative hidden aspect-[4/5] self-start bg-surface lg:col-span-4 lg:col-start-8 lg:block">
        <Photo image={pageMedia.contact} fit="cover" sizes="34vw" />
      </div>
    </section>
  );
}
