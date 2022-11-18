import './add-sub-form.css';
import React from 'react';
import 'react-datalist-input/dist/styles.css';
import SubForm from './sub-form';
import { postNewSub } from '../api-service/api-service';

function AddSubForm() {
  return (<>
    <SubForm apiServiceMethod={postNewSub} />
  </>);
}

export default AddSubForm;