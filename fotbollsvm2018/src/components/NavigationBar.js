import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOut from './SignOut';
import * as routes from '../constants/routes';
import SimpleMenu from "./SimpleMenu";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const NavigationBar = ({ classes }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <SimpleMenu style={classes.menuButton} />
                    <Typography
                        className={classes.flex}
                        variant="title"
                        color="inherit"
                    >
                        Title
                    </Typography>
                    <AuthUserContext.Consumer>
                        { authUser => authUser
                            ? <SignOut />
                            : <Button color="inherit" component={({ ...props }) => <Link to={routes.SIGN_IN} {...props} />}>SIGN IN</Button>
                        }
                    </AuthUserContext.Consumer>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(NavigationBar);
