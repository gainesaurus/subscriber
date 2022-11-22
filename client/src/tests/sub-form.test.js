import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SubForm from '../components/sub-form';
import { mockSubItem } from './mocks';
import { editSub, postNewSub } from '../api-service/api-service'
import renderer from 'react-test-renderer';


describe('SubItem Tests', () => {
  // Date.now.mockImplementation(() => new Date(Date.UTC(2022, 11, 21, 19)).valueOf())
  let subscription;

  beforeEach(() => {
    Date.now = jest.fn(() => Date.UTC(2022, 11, 21, 19))
    subscription = { ...mockSubItem[0] }
  });

  it('Should render the an empty form if no subscription is passed', async () => {
    const tree = renderer
      .create(
        <Router>
          <SubForm apiServiceMethod={postNewSub} />
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot();
  })

  it('Should render the filled form if no subscription is passed', async () => {
    const tree = renderer
      .create(
        <Router>
          <SubForm apiServiceMethod={editSub} subscription={subscription} />
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot();
  })
})