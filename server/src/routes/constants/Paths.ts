/**
 * Express router paths go here.
 */

import { Immutable } from 'other/types';


const Paths = {
  Base: '/api',
  Auth: {
    Base: '/auth',
    Login: '/login',
    Logout: '/logout',
  },
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Cart:{
    Base: '/cart',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  
  }
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
