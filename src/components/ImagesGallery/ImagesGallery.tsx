import React, { useState } from 'react';
import { Button, Panel, PanelHeader, View, ModalRoot, ModalPage, Gallery } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

// Пример списка изображений
const images = [
  'https://via.placeholder.com/400x300/FF0000/FFFFFF?text=Image1',
  'https://via.placeholder.com/400x300/00FF00/FFFFFF?text=Image2',
  'https://via.placeholder.com/400x300/0000FF/FFFFFF?text=Image3'
];

const App: React.FC = (activePanel: boolean) => {
  const [activePanel, setActivePanel] = useState('main'); // Управление панелями
  const [isGalleryOpen, setGalleryOpen] = useState(false); // Управление состоянием галереи

  // Обработчик открытия галереи
  const handleOpenGallery = () => {
    setGalleryOpen(true);
  };

  // Обработчик закрытия галереи
  const handleCloseGallery = () => {
    setGalleryOpen(false);
  };

  return (
    <View activePanel={activePanel}>
      <Panel id="main">
        <PanelHeader>Галерея изображений</PanelHeader>
        <Button size="l" mode="primary" onClick={handleOpenGallery}>
          Открыть галерею
        </Button>

        {isGalleryOpen && (
          <ModalRoot activeModal="gallery">
            <ModalPage
              id="gallery"
              onClose={handleCloseGallery}
              header={<PanelHeader>Галерея</PanelHeader>}
            >
              <Gallery
                slideWidth="100%"
                style={{ height: '100vh' }} // Галерея на весь экран
                bullets="dark"
              >
                {images.map((src, index) => (
                  <img key={index} src={src} alt={`image-${index}`} style={{ width: '100%', height: '100%' }} />
                ))}
              </Gallery>
            </ModalPage>
          </ModalRoot>
        )}
      </Panel>
    </View>
  );
};

export default App;