import React, { Fragment } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';

import * as routes from '../constants/routes';

const Navigation = ({ handleClose }) =>
    (<AuthUserContext.Consumer>
        { authUser => authUser
            ? <NavigationAuth handleClose={handleClose} />
            : <NavigationNonAuth handleClose={handleClose} />
        }
     </AuthUserContext.Consumer>);

const NavigationAuth = ({ handleClose }) =>
    (
        <Fragment>
            <MenuItem component={({...props}) => <Link to={routes.LANDING} {...props} />} onClick={handleClose}>Landing</MenuItem>
            <MenuItem component={({...props}) => <Link to={routes.HOME} {...props} />} onClick={handleClose}>Home</MenuItem>
            <MenuItem component={({...props}) => <Link to={routes.ACCOUNT} {...props} />} onClick={handleClose}>Account</MenuItem>
            <MenuItem component={({...props}) => <Link to={routes.GAMESTATS} {...props} />} onClick={handleClose}>Game Stats</MenuItem>
            <MenuItem component={({...props}) => <Link to={routes.STATS} {...props} />} onClick={handleClose}>Stats</MenuItem>
        </Fragment>
);


const NavigationNonAuth = ({ handleClose }) =>
    (<Fragment>
        <MenuItem component={({...props}) => <Link to={routes.LANDING} {...props} />} onClick={handleClose}>Landing</MenuItem>
        <MenuItem component={({...props}) => <Link to={routes.SIGN_IN} {...props} />} onClick={handleClose}>Sign in</MenuItem>
     </Fragment>);

class SimpleMenu extends React.Component {
    state = {
        anchorEl: null,
    };
    
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    
    render() {
        const { anchorEl } = this.state;
        
        return (
            <div>
                <IconButton
                    className={this.props.style}
                    color="inherit"
                    aria-label="Menu"
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <Navigation handleClose={this.handleClose} />
                </Menu>
            </div>
        );
    }
}

export default SimpleMenu;
