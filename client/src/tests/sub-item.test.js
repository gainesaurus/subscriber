import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SubItem from '../components/sub-item';
import { mocks, mockSubItem } from './mocks';

let mockFunction;

beforeEach(() => {
  mockFunction = jest.fn();
});

describe('SubItem Tests', () => {

  it('Should render the Subscription Item title correctly', () => {
    render(
      <SubItem key={mockSubItem._id} subscription={mockSubItem} />
    );
    expect(screen.getByText(mocks.mockSubItem.title)).toBeInTheDocument();
  })

  it('Should render the Subscription Item prettyStart correctly', () => {
    render(
      <SubItem key={mockSubItem._id} subscription={mockSubItem} />
    );
    expect(screen.getByText(mocks.mockSubItem.prettyStart)).toBeInTheDocument();
  })

  it('Should render the Subscription Item price correctly', () => {
    render(
      <SubItem key={mockSubItem._id} subscription={mockSubItem} />
    );
    expect(screen.getByText(mocks.mockSubItem.price)).toBeInTheDocument();
  })

  it('Should render the Subscription Item cycle correctly', () => {
    render(
      <SubItem key={mockSubItem._id} subscription={mockSubItem} />
    );
    expect(screen.getByText(mocks.mockSubItem.cycle)).toBeInTheDocument();
  })
})