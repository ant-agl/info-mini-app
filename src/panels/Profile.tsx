import { FC, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Header,
  NavIdProps,
  FormLayoutGroup,
  FormItem,
  Button,
  ChipsInput,
  IconButton
} from '@vkontakte/vkui';
import { Icon16Clear } from '@vkontakte/icons';
import { getBindings, saveBinding  } from '../api/api';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../store';
// import { setTickets } from '../store';

export const Profile: FC<NavIdProps> = ({ id }) => {
  const [tgID, setTgID] = useState<{value: string, label: string}[]>([]);

  // const dispatch = useDispatch<AppDispatch>();
  // const tickets = useSelector((state: RootState) => state.tickets.tickets);

  useEffect(() => {
    getBindings().then((ids: string[]) => {
      const res: {value: string, label: string}[] = [];
      ids.forEach(id => {
        res.push({ value: id, label: id });
      });

      setTgID(res);
      // dispatch(setTgID(res));
    });
  }, []);

  const sendForm = () => {
    saveBinding("tg", tgID.map(i => i.value).join(','));
  }

  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>
      <Group>
        <Header>Настройки профиля</Header>

        <FormLayoutGroup>
          <FormItem top="Telegram ID (введите и нажмите enter)" htmlFor="tg-id">
            <ChipsInput
              id="tg-id"
              name="tg-id"
              placeholder="xxx"
              after={tgID.length > 0 &&
                <IconButton hoverMode="opacity" label="Очистить поле" onClick={() => setTgID([])}>
                  <Icon16Clear />
                </IconButton>
              }
              value={tgID}
              onChange={(e) => setTgID(e)}
            />
          </FormItem>
          <FormItem>
            <Button
              onClick={sendForm}
              size="m"
              stretched
            >
              Сохранить
            </Button>
        </FormItem>
        </FormLayoutGroup>
      </Group>
    </Panel>
  );
};