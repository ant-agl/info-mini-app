"use strict";
exports.__esModule = true;
exports.Profile = void 0;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
var icons_1 = require("@vkontakte/icons");
var api_1 = require("../api/api");
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../store';
// import { setTickets } from '../store';
exports.Profile = function (_a) {
    var id = _a.id;
    var _b = react_1.useState([]), tgID = _b[0], setTgID = _b[1];
    // const dispatch = useDispatch<AppDispatch>();
    // const tickets = useSelector((state: RootState) => state.tickets.tickets);
    react_1.useEffect(function () {
        api_1.getBindings().then(function (ids) {
            var res = [];
            ids.forEach(function (id) {
                res.push({ value: id, label: id });
            });
            setTgID(res);
            // dispatch(setTgID(res));
        });
    }, []);
    var sendForm = function () {
        api_1.saveBinding("tg", tgID.map(function (i) { return i.value; }).join(','));
    };
    return (React.createElement(vkui_1.Panel, { id: id },
        React.createElement(vkui_1.PanelHeader, null, "\u041F\u0440\u043E\u0444\u0438\u043B\u044C"),
        React.createElement(vkui_1.Group, null,
            React.createElement(vkui_1.Header, null, "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F"),
            React.createElement(vkui_1.FormLayoutGroup, null,
                React.createElement(vkui_1.FormItem, { top: "Telegram ID (\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 enter)", htmlFor: "tg-id" },
                    React.createElement(vkui_1.ChipsInput, { id: "tg-id", name: "tg-id", placeholder: "xxx", after: tgID.length > 0 &&
                            React.createElement(vkui_1.IconButton, { hoverMode: "opacity", label: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u0435", onClick: function () { return setTgID([]); } },
                                React.createElement(icons_1.Icon16Clear, null)), value: tgID, onChange: function (e) { return setTgID(e); } })),
                React.createElement(vkui_1.FormItem, null,
                    React.createElement(vkui_1.Button, { onClick: sendForm, size: "m", stretched: true }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"))))));
};
