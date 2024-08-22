"use strict";
exports.__esModule = true;
exports.router = exports.routes = exports.DEFAULT_VIEW_PANELS = exports.DEFAULT_VIEW = exports.DEFAULT_ROOT = void 0;
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
exports.DEFAULT_ROOT = 'default_root';
exports.DEFAULT_VIEW = 'default_view';
exports.DEFAULT_VIEW_PANELS = {
    HOME: 'home',
    PREVIEW: 'preview',
    NEW: 'new',
    PROFILE: 'profile',
    LOGIN: 'login'
};
exports.routes = vk_mini_apps_router_1.RoutesConfig.create([
    vk_mini_apps_router_1.createRoot(exports.DEFAULT_ROOT, [
        vk_mini_apps_router_1.createView(exports.DEFAULT_VIEW, [
            vk_mini_apps_router_1.createPanel(exports.DEFAULT_VIEW_PANELS.HOME, '/', []),
            vk_mini_apps_router_1.createPanel(exports.DEFAULT_VIEW_PANELS.LOGIN, "/" + exports.DEFAULT_VIEW_PANELS.LOGIN, []),
            vk_mini_apps_router_1.createPanel(exports.DEFAULT_VIEW_PANELS.PREVIEW, "/" + exports.DEFAULT_VIEW_PANELS.PREVIEW + "/:id", []),
            vk_mini_apps_router_1.createPanel(exports.DEFAULT_VIEW_PANELS.NEW, "/" + exports.DEFAULT_VIEW_PANELS.NEW + "/:id?", []),
            vk_mini_apps_router_1.createPanel(exports.DEFAULT_VIEW_PANELS.PROFILE, "/" + exports.DEFAULT_VIEW_PANELS.PROFILE, []),
        ]),
    ]),
]);
exports.router = vk_mini_apps_router_1.createHashRouter(exports.routes.getRoutes());
