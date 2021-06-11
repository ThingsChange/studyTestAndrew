/**
 *
 * @author  晴云
 * @create 2021-05-30 14:41
 * @note 干什么的呢？
 **/
let workDays = {
  0:-1,
  '0.5': 11300,
  1: 11301,
  1.5: 11500,
  2: 11302,
  2.5: 11501,
  3: 11309,
  3.5: 11502,
  4: 11303,
  4.5: 11503,
  5: 11310
}
//这里输入你的points 按照当前任务列表的顺序，无法预估的就先填写0，会自动头跳过
let points = [3, 0.5, 1, 2.5, 3, 0.5, 1, 0, 0.5, 1, 2.5, 0.5, 2.5, 1, 3] ;
//所有任务的功能按钮
let auHappy = [...document.querySelectorAll('.trigger-happy')]
function fillPoint (index){
  if(index === points.length) return ;
  if(!points[index]) fillPoint(++index)
  auHappy[index].click();
  let timer = setInterval(()=>{
    if(!document.querySelector('.ajs-layer')) return
    document.querySelector('.ajs-layer').querySelector('.issueaction-edit-issue').click()
    clearInterval(timer)
    let editTimer = setInterval(()=>{
      if(! document.querySelector('.jira-dialog-content'))return
      clearInterval(editTimer)
      //写入storyPoint
      if(document.querySelector('.jira-dialog-content').querySelector('#customfield_10006')){//bug没有storyPoint
        document.querySelector('.jira-dialog-content').querySelector('#customfield_10006').value = points[index]
      }
//写入预计工时
      document.querySelector('.jira-dialog-content').querySelector('#customfield_11600').value =workDays[points[index]]
      document.querySelector('#edit-issue-submit').click();
      // document.querySelector('.cancel').click();
      setTimeout(()=>{
        fillPoint(++index)
      },2000)
    },500)
  },500)
}
fillPoint(0);
