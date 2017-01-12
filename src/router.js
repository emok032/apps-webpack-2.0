import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

// Will not need anymore b/c are being dynamically loaded (see plain routes in - componentRoutes)
// import ArtistDetail from './components/artists/ArtistDetail';
// import ArtistCreate from './components/artists/ArtistCreate';
// import ArtistEdit from './components/artists/ArtistEdit';

const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain},
  childRoutes: [
    {
      path:'artists/new'

      // *by default, React-Router assumes that all desired components are already loaded up
      // but for Asynchronous loading, will need getComponent()s
      // React-Router expects to call cb with our module/component after loaded
      getComponent(location, cb) { 
        // React will fetch code for getComponent() and call the callback, cb
        System.import('./components/artists/ArtistCreate')
          .then(module => cb(null, module.default));
        // remember System.import('') - webpack will automatically modify the bundle that is generated to split off the module that is called
        // Gotcha's: cb(error argument,)
      }
    },
    {
      path:'artists/:id'
      getComponent(location, cb) { 
        System.import('./components/artists/Artist Detail')
          .then(module => cb(null, module.default));
      }
    },
    {
      path:'artists/:id/edit'
      getComponent(location, cb) { 
        System.import('./components/artists/ArtistEdit')
          .then(module => cb(null, module.default));
      }
    }
  ]
};

const Routes = () => {
  return (
    <Router history={hashHistory} routes={componentRoutes} />
  );
};

export default Routes;
