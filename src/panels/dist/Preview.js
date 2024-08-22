"use strict";
exports.__esModule = true;
exports.Preview = void 0;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
var api_1 = require("../api/api");
var PreviewMessage_1 = require("../components/PreviewMessage/PreviewMessage");
var api_2 = require("../api/api");
var react_redux_1 = require("react-redux");
var store_1 = require("../store");
var SnackbarContext_1 = require("../SnackbarContext");
exports.Preview = function (_a) {
    var id = _a.id;
    var routeNavigator = vk_mini_apps_router_1.useRouteNavigator();
    var openError = SnackbarContext_1.useSnackbar().openError;
    var params = vk_mini_apps_router_1.useParams();
    var dispatch = react_redux_1.useDispatch();
    var tickets = react_redux_1.useSelector(function (state) { return state.tickets.tickets; });
    var _b = react_1.useState(), ticket = _b[0], setTicket = _b[1];
    var _c = react_1.useState(""), reason = _c[0], setReason = _c[1];
    react_1.useEffect(function () {
        if (params && params.id) {
            var existingTicket = tickets.find(function (t) { return t.id === params.id; });
            if (existingTicket) {
                setTicket(existingTicket);
            }
            else {
                api_1.getTickets().then(function (t) {
                    dispatch(store_1.setTickets(t));
                    var foundTicket = t.find(function (t) { return t.id === params.id; });
                    if (foundTicket) {
                        setTicket(foundTicket);
                    }
                    else {
                        routeNavigator.push("/");
                    }
                })["catch"](function (err) {
                    routeNavigator.push("/");
                    openError(err.response.data || "Возникла ошибка");
                });
            }
        }
    }, []);
    function btnRevision(id, reason) {
        api_2.sendForRevision(id, reason).then(function () {
            routeNavigator.push("/");
        })["catch"](function (err) {
            openError(err.response.data || "Возникла ошибка");
        });
    }
    function btnPublication(id) {
        api_2.sendForPublication(id).then(function () {
            routeNavigator.push("/");
        })["catch"](function (err) {
            openError(err.response.data || "Возникла ошибка");
        });
    }
    return (React.createElement(vkui_1.Panel, { id: id },
        React.createElement(vkui_1.PanelHeader, { before: React.createElement(vkui_1.PanelHeaderBack, { onClick: function () { return routeNavigator.back(); } }) }, ticket === null || ticket === void 0 ? void 0 : ticket.title),
        (ticket && params) &&
            React.createElement(vkui_1.Group, null,
                React.createElement(vkui_1.Header, null, "\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0442\u0438\u043A\u0435\u0442\u0430"),
                ticket &&
                    React.createElement(PreviewMessage_1.PreviewMessage, { ticket: ticket }),
                React.createElement(vkui_1.Spacing, { size: 32 }),
                !ticket.offer && (React.createElement("div", null,
                    React.createElement(vkui_1.Group, { style: { maxWidth: 450, margin: "0 auto" } },
                        React.createElement(vkui_1.Header, null, "\u0421\u043F\u0438\u0441\u043E\u043A \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u043E\u043A"),
                        React.createElement(vkui_1.Div, null, ticket.corrections.map(function (corr, i) { return (React.createElement("p", { key: i },
                            corr.text,
                            " (",
                            corr.author,
                            ")")); }))),
                    React.createElement(vkui_1.FormItem, { top: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043E\u043A", style: { maxWidth: 450, margin: "0 auto" } },
                        React.createElement(vkui_1.Textarea, { id: "reason", name: "reason", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043E\u043A", value: reason, required: true, onChange: function (e) { return setReason(e.currentTarget.value); } })),
                    React.createElement(vkui_1.Div, null,
                        React.createElement(vkui_1.ButtonGroup, { mode: "horizontal", gap: "m", stretched: true, style: { maxWidth: 450, margin: "0 auto" } },
                            React.createElement(vkui_1.Button, { onClick: function () { btnRevision(params.id, reason); }, size: "l", appearance: "negative", stretched: true }, "\u041D\u0430 \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043A\u0443"),
                            React.createElement(vkui_1.Button, { onClick: function () { btnPublication(params.id); }, size: "l", appearance: "positive", stretched: true }, "\u041D\u0430 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044E"))))),
                React.createElement(vkui_1.ButtonGroup, { mode: "horizontal", gap: "m", stretched: true, style: { maxWidth: 450, margin: "0 auto 12px" } },
                    React.createElement(vkui_1.Button, { onClick: function () { routeNavigator.push("/new/" + params.id); }, size: "l", stretched: true }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C")))));
};
