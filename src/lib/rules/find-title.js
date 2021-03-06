export default HTMLHint => {
  HTMLHint.addRule({
    id: 'find-title',
    description: 'find title tag',
    init(parser, reporter) {
      const self = this
      let headBegin = false
      let hasTitle = false
            
      function onTagStart(event) {
        const tagName = event.tagName.toLowerCase();
        if (tagName === 'head') {
          headBegin = true;
        } else if (tagName === 'title' && headBegin) {
          hasTitle = true;
        }
      }
      
      function onTagEnd(event) {
        const tagName = event.tagName.toLowerCase();
        if (hasTitle && tagName === 'title') {
          const lastEvent = event.lastEvent;
          if (lastEvent.type !== 'text' || (lastEvent.type === 'text' && /^\s*$/.test(lastEvent.raw) === true)) {
            reporter.error('<title></title> must not be empty.', event.line, event.col, self, event.raw);
          }
        } else if (tagName === 'head') {
          if (hasTitle === false) {
            reporter.error('<title> must be present in <head> tag.', event.line, event.col, self, event.raw);
          } else {
            reporter.info(`<title> found in <head> tag.`, event.line, event.col, self, event.raw)
          }
          parser.removeListener('tagstart', onTagStart);
          parser.removeListener('tagend', onTagEnd);
        }
      }

      parser.addListener('tagstart', onTagStart);
      parser.addListener('tagend', onTagEnd);
    }
  })
}

