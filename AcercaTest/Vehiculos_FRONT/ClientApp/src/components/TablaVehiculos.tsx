import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ApplicationState } from '../store';
import * as TablaVehiculosStore from '../store/TablaVehiculos';
import './TablaVehiculosStyle.css';

// At runtime, Redux will merge together...
type TablaVehiculosProps =
    TablaVehiculosStore.TablaVehiculosState // ... state we've requested from the Redux store
    & typeof TablaVehiculosStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ url: string }>; // ... plus incoming routing parameters


class Tabla extends React.PureComponent<TablaVehiculosProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        if (this.props.loadedVehiculos == false) {
            this.getVehiculos();
        }
    }

    public render() {
        return (
            <React.Fragment>
                <p></p>
                <h1 id="tabelLabel">Veh&iacute;culos</h1>
                {this.renderModal()}
                {this.renderTable()}
                {this.renderPagination()}
            </React.Fragment>
        );
    }

    private getVehiculos() {
        this.props.requestVehiculos(this.props.page, this.props.items);
    }



    private renderModal() {
        return (
            this.props.selectedVehiculo === null ?
                <div id="modal-overlay" style={{ display: this.props.modalIsOpen ? "flex" : "none" }}>
                    <div id="modal">
                        <div className="modal-header">
                            <h3> Nuevo veh&iacute;culo</h3>
                        </div>
                        <table>
                            <tr>
                                <th>
                                    <div className="modal-content">
                                        <label>N&uacute;mero de pedido</label>
                                        <input type="text" className="modalInput" value={this.props.modalNumPedido != null ? this.props.modalNumPedido : ""} onChange={(e) => { this.typeDataInCreateModal(e.target.value, 'NumPedido'); }} />
                                    </div>
                                </th>
                                <th>

                                    <div className="modal-content">
                                        <label>Bastidor</label>
                                        <input type="text" className="modalInput" value={this.props.modalBastidor != null ? this.props.modalBastidor : ""} onChange={(e) => { this.typeDataInCreateModal(e.target.value, 'Bastidor'); }} />
                                    </div>
                                </th>
                                <th>
                                    <div className="modal-content">
                                        <label>Modelo</label>
                                        <input type="text" className="modalInput" value={this.props.modalModelo != null ? this.props.modalModelo : ""} onChange={(e) => { this.typeDataInCreateModal(e.target.value, 'Modelo'); }} />
                                    </div>

                                </th>
                            </tr>

                            <tr>

                                <th>
                                    <div className="modal-content">
                                        <label>Matr&iacute;cula</label>
                                        <input type="text" className="modalInput" value={this.props.modalMatricula != null ? this.props.modalMatricula : ""} onChange={(e) => { this.typeDataInCreateModal(e.target.value, 'Matricula'); }} />
                                    </div>
                                </th>
                                <th>
                                    <div className="modal-content">
                                        <label>Fecha de entrega</label>
                                        <input type="date" className="modalInput" value={this.props.modalFechaEntrega != null ? this.props.modalFechaEntrega : ""} onChange={(e) => { this.typeDataInCreateModal(e.target.value, 'FechaEntrega'); }} />
                                    </div>
                                </th>
                                <th>
                                </th>
                            </tr>
                        </table>
                        <div className="modal-footer">
                            <button id="close-modal" className='btn btn-outline-secondary btn-sm' onClick={this.props.closeModal}>Close</button>
                            <button className='btn btn-outline-secondary btn-sm' onClick={this.props.addVehiculo} >Save</button>
                        </div>
                    </div>
                </div >
                :
                <div id="modal-overlay" style={{ display: this.props.modalIsOpen ? "flex" : "none" }}>
                    <div id="modal">
                        <div className="modal-header">
                            <h3> {this.props.selectedVehiculo.modelo}  {this.props.selectedVehiculo.matricula} </h3>
                        </div>
                        <table>
                            <tr>
                                <th>
                                    <div className="modal-content">
                                        <label>N&uacute;mero de pedido</label>
                                        <input type="text" className="modalInput" value={this.props.selectedVehiculo != null && this.props.selectedVehiculo.numPedido != null && this.props.selectedVehiculo.numPedido != 0 ? this.props.selectedVehiculo.numPedido.toString() : ""} placeholder={this.props.selectedVehiculo.numPedido.toString()} onChange={(e) => { this.typeDataInEditModal(e.target.value, 'NumPedido'); }} />
                                    </div>
                                </th>
                                <th>

                                    <div className="modal-content">
                                        <label>Bastidor</label>
                                        <input type="text" id="bastidor" className="modalInput" value={this.props.selectedVehiculo != null && this.props.selectedVehiculo.bastidor != null ? this.props.selectedVehiculo.bastidor : ""} placeholder={this.props.selectedVehiculo.bastidor} onChange={(e) => { this.typeDataInEditModal(e.target.value, 'Bastidor'); }} />
                                    </div>
                                </th>
                                <th>
                                    <div className="modal-content">
                                        <label>Modelo</label>
                                        <input type="text" className="modalInput" value={this.props.selectedVehiculo != null && this.props.selectedVehiculo.modelo != null ? this.props.selectedVehiculo.modelo : ""} placeholder={this.props.selectedVehiculo.modelo} onChange={(e) => { this.typeDataInEditModal(e.target.value, 'Modelo'); }} />
                                    </div>

                                </th>
                            </tr>

                            <tr>

                                <th>
                                    <div className="modal-content">
                                        <label>Matr&iacute;cula</label>
                                        <input type="text" className="modalInput" value={this.props.selectedVehiculo != null && this.props.selectedVehiculo.matricula != null ? this.props.selectedVehiculo.matricula : ""} placeholder={this.props.selectedVehiculo.matricula} onChange={(e) => { this.typeDataInEditModal(e.target.value, 'Matricula'); }} />
                                    </div>
                                </th>
                                <th>
                                    <div className="modal-content">
                                        <label>Fecha de entrega</label>
                                        <input type="date" className="modalInput" id="date1" value={this.props.selectedVehiculo.fechaEntrega == null ? "" : this.props.selectedVehiculo.fechaEntrega.split("T")[0]} onChange={(e) => { this.typeDataInEditModal(e.target.value, 'FechaEntrega'); }}  />
                                    </div>
                                </th>
                                <th>
                                </th>
                            </tr>
                        </table>
                        <div className="modal-footer">
                            <button id="close-modal" className='btn btn-outline-secondary btn-sm' onClick={this.props.closeModal}>Close</button>
                            <button className='btn btn-outline-secondary btn-sm' onClick={this.props.editVehiculo}>Save</button>
                        </div>
                    </div>
                </div >
        )
    }

    private renderTable() {
        return (
            <table className='table' id="tableVehiculos">
                <thead>
                    <tr>
                        <th><button className='btn btn-outline-secondary btn-sm' onClick={this.props.openEmptyModal}>Nuevo registro</button></th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                            <label style={{ marginRight: "20px" }} >Registros por p&aacute;gina </label>
                            <select style={{ padding: "10px", background: "#edf2ff", border: "none" }} onChange={(e) => {
                                this.props.changeItems(parseInt(e.target.value))
                            }}>
                                <option value="10" >10</option>
                                <option value="50" >50</option>
                                <option value="0" >Todos</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>N&uacute;mero de pedido</th>
                        <th>Bastidor</th>
                        <th>Modelo</th>
                        <th>Matr&iacute;cula</th>
                        <th>Fecha de entrega</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.vehiculos.map((v: TablaVehiculosStore.Vehiculo) =>
                        <tr key={v.numPedido}>
                            <td> {v.numPedido}</td>
                            <td>{v.bastidor}</td>
                            <td>{v.modelo}</td>
                            <td>{v.matricula}</td>
                            <td>{this.formatDate(v.fechaEntrega)}</td>
                            <td><button className='btn btn-outline-secondary btn-sm' onClick={() => this.props.selectVehiculo(v)}>Abrir detalle</button></td>
                            <td><button className='btn btn-outline-secondary btn-sm' onClick={() => this.props.deleteVehiculo(v)} >Borrar</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    private renderPagination() {

        return (
            <div className="d-flex justify-content-between" style={{ marginBottom: "20px" }}>
                <button className='btn btn-outline-secondary btn-sm' onClick={this.props.previousPage} disabled={this.props.page > 0? false : true}>Previous</button>
                {this.props.isLoading && <span>Loading...</span>}
                <button className='btn btn-outline-secondary btn-sm' onClick={this.props.nextPage} disabled={this.props.items == 0 || this.props.items > this.props.vehiculos.length ? true : false}>Next</button>
            </div>
        );
    }

    private formatDate(date: string) {

        var firstDateArray = date.split("T");
        var dateArray = firstDateArray[0].split("-");
        var formatedDate = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
        return formatedDate;
    }

    private typeDataInCreateModal(data: string, dataType: string) {
        this.props.typeData(data, dataType);
    }


    private typeDataInEditModal(data: string, dataType: string) {
        this.props.editSelectedVehiculo(data, dataType);
    }
}

export default connect(
    (state: ApplicationState) => state.tablaVehiculos, // Selects which state properties are merged into the component's props
    TablaVehiculosStore.actionCreators // Selects which action creators are merged into the component's props
)(Tabla as any);
