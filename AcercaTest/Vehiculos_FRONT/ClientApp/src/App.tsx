import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import Vehiculos from './components/TablaVehiculos';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Vehiculos} />
    </Layout>
);
