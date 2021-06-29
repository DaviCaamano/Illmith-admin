import React from 'react';
import {Route, Switch} from "react-router-dom";

//Global CSS
import './App.css';
import './Markdown.css';
import './Article.css';

//Context
import { UserContextProvider }  from '../context/UserContext';
import { AlertProvider }  from '../context/AlertContext';

//Components
import Header from '../component/header/Header';
import Body from "../component/body/Body";
import Footer from "../component/footer/Footer";
import ArticleEditor from '../scene/ArticleEditor';

//Containers
import Splash from '../component/splash/SplashContainer';
import User from '../scene/User';
import Alert from '../component/alert/Alert';
import ImageManager  from "../scene/ImageManager";

const App = () =>{

    return  (
        <div id='app'>
            <div className='body-bg left'/>
            <div className='body-bg right'/>
            <AlertProvider>
            {(alert) =>
                <UserContextProvider alert={alert.alert}>
                    <Header
                        navVisible={alert.navVisible}
                        setNavVisible={alert.setNavVisible}
                        navContent={alert.navContent}
                        setNavContent={alert.setNavContent}
                    />
                    <Body>
                        <Switch>
                            <Route exact path="/">
                                <Splash />
                            </Route>
                            <Route path="/editor">
                                <ArticleEditor
                                    alert={alert.alert}
                                    confirm={alert.confirm}
                                    startLoading={alert.startLoading}
                                    stopLoading={alert.stopLoading}
                                />
                            </Route>
                            <Route path="/images">
                                <ImageManager
                                    alert={alert.alert}
                                    confirm={alert.confirm}
                                    navAlert={alert.navAlert}
                                    startLoading={alert.startLoading}
                                    stopLoading={alert.stopLoading}
                                />
                            </Route>
                        </Switch>
                    </Body>
                    <Footer/>
                    <User />
                    <Alert />
                </UserContextProvider>
            }
            </AlertProvider>
        </div>
    );
}


export default App;

