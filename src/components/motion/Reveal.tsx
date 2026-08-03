"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = { className?: string; children: ReactNode; id?: string };

export function Reveal({ className, children, id }: RevealProps) {
  const reduced = useReducedMotion();
  return <motion.div id={id} className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, ease: "easeOut" }}>{children}</motion.div>;
}
