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

const useStyles = makeStyles((theme) => ({
    paper1: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'justify',
        color: '#2a3eb1',
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
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

const About = () => {
    const classes = useStyles();

    const userContext = useContext(UserContext);

    return (
        <Container component="main" maxWidth="md">
            <div className={classes.paper1}>
                <Grid container spacing={3}>
                    <Grid item className={classes.test} xs={12} sm={7}>
                        <Paper elevation={5} className={classes.paper}>
                            <Typography>
                                We google dozens of words every week, but how
                                many of them can you really remember after a
                                while, probably just a handful. This does not
                                come as a surprise because the human brain needs
                                delibrate practice to remember things in the
                                longer run. But the task of going to another app
                                to note down these words looks tedious.
                            </Typography>
                            <Typography style={{ marginTop: '5px' }}>
                                This is where{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    WORDS
                                </span>{' '}
                                jumps in. An all in one solution that lets you
                                search for words and save them to you personal
                                list with the touch of a button.
                            </Typography>
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
                    </Grid>
                    <Grid item className={classes.test} xs={12} sm={5}>
                        <Paper elevation={5} className={classes.paper}>
                            <Typography variant="body1">
                                Designed and Developed by Achal Saharan <br />
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
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default About;
