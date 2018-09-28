import React, { Component } from 'react'

import checker from './lib/checker'

import Code from './Code'
import Messages from './Messages'

import './App.css'

class App extends Component {
  state = {
    html: '<title>start</title>',
    url: 'sample.html',
    messages: [],
  }

  start() {
    const { url } = this.state

    this.fetchHTML(url)
      .then(html => {
        this.checkHTML(html)
        this.setState({ html })
      })
  }

  fetchHTML(url) {
    return fetch(url)
      .then(res => res.text())
  }

  checkHTML(html) {
    checker(html)
      .then(messages => {
        this.setState({ messages })
      })
  }

  render() {
    return (
      <div className="App">
        <input value={this.state.url} onChange={e => this.setState({ url: e.target.value })} />
        <button onClick={this.start.bind(this)}>start</button>
        <Code html={this.state.html} />
        <Messages messages={this.state.messages} />
      </div>
    )
  }
}

export default App
