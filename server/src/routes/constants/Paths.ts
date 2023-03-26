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
        Register: '/register',
        Refresh: '/refresh',
    },
    User: {
        Base: '/user',
        Get: '/all',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Product: {
        Base: '/product',
        Get: '/all',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Cart: {
        Get: '/',
        Base: '/cart',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Order: {
        Base: '/order',
        Get: '/all',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
        GetByUser: '/user/:id',
        GetById: '/:id',
    },
    Payment: {
        Base: '/payment',
    },
    Category: {
        Base: '/category',
        Get: '/all',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Brand: {
        Base: '/brand',
        Get: '/all',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Coupon: {
        Base: '/coupon',
        Get: '/all',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Shipping: {
        Base: '/shipping',
        Get: '/all',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
