import React from 'react'
import ReactMarkdown from 'react-markdown'

export default class Markdown extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ReactMarkdown source={this.props.data || '# NO CONTENT AVAILABLE'} />
    )
  }
}
