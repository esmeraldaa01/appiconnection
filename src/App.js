import Card from "./components/Card";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Image, Tag, Row, Col } from "antd";
import styled from "styled-components";

const Username = styled.p`
  color: white;
  margin-top: 30px;
  font-weight: 400;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
`;

const Description = styled.p`
  color: white;
  font-size: 15px;
`;
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
  const [searchedUser, setSearchedUser] = useState({});
  const [id, setId] = useState();

  useEffect(() => {
    axios.get("https://api.github.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    if (!id) return;

    axios.get(`https://api.github.com/users/${id}`).then((response) => {
      setSearchedUser(response.data);
    });
  }, [id]);

  const handleChange = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
      const data = users.find((user) => user.login.includes(search));
      if (data) {
        setId(data.id);
      }
    }
  };

  return (
    <Background>
      <Input
        onKeyDown={handleChange}
        className="search"
        style={{ width: 500 }}
      />
      <Card>
        {search !== "" && searchedUser ? (
          <Col className="description">
            <Row>
              <Username>{searchedUser.name}</Username>
            </Row>
            <Row>
              <Description>{searchedUser.followers}</Description>
            </Row>
            <Row>
              <span>{searchedUser.company}</span>
            </Row>
            <Tag> {searchedUser.location} </Tag>
          </Col>
        ) : (
          "No users searched"
        )}
      </Card>
    </Background>
  );
}

export default App;
