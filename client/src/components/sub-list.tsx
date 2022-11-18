import './sub-list.css';
import SubItem from './sub-item';
import React from 'react';
import { Subscription } from '../types';

function SubscriptionList({ subscriptions }: { subscriptions?: Array<Subscription> }) {

  return (<div className='list-cont'>
    {subscriptions && subscriptions.map((sub) =>
      <SubItem key={sub._id} subscription={sub} />
    )}

  </div>);
}

export default SubscriptionList;