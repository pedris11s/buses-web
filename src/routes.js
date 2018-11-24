import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Breadcrumbs = Loadable({
  loader: () => import('./views/Base/Breadcrumbs'),
  loading: Loading,
});

const Cards = Loadable({
  loader: () => import('./views/Base/Cards'),
  loading: Loading,
});

const Carousels = Loadable({
  loader: () => import('./views/Base/Carousels'),
  loading: Loading,
});

const Collapses = Loadable({
  loader: () => import('./views/Base/Collapses'),
  loading: Loading,
});

const Dropdowns = Loadable({
  loader: () => import('./views/Base/Dropdowns'),
  loading: Loading,
});

const Forms = Loadable({
  loader: () => import('./views/Base/Forms'),
  loading: Loading,
});

const Jumbotrons = Loadable({
  loader: () => import('./views/Base/Jumbotrons'),
  loading: Loading,
});

const ListGroups = Loadable({
  loader: () => import('./views/Base/ListGroups'),
  loading: Loading,
});

const Navbars = Loadable({
  loader: () => import('./views/Base/Navbars'),
  loading: Loading,
});

const Navs = Loadable({
  loader: () => import('./views/Base/Navs'),
  loading: Loading,
});

const Paginations = Loadable({
  loader: () => import('./views/Base/Paginations'),
  loading: Loading,
});

const Popovers = Loadable({
  loader: () => import('./views/Base/Popovers'),
  loading: Loading,
});

const ProgressBar = Loadable({
  loader: () => import('./views/Base/ProgressBar'),
  loading: Loading,
});

const Switches = Loadable({
  loader: () => import('./views/Base/Switches'),
  loading: Loading,
});

const Tables = Loadable({
  loader: () => import('./views/Base/Tables'),
  loading: Loading,
});

const Tabs = Loadable({
  loader: () => import('./views/Base/Tabs'),
  loading: Loading,
});

const Tooltips = Loadable({
  loader: () => import('./views/Base/Tooltips'),
  loading: Loading,
});

const BrandButtons = Loadable({
  loader: () => import('./views/Buttons/BrandButtons'),
  loading: Loading,
});

const ButtonDropdowns = Loadable({
  loader: () => import('./views/Buttons/ButtonDropdowns'),
  loading: Loading,
});

const ButtonGroups = Loadable({
  loader: () => import('./views/Buttons/ButtonGroups'),
  loading: Loading,
});

const Buttons = Loadable({
  loader: () => import('./views/Buttons/Buttons'),
  loading: Loading,
});

