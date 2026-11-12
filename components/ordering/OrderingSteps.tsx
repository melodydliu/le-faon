import Link from "next/link";
import { OrderingQuestions } from "@/components/ordering/OrderingQuestions";
import { Photo } from "@/components/ui/Photo";
import type { OrderingContent } from "@/lib/content/ordering";
import type { ImageAsset } from "@/lib/types";

/**
 * How to Order. The title and five numbered steps run down the left; on desktop a photograph
 * stays beside them as they scroll, with the next step (the catalog) right beneath it.
 * Then the common questions, then one action.
 */
export function OrderingSteps({ content, image }: { content: OrderingContent; image: ImageAsset }) {
  return (
    <article>
      <div className="px-gutter grid gap-12 pt-14 pb-20 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-7 lg:col-start-1 xl:col-span-6 xl:col-start-2">
          <header className="flex flex-col gap-4">
            <h1 className="display-xl">{content.title}</h1>
            <div className="mt-2 flex max-w-[70ch] flex-col gap-2 text-pretty text-[1.0625rem] leading-relaxed text-secondary">
              {content.intro.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </header>

          <ol className="mt-14 lg:mt-20">
            {content.steps.map((step, i) => {
              const last = i === content.steps.length - 1;
              return (
                <li key={step.title} className="relative grid grid-cols-[2.75rem_1fr] gap-x-5 sm:gap-x-8">
                  {!last && <span aria-hidden="true" className="absolute top-12 bottom-0 left-[1.375rem] w-px bg-line-strong" />}
                  <span className="relative grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-bg font-display text-[1.25rem] italic">
                    {i + 1}
                  </span>
                  <div className={`flex flex-col gap-2 pt-1.5 ${last ? "" : "pb-12 lg:pb-16"}`}>
                    <p className="label text-muted">{step.when}</p>
                    <h2 className="display-md">{step.title}</h2>
                    <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink">{step.summary}</p>
                    {step.detail && <p className="max-w-[52ch] text-[14px] leading-relaxed text-secondary">{step.detail}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Desktop: the photograph keeps the right side company while the steps scroll. */}
        <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block xl:col-span-4 xl:col-start-9">
          <div className="sticky top-[calc(var(--header-h)+40px)] flex flex-col gap-5">
            <div className="relative aspect-[4/5] max-h-[calc(100svh-var(--header-h)-160px)] w-full bg-surface">
              <Photo image={image} fit="cover" lcp sizes="30vw" className="object-[center_30%]" />
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
              <p className="font-display text-[1.25rem] italic">Ready to begin?</p>
              <Link href="/catalog" className="label link-quiet inline-flex min-h-11 items-center">
                View the catalog
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <OrderingQuestions questions={content.questions} />
    </article>
  );
}
