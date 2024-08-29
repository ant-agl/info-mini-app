"use strict";
exports.__esModule = true;
exports.PreviewMessage = void 0;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var vkui_1 = require("@vkontakte/vkui");
require("./PreviewMessage.css");
var MarkdownText = react_1["default"].lazy(function () { return Promise.resolve().then(function () { return require('../MarkdwonText/MarkdownText'); }); });
var icons_1 = require("@vkontakte/icons");
function getDate(time) {
    return new Date(time * 1000).toLocaleString();
}
exports.PreviewMessage = function (_a) {
    var ticket = _a.ticket;
    var images = ticket.media.filter(function (m) { return m.mimetype.includes('image'); });
    var files = ticket.media.filter(function (m) { return !m.mimetype.includes('image'); });
    var _b = react_1.useState(false), isGalleryOpen = _b[0], setGalleryOpen = _b[1];
    var galleryPortal = (react_1["default"].createElement("div", { className: "gallery-overlay" },
        react_1["default"].createElement(vkui_1.ModalRoot, { activeModal: "gallery" },
            react_1["default"].createElement(vkui_1.ModalPage, { id: "gallery", onClose: function () { return setGalleryOpen(false); }, style: { background: 'none' } },
                react_1["default"].createElement(vkui_1.Gallery, { slideWidth: "100%", bullets: "dark", showArrows: true, looped: true }, images.map(function (image, index) { return (react_1["default"].createElement("img", { key: index, src: image.url, alt: "image-" + index, style: { width: '100%', height: '100%' } })); }))))));
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "message" },
            (images.length > 0) &&
                react_1["default"].createElement("div", { className: "message__img", onClick: function () { return setGalleryOpen(true); } },
                    react_1["default"].createElement(vkui_1.GridAvatar, { src: images.slice(0, 3).map(function (m) { return m.url; }) })),
            react_1["default"].createElement("div", { className: "message__content" },
                react_1["default"].createElement("div", { className: "message__title" }, ticket.title),
                react_1["default"].createElement("div", { className: "message__description" },
                    react_1["default"].createElement(MarkdownText, { text: ticket.description })),
                ticket.groups.length > 0 &&
                    react_1["default"].createElement("div", { className: "message__tags" }, ticket.groups.join(', ')),
                react_1["default"].createElement("div", { className: "message__date" }, getDate(ticket.time)))),
        files.length > 0 &&
            react_1["default"].createElement("div", { className: "message" },
                react_1["default"].createElement("div", { className: "message__content" },
                    files.map(function (file) { return (react_1["default"].createElement("a", { href: file.url, download: file.name, target: '_blank', className: "file", key: file.index },
                        react_1["default"].createElement("div", { className: "file__icon" },
                            react_1["default"].createElement(icons_1.Icon20DocumentOutline, null)),
                        react_1["default"].createElement("div", { className: "file__content" },
                            react_1["default"].createElement("div", { className: "file__name" }, file.name)))); }),
                    react_1["default"].createElement("div", { className: "message__date" }, getDate(ticket.time)))),
        isGalleryOpen &&
            react_dom_1["default"].createPortal(galleryPortal, document.getElementById('gallery-portal'))));
};
exports["default"] = exports.PreviewMessage;
