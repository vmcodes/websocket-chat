import React, { useEffect, useState } from "react";
import { Avatar, Col, List, Row, Space, Typography } from "antd";
import { Form, Button, Input } from "antd";
import dayjs from "dayjs";
import { io } from "socket.io-client";
const { Title } = Typography;
const { TextArea } = Input;
const axios = require("axios");
const socket = io("http://localhost:8080");

const App = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  socket.on("message", async function () {
    await fetchMessages();
  });

  async function fetchMessages() {
    let messages = await axios.get(`http://localhost:8080/messages`);
    messages = messages.data;

    if (messages) {
      setComments([...messages]);
    }

    document.getElementById("most-recent")?.scrollIntoView(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await axios.post(`http://localhost:8080/messages`, {
      name: name,
      message: newComment,
    });

    socket.emit("message", {
      name: name,
      message: newComment,
    });

    setNewComment("");
  }

  useEffect(() => {
    if (!comments[0]) {
      fetchMessages();
    }
  });

  return (
    <Space direction="vertical" size="large" className="spacing">
      <Row justify="center">
        <Col span={6}>
          <Title>Chat</Title>
        </Col>
      </Row>

      <Row justify="center" className="comment-wrapper">
        {comments && (
          <Col flex="auto">
            <List
              size="large"
              dataSource={comments}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={`
                        ${item.name} - ${dayjs(item.createdAt).format(
                      "hh:mm"
                    )}`}
                    description={item.message}
                  />
                </List.Item>
              )}
            />
            <div id="most-recent" />
          </Col>
        )}
      </Row>

      <form onSubmit={handleSubmit} className="form">
        <Row justify="center">
          <Col flex="auto">
            <Title level={5}>Name:</Title>
          </Col>
        </Row>

        <Row justify="center">
          <Col flex="auto">
            <Form.Item>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col flex="auto">
            <Title level={5}>Message:</Title>
          </Col>
        </Row>

        <Row justify="center">
          <Col flex="auto">
            <Form.Item>
              <TextArea
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col flex="auto">
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Add Comment
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </form>
    </Space>
  );
};

export default App;
