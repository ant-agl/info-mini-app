"use strict";
exports.__esModule = true;
exports.Login = void 0;
var vkui_1 = require("@vkontakte/vkui");
// import { Icon28NewsfeedOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
// import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
var panels_1 = require("./panels");
// import { DEFAULT_VIEW_PANELS } from './routes';
// import { useState, useEffect } from 'react';
exports.Login = function () {
    return (React.createElement(vkui_1.SplitLayout, { center: true },
        React.createElement(vkui_1.SplitCol, null,
            React.createElement(vkui_1.View, { id: "login", activePanel: "login" },
                React.createElement(panels_1.Login, { id: "login" })))));
};
