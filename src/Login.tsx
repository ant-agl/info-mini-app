import {
  View,
  SplitLayout,
  SplitCol,
 } from '@vkontakte/vkui';
// import { Icon28NewsfeedOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
// import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Login as LoginComponent } from './panels';
// import { DEFAULT_VIEW_PANELS } from './routes';
// import { useState, useEffect } from 'react';

export const Login = () => {
  return (
    <SplitLayout center>
      <SplitCol>
        <View id="login" activePanel="login">
          <LoginComponent id="login" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
