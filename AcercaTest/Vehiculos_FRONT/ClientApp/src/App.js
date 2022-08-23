"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var Layout_1 = require("./components/Layout");
var TablaVehiculos_1 = require("./components/TablaVehiculos");
require("./custom.css");
exports.default = (function () { return (React.createElement(Layout_1.default, null,
    React.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: TablaVehiculos_1.default }))); });
//# sourceMappingURL=App.js.map