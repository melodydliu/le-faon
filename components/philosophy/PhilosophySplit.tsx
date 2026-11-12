import { Photo } from "@/components/ui/Photo";
import type { ProsePageContent } from "@/lib/content/types";
import type { ImageAsset } from "@/lib/types";

/**
 * B · Split. On desktop one photograph holds the left half of the screen, still,
 * while the text scrolls on the right. On phones the photograph comes first.
 */
export function PhilosophySplit({ content, image }: { content: ProsePageContent; image: ImageAsset }) {
  return (
    <article>
      <div className="lg:grid lg:grid-cols-2">
        <div className="relative aspect-[4/5] bg-surface lg:sticky lg:top-[var(--header-h)] lg:aspect-auto lg:h-[calc(100svh-var(--header-h))]">
          <Photo image={image} fit="cover" lcp sizes="(min-width: 1024px) 50vw, 100vw" className="object-[center_30%]" />
        </div>

        <div className="px-gutter py-14 lg:px-[clamp(48px,6vw,112px)] lg:py-28">
          <header className="flex flex-col gap-3">
            <h1 className="display-xl">{content.title}</h1>
          </header>

          <div className="mt-14 flex max-w-[34rem] flex-col gap-14 lg:mt-20 lg:gap-16">
            {content.sections.map((section, i) => (
              <section key={section.title ?? i} className="reveal flex flex-col gap-5">
                {section.title && <h2 className="label text-secondary">{section.title}</h2>}
                {section.blocks.map((block, j) => {
                  if (block.kind === "lead")
                    return (
                      <p key={j} className="font-display text-[1.75rem] leading-[1.3] font-light lg:text-[2rem]">
                        {block.text}
                      </p>
                    );
                  if (block.kind === "quote")
                    return (
                      <p key={j} className="font-display text-[1.375rem] leading-snug italic lg:text-[1.5rem]">
                        {block.text}
                      </p>
                    );
                  if (block.kind === "paragraph")
                    return (
                      <p key={j} className="text-[1.0625rem] leading-[1.8] text-secondary">
                        {block.text}
                      </p>
                    );
                  return null;
                })}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
