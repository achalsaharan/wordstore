import React, { useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import {
    Container,
    Grid,
    Paper,
    Button,
    Chip,
    Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import UserContext from '../context/UserContext';

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import Illustration from '../images/illu.svg';

const useStyles = makeStyles((theme) => ({
    paper1: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: '#303030',
    },
    main: {
        padding: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(),
        textAlign: 'justify',
    },
    paper2: {
        width: '96%',
        boxSizing: 'border box',
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        textAlign: 'justify',
        border: '2px solid black',
    },
    buttonGroup: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '15px',
        border: '1px solid black',
        paddingTop: theme.spacing(0.75),
        paddingBottom: theme.spacing(0.75),
        borderRadius: '4px',
    },
    highlight: {
        fontWeight: 'bold',
    },
}));

const Desc = () => {
    const classes = useStyles();
    return (
        <>
            <Typography
                className={classes.highlight}
                variant="h4"
                color="secondary"
            >
                Dictionary <span style={{ color: '#ac1900' }}>+</span> Notes
            </Typography>
            <Typography color="textPrimary">
                We google dozens of words every week, but how many of them can
                you really remember after a while, probably just a handful. This
                does not come as a surprise because the human brain needs
                delibrate practice to remember things in the longer run. But the
                task of going to another app to note down these words looks
                tedious.
            </Typography>

            <Typography style={{ marginTop: '5px' }} color="textPrimary">
                This is where <span style={{ fontWeight: 'bold' }}>WORDS</span>{' '}
                jumps in. An all in one solution that lets you search for words
                and save them to you personal list with the touch of a button.
            </Typography>
        </>
    );
};

const About = () => {
    const classes = useStyles();

    const userContext = useContext(UserContext);

    return (
        <Container component="main" maxWidth="sm" className={classes.main}>
            <div className={classes.paper1}>
                <Paper elevation={0} className={classes.paper}>
                    <Desc />
                    {userContext.user !== null ? null : (
                        <div>
                            <Typography style={{ marginTop: '5px' }}>
                                lets get started!
                            </Typography>
                            <div className={classes.buttonGroup}>
                                <RouterLink
                                    to="/signup"
                                    style={{
                                        textDecoration: 'inherit',
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        color="secondary"
                                    >
                                        sign up
                                    </Button>
                                </RouterLink>
                                <RouterLink
                                    to="/signin"
                                    style={{
                                        textDecoration: 'inherit',
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        color="secondary"
                                    >
                                        sign in
                                    </Button>
                                </RouterLink>
                            </div>
                        </div>
                    )}
                </Paper>

                <Paper elevation={0} className={classes.paper2}>
                    <Typography variant="body1" color="textPrimary">
                        Developed by
                        <span style={{ color: '#e65100' }}>
                            {' '}
                            Achal Saharan{' '}
                        </span>
                        <br />
                        <Divider />
                        React <br />
                        Firebase <br />
                        Material UI <br />
                    </Typography>

                    <Divider />
                    <Typography style={{ marginTop: '5px' }}>
                        <a
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                            href="https://github.com/achalsaharan"
                            rel="noopener noreferrer"
                        >
                            <Chip
                                size="small"
                                variant="outlined"
                                label="GitHub"
                                color="primary"
                                icon={<GitHubIcon color="disabled" />}
                            />
                        </a>
                    </Typography>

                    <Typography style={{ marginTop: '5px' }}>
                        <a
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                            href="https://www.linkedin.com/in/achal-saharan-a99889159/"
                            rel="noopener noreferrer"
                        >
                            <Chip
                                size="small"
                                variant="outlined"
                                label="LinkedIn"
                                color="primary"
                                icon={<LinkedInIcon color="disabled" />}
                            />
                        </a>
                    </Typography>
                </Paper>
            </div>
        </Container>
    );
};

export default About;
