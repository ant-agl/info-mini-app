import { FC, useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  CardGrid,
  Div,
  Header,
  CellButton,
  Spacing,
  NavIdProps,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon28AddOutline } from '@vkontakte/icons';
import { getTickets } from '../api/api';
import type { Ticket } from '../interfaces';
import { TicketCard } from '../components/TicketCard/TicketCard';

export const Home: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    getTickets().then((t) => setTickets(t));
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>Система информирования ДГТУ</PanelHeader>
      <Div>
        <Group>
          <Header>Список тикетов</Header>
          <CardGrid size="m">
            {tickets.map((ticket: Ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </CardGrid>

          <Spacing size={16} />
          <CellButton
            onClick={() => { routeNavigator.push('/new') }}
            before={<Icon28AddOutline />}
          >
            Добавить новый тикет
          </CellButton>
        </Group>
      </Div>
    </Panel>
  );
};