const Charts = Loadable({
  loader: () => import('./views/Charts'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const CoreUIIcons = Loadable({
  loader: () => import('./views/Icons/CoreUIIcons'),
  loading: Loading,
});

const Flags = Loadable({
  loader: () => import('./views/Icons/Flags'),
  loading: Loading,
});

const FontAwesome = Loadable({
  loader: () => import('./views/Icons/FontAwesome'),
  loading: Loading,
});

const SimpleLineIcons = Loadable({
  loader: () => import('./views/Icons/SimpleLineIcons'),
  loading: Loading,
});

const Alerts = Loadable({
  loader: () => import('./views/Notifications/Alerts'),
  loading: Loading,
});

const Badges = Loadable({
  loader: () => import('./views/Notifications/Badges'),
  loading: Loading,
});

const Modals = Loadable({
  loader: () => import('./views/Notifications/Modals'),
  loading: Loading,
});

const Colors = Loadable({
  loader: () => import('./views/Theme/Colors'),
  loading: Loading,
});

const Typography = Loadable({
  loader: () => import('./views/Theme/Typography'),
  loading: Loading,
});

const Widgets = Loadable({
  loader: () => import('./views/Widgets/Widgets'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading: Loading,
});

//AQUI EMPIEZA LO MIO

/*RUTAS*/
const indexRuta = Loadable({
  loader: () => import('./app/ruta/indexRuta'),
  loading: Loading,
});

const addRuta = Loadable({
  loader: () => import('./app/ruta/AddRuta'),
  loading: Loading,
});

const viewRuta = Loadable({
  loader: () => import('./app/ruta/ViewRuta'),
  loading: Loading,
});

const editRuta = Loadable({
  loader: () => import('./app/ruta/EditRuta'),
  loading: Loading,
});

/*COOPERATIVAS*/
const indexCooperativa = Loadable({
  loader: () => import('./app/cooperativa/indexCooperativa'),
  loading: Loading,
});

const addCoop = Loadable({
  loader: () => import('./app/cooperativa/AddCooperativa'),
  loading: Loading,
});

const viewCoop = Loadable({
  loader: () => import('./app/cooperativa/ViewCooperativa'),
  loading: Loading,
});

const editCoop = Loadable({
  loader: () => import('./app/cooperativa/EditCooperativa'),
  loading: Loading,
});

/*OFICINAS*/
const indexOficina = Loadable({
  loader: () => import('./app/oficina/indexOficina'),
  loading: Loading,
});

const addOficina = Loadable({
  loader: () => import('./app/oficina/AddOficina'),
  loading: Loading,
});

const viewOficina = Loadable({
  loader: () => import('./app/oficina/ViewOficina'),
  loading: Loading,
});

const editOficina = Loadable({
  loader: () => import('./app/oficina/EditOficina'),
  loading: Loading,
});


/*BUSES*/
const indexBus = Loadable({
  loader: () => import('./app/bus/indexBus'),
  loading: Loading,
});

const addBus = Loadable({
  loader: () => import('./app/bus/AddBus'),
  loading: Loading,
});

const viewBus = Loadable({
  loader: () => import('./app/bus/ViewBus'),
  loading: Loading,
});


const editBus = Loadable({
  loader: () => import('./app/bus/EditBus'),
  loading: Loading,
});


/*USERS*/
const indexUser = Loadable({
  loader: () => import('./app/user/indexUser'),
  loading: Loading,
});

const addUser = Loadable({
  loader: () => import('./app/user/AddUser'),
  loading: Loading,
});

const viewUser = Loadable({
  loader: () => import('./app/user/ViewUser'),
  loading: Loading,
});

/*ROLES*/
const indexRole = Loadable({
  loader: () => import('./app/role/indexRole'),
  loading: Loading,
});

const addRole = Loadable({
  loader: () => import('./app/role/AddRole'),
  loading: Loading,
});

const viewRole = Loadable({
  loader: () => import('./app/role/ViewRole'),
  loading: Loading,
});

const editRole = Loadable({
  loader: () => import('./app/role/EditRole'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [

  { path: '/', exact: true, name: 'Inicio', component: DefaultLayout },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },

  { path: '/rutas', exact: true, name: 'Rutas', component: indexRuta },
  { path: '/rutas/add', exact: true, name: 'Adicionar ruta', component: addRuta },
  { path: '/rutas/view/:id', exact: true, name: 'Detalles de ruta', component: viewRuta},
  { path: '/rutas/edit/:id', exact: true, name: 'Editar ruta', component: editRuta},

  { path: '/coops', exact: true, name: 'Cooperativas', component: indexCooperativa },
  { path: '/coops/add', exact: true, name: 'Adicionar cooperativa', component: addCoop },
  { path: '/coops/view/:id', exact: true, name: 'Detalles de cooperativa', component: viewCoop },
  { path: '/coops/edit/:id', exact: true, name: 'Editar cooperativa', component: editCoop },

  { path: '/oficinas/', exact: true, name: 'Oficinas', component: indexOficina },
  { path: '/oficinas/add', exact: true, name: 'Adicionar Oficina', component: addOficina },
  { path: '/oficinas/edit/:id', exact: true, name: 'Editar oficina', component: editOficina },
  { path: '/oficinas/view/:id', exact: true, name: 'Detalles de oficina', component: viewOficina },


  { path: '/buses', exact: true, name: 'Buses', component: indexBus },
  { path: '/buses/add', exact: true, name: 'Adicionar bus', component: addBus },
  { path: '/buses/view/:id', exact: true, name: 'Detalles de bus', component: viewBus },
  { path: '/buses/edit/:id', exact: true, name: 'Editar bus', component: editBus },

  { path: '/users', exact: true, name: 'Usuarios', component: indexUser },
  { path: '/users/add', exact: true, name: 'Adicionar Administrador', component: addUser },
  { path: '/users/view/:id', exact: true, name: 'Detalles de usuario', component: viewUser },


  { path: '/roles', exact: true, name: 'Roles', component: indexRole },
  { path: '/roles/add', exact: true, name: 'Adicionar Rol', component: addRole },
  { path: '/roles/view/:id', exact: true, name: 'Detalles de rol', component: viewRole },
  { path: '/roles/edit/:id', exact: true, name: 'Editar rol', component: editRole },

  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/mojon', exact: true,  name: 'Users', component: Users },
  { path: '/mojon/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
