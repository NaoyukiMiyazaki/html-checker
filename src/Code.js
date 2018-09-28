import React from 'react'

import './Code.css'

const Code = ({ html }) => (
  <pre className="code">
    <code className="code__inner">{html}</code>
  </pre>
)

export default Code
