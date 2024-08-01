import { FC, useEffect, useState } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack, Div, Group, Header, ButtonGroup, Button, Spacing, FormItem, Textarea } from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { getTickets } from '../api/api';
import type { Ticket } from '../interfaces';
import { PreviewMessage } from '../components/PreviewMessage/PreviewMessage';
import { sendForRevision, sendForPublication } from "../api/api";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setTickets } from '../store';

export const Preview: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<'id'>();
  const dispatch = useDispatch<AppDispatch>();
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const [ticket, setTicket] = useState<Ticket>();
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    if (params && params.id) {
      const existingTicket = tickets.find(t => t.id === +params.id!);
      if (existingTicket) {
        setTicket(existingTicket);
      } else {
        getTickets().then((t) => {
          dispatch(setTickets(t));
          const foundTicket = t.find(t => t.id === +params.id!);
          if (foundTicket) {
            setTicket(foundTicket);
          } else {
            routeNavigator.push("/");
          }
        }).catch(() => {
          routeNavigator.push("/");
        });
      }
    }
  }, []);


  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        { ticket?.title }
      </PanelHeader>

      {ticket &&
        <Div>
          <Group>
            <Header>Предпросмотр тикета</Header>

            {ticket &&
              <PreviewMessage ticket={ticket} />
            }

            <Spacing size={16} />

            <FormItem top="Описание доработок" style={{ maxWidth: 450, margin: "0 auto" }}>
              <Textarea
                id="reason"
                name="reason"
                placeholder="Введите описание доработок"
                value={reason}
                required
                onChange={(e) => setReason(e.currentTarget.value)}
              />
            </FormItem>
            <Div>
              <ButtonGroup mode="horizontal" gap="m" stretched style={{ maxWidth: 450, margin: "0 auto" }}>
                <Button onClick={() => {sendForRevision(ticket.id!, reason)}} size="l" appearance="negative" stretched>
                  На доработку
                </Button>
                <Button onClick={() => {sendForPublication(ticket.id!)}} size="l" appearance="positive" stretched>
                  На публикацию
                </Button>
              </ButtonGroup>
            </Div>
          </Group>
        </Div>
      }
    </Panel>
  );
};
