import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SubscriptionList from '../components/sub-list';
import { mockSubItem } from './mocks';

describe('SubItem Tests', () => {
  let subscriptions;

  beforeEach(() => {
    subscriptions = [...mockSubItem]
  });

  it('Should render the all the items', async () => {
    render(
      <SubscriptionList subscriptions={subscriptions} />, { wrapper: Router }
    );
    const icon = await screen.findAllByAltText(/icon/)
    expect(icon.length).toBe(2);
  })

  it('Should render one item per data input', async () => {
    render(
      <SubscriptionList subscriptions={subscriptions} />, { wrapper: Router }
    );
    const title1 = await screen.findAllByText(subscriptions[0].title)
    const title2 = await screen.findAllByText(subscriptions[1].title)
    expect(title1.length).toBe(1);
    expect(title2.length).toBe(1);
    expect(title1[0].innerHTML).not.toBe(title2[0].innerHTML);
  })
})