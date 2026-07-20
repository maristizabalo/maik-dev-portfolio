export const easeSignal: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const easeInOut: [number, number, number, number] = [0.83, 0, 0.17, 1];
export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const spring = { type: "spring", stiffness: 120, damping: 20, mass: 0.6 } as const;
export const springSoft = { type: "spring", stiffness: 90, damping: 24, mass: 0.8 } as const;
export const springSnappy = { type: "spring", stiffness: 260, damping: 26, mass: 0.5 } as const;
