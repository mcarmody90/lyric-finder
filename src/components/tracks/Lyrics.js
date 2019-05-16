import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

export class Lyrics extends Component {
  state = {
    tracK: {},
    lyrics: {}
  }
  componentDidMount() {
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });

        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        this.setState({ track: res.data.message.body.track })
      })
      .catch(err => console.log(err));
  }
  render() {
    const { track, lyrics } = this.state;
    console.log(track);
    console.log(this.state);
    if(
      track === undefined || 
      lyrics === undefined || 
      Object.keys(track).length === 0 || 
      Object.keys(lyrics).length === 0
      ) {
        return <Spinner />
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name}<span className="text-secondary"> by {track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
              <a className="btn btn-danger" href={`http://www.youtube.com/results?search_query=${track.track_name} ${track.artist_name}`}>
                <i className="fab fa-youtube-square"></i> Listen Now On Youtube
              </a>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Genre</strong>: {track.primary_genres.music_genre_list.length > 0 ? <span>{track.primary_genres.music_genre_list[0].music_genre.music_genre_name}</span> : <span>N/A</span>}
            </li>
            <li className="list-group-item">
              <strong>Explicit Content: </strong>{track.explicit === 0 ? 'No' : 'Yes'}
            </li>
            {/* <li className="list-group-item">
              <strong>Release Date: </strong>{track.first_release_date}
            </li> */}
          </ul>
        </React.Fragment>
      )
    }
  }
}

export default Lyrics
