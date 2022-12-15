import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SubForm from '../components/sub-form';
import { mockSubItem } from './mocks';
import { render, screen } from '@testing-library/react';


describe('SubItem Tests', () => {
  let subscription;

  beforeEach(() => {
    subscription = { ...mockSubItem[0] }
  });

  it('Should render the an empty form if no subscription is passed', async () => {
    render(
      <Router>
        <SubForm />
      </Router>
    )
    const title = await screen.findByDisplayValue(/Title here/)
    expect(title).toBeInTheDocument();
  })

  it('Should render the filled form if a subscription is passed', async () => {
    render(
      <Router>
        <SubForm subscription={subscription} />
      </Router>
    )
    const title = await screen.findByDisplayValue(subscription.title)
    expect(title).toBeInTheDocument();
  })
})