import {
  getAllSubs,
  postNewSub,
  editSub,
  deleteSub,
  postSubNotification,
  putToken,
  getSubOptions,
} from '../api-service';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it } from 'node:test';

jest.mock('../api-service/api-ServiceWorker.js', () => ({
  getAllSubs: () => ({})
}));
it('should call getAllSubs with the correct credentials', async() => {
  const setAllSubs = jest.fn();
  const credentials = {};

  // render(<)
})

jest.mock('../api-service/api-ServiceWorker.js', () => ({

}))