const users = ['test@test.com', 'admin'];

async function validateCredentials({username, password}) {
  if(!username || !password) return Promise.reject(new Error('Please provide a username and password'));

  if(!users.includes(username)) return Promise.reject(new Error('User not found'));

  return Promise.resolve({
    "token": "eyJhbGciOiJIUzI1NiIsInwefwefMSwiZ3VpZCI6IjQ0MDdmOTNjLWRjMDEtNDQ2My1hMzhmwefwefLWUxZmJiMWQzMTRmOCIsImV4cCI6MTUxNzU3ODM2NCwiZW1haWwiOiJuaWVrLmhlZXplbWFuc0Bmcm9udG1lbi5ubCIsImlhdCI6MTUxNzUwefwef3Mjk2NH0.Ykirzr4b7GdsIPGV6PDjCpFHOAqohKazJl5pWJFw",
    "user": {
      "id": 1,
      "guid": "4407xxxx-dc01-xxxx-a38f-e1fbb1xxxxxx",
      "firstname": "Naveen",
      "lastname": "Dayananda",
      "username": "admin",
      "email": "test@test.com",
      "status": "active",
      "createdAt": "2018-02-02T11:46:39.000Z",
      "updatedAt": "2018-02-02T11:46:39.000Z"
    }
  });
}

function requestHandler(request, response) {
  validateCredentials(request.body).then((data) => response.json(data));
}

module.exports = requestHandler;