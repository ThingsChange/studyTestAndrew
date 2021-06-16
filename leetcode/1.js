class goods:
def __init__(self, goods_id, weight=0, value=0):
self.id = goods_id
self.weight = weight
self.value = value


# 不适用于0-1背包
def knapsack(capacity=0, goods_set=[]):#capacity：容量
# 按单位价值量排序
goods_set.sort(key=lambda obj: obj.value / obj.weight, reverse=True)
result = []
for a_goods in goods_set:#循环
if capacity < a_goods.weight:
break
result.append(a_goods)#向result列表中添加商品
capacity -= a_goods.weight#所剩容量减去加入的商品重量
if len(result) < len(goods_set) and capacity != 0:
result.append(goods(a_goods.id, capacity, a_goods.value * capacity / a_goods.weight))
return result

#商品列表
some_goods = [goods(0, 2, 4), goods(1, 8, 6), goods(2, 5, 3), goods(3, 2, 8), goods(4, 1, 2)]

start_time = time.clock()
res = knapsack(6, some_goods)
end_time = time.clock()
print('花费时间：' + str(end_time - start_time))

for obj in res:
print('物品编号:' + str(obj.id) + ' ,放入重量:' + str(obj.weight) + ',放入的价值:' + str(obj.value), end=',')
print('单位价值量为:' + str(obj.value / obj.weight))

————————————————
版权声明：本文为CSDN博主「无止境x」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/xjp_xujiping/article/details/88897537
  var goods=(id,weight,value)=>{
    return {id,weight,value}
  }
  var  some_goods = [goods(0, 2, 4), goods(1, 8, 6), goods(2, 5, 3), goods(3, 2, 8), goods(4, 1, 2)]

var best=(capacity,goods_set)=>{
  let sortArray=[];
  goods_set.map((cur, index) =>{
    sortArray.push({
      id:cur.id,
      value: cur.value,
      weight: cur.weight,
      ratio: cur.value/cur.weight
    })
  })
  sortArray=sortArray.sort(function(a, b){
    return b.ratio - a.ratio
  })
  console.log('这里是 sortArray 的结果-------------', sortArray);

  let result =[];
  for (let i=0;i<sortArray.length;i++){
    let v=sortArray[i]
    if(capacity>=v.weight){
      result.push(v);
      capacity -= v.weight;
      continue;
    }
    if (result.length< sortArray.length && capacity !== 0) {
      result.push(goods(v.id, capacity, v.value * capacity / v.weight))
      break
    }
  }
  console.log('这里是 result 的结果-------------', result);
  return result
}
console.log('这里是  的结果-------------', best(6,some_goods))
