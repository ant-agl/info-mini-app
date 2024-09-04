import { FC, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  CardGrid,
  Header,
  Button,
  Text,
  Div,
  NavIdProps,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon28AddOutline } from '@vkontakte/icons';
import { getTickets } from '../api/api';
import type { Ticket } from '../interfaces';
import { TicketCard } from '../components/TicketCard/TicketCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setTickets } from '../store';
import { useSnackbar } from '../SnackbarContext';

export const Home: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { openError } = useSnackbar();

  const dispatch = useDispatch<AppDispatch>();
  const tickets = useSelector((state: RootState) => state.tickets.tickets);

  useEffect(() => {
    // if (tickets.length === 0) {
    getTickets().then((t) => {
      dispatch(setTickets(t))
    })
    .catch((err) => {
      openError(err.response?.data || "Возникла ошибка")
    });
    // }
  }, [dispatch, tickets.length]);

  return (
    <Panel id={id}>
      <PanelHeader>Система информирования ДГТУ</PanelHeader>
      <Group>
        <Button
          mode="tertiary"
          stretched={true}
          align='left'
          onClick={() => { routeNavigator.push('/new') }}
          before={<Icon28AddOutline width={18} height={18} />}
        >
          Добавить новый тикет
        </Button>
      </Group>

      <Group>
        <Header>Список неподтвержденных тикетов</Header>
        {tickets.filter(t => !t.offer).length > 0 &&
          <CardGrid size="m">
            {tickets.filter(t => !t.offer).map((ticket: Ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </CardGrid>
        }
        {tickets.filter(t => !t.offer).length == 0 &&
          <Div>
            <Text style={{textAlign: 'center', opacity: 0.5}}>Пусто</Text>
          </Div>
        }
      </Group>

      <Group>
        <Header>Список тикетов, ожидающих публикации</Header>
        {tickets.filter(t => t.offer).length > 0 &&
          <CardGrid size="m">
            {tickets.filter(t => t.offer).map((ticket: Ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </CardGrid>
        }
        {tickets.filter(t => t.offer).length == 0 &&
          <Div>
            <Text style={{textAlign: 'center', opacity: 0.5}}>Пусто</Text>
          </Div>
        }
      </Group>
    </Panel>
  );
};

export default Home;