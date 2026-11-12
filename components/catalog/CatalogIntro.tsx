const words = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const inWords = (n: number) => words[n] ?? String(n);
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Collection introduction: a centered masthead with no image, so the gallery below is the picture.
 * Centered to match the centered captions in the grid.
 */
export function CatalogIntro({ count }: { count: number }) {
  return (
    <section className="px-gutter flex flex-col items-center gap-5 pt-20 pb-16 text-center lg:pt-28 lg:pb-20">
      <h1 className="display-xl">Catalog</h1>
      <div className="h-px w-16 bg-line-strong" aria-hidden="true" />
      <p className="max-w-[56ch] text-balance text-secondary">
        A capsule of {inWords(count)} pieces in cotton, silk, hemp and wool. Each one is made for you, in your size and
        colorway.
      </p>
      <p className="label text-muted">
        {capitalize(inWords(count))} {count === 1 ? "piece" : "pieces"} <span aria-hidden="true">·</span> Made to order
      </p>
    </section>
  );
}
