import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  PREVIEW: 'preview',
  NEW: 'new',
  PROFILE: 'profile',
  LOGIN: 'login',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.LOGIN, `/${DEFAULT_VIEW_PANELS.LOGIN}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PREVIEW, `/${DEFAULT_VIEW_PANELS.PREVIEW}/:id`, []),
      createPanel(DEFAULT_VIEW_PANELS.NEW, `/${DEFAULT_VIEW_PANELS.NEW}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PROFILE, `/${DEFAULT_VIEW_PANELS.PROFILE}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
