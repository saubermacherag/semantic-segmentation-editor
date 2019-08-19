import React from 'react';

import {darkBaseTheme, MuiThemeProvider} from '@material-ui/core/styles';

//import SseNavigatorToolbar from "./SseNavigatorToolbar";

import SseTheme from "../common/SseTheme";

// class SseNotFound extends React.Component {
export default class SseNotFound extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (<MuiThemeProvider theme={new SseTheme().theme}>
                <div className="w100">
                  <div>
                  </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
// export default withTracker(() => {
//     Meteor.subscribe("sse-labeled-images");
//     const all = SseSamples.find({file: {"$exists": true}}).fetch();
//     const grouped = new MapSet();
//     all.forEach(im =>{grouped.map(im.folder, im)});
//     const imagesCount = all.length;
//     return {grouped,imagesCount};
// })(SseNotFound);
