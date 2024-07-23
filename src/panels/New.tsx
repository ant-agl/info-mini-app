import { FC } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack,
  Div,
  Group,
  FormItem,
  Input,
  Textarea,
  File,
  DateInput,
  Button,
  FormLayoutGroup,
 } from '@vkontakte/vkui';
 import { Icon24Camera, Icon24Document, Icon20SendOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


export const New: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Новый тикет
      </PanelHeader>
      <Div>
        <Group>
          <FormItem top="Название поста">
            <Input
              id="name"
              placeholder="О проведении тестирования системы информирования"
            />
          </FormItem>
          <FormItem
            topNode={
              <FormItem.Top>
                <FormItem.TopLabel htmlFor="about">
                  Текст поста
                </FormItem.TopLabel>
              </FormItem.Top>
            }
          >
            <Textarea id="content" name="about" />
          </FormItem>
          <FormLayoutGroup mode="horizontal">
            <FormItem top="Загрузите фото">
              <File
                before={
                  <Icon24Camera role="presentation" />
                }
                size="m"
                id="image"
              >
                Открыть галерею
              </File>
            </FormItem>
            <FormItem
              top="Загрузите документы (при необходимости)"
            >
            <File
              before={
                <Icon24Document role="presentation" />
              }
              size="m" mode="secondary"
            />
            </FormItem>
          </FormLayoutGroup>
          <FormLayoutGroup mode="horizontal">
            <FormItem top="Теги (через запятую)">
              <Input
                id="groups"
                placeholder="АА11,студентам,сотрудникам"
              />
            </FormItem>
            <FormItem top="Выставите дату и время публикации">
              <DateInput
                disablePast enableTime closeOnChange
              />
            </FormItem>
          </FormLayoutGroup>

          <FormItem>
            <Button
              onClick={() => {}}
              before={<Icon20SendOutline />}
              size="m"
              stretched
            >
              Отправить на проверку / публикацию
            </Button>
          </FormItem>
        </Group>
      </Div>
    </Panel>
  );
};
