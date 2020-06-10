import React, { useState, useContext } from 'react';
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

//react router
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

//context
import UserContext from '../context/UserContext';

//firebase
import { auth } from '../firebase/firebase';

//toast
import { ToastContainer, toast } from 'react-toastify';

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
        width: '100%',
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

export default function SignUp() {
    const classes = useStyles();

    const context = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [open, setOpen] = useState(false);

    const handleSignUp = () => {
        //to start loading
        setOpen(true);
        auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res);
                context.setUser({ email: res.user.email, uid: res.user.uid });
                // to end loading
                setOpen(false);
                toast.success('signed up successfully', {
                    hideProgressBar: true,
                    autoClose: 4000,
                });
            })
            .catch((err) => {
                // to end loading
                setOpen(false);
                console.log('error in signing up user ', err);
                toast.error(err.message, {
                    hideProgressBar: true,
                    autoClose: 4000,
                });
            });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSignUp();
    };

    if (context.user?.email) {
        console.log('here');
        return <Redirect to="/wordlist" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            {/* backdrop signin animation */}
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="secondary" />
            </Backdrop>

            <ToastContainer />
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleFormSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
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
                                value={password}
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
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to="signin"
                                variant="body2"
                                color="secondary"
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
