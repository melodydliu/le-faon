import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import type { OrderingQuestion } from "@/lib/content/ordering";

/** The questions people actually ask, as quiet accordions. The first is open. */
export function OrderingQuestions({ questions }: { questions: OrderingQuestion[] }) {
  return (
    <section aria-labelledby="questions-title" className="px-gutter bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-[44rem]">
        <h2 id="questions-title" className="display-md mb-8 text-center">
          Questions
        </h2>
        <Accordion>
          {questions.map((q, i) => (
            <AccordionItem key={q.q} title={q.q} variant="question" defaultOpen={i === 0}>
              <div className="flex flex-col gap-3 text-[1rem] leading-relaxed">
                {q.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
