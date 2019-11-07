import React, {useEffect} from 'react';
import showdown from 'showdown';
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import PrismCode from 'react-prism';
import _ from 'lodash';

const converter = new showdown.Converter()

export default function Table() {
  const [paste, setPaste] = React.useState([]);
  function ListenPaste(){
    document.addEventListener('paste', function(e) {
      const table = (new DOMParser).parseFromString(e.clipboardData.getData('text/html'), "text/html").documentElement.querySelector('table');
      const reg = [
        /\s{1}style="[\w\W]*?"/g,
        /<!--[\w\W]*?-->/g,
        /\s{1}lang="[\w\W]*?"/g
      ];
      let outer = table && table.outerHTML;
      outer && reg.map(r => {
        outer = outer.replace(r, '');
      })
      setPaste(outer);
    });
  }
  useEffect(() => {
    ListenPaste()
  },[])
  
  return (
    <div className="table">
      <p>直接复制word文档中的表单</p>
      <PrismCode component="pre" className="language-html">
        {paste}
      </PrismCode>
    </div>
  )
}
