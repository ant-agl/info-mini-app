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
var vkui_1 = require("@vkontakte/vkui");
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
require("@vkontakte/vkui/dist/vkui.css");
var react_redux_1 = require("react-redux");
var store_1 = require("./store");
var utils_1 = require("./utils");
var routes_1 = require("./routes");
var App_1 = require("./App");
var Login_1 = require("./Login");
var react_1 = require("react");
var SnackbarContext_1 = require("./SnackbarContext");
exports.AppConfig = function () {
    var vkBridgeAppearance = vk_bridge_react_1.useAppearance() || undefined;
    var vkBridgeInsets = vk_bridge_react_1.useInsets() || undefined;
    var adaptivity = utils_1.transformVKBridgeAdaptivity(vk_bridge_react_1.useAdaptivity());
    var vk_platform = vk_bridge_1.parseURLSearchParamsForGetLaunchParams(window.location.search).vk_platform;
    var _a = react_1.useState(false), isAuth = _a[0], setIsAuth = _a[1];
    react_1.useEffect(function () {
        setIsAuth(!!localStorage.getItem("authToken"));
    }, []);
    return (React.createElement(vkui_1.ConfigProvider, { appearance: vkBridgeAppearance, platform: vk_platform === 'desktop_web' ? 'vkcom' : undefined, isWebView: vk_bridge_1["default"].isWebView(), hasCustomPanelHeaderAfter: true },
        React.createElement(vkui_1.AdaptivityProvider, __assign({}, adaptivity),
            React.createElement(react_redux_1.Provider, { store: store_1["default"] },
                React.createElement(vkui_1.AppRoot, { mode: "full", safeAreaInsets: vkBridgeInsets },
                    React.createElement(vk_mini_apps_router_1.RouterProvider, { router: routes_1.router },
                        React.createElement(SnackbarContext_1.SnackbarProvider, null, isAuth ?
                            React.createElement(App_1.App, null)
                            :
                                React.createElement(Login_1.Login, null))))))));
};
