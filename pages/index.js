import Layout from '../components/layout';
import React from 'react';

import Left from '../components/leftside';
import MainContent from '../components/main';

import withData from '../components/apollo/withData';

export default withData(props => (
  <Layout>
    <Left />
    <MainContent url={props.url} />
  </Layout>
));
