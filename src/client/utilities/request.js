const request = async ({ url, body, method = 'GET' }) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}${url}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const resource = await response.json();

    return resource;
  } catch (err) {
    return { err: err.message };
  }
};

export default request;
