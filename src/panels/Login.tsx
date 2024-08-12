import { useState, FC } from 'react';
import { NavIdProps, Button, Input, Panel, PanelHeader, Group, FormItem, FormLayoutGroup, Div } from '@vkontakte/vkui';
import blake from "blakejs";

export const Login: FC<NavIdProps> = ({ id }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSend, setIsSend] = useState(false);

  const handleSubmit = () => {
    setIsSend(true);
    if (!username || !password) return;

    const token = btoa(`${username}:${blake.blake2bHex(password, undefined, 64)}`);
    localStorage.setItem("authToken", token);
    location.reload();
  };

  return (
    <Panel id={id}>
      <PanelHeader>Вход</PanelHeader>

      <Div>
        <Group>
          <FormLayoutGroup>
            <FormItem top="Логин" required>
              <Input
                type="text"
                status={!isSend || username ? 'default' : 'error'}
                value={username}
                onChange={e => setUsername(e.currentTarget.value)}
                placeholder="Логин"
                required
              />
            </FormItem>
            <FormItem top="Пароль" required>
              <Input
                type="password"
                value={password}
                status={!isSend || password ? 'default' : 'error'}
                onChange={e => setPassword(e.currentTarget.value)}
                placeholder="Пароль"
                required
              />
            </FormItem>
            <FormItem>
              <Button size="m" stretched onClick={handleSubmit}>Войти</Button>
            </FormItem>
          </FormLayoutGroup>
        </Group>
      </Div>
    </Panel>
  );
};

export default Login;