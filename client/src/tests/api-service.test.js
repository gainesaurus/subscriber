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

jest.mock('../api-service/api-ServiceWorker.js', () => ({
  getAllSubs: ()
})