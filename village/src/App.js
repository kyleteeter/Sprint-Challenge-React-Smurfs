import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from "axios";
import {Route, NavLink} from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  text-decoration:none;
  padding:10px;
  background-color:lightgray;
`;

const Button = styled.div`
  font-size: 16px;
  text-decoration:none;
  padding:10px;
  background-color:white;
  color: black;
  border-radius: 10px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount= () => {
    axios
    .get(`http://localhost:3333/smurfs`)
    .then ( response => {
      this.setState({smurfs: response.data})
    })
    .catch( err=> console.log(err))
  }

  addNewSmurf = (obj) => {
    axios.post('http://localhost:3333/smurfs', obj)
      .then(response => {
        this.setState({
          smurfs: response.data
        })
      })
      .catch( err => console.log(err))
  }

  deleteSmurf = (id) => {
    return () => {
      axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then( response => {
        this.setState({smurf: response.data})
      } )
      .catch( err=> console.log(err))
    }
    
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
      <NavBar>
        <NavLink to='/'><Button>Home</Button></NavLink>
        <NavLink to='/smurf-form'><Button>Add Smurf</Button> </NavLink>
      </NavBar>

        <Route path="/smurf-form" 
          render={props => (
            <SmurfForm addNewSmurf={this.addNewSmurf} />
        )} />
    
        <Route exact path="/" 
        render={props => (
          <Smurfs smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} />
        )} />
         
      </div>
    );
  }
}

export default App;
