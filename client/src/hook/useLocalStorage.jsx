export const useLocalStorage = async (user) => {
  const token = await JSON.parse(localStorage.getItem("Profile")).token;
  localStorage.setItem("Profile", JSON.stringify({ token, result: user }));
};
