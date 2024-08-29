"use strict";
exports.__esModule = true;
exports.App = void 0;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
var icons_1 = require("@vkontakte/icons");
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
var Home = react_1["default"].lazy(function () { return Promise.resolve().then(function () { return require('./panels/Home'); }); });
var Preview = react_1["default"].lazy(function () { return Promise.resolve().then(function () { return require('./panels/Preview'); }); });
var New = react_1["default"].lazy(function () { return Promise.resolve().then(function () { return require('./panels/New'); }); });
var Profile = react_1["default"].lazy(function () { return Promise.resolve().then(function () { return require('./panels/Profile'); }); });
var routes_1 = require("./routes");
exports.App = function () {
    var routeNavigator = vk_mini_apps_router_1.useRouteNavigator();
    var _a = vk_mini_apps_router_1.useActiveVkuiLocation().panel, activePanel = _a === void 0 ? routes_1.DEFAULT_VIEW_PANELS.HOME : _a;
    var platform = vkui_1.usePlatform();
    var viewWidth = vkui_1.useAdaptivityConditionalRender().viewWidth;
    var _b = react_1.useState('home'), activeStory = _b[0], setActiveStory = _b[1];
    var activeStoryStyles = {
        backgroundColor: 'var(--vkui--color_background_secondary)',
        borderRadius: 8
    };
    var hasHeader = platform !== 'vkcom';
    react_1.useEffect(function () {
        setActiveStory(activePanel == 'profile' ? 'profile' : 'home');
    }, [activePanel]);
    return (react_1["default"].createElement(vkui_1.SplitLayout, { header: hasHeader && react_1["default"].createElement(vkui_1.PanelHeader, { delimiter: "none" }), center: true },
        viewWidth.tabletPlus && (react_1["default"].createElement(vkui_1.SplitCol, { className: viewWidth.tabletPlus.className, fixed: true, width: 280, maxWidth: 280 },
            react_1["default"].createElement(vkui_1.Panel, null,
                hasHeader && react_1["default"].createElement(vkui_1.PanelHeader, null),
                react_1["default"].createElement(vkui_1.Group, null,
                    react_1["default"].createElement(vkui_1.Cell, { style: activeStory === 'home' ? activeStoryStyles : undefined, "data-story": "home", onClick: function () { routeNavigator.push('/'); }, before: react_1["default"].createElement(icons_1.Icon28NewsfeedOutline, null) }, "\u0422\u0438\u043A\u0435\u0442\u044B"),
                    react_1["default"].createElement(vkui_1.Cell, { style: activeStory === 'profile' ? activeStoryStyles : undefined, "data-story": "profile", onClick: function () { routeNavigator.push('/profile'); }, before: react_1["default"].createElement(icons_1.Icon28UserCircleOutline, null) }, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C"))))),
        react_1["default"].createElement(vkui_1.SplitCol, { width: "100%", maxWidth: "560px", stretchedOnMobile: true, autoSpaced: true },
            react_1["default"].createElement(vkui_1.Epic, { activeStory: activeStory, tabbar: viewWidth.tabletMinus && (react_1["default"].createElement(vkui_1.Tabbar, { className: viewWidth.tabletMinus.className },
                    react_1["default"].createElement(vkui_1.TabbarItem, { onClick: function () { routeNavigator.push('/'); }, selected: activeStory === 'home', "data-story": "home", text: "\u0422\u0438\u043A\u0435\u0442\u044B" },
                        react_1["default"].createElement(icons_1.Icon28NewsfeedOutline, null)),
                    react_1["default"].createElement(vkui_1.TabbarItem, { onClick: function () { routeNavigator.push('/profile'); }, selected: activeStory === 'profile', "data-story": "profile", text: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C" },
                        react_1["default"].createElement(icons_1.Icon28UserCircleOutline, null)))) },
                react_1["default"].createElement(vkui_1.View, { id: "home", activePanel: activePanel },
                    react_1["default"].createElement(Home, { id: "home" }),
                    react_1["default"].createElement(Preview, { id: "preview" }),
                    react_1["default"].createElement(New, { id: "new" })),
                react_1["default"].createElement(vkui_1.View, { id: "profile", activePanel: "profile" },
                    react_1["default"].createElement(Profile, { id: "profile" }))))));
};
exports["default"] = exports.App;
