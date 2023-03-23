import React from 'react';
import Router from './Router';
import { UserProvider } from './context/UserContext';

export default () => {
    return(
        <UserProvider>
            <Router/>
        </UserProvider>
    )
}