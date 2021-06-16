/**
 *
 * @author  晴云
 * @create 2021-06-14 0:29
 * @note 求写出一个方法，过滤掉这个JSON对象里的pos属性
 **/

/*
* params in
*
* {
	"and":[
	    {
	      "x": {"eq":"11","pos":"A"}
	    },
	    {
	      "y": {"eq":"33","pos":"B"}
	    },
	]
}
* out:
* {
	"and":[
        {
	      "x": {"eq":"11"}
	    },
	    {
	      "y": {"eq":"33"}
	    },
	]
}
*
* */
function filterBy(obj,val) {
  var result = Object.keys(obj).reduce(function(r, e) {
    if (e.toLowerCase().indexOf(val) != -1) {
      console.log('这里是 obj[e] 的结果-------------', obj[e])
      r[e] = obj[e];
    } else {
      r[e] = filterBy(obj[e],val)
    }
    if(typeof r[e]==='object' && Object.keys(r[e]||{}).length===0) delete r[e]
    return r;
  }, {})
  return result;
}

var obj = {
  "Alarm": {
    "Hello": 48,
    "World": 3,
    "Orange": 1
  },
  "Rapid": {
    "Total": 746084,
    "Fake": 20970,
    "Cancel": 9985,
    // "Word": 2343
  },
  "Flow": {
    "Support": 746084,
    "About": 0,
    "Learn": 0,
    "woress":1,
    "a":{
      "worsasa":undefined
    }
  }
}

/*console.log(filterBy('ange'))
console.log(filterBy('flo'))*/
console.log(filterBy(obj,'wor'))
