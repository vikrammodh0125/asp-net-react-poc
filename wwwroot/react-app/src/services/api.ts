const BASE_URL = "/api"; // Adjust based on your backend API

export const apiRequest = async <T, R>(endpoint: string, method = "GET", body?: T) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Required for cookies/session storage
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    console.log(`API Request (${method} ${BASE_URL}${endpoint}):`, body);

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data as R;
  } catch (error) {
    console.error(`API Error (${method} ${endpoint}):`, error);
    throw error;
  }
};