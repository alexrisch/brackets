import { useAuthState } from '../context/AuthProvider';

type AuthState = 'LOADING' | 'AUTHED' | 'NO_AUTH';

export const useAuth = (): AuthState => {
  const {status} = useAuthState();
  return status;
};

