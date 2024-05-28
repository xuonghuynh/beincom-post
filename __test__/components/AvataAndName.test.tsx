import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AvataAndName from '@/components/AvataAndName';
import ReactTimeAgo from 'react-time-ago';

vi.mock('react-time-ago', () => ({
  default: vi.fn(() => <div>Mocked ReactTimeAgo</div>)
}));

describe('AvataAndName', () => {
  const props = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: 'avatar.jpg',
    publishedAt: '2024-05-27T12:00:00Z',
    hideName: false
  };

  it('renders AvataAndName with provided props', () => {
    render(<AvataAndName {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Mocked ReactTimeAgo')).toBeInTheDocument();
  });
});
