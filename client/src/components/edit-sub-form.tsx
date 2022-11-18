
import React from 'react';
import { Subscription } from '../types';
import SubForm from './sub-form';
import { editSub } from '../api-service/api-service';
import { useParams } from 'react-router-dom';

type Props = {
  subscriptions?: Array<Subscription>;
}

function EditSubItem({ subscriptions }: Props) {
  const { id } = useParams();

  if (!subscriptions) return <></>
  const subscription = subscriptions.find((sub) => sub._id === id)

  return (<>
    <SubForm apiServiceMethod={editSub} subscription={subscription} />
  </>);
}

export default EditSubItem;
