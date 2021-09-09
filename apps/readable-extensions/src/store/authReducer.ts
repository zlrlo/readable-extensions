export type AuthState = {
  token: string;
};

export type AuthAction = { type: 'LOGIN'; token: string } | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.token };

    case 'LOGOUT':
      return { ...state };

    default:
      throw new Error('Unhandled auth action');
  }
};

export default authReducer;
