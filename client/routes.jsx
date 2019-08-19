import React from 'react';
import {Route, Router, Redirect, Switch} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import SseEditorApp from "../imports/editor/SseEditorApp";
import SseNavigatorApp from "../imports/navigator/SseNavigatorApp";
import SseAllAnnotated from "../imports/navigator/SseAllAnnotated";
import SseNotFound from "../imports/navigator/SseNotFound";

const browserHistory = createBrowserHistory();
export const renderRoutes = () => (
    <Router history={browserHistory}>
        <div>
            <Switch>
                <Route exact path="/browse/" render={()=>(<Redirect to="/"/>)}/>
                <Route exact path="/browse/:fromIndex/" render={()=>(<Redirect to="/"/>)}/>
                <Route exact path="/browse/:fromIndex/:pageLength/" render={()=>(<Redirect to="/"/>)}/>
                <Route exact path="/browse/:fromIndex/:pageLength/:path?" component={SseNavigatorApp}/>
                <Route path="/edit/:path" component={SseEditorApp}/>
                <Route path="/annotated_sm" component={SseAllAnnotated}/>
                <Route component={SseNotFound} />
            </Switch>
        </div>
    </Router>
);
