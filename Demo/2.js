let a = 6;
let b = 9;
let c = 1;
function simpleTag(strings, ...expressions) {
  //strings 是按照   `${内容}`  切割后剩余的各个项,, expressions 是按照什么切割
  console.log(strings);
  for(const expression of expressions) {
    console.log(expression);
  }
  let x=strings[0]+expressions.map((v,i)=>`${v}${strings[i+1]}`).join('')
  console.log('这里是   x  ------------', x)
  return 'foobar';
}
let taggedResult = simpleTag `  ${a}+${b}+${c}=${a+b+c}`;
