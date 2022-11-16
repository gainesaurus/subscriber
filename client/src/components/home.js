import './home.css';
import SubscriptionList from './sub-list';
import { Link } from 'react-router-dom';

function Home({ subscriptions }) {

  const getMonthlyAverageCost = () => {
    let count = 0;
    subscriptions.map((sub)=> {
      if(sub.cycle === 'Annually') {
        count += (sub.price/12);
      } else {
        count += sub.price;
      }
    })
    count = count.toFixed(2);
    return count;
  }
  const count = getMonthlyAverageCost();

  return (
    <>
    {count !== 0 &&
      <footer>
        <div className='header-notice'>
        <h2 className='header-cont-title'>My monthly average subscription expenses are:</h2>
        <h2 className='header-cont-price'>${count}</h2>
        </div>
      </footer>
      }
      <div className='body-cont'>

        <section className='body-header'>
          <h3 className='title'>My Subscriptions</h3>
          <Link to='/add'><button className='add-btn'>Add Subscription</button></Link>
        </section>
        <div className='underline'></div>

        <SubscriptionList subscriptions={subscriptions}/>
      </div>
      </>
  )
}

export default Home;
