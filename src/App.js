import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {Input} from "antd";

function App() {
const [ users , setUsers ] = useState([]);
const [search ,setSearch] = useState();

    useEffect(() => {
        axios.get('https://api.github.com/users')
            .then(response => setUsers(response.data));
    },[])


const handleChange = (e) => {
        setSearch(e.target.value);
        debugger
}

console.log(users, 's')

  return (
    <div className="App">
        <Input onChange={ handleChange} placeholder="Basic usage" />
        <br/>
        {users.filter((user) => {
                return (
                    <div>{Object.values(Object.keys(user.login)).includes(search)}</div>
                )
           })}
    </div>
  );
}

export default App;


