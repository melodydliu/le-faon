import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page so route changes cross softly: the old page fades away quickly,
 * the new one settles in. Goes in each page (not a layout, which never remounts).
 * Without View Transitions support, pages simply swap.
 */
export function PageTransition({ children, exit = "page-exit" }: { children: ReactNode; exit?: string }) {
  return (
    <ViewTransition enter="page-enter" exit={exit} default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

/** Shared name for a piece's photograph in the catalog and on its page, so it glides between them. */
export const pieceTransitionName = (slug: string) => `piece-${slug}`;
