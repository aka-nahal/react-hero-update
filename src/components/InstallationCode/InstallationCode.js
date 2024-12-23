import React from 'react'

export const InstallationCode = () => (
  <pre className='prettyprint linenums'>
    <ol className='linenums'>
      <li>
        <span className='htm'><b>&lt;script</b></span>
        <span className='htm'><b> type</b></span>
        <span className='htm'><b>=</b></span>
        <span className='htm-atv'><b>"text/javascript"</b></span>
        <span className='htm'><b>&gt;</b></span>
      </li>
      <li>
        <span className='tabbed'>
          <span className='pln'>(</span>
          <span className='met'>function</span>
          <span className='pln'>(</span>
          <span className='tag'>w</span>
          <span className='pln'>,</span>
          <span className='tag'>d</span>
          <span className='pln'>,</span>
          <span className='tag'>s</span>
          <span className='pln'>,</span>
          <span className='tag'>u</span>
          <span className='pln'>,</span>
          <span className='tag'>h</span>
          <span className='pln'>,</span>
          <span className='tag'>a</span>
          <span className='pln'>,</span>
          <span className='tag'>m</span>
          <span className='pln'>)</span>
          <span className='pln'>&#123;</span>
          <span className='tag'>w</span>
          <span className='pln'>[</span>
          <span className='tag'>h</span>
          <span className='pln'>]</span>
          <span className='pln'>=</span>
          <span className='tag'>w</span>
          <span className='pln'>[</span>
          <span className='tag'>h</span>
          <span className='pln'>]</span>
          <span className='pln'>||</span>
          <span className='met'>function</span>
          <span className='pln'>()&#123;(</span>
          <span className='tag'>w</span>
          <span className='pln'>[</span>
          <span className='tag'>h</span>
          <span className='pln'>]</span>
          <span className='pln'>.</span>
          <span className='pun'>q</span>
          <span className='pln'>=</span>
          <span className='tag'>w</span>
          <span className='pln'>[</span>
          <span className='tag'>h</span>
          <span className='pln'>].</span>
          <span className='pun'>q</span>
          <span className='pln'>||</span>
          <span className='pln'>[]).</span>
          <span className='atn'>push</span>
          <span className='pln'>(</span>
          <span className='pln'>arguments</span>
          <span className='pln'>)&#125;;</span>
          <span className='tag'>a</span>
          <span className='pln'>=</span>
          <span className='tag'>d</span>
          <span className='pln'>.</span>
          <span className='atn'>createElement</span>
          <span className='pln'>(</span>
          <span className='tag'>s</span>
          <span className='pln'>);</span>
          <span className='tag'>m</span>
          <span className='pln'>=</span>
          <span className='tag'>d</span>
          <span className='pln'>.</span>
          <span className='atn'>getElementsByTagName</span>
          <span className='pln'>(</span>
          <span className='tag'>s</span>
          <span className='pln'>)[</span>
          <span className='atn'>0</span>
          <span className='pln'>];</span>
          <span className='tag'>a</span>
          <span className='pln'>.</span>
          <span className='pun'>async</span>
          <span className='pln'>=</span>
          <span className='atn'>1</span>
          <span className='pln'>;</span>
          <span className='tag'>a</span>
          <span className='pln'>.</span>
          <span className='pun'>src</span>
          <span className='pln'>=</span>
          <span className='pln'>u</span>
          <span className='pln'>;</span>
          <span className='tag'>a</span>
          <span className='pln'>.</span>
          <span className='pun'>charset</span>
          <span className='pln'>=</span>
          <span className='atv'>'utf-8'</span>
          <span className='pln'>;</span>
          <span className='tag'>m</span>
          <span className='pln'>.</span>
          <span className='atn'>parentNode</span>
          <span className='pln'>.</span>
          <span className='atn'>insertBefore</span>
          <span className='pln'>(</span>
          <span className='tag'>a</span>
          <span className='pln'>,</span>
          <span className='tag'>m</span>
          <span className='pln'>)&#125;)(</span>
          <span className='pun'>window</span>
          <span className='pln'>,</span>
          <span className='pun'>document</span>
          <span className='pln'>,</span>
          <span className='atv'>'script'</span>
          <span className='pln'>,</span>
          <span className='atv'>'//converthero.com/converthero.js'</span>
          <span className='pln'>,</span>
          <span className='atv'>'_convertHero'</span>
          <span className='pln'>);</span>
        </span>
      </li>
      <li>
        <span className='tabbed'>
          <span className='met'>_convertHero</span>
          <span className='pln'>(</span>
          <span className='atv'>'initialize'</span>
          <span className='pln'>);</span>
        </span>
      </li>
      <li>
        <span className='htm'><b>&lt;/script&gt;</b></span>
      </li>
    </ol>
  </pre>
)

export default InstallationCode
