import { FC } from 'react';
import {
  ContentCard,
  EllipsisText
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import type { Ticket } from '../../interfaces';

interface TicketCardType {
  ticket: Ticket;
  index: number;
}

function getDate(date: number): string {
  return new Date(date * 1000).toLocaleDateString();
}

export const TicketCard: FC<TicketCardType> = ({ ticket, index }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <ContentCard
      onClick={() => { routeNavigator.push(`/preview/${index}`) }}
      header={ticket.title}
      text={(<EllipsisText>{ ticket.description }</EllipsisText>)}
      subtitle={getDate(ticket.date)}
      caption={ticket.tags.join(', ')}
      hasHover
    />
  )
};
