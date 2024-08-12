"use strict";
exports.__esModule = true;
exports.PreviewMessage = void 0;
var vkui_1 = require("@vkontakte/vkui");
require("./PreviewMessage.css");
var MarkdownText_1 = require("../MarkdwonText/MarkdownText");
var icons_1 = require("@vkontakte/icons");
function getDate(time) {
    return new Date(time * 1000).toLocaleString();
}
exports.PreviewMessage = function (_a) {
    var ticket = _a.ticket;
    var images = ticket.media.filter(function (m) { return m.mimetype.includes('image'); });
    var files = ticket.media.filter(function (m) { return !m.mimetype.includes('image'); });
    return (React.createElement("div", null,
        React.createElement("div", { className: "message" },
            (images.length > 0) &&
                React.createElement("div", { className: "message__img" },
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
                    files.map(function (file) { return (React.createElement("div", { className: "file", key: file.index },
                        React.createElement("div", { className: "file__icon" },
                            React.createElement(icons_1.Icon20DocumentOutline, null)),
                        React.createElement("div", { className: "file__content" },
                            React.createElement("div", { className: "file__name" }, file.name)))); }),
                    React.createElement("div", { className: "message__date" }, getDate(ticket.time))))));
};
