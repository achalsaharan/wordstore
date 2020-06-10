import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import { v4 } from 'uuid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

//icons
import SearchIcon from '@material-ui/icons/Search';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//react router
import { Redirect } from 'react-router-dom';

//context
import UserContext from '../context/UserContext';

//fireabse db
import { db } from '../firebase/firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
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
        margin: theme.spacing(0, 0, 2),
    },
    searchResult: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    list: {
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: '4px',
        marginBottom: '25px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '450px',
        overflow: 'auto',
    },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    loadingAnimation: {
        marginTop: theme.spacing(16),
    },
    SearchLoadingAnimation: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const WordList = () => {
    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const userContext = useContext(UserContext);

    //xx protecting this route
    // if (userContext.user === null) {
    //     return <Redirect to="/about" />;
    // }

    useEffect(() => {
        console.log('useEffect start');
        setLoading(true);
        if (userContext.user === null) {
            return;
        }

        db.collection('words')
            .where('userUid', '==', userContext.user.uid)
            .orderBy('created')
            .get()
            .then((snapshot) => {
                let fetchedResult = [];
                console.log('in list');
                snapshot.forEach((doc) => {
                    console.log(doc.data().word);
                    //setList([...list, doc.data().word]);
                    // setList([doc.data().word, ...list]);
                    // console.log('list: ', list);
                    fetchedResult.push(doc.data().word);
                });
                setLoading(false);
                setList(fetchedResult.reverse());
                console.log('list final: ', list);
            })
            .catch((err) => console.error('error loading the word list', err));

        console.log('useEffect end');
    }, []);

    if (userContext.user === null) {
        return <Redirect to="/" />;
    }

    const addToDB = (word) => {
        const userUid = userContext.user.uid;
        db.collection('words')
            .add({ userUid, word, created: Date.now() })
            .then((docRef) => console.log('document written with id: ', docRef))
            .catch((err) => console.err('err adding word to the db', err));
    };

    const removeFromDb = (id) => {
        db.collection('words')
            .where('word.id', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, ' => ', doc.data());

                    //xx deleting the document based on the id we got from the above query
                    db.collection('words')
                        .doc(doc.id)
                        .delete()
                        .then(console.log('deleted doc'));
                });
            })
            .catch(function (error) {
                console.log('Error getting documents: ', error);
            });
    };

    const searchWord = async (e) => {
        e.preventDefault();
        setLoadingSearch(true);
        try {
            const res = await Axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
            );
            setLoadingSearch(false);
            // console.log('word: ', res.data[0].word);
            // console.log('partOfSpeech: ', res.data[0].meanings[0].partOfSpeech);
            // console.log('meaning: ', res.data[0].meanings[0].definitions[0].definition);
            // console.log('example: ', res.data[0].meanings[0].definitions[0].example);
            const word = {
                id: v4(),
                word: res.data[0].word,
                partOfSpeech: res.data[0].meanings[0].partOfSpeech,
                meaning: res.data[0].meanings[0].definitions[0].definition,
                example: res.data[0].meanings[0].definitions[0].example,
            };
            if (word.example === undefined) {
                word.example = 'example not avaliable';
            }
            setSearchResult(word);
        } catch (error) {
            setLoadingSearch(false);
            toast.error('No words found, try rechecking the spelling. ', {
                hideProgressBar: true,
                autoClose: 4000,
            });
        }
        setSearch('');
    };

    const addToList = (word) => {
        let duplicate = false;
        list.forEach((item) => {
            if (item.word === word.word) {
                toast.error('Word already present in the list', {
                    hideProgressBar: true,
                    autoClose: 4000,
                });
                duplicate = true;
                return;
            }
        });

        if (duplicate === false) {
            setList([word, ...list]);
            addToDB(word);
        }

        setSearchResult(null);
    };

    const removeFromList = (id) => {
        setList(list.filter((item) => item.id !== id));
        //TODO remove word to the database
        removeFromDb(id);
    };

    return (
        <Container component="main" maxWidth="xs">
            <ToastContainer />
            <div className={classes.paper}>
                <Typography
                    component="h4"
                    variant="h6"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                    }}
                >
                    <ListAltIcon color="primary" />
                    My List
                </Typography>
                <form className={classes.form} onSubmit={searchWord}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="word"
                                label="search word"
                                autoComplete="off"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                <Typography color="textSecondary">
                                    search
                                </Typography>

                                <SearchIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                {/* conditionally rending search result fetch */}
                {loadingSearch ? (
                    <CircularProgress
                        color="secondary"
                        className={classes.SearchLoadingAnimation}
                    />
                ) : null}

                {/* // search result section */}
                {searchResult ? (
                    <Paper className={classes.searchResult} elevation={5}>
                        <Typography
                            variant="h6"
                            style={{
                                marginLeft: '5px',
                            }}
                        >
                            {' '}
                            {/* word searched for */}
                            {searchResult.word}
                            <Chip
                                onClick={() => addToList(searchResult)}
                                label="Add Word"
                                color="secondary"
                                icon={<AddCircleIcon />}
                                style={{
                                    float: 'right',
                                    margin: '7px',
                                }}
                            />
                        </Typography>
                        <Typography
                            style={{
                                marginLeft: '8px',
                                fontSize: '12px',
                            }}
                        >
                            {/* type of word adjective etc */}
                            {searchResult.partOfSpeech}
                        </Typography>
                        <Typography
                            style={{
                                margin: '8px',
                                fontSize: '16px',
                            }}
                        >
                            {/* meaning*/}
                            {searchResult.meaning}
                        </Typography>
                        <Typography
                            style={{
                                margin: '8px',
                                fontSize: '16px',
                                marginTop: '3px',
                                color: '#666',
                            }}
                        >
                            {/*example*/}
                            {searchResult.example}
                        </Typography>
                    </Paper>
                ) : // end search result section
                null}

                {/* conditionally rending the loading animation */}
                {loading ? (
                    <CircularProgress
                        color="secondary"
                        className={classes.loadingAnimation}
                    />
                ) : null}

                {/* conditionally rending the list  */}
                {list.length !== 0 ? (
                    <List className={classes.list}>
                        {list.map((item, idx) => (
                            <React.Fragment key={idx}>
                                <ListItem key={idx}>
                                    <ListItemText
                                        primary={item.word}
                                        secondary={`${item.meaning}`}
                                    ></ListItemText>
                                    <ListItemSecondaryAction>
                                        <DeleteForeverIcon
                                            edge="end"
                                            color="secondary"
                                            onClick={() =>
                                                removeFromList(item.id)
                                            }
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                ) : null}
            </div>
        </Container>
    );
};

export default WordList;
