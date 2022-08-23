"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var TablaVehiculosStore = require("../store/TablaVehiculos");
require("./TablaVehiculosStyle.css");
var Tabla = /** @class */ (function (_super) {
    __extends(Tabla, _super);
    function Tabla() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // This method is called when the component is first added to the document
    Tabla.prototype.componentDidMount = function () {
        if (this.props.loadedVehiculos == false) {
            this.getVehiculos();
        }
    };
    Tabla.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("p", null),
            React.createElement("h1", { id: "tabelLabel" }, "Veh\u00EDculos"),
            this.renderModal(),
            this.renderTable(),
            this.renderPagination()));
    };
    Tabla.prototype.getVehiculos = function () {
        this.props.requestVehiculos(this.props.page, this.props.items);
    };
    Tabla.prototype.renderModal = function () {
        var _this = this;
        return (this.props.selectedVehiculo === null ?
            React.createElement("div", { id: "modal-overlay", style: { display: this.props.modalIsOpen ? "flex" : "none" } },
                React.createElement("div", { id: "modal" },
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h3", null, " Nuevo veh\u00EDculo")),
                    React.createElement("table", null,
                        React.createElement("tr", null,
                            React.createElement("th", null,
                                React.createElement("div", { className: "modal-content" },
                                    React.createElement("label", null, "N\u00FAmero de pedido"),
                                    React.createElement("input", { type: "text", className: "modalInput", value: this.props.modalNumPedido != null ? this.props.modalNumPedido : "", onChange: function (e) { _this.typeDataInCreateModal(e.target.value, 'NumPedido'); } }))),
                            React.createElement("th", null,
                                React.createElement("div", { className: "modal-content" },
                                    React.createElement("label", null, "Bastidor"),
                                    React.createElement("input", { type: "text", className: "modalInput", value: this.props.modalBastidor != null ? this.props.modalBastidor : "", onChange: function (e) { _this.typeDataInCreateModal(e.target.value, 'Bastidor'); } }))),
                            React.createElement("th", null,
                                React.createElement("div", { className: "modal-content" },
                                    React.createElement("label", null, "Modelo"),
                                    React.createElement("input", { type: "text", className: "modalInput", value: this.props.modalModelo != null ? this.props.modalModelo : "", onChange: function (e) { _this.typeDataInCreateModal(e.target.value, 'Modelo'); } })))),
                        React.createElement("tr", null,
                            React.createElement("th", null,
                                React.createElement("div", { className: "modal-content" },
                                    React.createElement("label", null, "Matr\u00EDcula"),
                                    React.createElement("input", { type: "text", className: "modalInput", value: this.props.modalMatricula != null ? this.props.modalMatricula : "", onChange: function (e) { _this.typeDataInCreateModal(e.target.value, 'Matricula'); } }))),
                            React.createElement("th", null,
                                React.createElement("div", { className: "modal-content" },
                                    React.createElement("label", null, "Fecha de entrega"),
                                    React.createElement("input", { type: "date", className: "modalInput", value: this.props.modalFechaEntrega != null ? this.props.modalFechaEntrega : "", onChange: function (e) { _this.typeDataInCreateModal(e.target.value, 'FechaEntrega'); } }))),
                            React.createElement("th", null))),
                    React.createElement("div", { className: "modal-footer" },
                        React.createElement("button", { id: "close-modal", className: 'btn btn-outline-secondary btn-sm', onClick: this.props.closeModal }, "Close"),
                        React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: this.props.addVehiculo }, "Save"))))
            :
                React.createElement("div", { id: "modal-overlay", style: { display: this.props.modalIsOpen ? "flex" : "none" } },
                    React.createElement("div", { id: "modal" },
                        React.createElement("div", { className: "modal-header" },
                            React.createElement("h3", null,
                                " ",
                                this.props.selectedVehiculo.modelo,
                                "  ",
                                this.props.selectedVehiculo.matricula,
                                " ")),
                        React.createElement("table", null,
                            React.createElement("tr", null,
                                React.createElement("th", null,
                                    React.createElement("div", { className: "modal-content" },
                                        React.createElement("label", null, "N\u00FAmero de pedido"),
                                        React.createElement("input", { type: "text", className: "modalInput", value: this.props.selectedVehiculo != null && this.props.selectedVehiculo.numPedido != null && this.props.selectedVehiculo.numPedido != 0 ? this.props.selectedVehiculo.numPedido.toString() : "", placeholder: this.props.selectedVehiculo.numPedido.toString(), onChange: function (e) { _this.typeDataInEditModal(e.target.value, 'NumPedido'); } }))),
                                React.createElement("th", null,
                                    React.createElement("div", { className: "modal-content" },
                                        React.createElement("label", null, "Bastidor"),
                                        React.createElement("input", { type: "text", id: "bastidor", className: "modalInput", value: this.props.selectedVehiculo != null && this.props.selectedVehiculo.bastidor != null ? this.props.selectedVehiculo.bastidor : "", placeholder: this.props.selectedVehiculo.bastidor, onChange: function (e) { _this.typeDataInEditModal(e.target.value, 'Bastidor'); } }))),
                                React.createElement("th", null,
                                    React.createElement("div", { className: "modal-content" },
                                        React.createElement("label", null, "Modelo"),
                                        React.createElement("input", { type: "text", className: "modalInput", value: this.props.selectedVehiculo != null && this.props.selectedVehiculo.modelo != null ? this.props.selectedVehiculo.modelo : "", placeholder: this.props.selectedVehiculo.modelo, onChange: function (e) { _this.typeDataInEditModal(e.target.value, 'Modelo'); } })))),
                            React.createElement("tr", null,
                                React.createElement("th", null,
                                    React.createElement("div", { className: "modal-content" },
                                        React.createElement("label", null, "Matr\u00EDcula"),
                                        React.createElement("input", { type: "text", className: "modalInput", value: this.props.selectedVehiculo != null && this.props.selectedVehiculo.matricula != null ? this.props.selectedVehiculo.matricula : "", placeholder: this.props.selectedVehiculo.matricula, onChange: function (e) { _this.typeDataInEditModal(e.target.value, 'Matricula'); } }))),
                                React.createElement("th", null,
                                    React.createElement("div", { className: "modal-content" },
                                        React.createElement("label", null, "Fecha de entrega"),
                                        React.createElement("input", { type: "date", className: "modalInput", id: "date1", value: this.props.selectedVehiculo.fechaEntrega == null ? "" : this.props.selectedVehiculo.fechaEntrega.split("T")[0], onChange: function (e) { _this.typeDataInEditModal(e.target.value, 'FechaEntrega'); } }))),
                                React.createElement("th", null))),
                        React.createElement("div", { className: "modal-footer" },
                            React.createElement("button", { id: "close-modal", className: 'btn btn-outline-secondary btn-sm', onClick: this.props.closeModal }, "Close"),
                            React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: this.props.editVehiculo }, "Save")))));
    };
    Tabla.prototype.renderTable = function () {
        var _this = this;
        return (React.createElement("table", { className: 'table', id: "tableVehiculos" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null,
                        React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: this.props.openEmptyModal }, "Nuevo registro")),
                    React.createElement("th", null),
                    React.createElement("th", null),
                    React.createElement("th", null),
                    React.createElement("th", null),
                    React.createElement("th", null),
                    React.createElement("th", null,
                        React.createElement("label", { style: { marginRight: "20px" } }, "Registros por p\u00E1gina "),
                        React.createElement("select", { style: { padding: "10px", background: "#edf2ff", border: "none" }, onChange: function (e) {
                                _this.props.changeItems(parseInt(e.target.value));
                            } },
                            React.createElement("option", { value: "10" }, "10"),
                            React.createElement("option", { value: "50" }, "50"),
                            React.createElement("option", { value: "0" }, "Todos")))),
                React.createElement("tr", null,
                    React.createElement("th", null, "N\u00FAmero de pedido"),
                    React.createElement("th", null, "Bastidor"),
                    React.createElement("th", null, "Modelo"),
                    React.createElement("th", null, "Matr\u00EDcula"),
                    React.createElement("th", null, "Fecha de entrega"),
                    React.createElement("th", null))),
            React.createElement("tbody", null, this.props.vehiculos.map(function (v) {
                return React.createElement("tr", { key: v.numPedido },
                    React.createElement("td", null,
                        " ",
                        v.numPedido),
                    React.createElement("td", null, v.bastidor),
                    React.createElement("td", null, v.modelo),
                    React.createElement("td", null, v.matricula),
                    React.createElement("td", null, _this.formatDate(v.fechaEntrega)),
                    React.createElement("td", null,
                        React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: function () { return _this.props.selectVehiculo(v); } }, "Abrir detalle")),
                    React.createElement("td", null,
                        React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: function () { return _this.props.deleteVehiculo(v); } }, "Borrar")));
            }))));
    };
    Tabla.prototype.renderPagination = function () {
        return (React.createElement("div", { className: "d-flex justify-content-between", style: { marginBottom: "20px" } },
            React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: this.props.previousPage, disabled: this.props.page > 0 ? false : true }, "Previous"),
            this.props.isLoading && React.createElement("span", null, "Loading..."),
            React.createElement("button", { className: 'btn btn-outline-secondary btn-sm', onClick: this.props.nextPage, disabled: this.props.items == 0 || this.props.items > this.props.vehiculos.length ? true : false }, "Next")));
    };
    Tabla.prototype.formatDate = function (date) {
        var firstDateArray = date.split("T");
        var dateArray = firstDateArray[0].split("-");
        var formatedDate = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
        return formatedDate;
    };
    Tabla.prototype.typeDataInCreateModal = function (data, dataType) {
        this.props.typeData(data, dataType);
    };
    Tabla.prototype.typeDataInEditModal = function (data, dataType) {
        this.props.editSelectedVehiculo(data, dataType);
    };
    return Tabla;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.tablaVehiculos; }, // Selects which state properties are merged into the component's props
TablaVehiculosStore.actionCreators // Selects which action creators are merged into the component's props
)(Tabla);
//# sourceMappingURL=TablaVehiculos.js.map