import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = { upvoted: false, liked: false };
    this.handleClick = this.handleClick.bind(this);
    this.writeLikeHistory = this.writeLikeHistory.bind(this);
  }

  static propTypes = {
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  };

  handleClick() {
    if (this.state.liked) return;
    this.props.upvote(this.props.id, this.props.likes + 1);
    this.setState({ upvoted: true });
    this.writeLikeHistory();
  }

  writeLikeHistory() {
    localStorage.setItem(`__LIKED_ARTICLE_${this.props.id}`, true);
    this.setState({ liked: true });
  }

  readLikeHistory() {
    this.setState({
      liked: !!localStorage.getItem(`__LIKED_ARTICLE_${this.props.id}`),
    });
  }

  componentDidMount() {
    this.readLikeHistory();
  }

  render() {
    return (
      <button
        className={`button ${this.state.liked ? 'is-danger' : ''}`}
        onClick={() => {
          this.handleClick();
        }}
      >
        <span className="icon is-small">
          <i className={`fa fa-${this.state.liked ? 'heart' : 'heart-o'}`} />
        </span>
        <span>
          {this.state.upvoted ? this.props.likes + 1 : this.props.likes} Likes
        </span>
      </button>
    );
  }
}

const POST_UP_VOTE_MUTATION = gql`
  mutation postUpvote($id: ID!, $likes: Int!) {
    postUpvote(id: $id, likes: $likes) {
      likes
    }
  }
`;

export default graphql(POST_UP_VOTE_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    upvote: (id, likes) =>
      mutate({
        variables: { id, likes },
      }),
  }),
})(Like);
