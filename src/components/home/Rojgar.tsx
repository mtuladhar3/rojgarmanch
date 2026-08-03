/** रोजगार — Jobs (wraps प्रवास + बिजनेस block) */
import type { ReactNode } from "react";

type RojgarProps = {
  children: ReactNode;
};

export function Rojgar({ children }: RojgarProps) {
  return (
    <section className="container split" id="careers" aria-label="रोजगार">
      {children}
    </section>
  );
}
