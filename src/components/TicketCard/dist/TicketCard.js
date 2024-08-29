"use strict";
exports.__esModule = true;
exports.TicketCard = void 0;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
var MarkdownText = react_1["default"].lazy(function () { return Promise.resolve().then(function () { return require('../MarkdwonText/MarkdownText'); }); });
require("./TicketCard.css");
function getDate(time) {
    return new Date(time * 1000).toLocaleString();
}
exports.TicketCard = function (_a) {
    var ticket = _a.ticket;
    var routeNavigator = vk_mini_apps_router_1.useRouteNavigator();
    return (react_1["default"].createElement(vkui_1.ContentCard, { onClick: function () { routeNavigator.push("/preview/" + ticket.id); }, header: ticket.title, text: (react_1["default"].createElement("span", null,
            react_1["default"].createElement(vkui_1.EllipsisText, null,
                react_1["default"].createElement(MarkdownText, { text: ticket.description })),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("span", { className: "authors" }, ticket.authors.join(', ')))), subtitle: getDate(ticket.time), caption: ticket.groups.join(', '), hasHover: true }));
};
exports["default"] = exports.TicketCard;
