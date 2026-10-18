const BASE_URL = "http://localhost:5000";

export const fetchData = async (endpoint = "", method = "GET", body = null) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
