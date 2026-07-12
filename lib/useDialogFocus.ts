import { useEffect, useRef } from 'react';

/**
 * Moves focus into a dialog when it opens and restores focus to the
 * triggering element when it closes, per WCAG 2.4.3 Focus Order.
 */
export function useDialogFocus(isOpen: boolean, dialogRef: React.RefObject<HTMLElement | null>) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusTarget = dialog?.querySelector<HTMLElement>('[data-autofocus]') ?? dialog;
    focusTarget?.focus();

    return () => {
      previouslyFocused.current?.focus();
    };
  }, [isOpen, dialogRef]);
}
