"use strict";
exports.__esModule = true;
exports.TicketCard = void 0;
var vkui_1 = require("@vkontakte/vkui");
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
var MarkdownText_1 = require("../MarkdwonText/MarkdownText");
require("./TicketCard.css");
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
exports.TicketCard = function (_a) {
    var ticket = _a.ticket;
    var routeNavigator = vk_mini_apps_router_1.useRouteNavigator();
    return (React.createElement(vkui_1.ContentCard, { onClick: function () { routeNavigator.push("/preview/" + ticket.id); }, header: ticket.title, text: (React.createElement("span", null,
            React.createElement(vkui_1.EllipsisText, null,
                React.createElement(MarkdownText_1.MarkdownText, { text: ticket.description })),
            React.createElement("br", null),
            React.createElement("span", { className: "authors" }, ticket.authors.join(', ')))), subtitle: getDate(ticket.time), caption: ticket.groups.join(', '), hasHover: true }));
};
exports["default"] = exports.TicketCard;
