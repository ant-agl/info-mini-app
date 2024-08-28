"use strict";
exports.__esModule = true;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
require("@vkontakte/vkui/dist/vkui.css");
// Пример списка изображений
var images = [
    'https://via.placeholder.com/400x300/FF0000/FFFFFF?text=Image1',
    'https://via.placeholder.com/400x300/00FF00/FFFFFF?text=Image2',
    'https://via.placeholder.com/400x300/0000FF/FFFFFF?text=Image3'
];
var App = function (activePanel) {
    var _a = react_1.useState('main'), activePanel = _a[0], setActivePanel = _a[1]; // Управление панелями
    var _b = react_1.useState(false), isGalleryOpen = _b[0], setGalleryOpen = _b[1]; // Управление состоянием галереи
    // Обработчик открытия галереи
    var handleOpenGallery = function () {
        setGalleryOpen(true);
    };
    // Обработчик закрытия галереи
    var handleCloseGallery = function () {
        setGalleryOpen(false);
    };
    return (react_1["default"].createElement(vkui_1.View, { activePanel: activePanel },
        react_1["default"].createElement(vkui_1.Panel, { id: "main" },
            react_1["default"].createElement(vkui_1.PanelHeader, null, "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439"),
            react_1["default"].createElement(vkui_1.Button, { size: "l", mode: "primary", onClick: handleOpenGallery }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0433\u0430\u043B\u0435\u0440\u0435\u044E"),
            isGalleryOpen && (react_1["default"].createElement(vkui_1.ModalRoot, { activeModal: "gallery" },
                react_1["default"].createElement(vkui_1.ModalPage, { id: "gallery", onClose: handleCloseGallery, header: react_1["default"].createElement(vkui_1.PanelHeader, null, "\u0413\u0430\u043B\u0435\u0440\u0435\u044F") },
                    react_1["default"].createElement(vkui_1.Gallery, { slideWidth: "100%", style: { height: '100vh' }, bullets: "dark" }, images.map(function (src, index) { return (react_1["default"].createElement("img", { key: index, src: src, alt: "image-" + index, style: { width: '100%', height: '100%' } })); }))))))));
};
exports["default"] = App;
