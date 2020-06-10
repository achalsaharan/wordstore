import React, { useState } from 'react';

//components and pages
import TopBar from './components/TopBar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import WordList from './pages/WordList';
import About from './pages/About';

//react router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//context
import UserContext from './context/UserContext';

//material ui theme
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './materialUi/theme';

//~desc (FIREBASE STUFF) implemented this in seperate file
// //firebase
// import firebase from 'firebase/app';
// //these are extending the firebase functionality
// import 'firebase/auth';
// import 'firebase/firestore';
// //firebase config files
// import firebaseConfig from './config/firebaseConfig';

// //inatialize firebase
// //firebase.initializeApp(firebaseConfig);

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <UserContext.Provider
                    value={{
                        user,
                        setUser,
                    }}
                >
                    <TopBar />
                    <Switch>
                        <Route exact path="/" component={About} />
                        <Route exact path="/wordlist" component={WordList} />
                        <Route exact path="/signin" component={SignIn} />
                        <Route exact path="/signup" component={SignUp} />
                    </Switch>
                </UserContext.Provider>
            </ThemeProvider>
        </Router>
    );
};

export default App;
