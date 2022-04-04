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
  margin-left: 80px;
`;

const Description = styled.p`
  color: white;
  font-size: 15px;
  display: flex;
`;
const Empty = styled.p`
  color: white;
  font-size: 15px;
  margin-top: 80px;
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

const Stat = styled.span`
  color: white;
  font-size: 13px;
  &:nth-child(1) {
    margin-left: 75px;
  };
  &:nth-child(2) {
    padding-left: 45px;
    padding-right: 45px;
  };
  `
const Tags = styled.div`
  display: inline-flex;
  flex-flow: row wrap;
  margin: 15px 0px 45px 75px;
  gap: 5px;
  `;
const Location = styled.div`
  margin-left: 75px;
  margin-top: 15px;
  color: white;
  `;

function App() {
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState(null);
  const [id, setId] = useState();

  useEffect(() => {
    axios.get("https://api.github.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    if (!id) return;

    axios.get(`https://api.github.com/users/${id}`).then((response) => {
      console.log({
        response
      })
      setSearchedUser(response.data);
    });
  }, [id]);

  const handleChange = (e) => {
    if (e.key === "Enter") {
      const search = e.target.value;

      console.log({
        users
      })
      const user = users.find((user) => user.login.includes(search));
      if (user)
        setId(user.id);
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
          {searchedUser ? (
              <>
                <Col>
                  <Image
                    width={100}
                    height={100}
                    style={{ borderRadius: 100, boxShadow: "0 0 4px 8px midnightblue", margin: "45px" }}
                    src={searchedUser.avatar_url}
                    alt="avatar" />
                </Col>
                <Col  className="description">
                <Row>
                  <Username>{searchedUser.name}</Username>
                </Row>
                <Row>
                  <Stat>{searchedUser.followers} Followers</Stat>
                  <Stat>{searchedUser.following} Following</Stat>
                  <Stat>{searchedUser.public_repos} Repos</Stat>
                </Row>
                <Row>
                  <span>{searchedUser.company}</span>
                </Row>
                <Location> {searchedUser.location} </Location>
              </Col>
              </>
          ) : (
              <Empty>No users searched</Empty>
          )}
        </Card>
      </Background>
  );
}

export default App;
