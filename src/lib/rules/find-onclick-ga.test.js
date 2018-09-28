import { HTMLHint } from 'htmlhint'
import findOnclickGa from './find-onclick-ga'
findOnclickGa(HTMLHint)

const ruldId = 'find-onclick-ga'
const ruleOptions = {}
ruleOptions[ruldId] = true

describe(`Rules: ${ruldId}`, () => {
  it('gaを見つけたらinfoメッセージを返す', () => {
    const code = `
      <button onclick="ga('send', 'event', 'test', 'test', 'test');">button</button>
      <a href="https://expample.com" target="_blank" onclick="ga('send', 'event', 'test', 'test', 'test');">link</a>`
    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(2)
    expect(messages[0].type).toBe('info')
    expect(messages[1].type).toBe('info')
  })

  it('gaが見つからなかったメッセージは空', () => {
    const code = `
      <button>button</button>
      <a href="https://expample.com" target="_blank">link</a>`
    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(0)
  })
})