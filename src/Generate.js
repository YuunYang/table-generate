import React, {useEffect} from 'react';
import showdown from 'showdown';
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import PrismCode from 'react-prism';
import _ from 'lodash';

const converter = new showdown.Converter()

export default function Generate() {
  const [row, setRow] = React.useState(3);
  const [col, setCol] = React.useState(3);
  const [fileds, setFileds] = React.useState([]);

  function handleSetFileds(r, c){
    var _fileds = [];
    for(let i = 0; i < r; i++){
      _fileds[i] = new Array(c);
    }
    setFileds(_fileds);
  }
  function handleChangeRow(event){
    const value = Number(event.target.value);
    setRow(value);
    handleSetFileds(value + 1, col);
  }
  function handleChangeCol(event){
    const value = Number(event.target.value);
    setCol(value);
    handleSetFileds(row + 1, value);
  }
  function handleFiledChange(r, c, event){
    const _fileds = fileds;
    if(_fileds[r] && _fileds[r].length >= col){
      _fileds[r][c] = event.target.value;
    } else {
      _fileds[r] = new Array(col);
    }
    setFileds([].concat(_fileds));
  }
  useEffect(() => {
    handleSetFileds(row + 1, col);
  },[])
  return(
    <div className="wrapper">
      <div className="selects">
        <p>选择行、列数，每次重选需要手动改变一下面输入框</p>
        <input onChange={handleChangeRow} className="row" type="number" defaultValue={3} min={0} />
        <input onChange={handleChangeCol} className="col" type="number" defaultValue={3} min={0} />
      </div>
      <p>v 1.0</p>
      <p>超出可左右滑动，第一行为表头，在下面表格中可以填写markdown语法，类似`# header`</p>
      <ul className="table">
      {_.range(Number(row) + 1).map((i) => 
        <li key={i + '0'}>{
          _.range(col).map((ii) =>
              <textarea className={'filed ' + 'filed' + i} key={i + '0' + ii} type="text" onChange={handleFiledChange.bind(null, i, ii)} />
          )}
        </li>
      )}
      </ul>
      <div className="result">
        <PrismCode component="pre" className="language-html">
          {prettier.format(`<table>
              ${fileds.map((filed, i) =>{
                return `<tr>
                  ${filed.map(f => {
                    const tag = i === 0 ? 'th' : 'td';
                    return `<${tag}>${converter.makeHtml(f)}</${tag}>`
                  }).join('')
                }
                </tr>`
              }).join('')
            }
          </table>`, {parser: "html", plugins: [parserHtml]})}
        </PrismCode>
      </div>
    </div>
  )
}
