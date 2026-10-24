export const spring = {
  type: "spring",
  stiffness: 380,
  damping: 32,
} as const;

export const springSoft = {
  type: "spring",
  stiffness: 220,
  damping: 26,
} as const;

export const pageFadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
};
