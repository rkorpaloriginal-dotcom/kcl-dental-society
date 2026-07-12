'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { WhatsOnEvent } from '@/data/types';
import { CATEGORY_META } from '@/data/whats-on';
import { buildIcsUrl, formatEventDate } from '@/lib/whats-on';
import { CATEGORY_STYLES } from './categoryStyles';
import { useDialogFocus } from '@/lib/useDialogFocus';

export function EventDrawer({
  event,
  onClose,
}: {
  event: WhatsOnEvent | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useDialogFocus(Boolean(event), dialogRef);

  useEffect(() => {
    if (!event) return;

    document.body.style.overflow = 'hidden';
    function onKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [event, onClose]);

  const categoryLabel = event
    ? (CATEGORY_META.find((c) => c.slug === event.category)?.label ?? event.category)
    : '';

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-navy/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={event.title}
            onClick={(clickEvent) => clickEvent.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-cream shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            <div className="relative h-56 w-full flex-none overflow-hidden">
              <img src={event.coverImage} alt="" loading="lazy" className="h-full w-full object-cover" />
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-navy/70 text-cream backdrop-blur-sm transition-colors duration-300 ease-expo-out hover:bg-gold hover:text-navy"
              >
                ×
              </button>
            </div>

            <div className="flex flex-1 flex-col p-8">
              <span
                className={`inline-block w-fit rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cream ${CATEGORY_STYLES[event.category].badge}`}
              >
                {categoryLabel}
              </span>
              <h2 className="mt-4 font-display text-3xl text-navy">{event.title}</h2>

              <dl className="mt-6 flex flex-col gap-3 text-sm text-navy/80">
                <div className="flex justify-between border-b border-navy/10 pb-2">
                  <dt className="text-navy/50">Date</dt>
                  <dd>{formatEventDate(event)}</dd>
                </div>
                {event.time && (
                  <div className="flex justify-between border-b border-navy/10 pb-2">
                    <dt className="text-navy/50">Time</dt>
                    <dd>{event.time}</dd>
                  </div>
                )}
                {event.location && (
                  <div className="flex justify-between border-b border-navy/10 pb-2">
                    <dt className="text-navy/50">Venue</dt>
                    <dd>{event.location}</dd>
                  </div>
                )}
              </dl>

              <p className="mt-6 text-base leading-relaxed text-body">{event.description}</p>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                {event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    className="rounded-full bg-navy px-6 py-3 text-center text-sm text-cream transition-colors duration-300 ease-expo-out hover:bg-gold"
                  >
                    Get Tickets
                  </a>
                )}
                <a
                  href={buildIcsUrl(event)}
                  download={`${event.id}.ics`}
                  className="rounded-full border border-navy/20 px-6 py-3 text-center text-sm text-navy transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
                >
                  Add to Calendar
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
