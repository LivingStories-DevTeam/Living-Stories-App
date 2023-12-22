import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import Story from "./StoryCard";
import { BellFilled, BellOutlined, BellTwoTone, FieldTimeOutlined, MinusOutlined } from "@ant-design/icons";
import { Avatar, Badge, Drawer, List, Space, Button as ButtonAntd, Typography, Row, Form } from "antd";
import ReactQuill from "react-quill";
interface User {
  id: number;
  name: string;
  photo?: ArrayBuffer | null;
}
const NavBar: React.FC = () => {

  const { Text } = Typography;
  const [user, setUser] = useState<User | null>(null);
  const [openActivityDrawer, setOpenActivityDrawer] = useState<boolean>(false);
  const [activities, setActivities] = useState<requestObject[]>()
  const [activityCount, setActivityCount] = useState<number>(0);

  type requestObject = {
    id: number;
    user_id: number;
    user_name: string;
    user_media: string | null;
    action_type: string;
    story_id: number | null;
    story_title: string | null;
    following_id: number;
    following_name: string;
    action_timestamp: string;
    newFlag: string;
  };

  const onActivityDrawerClick = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/activity`, { withCredentials: true });
    setActivityCount(response.data?.reduce((count: number, item: any) => item.newFlag === "Y" ? count + 1 : count, 0));
    setActivities(response.data);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(
          `${import.meta.env.VITE_BACKEND_URL}/users/getname`,
          { withCredentials: true }
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      onActivityDrawerClick();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const logout = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
      withCredentials: true,
    });
    localStorage.clear();
    navigate("/");
  };

  const generateText = (
    actionType: string,
    user_name: string,
    story_title?: string,
    following_name?: string
  ) => {
    if (actionType === "L") {
      return `${user_name} liked the story ${story_title}!`;
    } else if (actionType === "C") {
      return `${user_name}  commented on story ${story_title}!`;
    } else if (actionType === "F") {
      return `${user_name} followed the user ${following_name}!`;
    }
    else if (actionType === "S") {
      return `${user_name} posted story ${story_title}!`;
    }
  };

  return (
    <Navbar expand="lg" variant="dark" style={{ fontFamily: 'HandWriting', fontSize: "xx-large", backgroundColor: '#1F6C5C' }}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link href={`/user/${user?.name}`}>{user?.name}</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href={"/timeline"}>Timeline</Nav.Link>

          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand href="/home" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <img
            src="../src/assets/images/logo_kare.png"
            width="270px"
            height="auto"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          /></Navbar.Brand>
      </Container>
      <a style={{ marginRight: "20px" }} onClick={() => {
        onActivityDrawerClick();
        setOpenActivityDrawer(true);
      }}>
        <Badge
          showZero
          count={activityCount}>
          <Avatar src={<BellFilled style={{ fontSize: "35px" }} />} shape="square" size="large" />
        </Badge>
      </a>
      <Button variant='secondary'
        onClick={() => {
          navigate("/story", { replace: true });
        }}
        style={{ minWidth: "fit-content", fontSize: "xx-large", backgroundColor: '#1F6C5C', outline: "none" }}
      >
        Create Story
      </Button>
      <Button variant='secondary' onClick={logout} style={{ minWidth: "fit-content", fontSize: "xx-large", backgroundColor: '#1F6C5C' }}>Log Out</Button>
      <Drawer
        width={"50vh"}
        open={openActivityDrawer}
        onClose={() => setOpenActivityDrawer(false)}>
        <Form.Item>
          <Text style={{ color: "rgb(31, 108, 92)", fontWeight: 600, fontSize: "16px", marginLeft: "18px" }}>LATEST ACTIVITIES</Text>
        </Form.Item>
        <List
          itemLayout="vertical"
          size="small"
          pagination={false}
          dataSource={activities}
          renderItem={(item) => (
            <List.Item
              key={item.id}>
              <List.Item.Meta
                style={{ marginBottom: "0px" }}
                avatar={
                  item.user_media ? (
                    <a
                      onClick={() => window.location.href = `/user/${item.user_name}`}>
                      <Badge
                        count={item.newFlag === "Y" ? <FieldTimeOutlined style={{ color: "indianred", fontSize: "17px" }} /> : undefined}>
                        <Avatar size={40} src={<img src={item.user_media} alt="avatar" />} />
                      </Badge>
                    </a>
                  ) : (
                    <a>
                      <Badge
                        count={item.newFlag === "Y" ? <FieldTimeOutlined style={{ color: "indianred", fontSize: "17px" }} /> : undefined}>
                        <Avatar size={40}></Avatar>
                      </Badge>
                    </a>
                  )}
                title={<a onClick={() => window.location.href = `/user/${item.user_name}`}><Text style={{ fontWeight: "bold" }}>{item.user_name}</Text></a>}
                description={
                  <ButtonAntd
                    style={{ paddingLeft: "0px" }}
                    onClick={() => window.location.href = `/stories/${item.story_id}`}
                    type="link">{<Text style={{ color: "black" }}>{generateText(item.action_type,
                      item.user_name,
                      item.story_title ?? undefined,
                      item.following_name)}</Text>}
                  </ButtonAntd>}
              />
            </List.Item>
          )} />
      </Drawer>
    </Navbar >
  );
};

export default NavBar;
