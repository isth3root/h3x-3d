export interface User {
  phone: string;
  loginDate: string;
}

export const AUTH_STORAGE_KEY = "user_auth";

export const saveUser = (phone: string): User => {
  const user: User = {
    phone,
    loginDate: new Date().toISOString(),
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  return user;
};

export const getUser = (): User | null => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isLoggedIn = (): boolean => {
  return getUser() !== null;
};
