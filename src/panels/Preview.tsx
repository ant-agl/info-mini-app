import { FC, useEffect, useState } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { getTicket } from '../api/api';
import type { Ticket } from '../interfaces';

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

    </Panel>
  );
};
