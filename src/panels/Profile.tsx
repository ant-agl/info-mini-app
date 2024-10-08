import { FC, useEffect, useState, useRef } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Header,
  NavIdProps,
  FormLayoutGroup,
  FormItem,
  Input,
  IconButton,
  Flex,
} from '@vkontakte/vkui';
import { Icon16Pen, Icon20Check, Icon28CrossLargeOutline } from '@vkontakte/icons';
import { getBindings, saveBinding  } from '../api/api';
import { Bindings } from '../interfaces';
import { useSnackbar } from '../SnackbarContext';

export const Profile: FC<NavIdProps> = ({ id }) => {
  const { openError } = useSnackbar();

  const [tgID, setTgID] = useState<number | "">("");
  const [oldTgID, setOldTgID] = useState<number | "">("");
  const [tgDisabled, setTgDisabled] = useState(true);
  const tgInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getBindings().then((bindings: Bindings) => {
      if (bindings.tg) {
        setTgID(bindings.tg);
        setOldTgID(bindings.tg);
      }
    })
    .catch((err) => {
      openError(err.response?.data || "Возникла ошибка")
    });
  }, []);

  const sendForm = (type: string) => {
    console.log('save', type, tgID);
    if (type == 'tg' && tgID) {
      saveBinding(type, tgID)
      .catch((err) => {
        openError(err.response?.data || "Возникла ошибка")
      });
      setTgDisabled(true);
      setOldTgID(tgID);
    }
  }

  const cancelField = (type: string) => {
    if (type == 'tg') {
      setTgDisabled(true);
      setTgID(oldTgID);
    }
  }

  const editField = (type: string) => {
    if (type == 'tg') {
      setTgDisabled(false);
      setTimeout(() => {
        if (tgInput.current) {
          tgInput.current.focus();
        }
      });
    }
  }

  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>
      <Group>
        <Header>Настройки профиля</Header>

        <FormLayoutGroup>
          <FormItem top="Telegram ID" htmlFor="tg-id">
            <Flex noWrap gap='m'>
              <Input
                getRef={tgInput}
                id="tg-id"
                name="tg-id"
                placeholder="xxx"
                value={tgID}
                onChange={(e) => setTgID(parseInt(e.currentTarget.value) ? parseInt(e.currentTarget.value) : "")}
                style={{width: '100%'}}
                disabled={tgDisabled}
              />

              {tgDisabled ?  (
                <IconButton label="Редактировать" onClick={() => editField('tg')}>
                  <Icon16Pen color='var(--vkui--color_text_accent_themed)' />
                </IconButton>
              ) : (
                <Flex noWrap style={{margin: 0}}>
                  <IconButton label="Сохранить" onClick={() => sendForm('tg') }>
                    <Icon20Check width={16} height={16} color='green' />
                  </IconButton>
                  <IconButton label="Отмена" onClick={() => cancelField('tg') }>
                    <Icon28CrossLargeOutline width={16} height={16} color='red' />
                  </IconButton>
                </Flex>
              )}
            </Flex>
          </FormItem>
        </FormLayoutGroup>
      </Group>
    </Panel>
  );
};

export default Profile;