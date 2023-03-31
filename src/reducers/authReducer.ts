import {Auth} from 'aws-amplify';
import { useEffect, useReducer, useRef } from 'react';

export type AuthStatus = 'LOADING' | 'AUTHED' | 'NO_AUTH'; 

export interface AuthState {
  status: AuthStatus;
}

// Define the initial theme state
const initialState: AuthState = {
  status: 'LOADING'
};

interface LoginAction {
  type: 'AUTH/LOGIN';
}

interface LogoutAction {
  type: 'AUTH/LOGOUT';
}

interface SetAuthAction {
  type: 'AUTH/SET';
  payload: {
    status: AuthStatus;
  };
}

export type AuthActions = LoginAction | LogoutAction | SetAuthAction;

// Define the authReducer to update the auth state
const authReducer = (
  state: AuthState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case 'AUTH/LOGIN':
      return {
        status: 'AUTHED',
      };
    case 'AUTH/LOGOUT':
      return {
        status: 'NO_AUTH'
      };
    case 'AUTH/SET':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

// Create the custom hook that provides the dispatch function
export const useAuthReducer = (): [AuthState, React.Dispatch<AuthActions>] => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // const getCurrentUser = async () => {
    //   const authData = await Auth.currentAuthenticatedUser();
    //   dispatch({
    //     type: 'AUTH/SET',
    //     payload: {
    //       status: !!authData ? 'AUTHED' : 'NO_AUTH',
    //     },
    //   });
    // }
    // getCurrentUser();
  }, []);

  return [
    state,
    dispatch
  ];
};
