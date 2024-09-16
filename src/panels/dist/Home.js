"use strict";
exports.__esModule = true;
exports.Home = void 0;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
var icons_1 = require("@vkontakte/icons");
var api_1 = require("../api/api");
var TicketCard_1 = require("../components/TicketCard/TicketCard");
var react_redux_1 = require("react-redux");
var store_1 = require("../store");
var SnackbarContext_1 = require("../SnackbarContext");
exports.Home = function (_a) {
    var id = _a.id;
    var routeNavigator = vk_mini_apps_router_1.useRouteNavigator();
    var openError = SnackbarContext_1.useSnackbar().openError;
    var dispatch = react_redux_1.useDispatch();
    var tickets = react_redux_1.useSelector(function (state) { return state.tickets.tickets; });
    react_1.useEffect(function () {
        // if (tickets.length === 0) {
        api_1.getTickets().then(function (t) {
            dispatch(store_1.setTickets(t));
        })["catch"](function (err) {
            var _a;
            openError(((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || "Возникла ошибка");
        });
        // }
    }, [dispatch, tickets.length]);
    return (React.createElement(vkui_1.Panel, { id: id },
        React.createElement(vkui_1.PanelHeader, null, "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0414\u0413\u0422\u0423"),
        React.createElement(vkui_1.Group, null,
            React.createElement(vkui_1.Button, { mode: "tertiary", stretched: true, align: 'left', onClick: function () { routeNavigator.push('/new'); }, before: React.createElement(icons_1.Icon28AddOutline, { width: 18, height: 18 }) }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0442\u0438\u043A\u0435\u0442")),
        React.createElement(vkui_1.Group, null,
            React.createElement(vkui_1.Header, null, "\u0421\u043F\u0438\u0441\u043E\u043A \u043D\u0435\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043D\u044B\u0445 \u0442\u0438\u043A\u0435\u0442\u043E\u0432"),
            tickets.filter(function (t) { return t.offer; }).length > 0 &&
                React.createElement(vkui_1.CardGrid, { size: "m" }, tickets.filter(function (t) { return t.offer; }).map(function (ticket) { return (React.createElement(TicketCard_1.TicketCard, { key: ticket.id, ticket: ticket })); })),
            tickets.filter(function (t) { return t.offer; }).length == 0 &&
                React.createElement(vkui_1.Div, null,
                    React.createElement(vkui_1.Text, { style: { textAlign: 'center', opacity: 0.5 } }, "\u041F\u0443\u0441\u0442\u043E"))),
        React.createElement(vkui_1.Group, null,
            React.createElement(vkui_1.Header, null, "\u0421\u043F\u0438\u0441\u043E\u043A \u0442\u0438\u043A\u0435\u0442\u043E\u0432, \u043E\u0436\u0438\u0434\u0430\u044E\u0449\u0438\u0445 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438"),
            tickets.filter(function (t) { return !t.offer; }).length > 0 &&
                React.createElement(vkui_1.CardGrid, { size: "m" }, tickets.filter(function (t) { return !t.offer; }).map(function (ticket) { return (React.createElement(TicketCard_1.TicketCard, { key: ticket.id, ticket: ticket })); })),
            tickets.filter(function (t) { return !t.offer; }).length == 0 &&
                React.createElement(vkui_1.Div, null,
                    React.createElement(vkui_1.Text, { style: { textAlign: 'center', opacity: 0.5 } }, "\u041F\u0443\u0441\u0442\u043E")))));
};
exports["default"] = exports.Home;
