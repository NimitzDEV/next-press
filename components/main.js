import React from 'react';
import styled from 'styled-components';
import Article from '../components/article/article';
import Disqus from '../components/elements/disqus';
import { media } from '../tools/server';

// graphql
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const PER_PAGE_LIMIT = 10;

export const MainContent = styled.section`
  flex: 1 1 auto;
  height: auto;
  font-size: 16px;
  overflow-y: scroll;
  .article-footer {
    text-align: center;
  }
  ${media.tablet`
    overflow-y: auto;
  `};
`;

class AppMainContent extends React.Component {
  constructor(props) {
    super(props);
    this.isRenderIndex = this.isRenderIndex.bind(this);
    this.isRenderSinglePage = this.isRenderSinglePage.bind(this);
  }

  // render a list of articles
  isRenderIndex() {
    return (
      <div>
        {this.props.data.articles.map(e => (
          <Article key={e._id} data={e} brief />
        ))}
        <footer className="footer">
          {this.props.data.loading ? (
            <a class="button is-success is-loading">Loading</a>
          ) : (
            <a className="button" onClick={() => this.props.data.loadMore()}>
              Older Posts
            </a>
          )}
        </footer>
      </div>
    );
  }

  // render a single article
  isRenderSinglePage() {
    return <Article data={this.props.data.article} />;
  }

  render() {
    return (
      <MainContent>
        {this.props.data.loading
          ? null
          : this.props.url.query.id
            ? this.isRenderSinglePage()
            : this.isRenderIndex()}
      </MainContent>
    );
  }
}

const ARTICLE_LIST_QUERY = gql`
  query articles($skip: Int!, $limit: Int!) {
    articles(skip: $skip, limit: $limit) {
      _id
      likes
      title
      content {
        processor
        content
      }
      author {
        name
        desc
      }
    }
  }
`;

const SINGLE_ARTICLE_QUERY = gql`
  query article($id: ID!) {
    article(id: $id) {
      _id
      author {
        name
        desc
      }
      publishDate
      lastModified
      likes
      title
      content {
        processor
        content
      }
    }
  }
`;

export default compose(
  graphql(ARTICLE_LIST_QUERY, {
    skip: props => props.url.query.id,
    options: () => ({ variables: { skip: 0, limit: PER_PAGE_LIMIT } }),
    props: ({ data: { loading, fetchMore, articles } }) => ({
      data: {
        loading,
        articles,
        loadMore: () =>
          fetchMore({
            variables: { skip: articles.length },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!(fetchMoreResult && fetchMoreResult.articles))
                return previousResult;
              return Object.assign({}, previousResult, {
                articles: [
                  ...previousResult.articles,
                  ...fetchMoreResult.articles,
                ],
              });
            },
          }),
      },
    }),
  }),
  graphql(SINGLE_ARTICLE_QUERY, {
    skip: props => !props.url.query.id,
    options: props => ({ variables: { id: props.url.query.id } }),
  })
)(AppMainContent);
