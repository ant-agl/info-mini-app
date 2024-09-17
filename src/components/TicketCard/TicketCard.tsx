import { FC } from 'react';
import {
  ContentCard,
  EllipsisText
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import type { Ticket } from '../../interfaces';
import { MarkdownText } from '../MarkdwonText/MarkdownText';
import "./TicketCard.css";

interface TicketCardType {
  ticket: Ticket;
}

function getDate(time: number): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return new Date(time * 1000).toLocaleString('ru-RU', options);
}

export const TicketCard: FC<TicketCardType> = ({ ticket }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <ContentCard
      onClick={() => { routeNavigator.push(`/preview/${ticket.id}`) }}
      header={ticket.title}
      text={(
        <span>
          <EllipsisText><MarkdownText text={ticket.description} /></EllipsisText>
          <br />
          <span className="authors">{ ticket.authors.join(', ') }</span>
        </span>
      )}
      subtitle={getDate(ticket.time)}
      caption={ticket.groups.join(', ')}
      hasHover
    />
  )
};

export default TicketCard;