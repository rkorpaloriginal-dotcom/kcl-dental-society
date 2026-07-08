import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders a real href for every nav link — none are dead (# or empty)', () => {
    render(<NavBar />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(5);
    for (const link of links) {
      const href = link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });

  it('links to Home, Events, Committee, Sponsors, and Join', () => {
    render(<NavBar />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Events' })).toHaveAttribute('href', '/events');
    expect(screen.getByRole('link', { name: 'Committee' })).toHaveAttribute('href', '/committee');
    expect(screen.getByRole('link', { name: 'Sponsors' })).toHaveAttribute('href', '/sponsors');
    expect(screen.getByRole('link', { name: 'Join' })).toHaveAttribute('href', '/join');
  });
});
