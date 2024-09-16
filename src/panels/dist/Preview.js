"use strict";
exports.__esModule = true;
exports.Preview = void 0;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
var vk_mini_apps_router_1 = require("@vkontakte/vk-mini-apps-router");
var api_1 = require("../api/api");
var PreviewMessage = react_1["default"].lazy(function () { return Promise.resolve().then(function () { return require('../components/PreviewMessage/PreviewMessage'); }); });
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
                    var _a;
                    routeNavigator.push("/");
                    openError(((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || "Возникла ошибка");
                });
            }
        }
    }, []);
    var _d = react_1.useState([]), groups = _d[0], setGroups = _d[1];
    react_1.useEffect(function () {
        api_2.getGroups().then(function (res) {
            setGroups(res);
        });
    }, []);
    var _e = react_1.useState(false), isRightPost = _e[0], setIsRightPost = _e[1];
    react_1.useEffect(function () {
        if (!ticket || !groups || !ticket.offer)
            return;
        var res = true;
        ticket.groups.forEach(function (g) {
            if (!groups[0].includes(g))
                res = false;
        });
        setIsRightPost(res);
    }, [groups, ticket]);
    function btnRevision(id, reason) {
        api_2.sendForRevision(id, reason).then(function () {
            routeNavigator.push("/");
        })["catch"](function (err) {
            var _a;
            openError(((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || "Возникла ошибка");
        });
    }
    function btnPublication(id) {
        api_2.sendForPublication(id).then(function () {
            routeNavigator.push("/");
        })["catch"](function (err) {
            var _a;
            openError(((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || "Возникла ошибка");
        });
    }
    return (react_1["default"].createElement(vkui_1.Panel, { id: id },
        react_1["default"].createElement(vkui_1.PanelHeader, { before: react_1["default"].createElement(vkui_1.PanelHeaderBack, { onClick: function () { return routeNavigator.back(); } }) }, ticket === null || ticket === void 0 ? void 0 : ticket.title),
        (ticket && params) &&
            react_1["default"].createElement(vkui_1.Group, null,
                react_1["default"].createElement(vkui_1.Header, null, "\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0442\u0438\u043A\u0435\u0442\u0430"),
                ticket &&
                    react_1["default"].createElement(PreviewMessage, { ticket: ticket }),
                react_1["default"].createElement(vkui_1.Spacing, { size: 32 }),
                isRightPost && (react_1["default"].createElement("div", null,
                    react_1["default"].createElement(vkui_1.Group, { style: { maxWidth: 450, margin: "0 auto" } },
                        react_1["default"].createElement(vkui_1.Header, null, "\u0421\u043F\u0438\u0441\u043E\u043A \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u043E\u043A"),
                        react_1["default"].createElement(vkui_1.Div, null, ticket.corrections.map(function (corr, i) { return (react_1["default"].createElement("p", { key: i },
                            corr.text,
                            " (",
                            corr.author,
                            ") \u2014 ",
                            corr.sat ? 'исправлено' : 'ждет исправления')); }))),
                    react_1["default"].createElement(vkui_1.FormItem, { top: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043E\u043A", style: { maxWidth: 450, margin: "0 auto" } },
                        react_1["default"].createElement(vkui_1.Textarea, { id: "reason", name: "reason", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043E\u043A", value: reason, required: true, onChange: function (e) { return setReason(e.currentTarget.value); } })),
                    react_1["default"].createElement(vkui_1.Div, null,
                        react_1["default"].createElement(vkui_1.ButtonGroup, { mode: "horizontal", gap: "m", stretched: true, style: { maxWidth: 450, margin: "0 auto" } },
                            react_1["default"].createElement(vkui_1.Button, { onClick: function () { btnRevision(params.id, reason); }, size: "l", appearance: "negative", stretched: true }, "\u041D\u0430 \u0434\u043E\u0440\u0430\u0431\u043E\u0442\u043A\u0443"),
                            react_1["default"].createElement(vkui_1.Button, { onClick: function () { btnPublication(params.id); }, size: "l", appearance: "positive", stretched: true }, "\u041D\u0430 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044E"))))),
                react_1["default"].createElement(vkui_1.ButtonGroup, { mode: "horizontal", gap: "m", stretched: true, style: { maxWidth: 450, margin: "0 auto 12px" } },
                    react_1["default"].createElement(vkui_1.Button, { onClick: function () { routeNavigator.push("/new/" + params.id); }, size: "l", stretched: true }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C")))));
};
exports["default"] = exports.Preview;
