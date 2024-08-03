import { FC } from 'react';
import type { Ticket } from '../../interfaces';
import { GridAvatar } from '@vkontakte/vkui';
import "./PreviewMessage.css";

interface PreviewMessageType {
  ticket: Ticket
}

function getDate(date: number): string {
  return new Date(date * 1000).toLocaleString();
}

export const PreviewMessage: FC<PreviewMessageType> = ({ ticket }) => {
  return (
    <div>
      <div className="message">
        {(ticket.media && ticket.media.length > 0) &&
          <div className="message__img">
            <GridAvatar src={ticket.media.slice(0, 3)} />
          </div>
        }

        <div className="message__content">
          <div className="message__title">{ ticket.title }</div>
          <div className="message__description">{ ticket.description }</div>

          {ticket.tags.length > 0 &&
            <div className="message__tags">{ticket.tags.join(', ')}</div>
          }

          <div className="message__date">{getDate(ticket.date)}</div>
        </div>
      </div>
    </div>
  )
};
