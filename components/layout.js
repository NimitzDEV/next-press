import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../tools/server';
const config = require('../config');

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  ${media.tablet`
    flex-direction: column;
    height: auto;
  `};
`;
export default class AppLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    title: PropTypes.string,
  };

  static defaultProps = {
    title: 'Default Title',
  };

  render() {
    return (
      <Layout>
        <Head>
          <title>
            {this.props.title} - {config.blog.name}
          </title>
        </Head>
        {this.props.children}
      </Layout>
    );
  }
}
