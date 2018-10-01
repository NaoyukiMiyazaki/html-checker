import React, { Component } from 'react'
import hljs from 'highlightjs'

import './Code.css'

class Code extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lines: [],
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
    const lines = this.props.html.trim().split('\n');
    this.setState({
      lines,
      highlight: hljs.highlight('html', this.props.html)
    })
  }

  render() {
    const { lines, highlight } = this.state
    return (
      <div className="code">
        <div className="code__container">
          <div className="code__lines">
          {lines.map((val, i) => (
            <div id={`L${i + 1}`} key={i}><a href={`#L${i + 1}`}>{i + 1}</a></div>
          ))}
          </div>
          <pre className="code__code">
            <code className="code__inner html" dangerouslySetInnerHTML={{__html: highlight.value}} />
          </pre>
        </div>
      </div>
    )
  }
}

export default Code
