/*
 * @Author: lixiuhuang 
 * @Date: 2018-05-28 14:22:00 
 * @Last Modified by:  
 * @Last Modified time: 2018-05-29 15:47:24
 * desc 这是个上传xls、xlsx的公共组件哈， 之所以不支持上传图片 是因为在这之前有上传图片的了
 */


  var uploadFileXlsModule = angular.module('uploadFileXlsModule', [])
uploadFileXlsModule.controller('uploadFileXlsModuleCtrl', ['$scope', function($scope){
    $scope.myData={labelName:'xls',fileType:['xls','js','jpg']};
}]);
  uploadFileXlsModule.directive('uploadFile', function() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: './uploadFileXls.html',
        scope: {
          myData: '=',
        },
          controller:function($scope){
          $scope.uploadfile='1234';
              console.log('$$scope',$scope);
              $scope.chooseFile2 = function(path) {
                console.log(1234);
                  $scope.uploadfile = path;
              },
                  $scope.chooseFile=function() {
                      $('#chooseFileBtn').click()
                  }
          },
        link: function(scope, element, attrs,myCtrl) {
          console.log('xxxxx')
          scope.uploadfile = '56565656'
          scope.formData = new FormData()
/*          scope.chooseFile = function() {
            $('#chooseFileBtn').click()
              scope.uploadfile = '0000000000000'
          }*/

            $('#chooseFileBtn').on('change', function() {
                scope.formData = new FormData()
                var file = document.getElementById('chooseFileBtn').files
                let minNum = scope.myData.minNum || 1 // 最少上传数量
                let maxNum = scope.myData.maxNum || 1 //最多上传数量
                let maxFileSize = scope.myData.maxFileSize || 10 // 单个文件大小
                let maxFileSizeToB = maxFileSize * 1024 * 1024
                if (file.length > maxNum || file.length < minNum) {
                    newsHint(
                        '最少上传' + minNum + '个文件，最多上传' + maxNum + '个文件'
                    )
                } else {
                    for (var i = 0; i < file.length; i++) {
                        if (file[i].size > maxFileSizeToB) {
                            newsHint('请上传小于' + maxFileSize + '的文件')
                        } else {
                            if (file[i].name) {
                                let fileName = file[i].name.substring(
                                    file[i].name.lastIndexOf('.') + 1
                                )
                                if (scope.myData.fileType.includes(fileName)) {
                                    scope.formData.append('file[' + i + ']', file[i])
                                    console.log(scope.formData)
                                } else {
                                    newsHint(
                                        '文件格式不正确，请上传以' +
                                        scope.myData.fileType +
                                        '文件'
                                    )
                                    $('#chooseFileBtn').val('')
                                }
                            }
                        }
                        scope.$apply(function(){
                            scope.uploadfile = $('#chooseFileBtn').val()
                        })
/*                        scope.uploadfile = $('#chooseFileBtn').val()
                        console.log(scope.uploadfile, 55555)*/
                    }
                }
            })
        }
      }
    })

