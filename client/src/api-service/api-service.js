const ApiService = {};

const brandToken = process.env.REACT_APP_BRAND_API_TOKEN;
const baseApiURL = process.env.REACT_APP_BRAND_API_BASE_URL;
const baseURL = process.env.REACT_APP_BASE_URL;

ApiService.getAllSubs = async () => {
 let res = await fetch(`${baseURL}/subscriptions`);
 res = await res.json();
 return res;
}


ApiService.postNewSub = async (subscription) => {
  let res = await fetch(`${baseURL}/subscriptions`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  })
  res = res.json();
  return res;
}

ApiService.editSub = async (updatedSub) => {
  let res = await fetch(`${baseURL}/subscriptions`, {
    method: 'PUT',
    body: JSON.stringify(updatedSub),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  })
  res = res.json();
  return res;
}

ApiService.deleteSub = async (uid) => {
    await fetch(`${baseURL}/subscriptions`, {
    method: 'DELETE',
    body: JSON.stringify({id: uid}),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  })
}

ApiService.postSubNotification = async (notificationData) => {
  await fetch(`${baseURL}/notify`, {
    method: 'POST',
    body: JSON.stringify(notificationData),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  })
}

ApiService.putToken = async (token, uid) => {
  await fetch(`${baseURL}/user-token`, {
    method: 'PUT',
    body: JSON.stringify({token: token, userId: uid}),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    }
  })
}

ApiService.getSubOptions = async (domain) => {
  let res = await fetch(`${baseApiURL}${domain}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer' + brandToken,
    }
  });
  res = await res.json();
  return res;
}

export default ApiService;