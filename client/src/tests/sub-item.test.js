import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SubItem from '../components/sub-item';
import { mockSubItem } from './mocks';

describe('SubItem Tests', () => {
  let subscription;

  beforeEach(() => {
    subscription = { ...mockSubItem[0] }
  });

  it('Should render the SubItem icon correctly', async () => {
    render(
      <SubItem key={subscription._id} subscription={subscription} />, { wrapper: Router }
    );
    const icon = await screen.findByAltText(/icon/)
    expect(icon).toBeInTheDocument();
    expect(icon.getAttribute('src')).toBe(subscription.icon)
  })

  it('Should render the SubItem title correctly', async () => {
    render(
      <SubItem key={subscription._id} subscription={subscription} />, { wrapper: Router }
    );
    const title = await screen.findByText(subscription.title)
    expect(title).toBeInTheDocument();
  })

  it('Should render the SubItem prettyStart correctly', async () => {
    render(
      <SubItem key={subscription._id} subscription={subscription} />, { wrapper: Router }
    );
    const prettyStart = await screen.findByText(`Started: ${subscription.prettyStart}`)
    expect(prettyStart).toBeInTheDocument();
  })

  it('Should render the SubItem price and cycle correctly', async () => {
    render(
      <SubItem key={subscription._id} subscription={subscription} />, { wrapper: Router }
    );
    const price = await screen.findByText(`$${subscription.price}/${subscription.cycle}`)
    expect(price).toBeInTheDocument();
  })
})