export default HTMLHint => {
  HTMLHint.addRule({
    id: 'find-onclick-ga',
    description: 'onclick属性のga関数を見つける',
    init(parser, reporter) {
      parser.addListener('tagstart', (event) => {
        event.attrs.forEach(attr => {
          if (attr.name.toLowerCase() !== 'onclick') return
          if (attr.value.indexOf('ga') === -1) return

          reporter.info(`found ga function`, event.line, event.col, this, event.raw)
        });
      })
    }
  })
}