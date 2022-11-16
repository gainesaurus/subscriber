import './sub-list.css';
import SubItem from './sub-item';

function SubscriptionList({ subscriptions }) {

  return (<div className='list-cont'>
  {subscriptions && subscriptions.map((sub) =>
    <SubItem key={sub._id} subscription={sub}/>
  )}

</div>);
}

export default SubscriptionList;