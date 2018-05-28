import React from 'react';

import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';

const AdminPage = () =>
    <AuthUserContext.Consumer>
        {authUser =>
            <div>
                <h1>Admin</h1>
                <p>Restricted area! Only users who are admins are authorized.</p>
            </div>
        }
    </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';

export default withAuthorization(authCondition)(AdminPage);