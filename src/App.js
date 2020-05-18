import React, { Component } from 'react';
import './App.css';
const axios = require('axios')
const testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
  {name: "Latori Miller", avatar_url: "https://avatars0.githubusercontent.com/u/16719162?v=4", company: "Road to Hire"},
  {name: "Dylan Trimble", avatar_url: "https://avatars1.githubusercontent.com/u/42077977?v=4", company: "Road to Hire"},
];
class Form extends React.Component {
  userNameInput = React.createRef();
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.get(`https://api.github.com/users/${this.userNameInput.current.value}`);
      this.props.onSubmit(resp.data);
      this.userNameInput.current.value = '';
      // console.log('submitted');
      // console.log(this.userNameInput.current.value);
      // console.log(resp.data);
    } catch (error){
      console.error(error);
      console.log('Houston we have a problem!');
    }
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
        placeholder="Github username" 
        ref={this.userNameInput} 
        required/>
        <button>Add card</button>
      </form>
    );
  }
}
const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} />)}
  </div>
)
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profiles: []
    }
  }
  addProfileData = (profileData) => {
    this.setState(prevState => ({profiles: [...prevState.profiles, profileData]}));
    console.log('App', profileData);
  }
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfileData}/>
        <CardList profiles={this.state.profiles} />
      </div>
    )
  }
}
class ConditionalStyle extends React.Component {
  render() {
    return (
      <div style = {{ color: Math.random() < 0.5 ? 'green' : 'red' }}>Look at me. I change colors</div>
    )
  }
}
class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
export default App;
