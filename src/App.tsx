import {
  View,
  SplitLayout,
  SplitCol,
  PanelHeader,
  Panel,
  Group,
  Cell,
  Epic,
  Tabbar,
  TabbarItem,
  usePlatform,
  useAdaptivityConditionalRender,
 } from '@vkontakte/vkui';
import { Icon28NewsfeedOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Preview, Home, New, Profile } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { useState, useEffect } from 'react';

export const App = () => {
  const routeNavigator = useRouteNavigator();
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();

  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = useState('home');
  const activeStoryStyles = {
    backgroundColor: 'var(--vkui--color_background_secondary)',
    borderRadius: 8,
  };
  const hasHeader = platform !== 'vkcom';

  useEffect(() => {
    setActiveStory(activePanel == 'profile' ? 'profile' : 'home');
  }, [activePanel]);

  return (
    <SplitLayout header={hasHeader && <PanelHeader delimiter="none" />} center>
      {viewWidth.tabletPlus && (
        <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
          <Panel>
            {hasHeader && <PanelHeader />}
            <Group>
              <Cell
                style={activeStory === 'home' ? activeStoryStyles : undefined}
                data-story="home"
                onClick={() => { routeNavigator.push('/') }}
                before={<Icon28NewsfeedOutline />}
              >
                Тикеты
              </Cell>
              <Cell
                style={activeStory === 'profile' ? activeStoryStyles : undefined}
                data-story="profile"
                onClick={() => { routeNavigator.push('/profile') }}
                before={<Icon28UserCircleOutline />}
              >
                Профиль
              </Cell>
            </Group>
          </Panel>
        </SplitCol>
      )}

      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
          activeStory={activeStory}
          tabbar={
            viewWidth.tabletMinus && (
              <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem
                  onClick={() => { routeNavigator.push('/') }}
                  selected={activeStory === 'home'}
                  data-story="home"
                  text="Тикеты"
                >
                  <Icon28NewsfeedOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={() => { routeNavigator.push('/profile') }}
                  selected={activeStory === 'profile'}
                  data-story="profile"
                  text="Профиль"
                >
                  <Icon28UserCircleOutline />
                </TabbarItem>
              </Tabbar>
            )
          }
        >
          <View id="home" activePanel={activePanel}>
            <Home id="home" />
            <Preview id="preview" />
            <New id="new" />
          </View>
          <View id="profile" activePanel="profile">
            <Profile id="profile" />
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
