import React from 'react';
import PropTypes from 'prop-types';

const config = require('../../config');

const initDisqus = () => {
  if (window.DISQUS) {
    window.DISQUS.reset({ reload: true });
  } else {
    let disqus = document.createElement('script');
    disqus.async = true;
    disqus.src = `https://${config.disqus.name}.disqus.com/embed.js`;
    document.head.appendChild(disqus);
  }
};

export default class Disqus extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    pageId: PropTypes.string.isRequired,
  };
  componentDidMount() {
    if (config.disqus.name) initDisqus();
  }
  render() {
    if (process.browser) {
      window.disqus_shortname = config.name;
      window.disqus_identifier = this.props.pageId;
      window.disqus_title = document.title;
      window.disqus_url = window.location.href;
    }
    return <div id="disqus_thread" />;
  }
}
