"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { HeroMedia as HeroMediaData } from "@/lib/data/media";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The full-screen background: poster (or a still) paints immediately; the muted, looping video
 * loads afterwards and fades in once it is actually playing. With reduced motion, the poster only.
 * Any failure falls back to the still, never a broken player.
 */
export function HeroMedia({ media }: { media: HeroMediaData }) {
  const reduceMotion = usePrefersReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  const still = media.poster && !posterFailed ? { src: media.poster, alt: "" } : { src: media.fallback.src, alt: "" };
  const showVideo = Boolean(media.video) && !reduceMotion && !failed;

  function toggle() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  }

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src={still.src}
          alt={still.alt}
          fill
          sizes="100vw"
          preload
          fetchPriority="high"
          quality={80}
          placeholder={still.src === media.fallback.src ? "blur" : "empty"}
          blurDataURL={media.fallback.blurDataURL}
          onError={() => setPosterFailed(true)}
          className="object-cover"
        />

        {showVideo && (
          <video
            ref={video}
            src={media.video ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            onPlaying={() => setPlaying(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-[var(--ease-out)] ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {showVideo && playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? "Play background video" : "Pause background video"}
          className="absolute right-[max(var(--gutter),env(safe-area-inset-right))] bottom-[max(1.75rem,env(safe-area-inset-bottom))] z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-on-inverted/80 transition-opacity duration-500 hover:text-on-inverted lg:bottom-7"
        >
          <span aria-hidden="true" className="absolute inset-[6px] rounded-full border border-on-inverted/40" />
          {paused ? (
            <Play aria-hidden="true" size={12} strokeWidth={1.25} className="translate-x-px" />
          ) : (
            <Pause aria-hidden="true" size={12} strokeWidth={1.25} />
          )}
        </button>
      )}
    </>
  );
}
