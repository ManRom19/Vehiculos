import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { routerActions } from 'connected-react-router';
import App from '../App';
import { parsePath } from 'history';

const apiUrl = "https://localhost:44364/";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TablaVehiculosState {
    isLoading: boolean;
    items: number;
    page: number;
    vehiculos: Vehiculo[];
    selectedVehiculo: Vehiculo | null;
    modalIsOpen: boolean;
    modalNumPedido: number | null;
    modalBastidor: string | null;
    modalModelo: string | null;
    modalMatricula: string | null;
    modalFechaEntrega: string | null;
    loadedVehiculos: boolean;

}


export interface Vehiculo {
    numPedido: number;
    bastidor: string;
    modelo: string;
    matricula: string;
    fechaEntrega: string | null;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestTablaVehiculosAction {
    page: number;
    items: number;
    type: 'REQUEST_VEHICULOS';
}

interface ReceiveTablaVehiculosAction {
    type: 'RECEIVE_VEHICULOS';
    vehiculos: Vehiculo[];
    loadedVehiculos: boolean;
}

interface SelectVehiculoTablaVehiculosAction {
    type: 'SELECT_VEHICULOS';
    selectedVehiculo: Vehiculo | null;
}

interface AddVehiculoTablaVehiculosAction {
    type: 'ADD_VEHICULOS';
    newVehiculo: Vehiculo | null | undefined;
}

interface EditVehiculoTablaVehiculosAction {
    type: 'EDIT_VEHICULO';
    numPedido: number;
    bastidor: string;
    modelo: string;
    matricula: string;
    fechaEntrega: string | null;
}

interface TypeNumPedidoTablaVehiculosAction {
    type: 'TYPE_NUM_PEDIDO';
    numPedido: number;
}
interface TypeBastidorTablaVehiculosAction {
    type: 'TYPE_BASTIDOR';
    bastidor: string;
}
interface TypeDataCreateTablaVehiculosAction {
    type: 'TYPE_DATA_CREATE';
    data: string;
    dataType: string;
}
interface TypeMatriculaTablaVehiculosAction {
    type: 'TYPE_MATRICULA';
    matricula: number;
}
interface TypeFechaEntregaTablaVehiculosAction {
    type: 'TYPE_FECHA_ENTREGA';
    selectedVehiculo: Vehiculo | null;
}

interface CloseModalTablaVehiculosAction {
    type: 'CLOSE_MODAL';
    selectedVehiculo: Vehiculo | null;
}

interface OpenEmptyModalTablaVehiculosAction {
    type: 'OPEN_EMPTY_MODAL';
}

interface ChangeItemsTablaVehiculosAction {
    type: 'CHANGE_ITEMS';
    numItems: number;
}
interface NextPageTablaVehiculosAction {
    type: 'NEXT_PAGE';
    newPage: number;
}

interface PreviousPageTablaVehiculosAction {
    type: 'PREVIOUS_PAGE';
    newPage: number;
}


interface TypeDataEditTablaVehiculosAction {
    type: 'TYPE_DATA_EDIT';
    selectedVehiculo: Vehiculo | null;
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
    RequestTablaVehiculosAction |
    ReceiveTablaVehiculosAction |
    SelectVehiculoTablaVehiculosAction |
    AddVehiculoTablaVehiculosAction |
    CloseModalTablaVehiculosAction |
    OpenEmptyModalTablaVehiculosAction |
    ChangeItemsTablaVehiculosAction |
    NextPageTablaVehiculosAction |
    PreviousPageTablaVehiculosAction |
    EditVehiculoTablaVehiculosAction |
    TypeNumPedidoTablaVehiculosAction |
    TypeBastidorTablaVehiculosAction |
    TypeDataCreateTablaVehiculosAction |
    TypeMatriculaTablaVehiculosAction |
    TypeFechaEntregaTablaVehiculosAction |
    TypeDataEditTablaVehiculosAction



// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestVehiculos: (page: number, items: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.tablaVehiculos) {
            fetch(apiUrl + 'api/vehiculos/getVehiculos?Page=' + page + '&Items=' + items, {
                method: 'GET',
                referrerPolicy: 'strict-origin-when-cross-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'cors',
                    'Origin': apiUrl
                }
            }).then(response => response.json() as Promise<Vehiculo[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
                });

            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    },

    selectVehiculo: (v: Vehiculo): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.tablaVehiculos) {
            var newSelectedVehiculo = { ...v };
            dispatch({ type: 'SELECT_VEHICULOS', selectedVehiculo: newSelectedVehiculo });
        }
    },

    addVehiculo: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.tablaVehiculos) {
            var newVehiculo: Vehiculo;
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
                .then(response => response.json() as Promise<Vehiculo[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
                });

            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    },

    editVehiculo: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
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
                .then(response => response.json() as Promise<Vehiculo[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
                });

            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    },

    deleteVehiculo: (v: Vehiculo): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.tablaVehiculos) {
            fetch(apiUrl + 'api/vehiculos/delete?numPedido=' + v.numPedido + '&Page=' + appState.tablaVehiculos.page + '&Items=' + appState.tablaVehiculos.items, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'mode': 'cors'
                }
            })
                .then(response => response.json() as Promise<Vehiculo[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
                });

            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    },


    closeModal: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.tablaVehiculos) {
            dispatch({ type: 'CLOSE_MODAL', selectedVehiculo: null });
        }
    },

    openEmptyModal: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.tablaVehiculos) {
            dispatch({ type: 'OPEN_EMPTY_MODAL' });
        }
    },

    changeItems: (newNumItems: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.tablaVehiculos) {
            fetch(apiUrl + 'api/vehiculos/getVehiculos?Page=0&Items=' + newNumItems, {
                method: 'GET',
                referrerPolicy: 'strict-origin-when-cross-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'cors',
                    'Origin': apiUrl
                }
            }).then(response => response.json() as Promise<Vehiculo[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });

                    dispatch({ type: 'CHANGE_ITEMS', numItems: newNumItems });
                });

            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }

    },


    nextPage: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
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
            }).then(response => response.json() as Promise<Vehiculo[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
                    dispatch({ type: 'NEXT_PAGE', newPage: correctNewPage });
                });

            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }

    },

    previousPage: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
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
            }).then(response => response.json() as Promise<Vehiculo[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: data, loadedVehiculos: true });
                    dispatch({ type: 'PREVIOUS_PAGE', newPage: correctNewPage });
                });

            dispatch({ type: 'RECEIVE_VEHICULOS', vehiculos: [], loadedVehiculos: false });
        }
    },

    typeFechaEntrega: (d: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.tablaVehiculos) {
            var currentSelectedVehiculo = appState.tablaVehiculos.selectedVehiculo;
            if (currentSelectedVehiculo != null && currentSelectedVehiculo.fechaEntrega != undefined) {
                currentSelectedVehiculo.fechaEntrega = d;
            }
            dispatch({ type: 'TYPE_FECHA_ENTREGA', selectedVehiculo: currentSelectedVehiculo });
        }
    },

    typeData: (data: string, dataType: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.tablaVehiculos) {
            dispatch({ type: 'TYPE_DATA_CREATE', data: data, dataType: dataType });
        }
    },

    editSelectedVehiculo: (data: string, dataType: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.tablaVehiculos) {
            var editedSelectedVehiculo = { ...appState.tablaVehiculos.selectedVehiculo };
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
    }


};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TablaVehiculosState =
{
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

export const reducer: Reducer<TablaVehiculosState> = (state: TablaVehiculosState | undefined, incomingAction: Action): TablaVehiculosState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_VEHICULOS':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_VEHICULOS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                ...state,
                vehiculos: action.vehiculos,
                modalIsOpen: false,
                isLoading: false,
                page: 0,
                selectedVehiculo: null,
                loadedVehiculos: action.loadedVehiculos,
                modalBastidor: null,
                modalNumPedido: null,
                modalMatricula: null,
                modalModelo: null,
                modalFechaEntrega: null
            };
        case 'SELECT_VEHICULOS':
            return {
                ...state,
                selectedVehiculo: action.selectedVehiculo,
                modalIsOpen: true
            };
        case 'ADD_VEHICULOS':
            return {
                ...state,
                isLoading: true
            };
        case 'OPEN_EMPTY_MODAL':
            return {
                ...state,
                modalIsOpen: true,
                selectedVehiculo: null
            };

        case 'CLOSE_MODAL':
            return {
                ...state,
                modalIsOpen: false,
                selectedVehiculo: null,
                modalBastidor: null,
                modalFechaEntrega: null,
                modalMatricula: null,
                modalModelo: null,
                modalNumPedido: null
            };
        case 'CHANGE_ITEMS':
            return {
                ...state,
                items: action.numItems
            };
        case 'NEXT_PAGE':
            return {
                ...state,
                page: action.newPage
            };

        case 'PREVIOUS_PAGE':
            return {
                ...state,
                page: action.newPage
            };
        case 'TYPE_FECHA_ENTREGA':
            return {
                ...state,
                selectedVehiculo: action.selectedVehiculo
            };
        case 'TYPE_DATA_CREATE':
            switch (action.dataType) {
                case 'NumPedido':
                    return {
                        ...state,
                        modalNumPedido: parseInt(action.data)
                    }
                case 'Bastidor':
                    return {
                        ...state,
                        modalBastidor: action.data
                    }
                case 'Modelo':
                    return {
                        ...state,
                        modalModelo: action.data
                    }
                case 'Matricula':
                    return {
                        ...state,
                        modalMatricula: action.data
                    }
                case 'FechaEntrega':
                    return {
                        ...state,
                        modalFechaEntrega: action.data
                    }
                default:
                    return state;

            };
        case 'TYPE_DATA_EDIT':
            return {
                ...state,
                selectedVehiculo: action.selectedVehiculo
            };

        default:
            return state;


    }

};
