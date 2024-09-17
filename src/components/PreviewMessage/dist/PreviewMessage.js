"use strict";
exports.__esModule = true;
exports.PreviewMessage = void 0;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var vkui_1 = require("@vkontakte/vkui");
require("./PreviewMessage.css");
var MarkdownText_1 = require("../MarkdwonText/MarkdownText");
var icons_1 = require("@vkontakte/icons");
function getDate(time) {
    var options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return new Date(time * 1000).toLocaleString('ru-RU', options);
}
exports.PreviewMessage = function (_a) {
    var ticket = _a.ticket;
    var images = ticket.media.filter(function (m) { return m.mimetype.includes('image'); });
    var files = ticket.media.filter(function (m) { return !m.mimetype.includes('image'); });
    var _b = react_1.useState(false), isGalleryOpen = _b[0], setGalleryOpen = _b[1];
    var galleryPortal = (React.createElement("div", { className: "gallery-overlay" },
        React.createElement(vkui_1.ModalRoot, { activeModal: "gallery" },
            React.createElement(vkui_1.ModalPage, { id: "gallery", onClose: function () { return setGalleryOpen(false); }, style: { background: 'none' } },
                React.createElement(vkui_1.Gallery, { slideWidth: "100%", bullets: "dark", showArrows: true, looped: true }, images.map(function (image, index) { return (React.createElement("img", { key: index, src: image.url, alt: "image-" + index, style: { width: '100%', height: '100%' } })); }))))));
    return (React.createElement("div", null,
        React.createElement("div", { className: "message" },
            (images.length > 0) &&
                React.createElement("div", { className: "message__img", onClick: function () { return setGalleryOpen(true); } },
                    React.createElement(vkui_1.GridAvatar, { src: images.slice(0, 3).map(function (m) { return m.url; }) })),
            React.createElement("div", { className: "message__content" },
                React.createElement("div", { className: "message__title" }, ticket.title),
                React.createElement("div", { className: "message__description" },
                    React.createElement(MarkdownText_1.MarkdownText, { text: ticket.description })),
                ticket.groups.length > 0 &&
                    React.createElement("div", { className: "message__tags" }, ticket.groups.join(', ')),
                React.createElement("div", { className: "message__date" }, getDate(ticket.time)))),
        files.length > 0 &&
            React.createElement("div", { className: "message" },
                React.createElement("div", { className: "message__content" },
                    files.map(function (file) { return (React.createElement("a", { href: file.url, download: file.name, target: '_blank', className: "file", key: file.index },
                        React.createElement("div", { className: "file__icon" },
                            React.createElement(icons_1.Icon20DocumentOutline, null)),
                        React.createElement("div", { className: "file__content" },
                            React.createElement("div", { className: "file__name" }, file.name)))); }),
                    React.createElement("div", { className: "message__date" }, getDate(ticket.time)))),
        isGalleryOpen &&
            react_dom_1["default"].createPortal(galleryPortal, document.getElementById('gallery-portal'))));
};
exports["default"] = exports.PreviewMessage;
