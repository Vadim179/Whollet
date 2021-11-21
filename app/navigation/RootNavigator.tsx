import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { AppContext, AUTH_CHECKED } from 'context';
import { Loading } from 'components';
import { CCVPNavigator, PreAuthNavigator } from './PreAuth';

const RootNavigator = () => {
  const auth = getAuth();
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState<any | null>(null);
  const { authLoading } = state;

  const checkUser = useCallback(
    (fbUser: any | null) => {
      setUser(fbUser);
      dispatch({
        type: AUTH_CHECKED,
      });
    },
    [dispatch],
  );

  useEffect(() => {
    const listener = onAuthStateChanged(auth, checkUser);
    return () => listener();
  }, [auth, checkUser]);

  return authLoading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {user !== null ? <CCVPNavigator /> : <PreAuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
