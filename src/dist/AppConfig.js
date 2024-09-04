"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.AppConfig = void 0;
var vk_bridge_1 = require("@vkontakte/vk-bridge");
var vk_bridge_react_1 = require("@vkontakte/vk-bridge-react");
var vk_bridge_2 = require("@vkontakte/vk-bridge");
var vkui_1 = require("@vkontakte/vkui");
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
require("@vkontakte/vkui/dist/vkui.css");
var react_redux_1 = require("react-redux");
var store_1 = require("./store");
var react_1 = require("react");
var utils_1 = require("./utils");
var routes_1 = require("./routes");
var App = react_1["default"].lazy(function () { return Promise.resolve().then(function () { return require('./App'); }); });
var SnackbarContext_1 = require("./SnackbarContext");
var api_1 = require("./api/api");
exports.AppConfig = function () {
    var vkBridgeAppearance = vk_bridge_react_1.useAppearance() || undefined;
    var vkBridgeInsets = vk_bridge_react_1.useInsets() || undefined;
    var adaptivity = utils_1.transformVKBridgeAdaptivity(vk_bridge_react_1.useAdaptivity());
    var vk_platform = vk_bridge_1.parseURLSearchParamsForGetLaunchParams(window.location.search).vk_platform;
    var _a = react_1.useState(false), isAuth = _a[0], setIsAuth = _a[1];
    var _b = react_1.useState(true), isLoad = _b[0], setIsLoad = _b[1];
    var _c = react_1.useState(), appId = _c[0], setAppId = _c[1];
    var _d = react_1.useState(true), appIdFetch = _d[0], setAppIdFetch = _d[1];
    var _e = react_1.useState(), userId = _e[0], setUserId = _e[1];
    var _f = react_1.useState(true), userIdFetch = _f[0], setUserIdFetch = _f[1];
    var isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
    react_1.useEffect(function () {
        vk_bridge_2["default"].send('VKWebAppGetLaunchParams')
            .then(function (data) {
            if (data.vk_app_id) {
                setAppId(data.vk_app_id);
                setUserId(data.vk_user_id);
            }
        })["catch"](function (error) {
            console.log(error);
        })["finally"](function () {
            setAppIdFetch(false);
            setUserIdFetch(false);
        });
    }, []);
    react_1.useEffect(function () {
        if (!appId || !userId) {
            if ((!appId && !appIdFetch) || (!userId && !userIdFetch))
                setIsLoad(false);
            return;
        }
        vk_bridge_2["default"].send('VKWebAppGetAuthToken', {
            app_id: appId,
            scope: ''
        })
            .then(function (data) {
            if (data.access_token) {
                var token = "vk:" + userId + ":" + data.access_token;
                localStorage.token = token;
                api_1.api.defaults.headers.Authorization = token;
                setIsAuth(true);
            }
        })["catch"](function () {
            localStorage.token = "";
            api_1.api.defaults.headers.Authorization = "";
            setIsAuth(false);
        })["finally"](function () {
            setIsLoad(false);
        });
    }, [appId, appIdFetch, userId, userIdFetch]);
    return (react_1["default"].createElement(vkui_1.ConfigProvider, { appearance: vkBridgeAppearance, platform: vk_platform === 'desktop_web' ? 'vkcom' : undefined, isWebView: vk_bridge_1["default"].isWebView(), hasCustomPanelHeaderAfter: true },
        react_1["default"].createElement(vkui_1.AdaptivityProvider, __assign({}, adaptivity),
            react_1["default"].createElement(react_redux_1.Provider, { store: store_1["default"] },
                react_1["default"].createElement(vkui_1.AppRoot, { mode: "full", safeAreaInsets: vkBridgeInsets },
                    react_1["default"].createElement(vk_mini_apps_router_1.RouterProvider, { router: routes_1.router },
                        react_1["default"].createElement(SnackbarContext_1.SnackbarProvider, null,
                            (!isDev && isLoad) &&
                                react_1["default"].createElement("h1", { style: { textAlign: 'center', margin: 0 } }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."),
                            (!isDev && !isLoad && !isAuth) &&
                                react_1["default"].createElement("h1", { style: { textAlign: 'center', margin: 0 } }, "\u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438"),
                            (isDev || !isLoad && isAuth) &&
                                react_1["default"].createElement(App, null))))))));
};
