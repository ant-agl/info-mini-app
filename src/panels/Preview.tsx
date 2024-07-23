import { FC, useEffect, useState } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack, Div, Group, Header, ButtonGroup, Button, Spacing } from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { getTicket } from '../api/api';
import type { Ticket } from '../interfaces';
import { PreviewMessage } from '../components/PreviewMessage/PreviewMessage';

export const Preview: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<'id'>();
  const [ticket, setTicket] = useState<Ticket>();

  useEffect(() => {
    if (params && params.id)
      getTicket(+params.id).then((t) => setTicket(t));
  }, []);


  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        { ticket?.title }
      </PanelHeader>

      <Div>
        <Group>
          <Header>Предпросмотр тикета</Header>

          {ticket &&
            <PreviewMessage ticket={ticket} />
          }

          <Spacing size={16} />
          <Div>
            <ButtonGroup mode="horizontal" gap="m" stretched style={{ maxWidth: 450, margin: "0 auto" }}>
              <Button onClick={() => {}} size="l" appearance="negative" stretched>
                На доработку
              </Button>
              <Button onClick={() => {}} size="l" appearance="positive" stretched>
                На публикацию
              </Button>
            </ButtonGroup>
          </Div>
        </Group>
      </Div>
    </Panel>
  );
};
