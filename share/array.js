/**
 * Created by Andrew on 2017/5/11.
 */
/*
Ҫ�󣺷ֱ����ȥ��[1,1,2,3,1]��[{id:1,name:��aa��},{id:2,name:��bb��},{id:1,name:��aa��}]����������ظ�ֵ��
function sliceRepeat(arr){
//���ڴ�������롣                                                  }
    sliceRepeat([1,1,2,3,1]);
    sliceRepeat([{id:1,name:��aa��},{id:2,name:��bb��},{id:1,name:��aa��}]);
*/

function sliceRepeat(arr) {
//���ڴ��������
 var result = [], objHash={}, hash = {},dataType;
 for (var i = 0, elem; (elem = arr[i]) != null; i++) {
  dataType=typeof elem;
  if(dataType=='object'){//��ʾ�ɻ���Ϊ������ʵ�Ͳ������
   objHash[elem['id']]=elem;
  }else{
   if (!hash[elem]) {
    result.push(elem);
    hash[elem] = true;
   }
  }
 }
 for (var item in objHash){
  result.push(objHash[item])
 }
 return result;
}
