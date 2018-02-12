import React from 'react'
import withData from '../components/apollo/withData'
import styled from 'styled-components'
import { media } from '../tools/server'
import Layout from '../components/layout'
import Router from 'next/router'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const LoginPage = styled.div`
  padding: 10em;
  flex: 1 1 auto;
  align-self: center;
  width: 15em;
  ${media.tablet`
    padding: 2em;
    width: 100%;
  `};
  ${media.phone`
    padding: 1em;
    width: 100%;
  `};
  .form-container {
    .input {
      margin: 0.5em 0;
    }
  }
`

const MessageHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3em;
  line-height: 3em;
  z-index: 1000;
  color: #fff;
  text-align: center;
  background-color: ${props => (props.success ? '#43A047' : '#F44336')};
`

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      nowLogin: false,
      showMessage: '',
      messageSuccess: true
    }
    this.hideMessage = this.hideMessage.bind(this)
  }

  // Handle username and password field change
  handleUsername(data) {
    this.setState({ username: data.value })
  }
  handlePassword(data) {
    this.setState({ password: data.value })
  }

  // Handle login, and perform later actions
  async handleLogin() {
    this.setState({ nowLogin: true })
    // clear local storage
    localStorage.removeItem('token')
    let result = await this.props.login(
      this.state.username,
      this.state.password
    )
    let token = (result && result.data.createToken) || false
    if (token && token.status) {
      this.showMessage(token.msg)
      localStorage.setItem('token', token.token)
      setTimeout(() => {
        Router.push('/admin')
      }, 1000)
    } else {
      this.showMessage((token && token.msg) || 'Server has no response!', 0)
    }
  }

  // Controls message header
  static messageTimer = null
  showMessage(msg, status = 1) {
    clearTimeout(this.messageTimer)
    this.setState({
      showMessage: msg,
      messageSuccess: status
    })
    this.messageTimer = setTimeout(this.hideMessage, 2000)
  }

  hideMessage() {
    clearTimeout(this.messageTimer)
    this.messageTimer = null
    this.setState({ showMessage: '' })
  }

  // Clear timeout timer when component will be unmounted
  componentWillUnmount() {
    clearTimeout(this.messageTimer)
  }

  render() {
    return (
      <Layout>
        {this.state.showMessage
          ? <MessageHeader success={this.state.messageSuccess}>
              <span>
                {this.state.showMessage}
              </span>
            </MessageHeader>
          : null}
        <LoginPage>
          <h2>Login to Admin</h2>
          <div className="form-container">
            <div className="input">
              <input
                type="text"
                placeholder="Input username or e-mail"
                onChange={(e, d) => this.handleUsername(d)}
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Input password"
                onChange={(e, d) => this.handlePassword(d)}
              />
            </div>
            <div className="input">
              <button
                disabled={!(this.state.username && this.state.password)}
                onClick={() => this.handleLogin()}
              >
                <button>Login</button>
                <button>
                  as {this.state.username || 'Nobody!'}
                </button>
              </button>
            </div>
          </div>
        </LoginPage>
      </Layout>
    )
  }
}

const LOGIN_MUTATION = gql`
  mutation createToken($username: String!, $password: String!) {
    createToken(username: $username, password: $password) {
      token
      status
      msg
    }
  }
`

export default compose(
  withData,
  withApollo,
  graphql(LOGIN_MUTATION, {
    props: ({ ownProps, mutate }) => ({
      login: (username, password) =>
        mutate({ variables: { username, password } })
    })
  })
)(Login)
