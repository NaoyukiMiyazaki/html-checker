import { HTMLHint } from 'htmlhint'
import rule from './gtm-iframe-require'
rule(HTMLHint)

const ruldId = 'gtm-iframe-require'
const ruleOptions = {}
ruleOptions[ruldId] = true

describe(`Rules: ${ruldId}`, () => {
  it('htmlタグの中にgtmのiframeが見つかればエラーなし', () => {
    const code = `
      <html>
        <head></head>
        <body>
          <!-- Google Tag Manager -->
          <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-SAMPLE" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><script>(function(w, d, s, l, i) {w[l] = w[l] || [];w[l].push({'gtm.start': new Date().getTime(),event: 'gtm.js'});var f = d.getElementsByTagName(s)[0],j = d.createElement(s),dl = l != 'dataLayer' ? '&l=' + l : '';j.async = true;j.src ='//www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j, f);})(window, document, 'script', 'dataLayer', 'GTM-SAMPLE');</script>
          <!-- End Google Tag Manager -->
        </body>
      </html>`
    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(0)
  })

  it('htmlタグの中にgtmのiframeが見つからなければエラー', () => {
    const code = `
      <html>
        <head></head>
        <body>
          <!-- Google Tag Manager -->
          <!-- End Google Tag Manager -->
        </body>
      </html>`
    const messages = HTMLHint.verify(code, ruleOptions)

    expect(messages.length).toBe(1)
  })
})