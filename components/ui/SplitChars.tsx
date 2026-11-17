import { graphemes } from "@/lib/segment";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  className?: string;
  charClassName?: string;
  /** wrap each character in an overflow mask so it can rise into view */
  mask?: boolean;
};

/**
 * Letter-by-letter split for animation. Grapheme-safe (Tamil friendly) and
 * accessible: screen readers get the full string, not individual letters.
 */
export function SplitChars({ text, className, charClassName, mask = true }: Props) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {graphemes(word).map((ch, ci) =>
            mask ? (
              <span key={ci} className="inline-block overflow-clip pb-[0.22em] -mb-[0.22em] pt-[0.05em] -mt-[0.05em] align-bottom">
                <span data-char className={cn("inline-block will-change-transform", charClassName)}>
                  {ch}
                </span>
              </span>
            ) : (
              <span key={ci} data-char className={cn("inline-block", charClassName)}>
                {ch}
              </span>
            )
          )}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
