import React, { Component } from 'react'
import hljs from 'highlightjs'

import './Code.css'
import 'highlightjs/styles/default.css'

class Code extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highlight: {},
    }
  }

  componentDidMount() {
    if (!this.props.html) return

    this.highlight()
  }

  componentDidUpdate(prevProps) {
    if (this.props.html === prevProps.html) return

    this.highlight()
  }

  highlight() {
    this.setState({
      highlight: hljs.highlight('html', this.props.html)
    })
  }

  render() {
    const { highlight } = this.state

    return (
      <pre className="code">
        <code className="code__inner html" dangerouslySetInnerHTML={{__html: highlight.value}} />
      </pre>
    )
  }
}

export default Code
