import { useState} from 'react';

export const  useSearch = () => {
  const [result , setResult] = useState([])
  const searchTerm = (term)=>{
    fetch(`https://in.images.search.yahoo.com/search/images;?p=${term}`, {
      method: 'GET',
    })
      .then((data) => data.text())
      .then((body) => {
        let nimg = [];
        let str = body.split('<img src=');
        for (let img of str) {
          let link = img.split(' ');
          for (let i of link) {
            let l = i.match("'http.*");
            if (l) {
              nimg = [...nimg, l.input.replaceAll("'", '')];
            }
          }
        }
        setResult(nimg.filter(el=>el.startsWith('http')));
      });
  }
  return [result , searchTerm]
}
