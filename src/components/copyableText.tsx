"use client";

import { JSX, useRef } from "react";

import { MdContentCopy } from "react-icons/md";

const selectText = (element: HTMLElement) => {
  if (window.getSelection && document.createRange) {
    const selection = window.getSelection();
    if (selection?.toString() === "") {
      window.setTimeout(() => {
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }, 1);
    }
  }
};

export interface CopyableEventProps {
  textToCopy: string;
  children: React.ReactNode;
  className?: string;
  Tag?: keyof JSX.IntrinsicElements;
}

export function CopyableEvent({
  children,
  textToCopy,
  className,
  Tag = "span",
}: CopyableEventProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const copy = async () => {
    const current = ref.current;

    if (current) {
      selectText(current);
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (error) {
      console.error(`Async: Could not copy text: ${error}`);
    }
  };

  return (
    <Tag onClick={copy} className={className}>
      <span ref={ref}>{children}</span>
      <MdContentCopy className="inline mx-2" />
    </Tag>
  );
}
