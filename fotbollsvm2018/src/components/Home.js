<<<<<<< HEAD
import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
=======
import React from 'react';
>>>>>>> parent of 7e38b99... Some more work to be able to reset/change password

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }

    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
            this.setState(() => ({ users: snapshot.val() }))
        );
    }

    render() {
        const { users } = this.state;
        
        return (
            <div>
                <h1>Home</h1>
                <p>The Home Page is accessible by every signed in user.</p>

                { !!users && <UserList users={users} />}
            </div>
        );
    }
}

const UserList = ({ users }) =>
    <div>
<<<<<<< HEAD
        <h2>List of Usernames of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>

        {Object.keys(users).map(key =>
            <div key={key}>{users[key].username}</div>
            )}
    </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
=======
        <h1>Home Page</h1>
    </div>

export default HomePage;
>>>>>>> parent of 7e38b99... Some more work to be able to reset/change password
