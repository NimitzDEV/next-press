import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Like from '../elements/like';
import Link from 'next/link';
import Disqus from '../elements/disqus';
import dynamic from 'next/dynamic';
import { sizes, media } from '../../tools/server';
import { getRandomColor } from '../../tools/client';

const Title = styled.h1`
  margin: 0;
  background-color: ${props => props.bgColor || '#000'};
  padding: 0.5em;
  font-size: 2em;
  color: #fff;
  display: block;
  font-weight: 100;
  transition: background-color 0.3s ease-in-out;
  transition-delay: 1s;
  cursor: pointer;
  a {
    color: #fff;
    text-decoration: none;
  }
  ${media.tablet`
    font-size: 1em;
  `};
`;

const Container = styled.article``;
const ArticleBody = styled.article``;
const Content = styled.div`
  max-width: ${sizes.giant}px;
  padding: 1em;
  ${media.tablet`
  padding: 0.5em;
`};
`;

const ArticleFooter = styled.div`
  padding: 1em;
`;

const ProcessorList = {
  default: dynamic(import('../processors/markdown')),
};

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bgColor: '#000', brief: 'brief' in props };
  }

  componentDidMount() {
    this.setState({
      bgColor: getRandomColor(),
      liked: this.props.liked,
    });
  }

  render() {
    return (
      <Container>
        <Title bgColor={this.state.bgColor}>
          <Link
            href={`/?id=${this.props.data._id}`}
            as={`/read/${this.props.data._id}`}
          >
            <a>{this.props.data.title}</a>
          </Link>
        </Title>

        <Content>
          <ArticleBody>
            {this.props.data.content.map((content, index) => {
              return React.createElement(ProcessorList[content.processor], {
                data: content.content,
                key: index,
              });
            })}
          </ArticleBody>
          <ArticleFooter>
            <Like likes={this.props.data.likes} id={this.props.data._id} />
            {this.state.brief ? null : (
              <div>
                <hr />
                <Disqus pageId={this.props.data._id} />
              </div>
            )}
          </ArticleFooter>
        </Content>
      </Container>
    );
  }
}
