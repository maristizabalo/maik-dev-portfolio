export type HeroMediaConfig = {
  mode: "image" | "video";
  image: { src: string; alt: string; width: number; height: number };
  video: {
    src: string;
    srcWebm?: string;
    poster: string;
    loop: boolean;
    startAt?: number;
    durationHint?: number;
  };
  treatment: {
    depthLayers: boolean;
    parallaxStrength: number;
    overlayGradient: boolean;
    blurEdges: boolean;
    glow: boolean;
    grain: boolean;
    maskShape: "none" | "soft" | "arch" | "custom";
  };
};

export const heroMedia: HeroMediaConfig = {
  mode: "image",
  image: {
    src: "/assets/perfil.png",
    alt: "Maicol Aristizábal",
    width: 900,
    height: 1120,
  },
  video: {
    src: "/media/hero.mp4",
    srcWebm: "/media/hero.webm",
    poster: "/assets/perfil.png",
    loop: true,
    startAt: 0,
    durationHint: 6,
  },
  treatment: {
    depthLayers: true,
    parallaxStrength: 28,
    overlayGradient: true,
    blurEdges: true,
    glow: true,
    grain: true,
    maskShape: "arch",
  },
};
