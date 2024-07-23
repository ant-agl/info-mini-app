import { FC } from 'react';
import {
  ContentCard,
  EllipsisText,
} from '@vkontakte/vkui';
import type { Ticket } from '../../interfaces';
import { Icon20DocumentOutline } from '@vkontakte/icons';
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
        {ticket.image &&
          <div className="message__img">
            <img src={ticket.image} />
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
      {ticket.files.length > 0 &&
        <div className="message">
          <div className="message__content">
            {ticket.files.map(file => (
              <div className="file">
                <div className="file__icon">
                  <Icon20DocumentOutline />
                </div>
                <div className="file__content">
                  <div className="file__name">{ file.name }</div>
                  <div className="file__size">{ Math.round(file.size * 10 / 1024) / 10 } KB</div>
                </div>
              </div>
            ))}
            <div className="message__date">{getDate(ticket.date)}</div>
          </div>
        </div>
      }
    </div>
  )
};
