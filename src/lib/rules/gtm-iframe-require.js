export default HTMLHint => {
  HTMLHint.addRule({
    id: 'gtm-iframe-require',
    description: 'Google Tag Managerのiframe記述は必須',
    init(parser, reporter) {
      const self = this
      let hasGTMIframe = false
            
      function onTagStart(event) {
        if (hasGTMIframe) return
        if (event.tagName.toLowerCase() !== 'iframe') return

        event.attrs.forEach(attr => {
          if (attr.name !== 'src') return
          if (attr.value.indexOf('googletagmanager') === -1) return

          hasGTMIframe = true;
        });
      }
      
      function onTagEnd(event) {
        if (event.tagName.toLowerCase() !== 'html') return

        if (!hasGTMIframe) {
          reporter.error('Google Tag Managerの<iframe>は必須', event.line, event.col, self, event.raw);
        }

        parser.removeListener('tagstart', onTagStart);
        parser.removeListener('tagend', onTagEnd);
      }

      parser.addListener('tagstart', onTagStart);
      parser.addListener('tagend', onTagEnd);
    }
  })
}