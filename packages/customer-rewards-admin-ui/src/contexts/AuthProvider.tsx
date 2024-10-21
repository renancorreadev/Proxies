import { JWTPayload } from 'jose';
import { createContext, PropsWithChildren, useCallback, useState } from 'react';

import * as utils from './utils';

type AuthContextProps = {
  auth: JWTPayload | null;
  isLogged: boolean;
  makeLoginUrl: () => void;
  makeLogoutUrl: () => void;
  login: (
    accessToken: string,
    idToken: string,
    code: string,
    state: string,
  ) => JWTPayload | void;
};

const initContextData: AuthContextProps = {
  auth: null,
  isLogged: false,
  makeLoginUrl: utils.makeLoginUrl,
  makeLogoutUrl: () => {},
  login: () => {},
};

export const AuthContext = createContext(initContextData);

export const AuthProvider = (props: PropsWithChildren) => {
  const makeLogin = useCallback(
    (accessToken: string, idToken: string, code: string, state: string) => {
      const authData = utils.login(accessToken, idToken, undefined, state);
      setData((oldData) => ({
        ...oldData,
        auth: authData,
        isLogged: !!authData,
      }));
      utils.exchangeCodeForToken(code).then((tokenData) => {
        setData((oldData) => ({
          ...oldData,
          auth: tokenData,
          isLogged: !!tokenData,
        }));
      });
      return authData;
    },
    [],
  );

  const [data, setData] = useState({
    auth: utils.getAuth(),
    makeLoginUrl: utils.makeLoginUrl,
    makeLogoutUrl: utils.makeLogoutUrl,
    login: makeLogin,
  });

  console.log('login data: ', data);

  //@ts-expect-error - for refresh token param
  return <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>;
};
