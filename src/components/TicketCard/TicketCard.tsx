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
  return new Date(time * 1000).toLocaleString();
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