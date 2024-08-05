"use strict";
exports.__esModule = true;
exports.App = void 0;
var vkui_1 = require("@vkontakte/vkui");
var icons_1 = require("@vkontakte/icons");
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
var panels_1 = require("./panels");
var routes_1 = require("./routes");
var react_1 = require("react");
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
    return (React.createElement(vkui_1.SplitLayout, { header: hasHeader && React.createElement(vkui_1.PanelHeader, { delimiter: "none" }), center: true },
        viewWidth.tabletPlus && (React.createElement(vkui_1.SplitCol, { className: viewWidth.tabletPlus.className, fixed: true, width: 280, maxWidth: 280 },
            React.createElement(vkui_1.Panel, null,
                hasHeader && React.createElement(vkui_1.PanelHeader, null),
                React.createElement(vkui_1.Group, null,
                    React.createElement(vkui_1.Cell, { style: activeStory === 'home' ? activeStoryStyles : undefined, "data-story": "home", onClick: function () { routeNavigator.push('/'); }, before: React.createElement(icons_1.Icon28NewsfeedOutline, null) }, "\u0422\u0438\u043A\u0435\u0442\u044B"),
                    React.createElement(vkui_1.Cell, { style: activeStory === 'profile' ? activeStoryStyles : undefined, "data-story": "profile", onClick: function () { routeNavigator.push('/profile'); }, before: React.createElement(icons_1.Icon28UserCircleOutline, null) }, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C"))))),
        React.createElement(vkui_1.SplitCol, { width: "100%", maxWidth: "560px", stretchedOnMobile: true, autoSpaced: true },
            React.createElement(vkui_1.Epic, { activeStory: activeStory, tabbar: viewWidth.tabletMinus && (React.createElement(vkui_1.Tabbar, { className: viewWidth.tabletMinus.className },
                    React.createElement(vkui_1.TabbarItem, { onClick: function () { routeNavigator.push('/'); }, selected: activeStory === 'home', "data-story": "home", text: "\u0422\u0438\u043A\u0435\u0442\u044B" },
                        React.createElement(icons_1.Icon28NewsfeedOutline, null)),
                    React.createElement(vkui_1.TabbarItem, { onClick: function () { routeNavigator.push('/profile'); }, selected: activeStory === 'profile', "data-story": "profile", text: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C" },
                        React.createElement(icons_1.Icon28UserCircleOutline, null)))) },
                React.createElement(vkui_1.View, { id: "home", activePanel: activePanel },
                    React.createElement(panels_1.Home, { id: "home" }),
                    React.createElement(panels_1.Preview, { id: "preview" }),
                    React.createElement(panels_1.New, { id: "new" })),
                React.createElement(vkui_1.View, { id: "profile", activePanel: "profile" },
                    React.createElement(panels_1.Profile, { id: "profile" }))))));
};
