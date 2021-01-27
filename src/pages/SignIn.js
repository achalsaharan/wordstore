import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link as RouterLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

import { toast, ToastContainer } from 'react-toastify';

//import firebase from 'firebase/app';
import { auth } from '../firebase/firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function SignIn() {
    const classes = useStyles();

    const context = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const signIn = () => {
        setOpen(true); //to start loading
        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                setOpen(false); // to end loading
                console.log(res);
                context.setUser({ email: res.user.email, uid: res.user.uid });
                toast.success('signed in successfully', {
                    hideProgressBar: true,
                    autoClose: 4000,
                });
            })
            .catch((err) => {
                setOpen(false); // to end loading
                console.log(err);
                toast.error(err.message, {
                    hideProgressBar: true,
                    autoClose: 4000,
                });
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn();
    };

    if (context.user?.uid) {
        return <Redirect to="/wordlist" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            {/* backdrop signin animation */}
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="secondary" />
            </Backdrop>

            <CssBaseline />
            <ToastContainer />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to="signup"
                                variant="body2"
                                color="secondary"
                            >
                                Don't have an account, Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
