"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { heroMedia, type HeroMediaConfig } from "@/config/hero-media";
import { cn } from "@/lib/utils";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
};

const maskClass: Record<HeroMediaConfig["treatment"]["maskShape"], string> = {
  none: "rounded-none",
  soft: "rounded-[2rem]",
  arch: "rounded-t-[9rem] rounded-b-[2rem]",
  custom: "rounded-[3rem]",
};

const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`;

export function HeroMedia({ alt, className }: { alt: string; className?: string }) {
  const reduce = useReducedMotion();
  const cfg = heroMedia;
  const { treatment } = cfg;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [saveData] = useState(() => {
    if (typeof navigator === "undefined") return false;
    const nav = navigator as NavigatorWithConnection;
    const type = nav.connection?.effectiveType;
    return (
      nav.connection?.saveData === true || type === "2g" || type === "slow-2g"
    );
  });

  const wantVideo =
    cfg.mode === "video" && !reduce && !saveData && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !wantVideo) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(video);

    const onVisibility = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [wantVideo]);

  return (
    <div className={cn("relative aspect-[4/5] w-full", className)}>
      {treatment.depthLayers && (
        <div
          aria-hidden
          className={cn(
            "absolute -inset-3 -z-10 translate-x-3 translate-y-3 border border-line/60",
            maskClass[treatment.maskShape],
          )}
        />
      )}

      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-surface-2",
          maskClass[treatment.maskShape],
          treatment.glow && "shadow-signal-glow ring-1 ring-signal/20",
        )}
      >
        <Image
          src={cfg.image.src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 80vw, 40vw"
          className="object-cover object-top"
        />

        {wantVideo && (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700",
              videoReady ? "opacity-100" : "opacity-0",
            )}
            poster={cfg.video.poster}
            muted
            playsInline
            loop={cfg.video.loop}
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          >
            {cfg.video.srcWebm && (
              <source src={cfg.video.srcWebm} type="video/webm" />
            )}
            <source src={cfg.video.src} type="video/mp4" />
          </video>
        )}

        {treatment.overlayGradient && (
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-canvas/5 to-transparent"
          />
        )}
        {treatment.blurEdges && (
          <div
            aria-hidden
            className="absolute inset-0 shadow-[inset_0_0_60px_18px_rgb(var(--bg-base))]"
          />
        )}
        {treatment.grain && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
          />
        )}
      </div>
    </div>
  );
}
