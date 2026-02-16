import Link from "next/link";
import type { ActionButton } from "../../types/site";

interface CtaLinkProps {
  button?: ActionButton;
  className: string;
  fallbackLabel?: string;
}

function normalizeHref(button?: ActionButton) {
  if (!button) {
    return "#";
  }

  const path = button.path || "";
  const hash = button.hash || "";

  if (!path && !hash) {
    return "#";
  }

  return `${path}${hash}`;
}

export default function CtaLink({ button, className, fallbackLabel }: CtaLinkProps) {
  const label = button?.label || fallbackLabel;

  if (!label) {
    return null;
  }

  const href = normalizeHref(button);
  const ariaLabel = button?.ariaLabel || label;

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link className={className} href={href} prefetch={false} aria-label={ariaLabel}>
      <span>{label}</span>
    </Link>
  );
}
