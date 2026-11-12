import { Logo } from "@/components/brand/Logo";
import { HeroMedia } from "@/components/home/HeroMedia";
import { HomeMenu } from "@/components/home/HomeMenu";
import { HomeLinks } from "@/components/home/HomeLinks";
import { getHeroMedia } from "@/lib/data/media";

/**
 * Home: one screen. Video (or its poster) full-bleed and left clear, with the fawn
 * set just above the page links at the bottom. Text sits on a soft scrim, never in a box.
 */
export async function HomeHero() {
  const media = await getHeroMedia();

  return (
    <section className="relative isolate h-[100svh] min-h-[560px] overflow-hidden bg-inverted">
      <HeroMedia media={media} />

      <h1 className="sr-only">Le Faon</h1>
      <HomeMenu />

      <div className="px-gutter absolute inset-x-0 bottom-0 bg-linear-to-t from-[rgb(42_37_20/0.4)] via-[rgb(42_37_20/0.12)] to-transparent pt-24 pb-[max(2.25rem,env(safe-area-inset-bottom))] lg:from-[rgb(42_37_20/0.45)] lg:pt-28 lg:pb-9">
        <div className="flex justify-center motion-safe:animate-[rise-in_1400ms_var(--ease-out)_300ms_both] lg:mb-8">
          <Logo tone="light" layout="stacked" wordmark={false} className="[&>span:first-child]:h-9 lg:[&>span:first-child]:h-11" />
        </div>
        <HomeLinks />
      </div>
    </section>
  );
}
