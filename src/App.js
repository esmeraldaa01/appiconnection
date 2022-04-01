import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "antd";

function App() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("https://api.github.com/users").then((response) => {
            console.log(response.data);
            setUsers(response.data);
        });
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
        debugger;
    };

    return (
        <div className="App">
            <Input onChange={handleChange} placeholder="Basic usage" />
            <br />
            {users
                .filter((user) => user.login.indexOf(search) !== -1)
                .map((userIs) => (
                    <div>{userIs.login}</div>
                ))}
        </div>
    );
}

export default App;


// <div>{Object.values(Object.keys(user.login)).includes(search)}</div>
// JSON.stringify(Object.values(x)).join('').toLowerCase().includes(inputValue.toLowerCase())
//user.login.includes(search)