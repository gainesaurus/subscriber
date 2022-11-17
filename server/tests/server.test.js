import app from '../server'
import mocks from './mocks'

describe("Server setup", () => {
  const PORT = process.env.PORT;
  const HOSTNAME = process.env.HOSTNAME;
  const BASE_URL = HOSTNAME + ':' + PORT;
  let id;

  beforeAll((done) => {
    app.listen(PORT, () => {
      done()
    });
  })

  test('should GET subscriptions on /subscriptions', async () => {
    const response = await fetch(BASE_URL + '/subscriptions')
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.length).not.toBeUndefined()
  })

  test('should POST subscription on /subscriptions', async () => {
    const opts = {
      method: 'POST',
      body: JSON.stringify(mocks.subscriptionBody),
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await fetch(BASE_URL + '/subscriptions', opts)
    expect(response.status).toBe(201)
    const body = await response.json()
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('_id');
    id = body._id;
  })

  test('should PUT subscription on /subscriptions', async () => {
    const opts = {
      method: 'PUT',
      body: JSON.stringify({ ...mocks.subscriptionBody, id }),
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await fetch(BASE_URL + '/subscriptions', opts)
    expect(response.status).toBe(201)
    const body = await response.json()
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('_id');
  })

  test('should DELETE subscription on /subscriptions', async () => {
    const opts = {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await fetch(BASE_URL + '/subscriptions', opts)
    expect(response.status).toBe(202);
  })

})