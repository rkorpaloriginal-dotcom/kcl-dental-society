import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('globals.css', () => {
  it('defines the brand navy and gold as raw values somewhere in the design system', () => {
    const css = fs.readFileSync(path.resolve(__dirname, './globals.css'), 'utf-8');
    expect(css).toMatch(/#1B2A56/i);
    expect(css).toMatch(/#C9992E/i);
  });

  it('sets a minimum body text contrast color, not light gray', () => {
    const css = fs.readFileSync(path.resolve(__dirname, './globals.css'), 'utf-8');
    expect(css).toMatch(/#444444/i);
  });
});
