import { HTMLHint } from 'htmlhint'
import findTitle from './find-title'
findTitle(HTMLHint)

const ruldId = 'find-title'
const ruleOptions = {}
ruleOptions[ruldId] = true

describe(`Rules: ${ruldId}`, () => {
  it('found title tag', () => {
    const code = '<head><title>Document</title></head>'
    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(1)
    expect(messages[0].type).toBe('info')
  });

  it('not found title tag', () => {
    const code = '<head></head><h1>Document</h1>'
    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(1)
    expect(messages[0].type).toBe('error')
    expect(messages[0].rule.id).toBe(ruldId)
  });
});