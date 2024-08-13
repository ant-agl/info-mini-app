"use strict";
exports.__esModule = true;
exports.SnackbarProvider = exports.useSnackbar = void 0;
var react_1 = require("react");
var vkui_1 = require("@vkontakte/vkui");
var icons_1 = require("@vkontakte/icons");
var SnackbarContext = react_1.createContext(undefined);
exports.useSnackbar = function () {
    var context = react_1.useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
exports.SnackbarProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(null), snackbar = _b[0], setSnackbar = _b[1];
    var closeSnackbar = function () { return setSnackbar(null); };
    var openError = function (message) {
        if (snackbar)
            return; // Если уже есть snackbar, не показываем новый
        setSnackbar(react_1["default"].createElement(vkui_1.Snackbar, { onClose: closeSnackbar, before: react_1["default"].createElement(icons_1.Icon28ErrorCircleOutline, { fill: "var(--vkui--color_icon_negative)" }) }, message));
    };
    return (react_1["default"].createElement(SnackbarContext.Provider, { value: { openError: openError, closeSnackbar: closeSnackbar, snackbar: snackbar } },
        children,
        snackbar));
};
