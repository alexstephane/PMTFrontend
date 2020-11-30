//import React from "react";
// import { withRouter } from "react-router";
// import React, { Component } from 'react';
// import { Button, Form, Segment, Message } from "semantic-ui-react";


import React, { Component } from 'react';
//import { Table } from 'react-bootstrap';
//import { Button, Form, Modal, Table } from 'react-bootstrap';
 import { Button, Form, Segment, Message } from "semantic-ui-react";



class Login extends Component {


  state = {
    username: "",
    password: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

 handleLoginSubmit = () => {
  //make a fetch call
  console.log("login in")
  fetch(`http://localhost:3003/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })
  })
  .then(res => res.json())
    .then(data => {
   console.log(data)
    if(data.authenticated){
      console.log(data.token)
      localStorage.setItem("token", data.token)
      this.props.updateUser(data.user)
    }else{
      alert("Incorrect username or password")
    }
  })
  //update the state of user
 };

   
    render() {

      return (
        <Segment>
        <Form
          onSubmit={this.handleLoginSubmit}
          size="mini"
          key="mini"
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          <Message
            error
            header={this.props.failedLogin ? this.props.error : null}
          />
          <Form.Group widths="equal">
            <Form.Input
              label="username"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              //value={this.state.username}
            />
            <Form.Input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              //value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Segment>
           
        )


    }


}

export default Login















