import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function Form({onSubmit}){
  const [userName, setUserName] = useState('');
  async function handleSubmit(event){
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`)
    onSubmit(resp.data);
    setUserName('');
  }
  
  return(
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        placeholder="GitHub username" 
        required
      />
      <button>Add card</button>
    </form>
  )
}

function CardList({profiles}){
  return(
    <div>
      {profiles.map(profile => <Card key={profile.id} {...profile}/>)}
    </div>
  )
}

function Card(props){
  const profile = props;
  return(
    <div className="github-profile">
      <img alt="Avatar of user" src={profile.avatar_url}/>
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
  )
}

function App({title}){
  const [profiles, setProfiles] = useState([]);
  function addNewProfile(profileData){
    setProfiles([...profiles, profileData])
  }
  return(
    <div>
      <div className="header">{title}</div>
      <Form onSubmit={addNewProfile}/>
      <CardList profiles={profiles}/>
    </div>
  )
}

export default App;
