const url = "http://entredwin.herokuapp.com/posdated-ws/api/";
//const url = "http://localhost:8080/posdated-ws/api/" ;

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTgxNzc4MTEyLCJleHAiOjE1ODQzNzAxMTJ9.oXzNg-5yQrOTplTZsArmYrgA5RUDOwL27BJ3JRGXjBU";

export const baseUr = {
  domain: url
}

export const findData = async (path) => {
  let data = await fetch(url + path)
    .then(response => {
      return response.json();
    })
    .then(responseObj => {
      return responseObj;
    })
    .catch(error => {
      return (error);
    });

  return data;
};

export const uploadFile = async (data) => {

  let formData = new FormData();
  formData.append("file", data.file);
  formData.append("companyId", data.id)


  let config = {
    method: "POST",
    body: formData,
  }

  let dataRes = await fetch(url + data.path, config)
    .then(response => {
      if (response.status === 200)
        return response.status;
      else
        return response.json();
    })
    .then(responseObj => {
      return responseObj;
    })
    .catch(error => {
      console.log(error);
      return error;
    });

  return dataRes;
};

export const createCategories = (category, successCallback, errorCallback) => {
  let hs = new Headers();
  hs.append("content-type", "application/json");
  hs.append("authorization", token);

  let config = {
    method: "POST",
    headers: hs,
    body: JSON.stringify(category),
  }

  fetch(url, config)
    .then(response => {
      return response.json();
    })
    .then(responseObj => {
      console.log(responseObj);
      successCallback();
    })
    .catch(error => {
      console.log(error);
      errorCallback(error);
    });
};

export const deleteCategories = (cat, successCallback, errorCallback) => {
  let hs = new Headers();
  hs.append("content-type", "application/json");
  hs.append("authorization", token);

  let config = {
    method: "delete",
    headers: hs,
  }


  fetch(url + "/" + cat.id + "", config)
    .then(response => {
      return response.json();
    })
    .then(responseObj => {
      successCallback();
    })
    .catch(error => {
      errorCallback(error);
    });
};

export const updateCategories = (category, successCallback, errorCallback) => {
  let hs = new Headers();
  hs.append("content-type", "application/json");
  hs.append("authorization", token);

  let config = {
    method: "PUT",
    headers: hs,
    body: JSON.stringify(category),
  }

  fetch(url + '/' + category.id, config)
    .then(response => {
      return response.json();
    })
    .then(responseObj => {
      console.log(responseObj);
      successCallback();
    })
    .catch(error => {
      console.log(error);
      errorCallback(error);
    });
};