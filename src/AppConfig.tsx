import vkBridge, { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge';
import { useAdaptivity, useAppearance, useInsets } from '@vkontakte/vk-bridge-react';
import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider, ConfigProvider, AppRoot } from '@vkontakte/vkui';
import { RouterProvider } from '@vkontakte/vk-mini-apps-router';
import '@vkontakte/vkui/dist/vkui.css';

import { Provider } from 'react-redux';
import store from './store';

import React, { useEffect, useState } from 'react';
import { transformVKBridgeAdaptivity } from './utils';
import { router } from './routes';
// import { App } from './App';
const App = React.lazy(() => import('./App'));
import { SnackbarProvider } from './SnackbarContext';

import { api } from "./api/api";

export const AppConfig = () => {
  const vkBridgeAppearance = useAppearance() || undefined;
  const vkBridgeInsets = useInsets() || undefined;
  const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(window.location.search);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  const [appId, setAppId] = useState<number>();
  const [appIdFetch, setAppIdFetch] = useState(true);

  const [userId, setUserId] = useState<number>();
  const [userIdFetch, setUserIdFetch] = useState(true);

  const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

  useEffect(() => {
    if (window.vk?.id) {
      setUserId(window.vk.id);
    }
    setUserIdFetch(false);
  }, []);

  useEffect(() => {
    bridge.send('VKWebAppGetLaunchParams')
      .then((data) => {
        if (data.vk_app_id) {
          setAppId(data.vk_app_id);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAppIdFetch(false);
      });
  }, []);

  useEffect(() => {
    if (!appId || !userId) {
      if ((!appId && !appIdFetch) || (!userId  && !userIdFetch)) setIsLoad(false);
      return;
    }

    bridge.send('VKWebAppGetAuthToken', {
        app_id: appId,
        scope: ''
      })
      .then( (data) => {
        if (data.access_token) {
          const token = `vk:${userId}:${data.access_token}`;
          localStorage.token = token;
          api.defaults.headers.Authorization = token;
          setIsAuth(true);
        }
      })
      .catch( () => {
        localStorage.token = "";
        api.defaults.headers.Authorization = "";
        setIsAuth(false);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [appId, appIdFetch, userId, userIdFetch]);

  return (
    <ConfigProvider
      appearance={vkBridgeAppearance}
      platform={vk_platform === 'desktop_web' ? 'vkcom' : undefined}
      isWebView={vkBridge.isWebView()}
      hasCustomPanelHeaderAfter={true}
    >
      <AdaptivityProvider {...adaptivity}>
        <Provider store={store}>
          <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
            <RouterProvider router={router}>
              <SnackbarProvider>
                {(!isDev && isLoad) &&
                  <h1 style={{textAlign: 'center'}}>Загрузка...</h1>
                }

                {(!isDev &&!isLoad && !isAuth) &&
                  <h1 style={{textAlign: 'center'}}>Ошибка авторизации</h1>
                }

                {(isDev || !isLoad && isAuth) &&
                  <App />
                }
              </SnackbarProvider>
            </RouterProvider>
          </AppRoot>
        </Provider>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
