import React, { Component } from "react";
import logo from "./logo.svg";
import _ from "lodash";
import "./App.css";
const Musixmatch = require("musixmatch-node");
const mxm = new Musixmatch("6f5a8e69eaff545f2e4f5a31e3b85c47");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      result: {}
    };
}





  /*-----------------------------
        Voice Recognition
  ------------------------------*/

  // If false, the recording will stop after a few seconds of silence.
  // When true, the silence period is longer (about 15 seconds),
  // allowing us to keep recording even when the user pauses.

//   $('#start-record-btn').on('click', function(e) {
//   if (noteContent.length) {
//     noteContent += ' ';
//   }
//   recognition.start();
// });

  searchTrack = () => {
    mxm
      .searchTrack({
        q_lyrics: this.state.query
      })
      .then(result => {
        console.log("result: ", result);
        if (!_.isEqual(this.state.result, result)) {
          console.log("not equal, set to new state.");
          this.setState({ result: result });
        }
      });
  };

  getTracks = () => {
    let trackList = this.state.result.message
      ? this.state.result.message.body.track_list
      : [];
    console.log("trackList: ", trackList);
    if (trackList) {
      let result = trackList.map((track, index) => {
        console.log("track.name: ", track);
        return <li key={index}>{track.track.track_name} <b>by</b> <i>{track.track.artist_name}</i></li>;
      });
      return result;
    }
  };

  render() {
    this.searchTrack();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to uOttawa Hack Karaoke!</h1>
        </header>
        <input
          type="text"
          placeholder="Search for tracks by lyrics"
          style={{ width: "300px",height: "20px", margin: "5px" }}

          onChange={event => {
            this.setState({ query: event.target.value });
          }}
        />
        <div className="App-tracks">
          <ul>{this.getTracks()}</ul>
        </div>
      </div>
    );
  }

}

export default App;
