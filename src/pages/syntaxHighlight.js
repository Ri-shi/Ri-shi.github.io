import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

hljs.configure({
  languages: [
    'php',
    'javascript',
    'json',
    'bash',
    'scss',
    'css',
    'yml',
    'twig',
    'html',
  ],
})

export default function highlightCode() {
  const codeBlocks = document.querySelectorAll('pre > code')
  codeBlocks.forEach(codeBlock => {
    if (typeof codeBlock === 'object') {
      hljs.highlightBlock(codeBlock)
    }
  })
}