import React, { FC, PropsWithChildren, createContext, useContext } from 'react';
import {AuthActions, AuthState, useAuthReducer} from '../reducers/authReducer'

export const AuthContext = createContext<[
  AuthState,
  React.Dispatch<AuthActions>
]>([
  {status: 'LOADING'},
  () => {}
])

export const AuthProvider: FC<PropsWithChildren> = ({
  children
}) => {
  const [state, dispatch] = useAuthReducer();

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  const [state] = useContext(AuthContext);
  return state;
};

export const useAuthDispatch = () => {
  const [_, dispatch] = useContext(AuthContext);
  return dispatch;
};
