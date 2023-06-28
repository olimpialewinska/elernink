export const login = async (fetchAdapter: any, email: string, password: string) => {
  const response = await fetchAdapter("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return response.json();
};
