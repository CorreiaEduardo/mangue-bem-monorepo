import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";

import api from '../services/AxiosProvider';
import { useNavigate } from 'react-router-dom';

interface AuthContextData {
  isLoading: boolean;
  isAuthenticated(): boolean;
  isCurator(): boolean;
  isAdmin(): boolean;
  error: boolean;
  signIn(credentials: any): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<any> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function LoadStorageData(): Promise<void> {
      if (cookies && cookies.token) {
        api.defaults.headers.authorization = `Bearer ${cookies.token}`;
      }
    }

    LoadStorageData();
  }, [cookies]);

  const isAuthenticated = () => {
    try {
      return !!cookies.token && !!jwtDecode(cookies.token);
    } catch (error) {
      return false;
    }
  }

  const isCurator = () => {
    if (isAuthenticated()) {
      const decoded = jwtDecode(cookies.token) as any;
      if (!!decoded) {
        const roles = decoded.roles;
        return roles.includes("CURATOR");
      }
    }

    return false;
  }

  const isAdmin = () => {
    if (isAuthenticated()) {
      const decoded = jwtDecode(cookies.token) as any;
      if (!!decoded) {
        const roles = decoded.roles;
        return roles.includes("ADMIN");
      }
    }

    return false;
  }

  const signIn = useCallback(async ({ email, password }: any) => {
    setError(false);
    setLoading(true);

    return api.post<any>(
      'v1/auth/login',
      {
        email,
        password,
      },
    ).then((response: { data: { token: any; }; }) => {
      const { token } = response.data;
      setCookie('token', token);
      api.defaults.headers.authorization = `Bearer ${token}`;
    }).catch(() => {
      setError(true);
    }).finally(() => {
      setLoading(false);
    });
  }, [setCookie]);

  const signOut = useCallback(async () => {
    removeCookie('token');
    navigate("/profile");
  }, [removeCookie, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        isCurator,
        isAdmin,
        error,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
