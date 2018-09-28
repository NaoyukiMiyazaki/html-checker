import { HTMLHint } from 'htmlhint'

import findTitle from './rules/find-title'
import findOnClickGa from './rules/find-onclick-ga'
import gtmIframeRequire from './rules/gtm-iframe-require'

findTitle(HTMLHint)
findOnClickGa(HTMLHint)
gtmIframeRequire(HTMLHint)

const options = {
  'find-title': true,
  'find-onclick-ga': true,
  'gtm-iframe-require': true,
}

export default function checker(html) {
  return new Promise((resolve, reject) => {
    const messages = HTMLHint.verify(html, options)
    resolve(messages)
  })
}