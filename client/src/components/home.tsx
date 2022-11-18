import './home.css';
import SubscriptionList from './sub-list';
import { Link } from 'react-router-dom';
import { Subscription } from '../types';
import React from 'react';

function Home({ subscriptions }: { subscriptions: Array<Subscription> }) {

  const getMonthlyAverageCost = () => {
    return subscriptions.map((sub) =>
      sub.cycle === 'Annually' ?
        Number(sub.price) / 12
        : Number(sub.price)
    ).reduce((prev, curr) => prev + curr)
  }

  const count = getMonthlyAverageCost();

  return (
    <>
      {count !== 0 &&
        <footer>
          <div className='header-notice'>
            <h2 className='header-cont-title'>My monthly average subscription expenses are:</h2>
            <h2 className='header-cont-price'>${count.toFixed(2)}</h2>
          </div>
        </footer>
      }
      <div className='body-cont'>

        <section className='body-header'>
          <h3 className='title'>My Subscriptions</h3>
          <Link to='/add'><button className='add-btn'>Add Subscription</button></Link>
        </section>
        <div className='underline'></div>

        <SubscriptionList subscriptions={subscriptions} />
      </div>
    </>
  )
}

export default Home;
