import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import SubItem from '../components/sub-item';
import { mockSubItem } from './mocks';

let mockFunction;

beforeEach(() => {
  mockFunction = jest.fn();
});

describe('SubItem Tests', () => {

  it('Should render the SubItem title correctly', () => {
    render(
      <Router>
        <SubItem key={mockSubItem._id} subscription={mockSubItem} />
      </Router>
    );
    expect(screen.getByText(mockSubItem[0].title)).toBeInTheDocument();
  })

  it('Should render the SubItem prettyStart correctly', () => {
    render(
      <SubItem key={mockSubItem._id} subscription={mockSubItem} />
    );
    expect(screen.getByText(mockSubItem[0].prettyStart)).toBeInTheDocument();
  })

  it('Should render the SubItem price correctly', () => {
    render(
      <SubItem key={mockSubItem._id} subscription={mockSubItem} />
    );
    expect(screen.getByText(mockSubItem.price)).toBeInTheDocument();
  })

  it('Should render the SubItem cycle correctly', () => {
    render(
      <SubItem key={mockSubItem._id} subscription={mockSubItem} />, {wrapper: Router}
    );
    expect(screen.getByText(mockSubItem[0].cycle)).toBeInTheDocument();
  })
})