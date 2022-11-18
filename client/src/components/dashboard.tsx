import { Routes, Route } from 'react-router-dom';

import Home from './home';
import AddSubForm from './add-sub-form';
import EditSubItem from './edit-sub-form';

// MOVE TO APP LEVEL
function Dashboard({ postNewSub, editSub, deleteSub, subscriptions }) {

  return (<>

    <Routes>
      <Route path='/' element={<Home subscriptions={subscriptions}/>}/>
      <Route path='/add' element={<AddSubForm postNewSub={postNewSub}/>}/>
      <Route path='/edit-sub/:id' element={<EditSubItem subscriptions={subscriptions} editSub={editSub} deleteSub={deleteSub}/>}/>
    </Routes>


</>);
}

export default Dashboard;
