export const isAuthenticated = () => localStorage.getItem('token') !== null;
export const getToken = () => localStorage.getItem('token');
/*export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};*/
export const logout = () => {
  localStorage.removeItem('token');
};