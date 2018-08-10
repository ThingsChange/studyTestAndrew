/**
 *
 * @author  56477
 * @create 2018-08-09 9:32
 * @PROJECT_NAME staff - wlj
 * @note 请阐述当前文件的作用
 **/
function moneyFormat (input,flag){
  return  !input?( flag?'0.00':'0'):(flag ? (+input).toLocaleString('en',{ style:'currency',currency:'USD'}).slice(1) : (+input).toLocaleString())
}
