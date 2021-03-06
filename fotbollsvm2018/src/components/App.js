import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavigationBar from './NavigationBar';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import AdminPage from './Admin';
import CreateGames from './CreateGames';
import GameStatsPage from './GameStats';
import Stats from './Stats';

const App = history =>
    (
        <Fragment>
            <CssBaseline />
            <Router history={history}>
            <Fragment>
                <NavigationBar />
                <Grid container spacing={8}>
                    

                    <Route exact path={routes.LANDING} component={() => <LandingPage />} />
                    <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
                    <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
                    <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
                    <Route exact path={routes.HOME} component={() => <HomePage />} />
                    <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
                    <Route exact path={routes.ADMIN} component={() => <AdminPage />} />
                    <Route exact path={routes.CREATEGAMES} component={() => <CreateGames />} />
                    <Route exact path={routes.GAMESTATS} component={() => <GameStatsPage />} />
                
                    <Route exact path={routes.STATS} component={() => <Stats />} />
                    </Grid>
                </Fragment>
            </Router>
        </Fragment>
    );

export default withAuthentication(App);

