import { Project } from './Project';

const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s).';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

const projectAPI = {
  put(project) {
    const { id, ...projectWithoutId } = project;
    console.log("Enviando proyecto al backend (PUT):", projectWithoutId);
    return fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectWithoutId),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(delay(2000))
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log('log client error ' + error);
        throw new Error('There was an error updating the project. Please try again.');
      });
  },

  post(project) {
    console.log("Enviando proyecto al backend (POST):", project);
    return fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify(project),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(delay(2000))
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log('log client error ' + error);
        throw new Error('There was an error creating the project. Please try again.');
      });
  },

  get(page = 1, limit = 10) {
    return fetch(`${url}?page=${page}&limit=${limit}`)
      .then(delay(2000))
      .then(checkStatus)
      .then(parseJSON)
      .then((projects) => projects.map((p) => new Project(p)))
      .catch((error) => {
        console.log('log client error ' + error);
        throw new Error('There was an error retrieving the projects. Please try again.');
      });
  },

  find(id) {
    return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((p) => new Project(p));
  },

  delete(id) {
    return fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting the project');
        }
        return response.json();
      });
  },
};

export { projectAPI };
