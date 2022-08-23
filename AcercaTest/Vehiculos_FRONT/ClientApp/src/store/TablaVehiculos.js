"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
var apiUrl = "https://localhost:44364/";
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    requestVehiculos: function (page, items) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            fetch(apiUrl + 'api/vehiculos/getVehiculos?Page=' + page + '&Items=' + items, {
                method: 'GET',
                referrerPolicy: 'strict-origin-when-cross-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'cors',
                    'Origin': apiUrl
                }
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
            });
            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    }; },
    selectVehiculo: function (v) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            var newSelectedVehiculo = __assign({}, v);
            dispatch({ type: 'SELECT_VEHICULOS', selectedVehiculo: newSelectedVehiculo });
        }
    }; },
    addVehiculo: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            var newVehiculo;
            newVehiculo = {
                numPedido: appState.tablaVehiculos.modalNumPedido == null ? 0 : appState.tablaVehiculos.modalNumPedido,
                bastidor: appState.tablaVehiculos.modalBastidor == null ? "" : appState.tablaVehiculos.modalBastidor,
                modelo: appState.tablaVehiculos.modalModelo == null ? "" : appState.tablaVehiculos.modalModelo,
                matricula: appState.tablaVehiculos.modalMatricula == null ? "" : appState.tablaVehiculos.modalMatricula,
                fechaEntrega: appState.tablaVehiculos.modalFechaEntrega == null ? "" : appState.tablaVehiculos.modalFechaEntrega
            };
            console.log(newVehiculo);
            fetch(apiUrl + 'api/vehiculos/addVehiculo?Page=' + appState.tablaVehiculos.page + "&Items=" + appState.tablaVehiculos.items, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'mode': 'cors'
                },
                body: JSON.stringify(newVehiculo)
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
            });
            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    }; },
    editVehiculo: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            var v = appState.tablaVehiculos.selectedVehiculo;
            fetch(apiUrl + 'api/vehiculos/update?Page=' + appState.tablaVehiculos.page + "&Items=" + appState.tablaVehiculos.items, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'mode': 'cors'
                },
                body: JSON.stringify(v)
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
            });
            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    }; },
    deleteVehiculo: function (v) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            fetch(apiUrl + 'api/vehiculos/delete?numPedido=' + v.numPedido + '&Page=' + appState.tablaVehiculos.page + '&Items=' + appState.tablaVehiculos.items, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'mode': 'cors'
                }
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
            });
            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    }; },
    closeModal: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            dispatch({ type: 'CLOSE_MODAL', selectedVehiculo: null });
        }
    }; },
    openEmptyModal: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            dispatch({ type: 'OPEN_EMPTY_MODAL' });
        }
    }; },
    changeItems: function (newNumItems) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            fetch(apiUrl + 'api/vehiculos/getVehiculos?Page=0&Items=' + newNumItems, {
                method: 'GET',
                referrerPolicy: 'strict-origin-when-cross-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'cors',
                    'Origin': apiUrl
                }
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
                dispatch({ type: 'CHANGE_ITEMS', numItems: newNumItems });
            });
            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    }; },
    nextPage: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            var correctNewPage = appState.tablaVehiculos.page + 1;
            if (appState.tablaVehiculos.items == 0) {
                correctNewPage = 0;
            }
            fetch(apiUrl + 'api/vehiculos/getVehiculos?Page=' + correctNewPage + '&Items=' + appState.tablaVehiculos.items, {
                method: 'GET',
                referrerPolicy: 'strict-origin-when-cross-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'cors',
                    'Origin': apiUrl
                }
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
                dispatch({ type: 'NEXT_PAGE', newPage: correctNewPage });
            });
            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    }; },
    previousPage: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            var correctNewPage = appState.tablaVehiculos.page - 1;
            if (correctNewPage < 0) {
                correctNewPage = 0;
            }
            fetch(apiUrl + 'api/vehiculos/getVehiculos?Page=' + correctNewPage + '&Items=' + appState.tablaVehiculos.items, {
                method: 'GET',
                referrerPolicy: 'strict-origin-when-cross-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'cors',
                    'Origin': apiUrl
                }
            }).then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
                dispatch({ type: 'PREVIOUS_PAGE', newPage: correctNewPage });
            });
            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    }; },
    typeFechaEntrega: function (d) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            var currentSelectedVehiculo = appState.tablaVehiculos.selectedVehiculo;
            if (currentSelectedVehiculo != null && currentSelectedVehiculo.fechaEntrega != undefined) {
                currentSelectedVehiculo.fechaEntrega = d;
            }
            dispatch({ type: 'TYPE_FECHA_ENTREGA', selectedVehiculo: currentSelectedVehiculo });
        }
    }; },
    typeData: function (data, dataType) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            dispatch({ type: 'TYPE_DATA_CREATE', data: data, dataType: dataType });
        }
    }; },
    editSelectedVehiculo: function (data, dataType) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.tablaVehiculos) {
            var editedSelectedVehiculo = __assign({}, appState.tablaVehiculos.selectedVehiculo);
            switch (dataType) {
                case 'NumPedido':
                    editedSelectedVehiculo.numPedido = parseInt(data);
                    break;
                case 'Bastidor':
                    editedSelectedVehiculo.bastidor = data;
                    break;
                case 'Modelo':
                    editedSelectedVehiculo.modelo = data;
                    break;
                case 'Matricula':
                    editedSelectedVehiculo.matricula = data;
                    break;
                case 'FechaEntrega':
                    editedSelectedVehiculo.fechaEntrega = data;
                    break;
            }
            dispatch({ type: 'TYPE_DATA_EDIT', selectedVehiculo: editedSelectedVehiculo });
        }
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = {
    vehiculos: [
        { numPedido: 1, bastidor: "21", matricula: "4139HJK", modelo: "Seat Ibiza", fechaEntrega: "2022-05-27" },
        { numPedido: 2, bastidor: "22", matricula: "4139HJL", modelo: "Seat Tarraco", fechaEntrega: "2022-05-27" },
        { numPedido: 3, bastidor: "23", matricula: "4139HJM", modelo: "Seat Marbella", fechaEntrega: "2022-05-27" },
        { numPedido: 4, bastidor: "22", matricula: "4139HJN", modelo: "Fiat Multipla", fechaEntrega: "2022-05-27" },
        { numPedido: 5, bastidor: "23", matricula: "4139HJO", modelo: "Nissan Patrol", fechaEntrega: "2022-05-27" },
        { numPedido: 6, bastidor: "22", matricula: "4139HJP", modelo: "Opel Corsa", fechaEntrega: "2022-05-27" },
        { numPedido: 7, bastidor: "23", matricula: "4139HJQ", modelo: "Opel Astra", fechaEntrega: "2022-05-27" },
        { numPedido: 8, bastidor: "22", matricula: "4139HJR", modelo: "Seat León", fechaEntrega: "2022-05-27" },
        { numPedido: 9, bastidor: "23", matricula: "4139HJS", modelo: "Dacia Sandero", fechaEntrega: "2022-05-27" },
        { numPedido: 10, bastidor: "22", matricula: "4139HJT", modelo: "Audi TT", fechaEntrega: "2022-05-27" },
        { numPedido: 11, bastidor: "23", matricula: "4139HJU", modelo: "Peugeot 206", fechaEntrega: "2022-05-27" },
        { numPedido: 12, bastidor: "22", matricula: "4139HJV", modelo: "Peugeot 207", fechaEntrega: "2022-05-27" },
        { numPedido: 13, bastidor: "23", matricula: "4139HJW", modelo: "Peugeot 208", fechaEntrega: "2022-05-27" },
        { numPedido: 14, bastidor: "22", matricula: "4139HJX", modelo: "Peugeot 307", fechaEntrega: "2022-05-27" },
        { numPedido: 15, bastidor: "23", matricula: "4139HJY", modelo: "Volkswagen Golf", fechaEntrega: "2022-05-27" }
    ],
    items: 10,
    page: 0,
    isLoading: false,
    selectedVehiculo: null,
    modalIsOpen: false,
    modalNumPedido: null,
    modalBastidor: null,
    modalModelo: null,
    modalMatricula: null,
    modalFechaEntrega: null,
    loadedVehiculos: false
};
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_VEHICULOS':
            return __assign(__assign({}, state), { isLoading: true });
        case 'RECEIVE_VEHICULOS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return __assign(__assign({}, state), { vehiculos: action.vehiculos, modalIsOpen: false, isLoading: false, page: 0, selectedVehiculo: null, loadedVehiculos: action.loadedVehiculos, modalBastidor: null, modalNumPedido: null, modalMatricula: null, modalModelo: null, modalFechaEntrega: null });
        case 'SELECT_VEHICULOS':
            return __assign(__assign({}, state), { selectedVehiculo: action.selectedVehiculo, modalIsOpen: true });
        case 'ADD_VEHICULOS':
            return __assign(__assign({}, state), { isLoading: true });
        case 'OPEN_EMPTY_MODAL':
            return __assign(__assign({}, state), { modalIsOpen: true, selectedVehiculo: null });
        case 'CLOSE_MODAL':
            return __assign(__assign({}, state), { modalIsOpen: false, selectedVehiculo: null, modalBastidor: null, modalFechaEntrega: null, modalMatricula: null, modalModelo: null, modalNumPedido: null });
        case 'CHANGE_ITEMS':
            return __assign(__assign({}, state), { items: action.numItems });
        case 'NEXT_PAGE':
            return __assign(__assign({}, state), { page: action.newPage });
        case 'PREVIOUS_PAGE':
            return __assign(__assign({}, state), { page: action.newPage });
        case 'TYPE_FECHA_ENTREGA':
            return __assign(__assign({}, state), { selectedVehiculo: action.selectedVehiculo });
        case 'TYPE_DATA_CREATE':
            switch (action.dataType) {
                case 'NumPedido':
                    return __assign(__assign({}, state), { modalNumPedido: parseInt(action.data) });
                case 'Bastidor':
                    return __assign(__assign({}, state), { modalBastidor: action.data });
                case 'Modelo':
                    return __assign(__assign({}, state), { modalModelo: action.data });
                case 'Matricula':
                    return __assign(__assign({}, state), { modalMatricula: action.data });
                case 'FechaEntrega':
                    return __assign(__assign({}, state), { modalFechaEntrega: action.data });
                default:
                    return state;
            }
            ;
        case 'TYPE_DATA_EDIT':
            return __assign(__assign({}, state), { selectedVehiculo: action.selectedVehiculo });
        default:
            return state;
    }
};
exports.reducer = reducer;
//# sourceMappingURL=TablaVehiculos.js.map