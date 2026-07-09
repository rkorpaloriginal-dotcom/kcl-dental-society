import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('layout.tsx typography', () => {
  const source = fs.readFileSync(path.resolve(__dirname, './layout.tsx'), 'utf-8');

  it('imports Fraunces and Instrument Sans', () => {
    expect(source).toMatch(/\bFraunces\b/);
    expect(source).toMatch(/\bInstrument_Sans\b/);
  });

  it('no longer imports the old Playfair Display / Inter pairing', () => {
    expect(source).not.toMatch(/\bPlayfair_Display\b/);
    expect(source).not.toMatch(/\bInter\b/);
  });
});
