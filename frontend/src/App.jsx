import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import './App.css';

import NavBar from './shared/NavBar'

import SampleTypeCategoriesPage from './sampleTypeCategories/SampleTypeCategoriesPage'
import SampleTypeCategoryForm from './sampleTypeCategories/SampleTypeCategoryForm'
import SampleTypeCategoryPage from './sampleTypeCategories/SampleTypeCategoryPage'

import CompositeSampleTypesPage from './compositeSampleTypes/CompositeSampleTypesPage'
import CompositeSampleTypeForm from './compositeSampleTypes/CompositeSampleTypeForm'
import CompositeSampleTypePage from './compositeSampleTypes/CompositeSampleTypePage'

import SampleTypesPage from './sampleTypes/SampleTypesPage'
import SampleTypeForm from './sampleTypes/SampleTypeForm'
import SampleTypePage from './sampleTypes/SampleTypePage'

import LocationsPage from './locations/LocationsPage'
import LocationForm from './locations/LocationForm'
import LocationPage from './locations/LocationPage'

import ContainerTypesPage from './containerTypes/ContainerTypesPage'
import ContainerTypeForm from './containerTypes/ContainerTypeForm'
import ContainerTypePage from './containerTypes/ContainerTypePage'

import ContainersPage from './containers/ContainersPage'
import ContainerForm from './containers/ContainerForm'
import ContainerPage from './containers/ContainerPage'

import ItemsPage from './items/ItemsPage'
import ItemForm from './items/ItemForm'
import ItemPage from './items/ItemPage'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/sample_type_categories" render={(props) => <SampleTypeCategoriesPage {...props} />} />
        <Route exact path="/sample_type_categories/new" render={(props) => <SampleTypeCategoryForm {...props} />} />
        <Route exact path="/sample_type_categories/:id" render={(props) => <SampleTypeCategoryPage {...props} />} />

        <Route exact path="/composite_sample_types" render={(props) => <CompositeSampleTypesPage {...props} />} />
        <Route exact path="/composite_sample_types/new" render={(props) => <CompositeSampleTypeForm {...props} />} />
        <Route exact path="/composite_sample_types/:id" render={(props) => <CompositeSampleTypePage {...props} />} />

        <Route exact path="/sample_types" render={(props) => <SampleTypesPage {...props} />} />
        <Route exact path="/sample_types/new" render={(props) => <SampleTypeForm {...props} />} />
        <Route exact path="/sample_types/:id" render={(props) => <SampleTypePage {...props} />} />

        <Route exact path="/items" render={(props) => <ItemsPage {...props} />} />
        <Route exact path="/items/new" render={(props) => <ItemForm {...props} />} />
        <Route exact path="/items/:id" render={(props) => <ItemPage {...props} />} />

        <Route exact path="/locations" render={(props) => <LocationsPage {...props} />} />
        <Route exact path="/locations/new" render={(props) => <LocationForm {...props} />} />
        <Route exact path="/locations/:id" render={(props) => <LocationPage {...props} />} />

        <Route exact path="/container_types" render={(props) => <ContainerTypesPage {...props} />} />
        <Route exact path="/container_types/new" render={(props) => <ContainerTypeForm {...props} />} />
        <Route exact path="/container_types/:id" render={(props) => <ContainerTypePage {...props} />} />

        <Route exact path="/containers" render={(props) => <ContainersPage {...props} />} />
        <Route exact path="/containers/new" render={(props) => <ContainerForm {...props} />} />
        <Route exact path="/containers/:id" render={(props) => <ContainerPage {...props} />} />

      </Switch>
    </BrowserRouter>
  );
}
