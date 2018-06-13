import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { connect } from 'react-redux';
import { db } from '../firebase';
import { getGames } from '../state/actions/games';


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }

    componentDidMount() {
        // db.doGetAllGamesTest();
        this.props.getGames().then(games => {
            console.log(games);
        });
        db.onceGetUsers().then(snapshot =>
            this.setState(() => ({ users: snapshot.val() })));
    }


    render() {
        const { users } = this.state;

        return (
            <div className="container">
                <h1>Home</h1>
                <p>The Home page is accessible by every signed in user</p>
                { !!users && <UserList users={users} /> }
            </div>
        );
    }
}

const UserList = ({ users }) =>
    (<div>
        <h2>List of Usernames of Users</h2>
        <p>(Saved on Signup in Firebase Database)</p>

        {Object.keys(users).map(key =>
            <div key={key}>{users[key].username}</div>)}
     </div>);

const authCondition = authUser => !!authUser;

const mapStateToProps = (state) => ({
    games: state.games.games,
  });

  const mapDispatchToProps = dispatch => ({
    getGames: () => dispatch(getGames()),
  });

export default withAuthorization(authCondition)(connect(mapStateToProps, mapDispatchToProps)(HomePage));
