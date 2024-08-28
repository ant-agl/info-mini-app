import { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import type { Ticket } from '../../interfaces';
import { GridAvatar, ModalRoot, ModalPage, Gallery } from '@vkontakte/vkui';
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

  const [isGalleryOpen, setGalleryOpen] = useState(false);

  const galleryPortal = (
    <div className="gallery-overlay">
      <ModalRoot activeModal="gallery">
        <ModalPage id="gallery" onClose={() => setGalleryOpen(false)} style={{ background: 'none' }}>
          <Gallery
            slideWidth="100%"
            // style={{ height: '100vh' }}
            bullets="dark"
            showArrows
            looped
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url!}
                alt={`image-${index}`}
                style={{ width: '100%', height: '100%' }}
              />
            ))}
          </Gallery>
        </ModalPage>
      </ModalRoot>
    </div>
  );

  return (
    <div>
      <div className="message">
        {(images.length > 0) &&
          <div className="message__img"  onClick={() => setGalleryOpen(true)}>
            <GridAvatar src={images.slice(0, 3).map(m => m.url!)} />
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
              <a href={file.url} download={file.name} target='_blank' className="file" key={file.index}>
                <div className="file__icon">
                  <Icon20DocumentOutline />
                </div>
                <div className="file__content">
                  <div className="file__name">{ file.name }</div>
                  {/* <div className="file__size">{ Math.round(file.size * 10 / 1024) / 10 } KB</div> */}
                </div>
              </a>
            ))}
             <div className="message__date">{getDate(ticket.time)}</div>
           </div>
         </div>
       }


      {isGalleryOpen &&
        ReactDOM.createPortal(
          galleryPortal,
          document.getElementById('gallery-portal')!
        )}
    </div>
  )
};
