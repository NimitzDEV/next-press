import React from 'react';
import Router from 'next/router';

import withData from '../components/apollo/withData';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: '' };
  }

  componentDidMount() {
    // check auth token
    const token = localStorage.getItem('token') || null;
    if (token) {
      this.setState({ token: token });
    } else {
      Router.push('/login');
    }
  }

  render() {
    if (!this.state.token) return null;
    return <div>1</div>;
  }
}

export default compose(withData, withApollo)(Admin);
