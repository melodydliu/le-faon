import type { JourneyStep } from "@/lib/types";

/**
 * Where the piece is made, set quietly inside the Description: one step per line,
 * in the same type as the text around it (step in secondary, place in ink).
 */
export function Provenance({ steps }: { steps: JourneyStep[] }) {
  return (
    <dl
      aria-label="The making of this piece"
      className="mt-2 grid grid-cols-[auto_1fr] gap-x-8 gap-y-1.5 border-t border-line pt-4"
    >
      {steps.map((step) => (
        <div key={`${step.label}-${step.place}`} className="contents">
          <dt className="text-secondary">{step.label}</dt>
          <dd className="text-ink">{step.place}</dd>
        </div>
      ))}
    </dl>
  );
}
