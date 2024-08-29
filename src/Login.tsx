import {
  View,
  SplitLayout,
  SplitCol,
 } from '@vkontakte/vkui';
import { Login as LoginComponent } from './panels';

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
