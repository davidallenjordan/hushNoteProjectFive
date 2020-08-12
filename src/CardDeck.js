import React, { Component } from 'react';
import firebase from './firebase';


class CardDeck extends Component {
  constructor() {
    super(); {

      this.state = {
        submission: []
      }

    }
  }


  deleteNote(key) {
    const dbRef = firebase.database().ref();
    dbRef.child(key).remove();
  }


  render () {
    return (
      <section className="cardDeck">
        <ul>

          {this.state.submission.map((submission) => {
            return (
              <li className="cardContainer" key={submission.key}>
                <button onClick={() => this.deleteNote(submission.key)}>X</button>
                <p>{submission.note}</p>
              </li>
            )
          })}

        </ul>
      </section>
    )
  }


  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {
      const newState = [];

      const data = response.val();

      for (let key in data) {
        newState.push({ key: key, note: data[key] });
      }

      this.setState({
        submission: newState
      });

    })
  }
  

}

export default CardDeck;
