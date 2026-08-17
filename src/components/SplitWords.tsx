import { useInViewRef } from "@/lib/motion";

type Segment = { text: string; accent?: boolean };

/**
 * Headline reveal: each word rides up from behind its own clipping mask.
 * Pass segments so one phrase can be set in the italic serif accent face.
 * Use "\n" as a word to force a line break.
 */
export default function SplitWords({
  segments,
  delay = 0,
  stagger = 58,
  className = "",
}: {
  segments: Segment[];
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewRef<HTMLSpanElement>(0.2);

  let wordIndex = -1;

  return (
    <span ref={ref} className={`${inView ? "in" : ""} ${className}`}>
      {segments.map((segment, si) => (
        <span key={si} className={segment.accent ? "accent text-signal" : undefined}>
          {segment.text.split(" ").map((word) => {
            wordIndex += 1;
            if (word === "\n") return <br key={`br-${wordIndex}`} />;
            const key = `${word}-${wordIndex}`;
            const delayMs = delay + wordIndex * stagger;
            return (
              <span key={key}>
                <span className="word">
                  <span style={{ transitionDelay: `${delayMs}ms` }}>{word}</span>
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
