// app/globals.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('globals.css', () => {
  const css = fs.readFileSync(path.resolve(__dirname, './globals.css'), 'utf-8');

  it('keeps the brand navy and gold as raw values, unchanged from the original build', () => {
    expect(css).toMatch(/#1b2a56/i);
    expect(css).toMatch(/#c9992e/i);
  });

  it('defines a warm cream background and warm ink text color, never pure white or pure black', () => {
    expect(css).toMatch(/#f7f3ec/i);
    expect(css).toMatch(/#1a1613/i);
    expect(css).not.toMatch(/#ffffff/i);
    expect(css).not.toMatch(/#000000/i);
  });

  it('defines custom easing curves, not left to default linear/ease', () => {
    expect(css).toMatch(/cubic-bezier\(\s*0\.16,\s*1,\s*0\.3,\s*1\s*\)/i);
  });

  it('disables animation and transition duration under prefers-reduced-motion', () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/i);
    expect(css).toMatch(/animation-duration:\s*0\.01ms/i);
  });

  it('balances headline text wrapping', () => {
    expect(css).toMatch(/text-wrap:\s*balance/i);
  });
});
