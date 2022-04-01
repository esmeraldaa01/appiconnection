// import "./App.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Input } from "antd";
//
// function App() {
//     const [users, setUsers] = useState([]);
//     const [search, setSearch] = useState("");
//
//     useEffect(() => {
//         axios.get("https://api.github.com/users").then((response) => {
//             console.log(response.data);
//             setUsers(response.data);
//         });
//     }, []);
//
//     const handleChange = (e) => {
//         setSearch(e.target.value);
//         debugger;
//     };
//
//     return (
//         <div className="App">
//             <Input onChange={handleChange} placeholder="Basic usage" />
//             <br />
//             {users
//                 .filter((user) => user.login.indexOf(search) !== -1)
//                 .map((userIs) => (
//                     <div>{userIs.login}</div>
//                 ))}
//         </div>
//     );
// }
//
// export default App;
import Card from "./components/Card";
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Image, Tag, Row, Col } from 'antd';
import styled from 'styled-components';

const Username = styled.p`
  color: white;
  margin-top: 30px;
  font-weight: 400;
  font-family:Arial, Helvetica, sans-serif;
  font-size: 20px;
  `;

const Description = styled.p`
  color: white;
  font-size: 15px;
  `
const Background = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-flow: column wrap;
justify-content: center;
align-items: center;
background-color: midnightblue;
`;

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
           if (e.key === 'Enter') {
               setSearch(e.target.value);
           }
    };

    return (
        <Background>
            <Input onKeyDown={handleChange} className='search' style={{ width: 500 }} />
            <Card>
                {search !== '' ?  ((users?.filter((user) => user.login.indexOf(search) !== -1)
                                     .map((userIs) => {
                                         return (
                                             <Col className='description'>
                                                 <Row>
                                                     <Username>{userIs.id}</Username>
                                                 </Row>
                                                 <Row>
                                                     <Description>{userIs.login}</Description>
                                                 </Row>
                                                 <Row>
                                                    <span>{userIs.login}</span>
                                                 </Row>
                                                 <Tag color="midnightblue"> {userIs.repos_url} </Tag>
                                             </Col>
                                         )
                                         }
                                    ))) : 'No users searched'}

            </Card>
        </Background>
    );
}

export default App;