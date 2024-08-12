import { FC } from 'react';
import type { Ticket } from '../../interfaces';
import { GridAvatar } from '@vkontakte/vkui';
import "./PreviewMessage.css";
import { MarkdownText } from '../MarkdwonText/MarkdownText';
import { Icon20DocumentOutline } from '@vkontakte/icons';

interface PreviewMessageType {
  ticket: Ticket
}

function getDate(time: number): string {
  return new Date(time * 1000).toLocaleString();
}

export const PreviewMessage: FC<PreviewMessageType> = ({ ticket }) => {
  const images = ticket.media.filter(m => m.mimetype.includes('image'))
  const files = ticket.media.filter(m => !m.mimetype.includes('image'))

  return (
    <div>
      <div className="message">
        {(images.length > 0) &&
          <div className="message__img">
            <GridAvatar src={images.slice(0, 3).map(m => m.url)} />
          </div>
        }

        <div className="message__content">
          <div className="message__title">{ ticket.title }</div>
          <div className="message__description">
            <MarkdownText text={ticket.description} />
          </div>

          {ticket.groups.length > 0 &&
            <div className="message__tags">{ticket.groups.join(', ')}</div>
          }

          <div className="message__date">{getDate(ticket.time)}</div>
        </div>
      </div>
      {files.length > 0 &&
         <div className="message">
           <div className="message__content">
             {files.map(file => (
              <div className="file" key={file.index}>
                <div className="file__icon">
                  <Icon20DocumentOutline />
                </div>
                <div className="file__content">
                  <div className="file__name">{ file.name }</div>
                  {/* <div className="file__size">{ Math.round(file.size * 10 / 1024) / 10 } KB</div> */}
                </div>
              </div>
            ))}
             <div className="message__date">{getDate(ticket.time)}</div>
           </div>
         </div>
       }
    </div>
  )
};
