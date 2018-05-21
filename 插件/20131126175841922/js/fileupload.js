var files = [];
//源文件名称 全局变量
var filesrc;
seajs.use([ 'arale/dialog/1.2.3/dialog' ,  'arale/dialog/1.2.3/dialog.css'], function( Dialog) {
    //seajs.use('extCss/designer/uploadtpl.css');
    var cropUtil = new ImgCropUtil({
        imgos: {width: 360, height: 360},
        cropMain: $('.crop-main-imgwrap'),
        imgPreviewWidth: 65
    });

    var imageLists = $('.crop-aside-imglists');
    var imgtoPreview = {width: 65, height: 0}; //编辑页面图像大小，锁定宽度为65
    var editIndex = 0; //编辑页面当前图片号

    var imglistTemplate = $('#img-list-template').html();
    var imglistbox = $('#imglistbox'); //主页面图像预览列表
    var imgtoList = {width: 180, height: 160}; //主页面图像预览大小

    var pixelwidth = $('.edit-wrap-btn-group .pixel-width');
    var pixelheight = $('.edit-wrap-btn-group .pixel-height');

    var dialog = new Dialog({
        content: $('#edit-wrap')
    });

    FileAPI.event.on($('#choose').get(0), 'change', function(evt) {
        var filenew = FileAPI.getFiles(evt);
//        if ((filenew.length + files.length) > 6) {
//            confirmBox.show("图片最多上传6个");
//            return;
//        }

        FileAPI.filterFiles(filenew, function(file, info) {
            if (/^image/.test(file.type)  ) {
                return true;
            }
            else {
                confirmBox.show("图片格式必须为 jpg/gif/png");
                return false;
            }

        }, function(list, other) {
            if (list.length) {
                files = files.concat(list);

                function recurse() {
                    recurse.i = recurse.i || 0;
                    if (recurse.i >= list.length) {
                        $('#imglistbox .chk:first').addClass('checked');
                        return;
                    }
                    cropUtil.getCenterImage(list[recurse.i], imgtoList, function($imgout) {
                        $(imglistTemplate).find('.figure-upload-img').html($imgout).end().appendTo(imglistbox);
                        recurse.i++;
                        recurse(list[recurse.i]);
                    });
                }
                recurse();  //单线递归加载图片
            }
        });
    });


    //删除
    imglistbox.on('click', '.delete-figure', function(e) {
        var figureupload = $(this).closest('.figure-upload');
        var index = $('#imglistbox .figure-upload').index(figureupload);

        confirmBox.confirm('您确定要删除该模板？', '请确认', function() {
        }, {
            onConfirm: function() {
                var that = this;
                this.set('message', '执行中，请稍候...');
                // $(obj).parents('.figure-upload').remove();
                files.splice(index, 1);
                $('#imglistbox .figure-upload').eq(index).remove();
                $("#fileupload").replaceWith($("#fileupload").clone());
                that.hide();
            },
            closeTpl: '×', // 关闭的按钮设置为空
            width: 300  // 宽度设置为 300 px
        });


    });


    //编辑 
    imglistbox.on('click', '.edit-figure', function(e) {
        e.preventDefault();
        dialog.show();
        pixelwidth.text("");
        pixelheight.text("");
        var figureupload = $(this).closest('.figure-upload');

        //设置当前编辑index
        editIndex = $('#imglistbox .figure-upload').index(figureupload);

        imageLists.empty();
        crop(editIndex);

        recurse(); //单线递归加载图片
        function recurse() {
            recurse.i = recurse.i || 0;
            if (recurse.i >= files.length) {
                recurse.i = 0;
                return;
            }
            cropUtil.getDomImage(files[recurse.i], imgtoPreview, function($imgout) {
                $imgout.addClass('img-preview').css({
                    'margin-bottom': '10px',
                    'cursor': 'pointer'
                }).appendTo(imageLists);
                recurse.i++;
                recurse(files[recurse.i]);
            });
        }

        //点击切换编辑图片
        imageLists.on('click', '.img-preview', function() {
            editIndex = $(this).index('.img-preview');
            crop(editIndex);
        });

        function crop(index) {
            cropUtil.getCropArea(files[index], cropUtil.config.cropMain, function(c, imgmatrix) {
                imageLists.children().eq(index).html($(this));
                files[index].edit = true;
                pixelwidth.text(Math.floor(imgmatrix.sw) + 'px');
                pixelheight.text(Math.floor(imgmatrix.sh) + 'px');
            });
        }

    });//end 编辑

    //保存
    $('#edit-comfirm-btns .ui-button-lorange').on('click', function() {
        //应用修改到主页面
        $.each(files, function(index, file) {
            if (file.edit) {
                var image = FileAPI.Image(files[index]);
                image.matrix = files[index].cropMatrix;
                cropUtil.getCenterCropImage(image, imgtoList, function($imgout) {
                    $('#imglistbox').children('.figure-upload').eq(index).find('.figure-upload-img').html($imgout);
                    file.outputMatrix = image.matrix;
                    file.outputMatrix.dh = 0;
                    file.outputMatrix.dw = 0;
                });
            }
        });
        dialog.hide();
    });

    //关闭编辑页面时清空edit属性
    dialog.after('hide', function() {
        $.each(files, function(index, file) {
            file.edit = false;
        });

        imageLists.css({
            'margin-top': '0px'
        });
    });

    $('#edit-comfirm-btns .ui-button-grey').on('click', function() {
        dialog.hide();

    });
    //点击滑动事件
    $('.crop-aside-slidedown').on('click', function() {
        if (imageLists.children().length <= 1) {
            return;
        }
        var margintop = parseInt(imageLists.css('margin-top').replace("px", "")) || 0;
        margintop = margintop - 65;

        if (-margintop > ($('.crop-aside-imglists').height() - 65)) {
            return;
        }
        imageLists.animate({
            'margin-top': margintop + 'px'
        });
    });

    //设为封面 编辑页面
    $('#set-front').on('click', function() {
        $('#imglistbox .chk').removeClass('checked');
        $('#imglistbox .chk').eq(editIndex).addClass('checked');

    });


    //设为封面 主页面

    imglistbox.on('click', '.chk', function() {
        imglistbox.find('.chk').removeClass('checked');
        $(this).addClass('checked');
    });

    // 重新上传
    FileAPI.event.on($('#reload-img').get(0), 'change', function(evt) {

        var filenew = FileAPI.getFiles(evt);
        FileAPI.filterFiles(filenew, function(file, info) {
            if (/^image/.test(file.type) && file.size < 5 * FileAPI.MB) {
                return true;
            }
            else {
                confirmBox.show("图片大小不能超过5m，并且格式必须为 jpg/gif/png");
                return false;
            }
        }, function(list, other) {
            if (list.length) {
                files[editIndex] = list[0];
                //替换当前裁剪图片
                cropUtil.getCropArea(list[0], cropUtil.config.cropMain, function(c, imgmatrix) {
                    imageLists.children().eq(editIndex).html($(this));
                    files[editIndex].edit = true;
                    pixelwidth.text(Math.floor(imgmatrix.sw) + 'px');
                    pixelheight.text(Math.floor(imgmatrix.sh) + 'px');
                });
                //替换主页面列表图片
                cropUtil.getCenterImage(list[0], imgtoList, function($imgout) {
                    $('#imglistbox').children('.figure-upload').eq(editIndex).find('.figure-upload-img').html($imgout);
                });
                //替换裁剪列表图片
                cropUtil.getDomImage(list[0], imgtoPreview, function($imgout) {
                    $('.crop-aside-imglists').children().eq(editIndex).html($imgout);
                });
            }
        });
    }); //end 重新上传

});

