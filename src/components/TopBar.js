import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

//icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import ListIcon from '@material-ui/icons/List';

//context
import UserContext from '../context/UserContext';

//react router
import { Link as RouterLink } from 'react-router-dom';

//firebase
import firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const TopBar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const userContext = useContext(UserContext);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        firebase
            .auth()
            .signOut()
            .then(userContext.setUser(null))
            .catch((err) => console.log(err));
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        WORDS
                    </Typography>
                    {userContext.user ? (
                        <React.Fragment>
                            <Typography>
                                {userContext.user.email.split('@')[0]}
                            </Typography>
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    getContentAnchorEl={null}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <RouterLink
                                        style={{ textDecoration: 'none' }}
                                        to="/"
                                    >
                                        <MenuItem>
                                            {' '}
                                            <InfoIcon
                                                style={{ marginRight: '3px' }}
                                                color="primary"
                                            />{' '}
                                            About{' '}
                                        </MenuItem>{' '}
                                    </RouterLink>
                                    <RouterLink
                                        style={{ textDecoration: 'none' }}
                                        to="/wordlist"
                                    >
                                        <MenuItem>
                                            {' '}
                                            <ListIcon
                                                style={{ marginRight: '3px' }}
                                                color="primary"
                                            />{' '}
                                            Word List{' '}
                                        </MenuItem>{' '}
                                    </RouterLink>
                                    <MenuItem onClick={logout}>
                                        {' '}
                                        <ExitToAppIcon
                                            style={{ marginRight: '3px' }}
                                            color="secondary"
                                        />{' '}
                                        Logout{' '}
                                    </MenuItem>{' '}
                                </Menu>
                            </div>
                        </React.Fragment>
                    ) : (
                        <Typography>
                            <RouterLink
                                to="/SignIn"
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'inherit',
                                }}
                            >
                                Sign In
                            </RouterLink>
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default TopBar;
