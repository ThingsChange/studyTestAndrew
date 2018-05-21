var ImgCropUtil = function(config) {

    var imgos = config.imgos;
    var cropMain = config.cropMain;
    var imgPreviewWidth = config.imgPreviewWidth;
    var ratio = 0;

    function getRatio(imgorigin, imgafter) {
        return imgafter.width / imgafter.height > imgorigin.width / imgorigin.height ? imgafter.height / imgorigin.height : imgafter.width / imgorigin.width;
    }

    function getWrapPaddings(image, imagewrapper) {
        return {
            'padding-top': (imagewrapper.height - image.matrix.dh) / 2,
            'padding-left': (imagewrapper.width - image.matrix.dw) / 2
        };
    }

    function getWrapPaddingsFull(image, imagewrapper) {
        return {
            'padding-top': (imagewrapper.height - image.matrix.dh) / 2,
            'padding-bottom': (imagewrapper.height - image.matrix.dh) / 2,
            'padding-left': (imagewrapper.width - image.matrix.dw) / 2,
            'padding-right': (imagewrapper.width - image.matrix.dw) / 2
        };
    }


    /**
     * 使用jcrop裁剪
     * @param {type} file
     * @param {type} $imgwrap 要建材的包裹img对象
     * @param {type} callback 回调 @param domimg , jcrop c object , image.matrix
     * @returns {undefined}
     */
    function getCropArea(file, $imgwrap, callback) {
        FileAPI.getInfo(file, function(err, info) {
            var image = FileAPI.Image(file);
            ratio = getRatio(info, imgos);
            image.matrix.dw = info.width * ratio;
            image.matrix.dh = info.height * ratio;
            cropMain.css(getWrapPaddingsFull(image, imgos));

            image.get(function(error, img1) {
                if (error) {
                    alert("图片读取出错！");
                    // return;
                }

                $imgwrap.empty();
                $('<div />').appendTo($imgwrap)
                    .html($(img1))
                    .Jcrop({
                        onSelect: function(c) {
                            image.matrix.sx = c.x / ratio;
                            image.matrix.sy = c.y / ratio;
                            image.matrix.sw = c.w / ratio;
                            image.matrix.sh = c.h / ratio;
                            var r = c.h / c.w;
                            image.matrix.dw = imgPreviewWidth;
                            image.matrix.dh = imgPreviewWidth * r;
                            image.get(function(error, domimg) {
                                //  $('<div class="padding-top-10"></div>').appendTo(imageLists).html($(domimg));
                                callback.call(domimg, c, image.matrix);
                                file.cropMatrix = $.extend(true, {}, image.matrix);
                                file.cropMatrix.dw = 0;
                                file.cropMatrix.dh = 0;
                            });

                        }
                    });//end jcrop
            }); //end get

        });  //end getInfo
    }

    /**
     * 生成居中的图像
     * @param {FileAPI.image} fileapi的 file 对象
     * @param  {width: *, height: *} 要生成的宽和高
     * @param {function} callback回调 @param $imgobj
     * @returns {undefined}  异步方法，不返回值
     */
    function getCenterImage(file, imgtoList, callback) {
        var $imagewrap;
        FileAPI.getInfo(file, function(err, info) {

            var r = getRatio(info, imgtoList);
            var img = FileAPI.Image(file);

            img.matrix.dw = info.width * r;
            img.matrix.dh = info.height * r;

            img.get(function(error, domimg) {
                if (error) {
                    alert("图片读取出错！");
                    // return;
                }
                // $imagewrap = $('<div />').css( getWrapPaddingsFull(img,imgtoList)).append($(domimg));
                $imagewrap = $('<div />').append($(domimg).css({
                    'width': img.matrix.dw,
                    'height': img.matrix.dh,
                    'display': 'block'
                })).css(getWrapPaddingsFull(img, imgtoList));
                callback($imagewrap);
            });

        });
    }
    /**
     * 生成居中的img图像 ,注意设置传入img的matrix对象 sw和sh值
     * @param {FileAPI.image} fileapi的image对象
     * @param  {width: *, height: *} 要生成的宽和高
     * @param {function} callback回调 @param $imgobj
     * @returns {undefined} 异步方法，不返回值
     */
    function getCenterCropImage(img, imgtoList, callback) {
        var $imagewrap;
        var info = {width: img.matrix.sw, height: img.matrix.sh};
        var r = getRatio(info, imgtoList);
        //var img = FileAPI.Image(file);

        img.matrix.dw = info.width * r;
        img.matrix.dh = info.height * r;

        img.get(function(error, domimg) {
            if (error) {
                alert("图片读取出错！");
                return;
            }
            // $imagewrap = $('<div />').css( getWrapPaddingsFull(img,imgtoList)).append($(domimg));
            $imagewrap = $('<div />').append($(domimg).css({
                'width': img.matrix.dw,
                'height': img.matrix.dh,
                'display': 'block'
            })).css(getWrapPaddingsFull(img, imgtoList));
            callback($imagewrap);
        });

    }

    /**
     * 生成原始img图像，有一层div包裹
     * @param {FileAPI.file}  fileapi的file对象
     * @param  {width: *, height: *}  imgtoList 要生成的宽和高
     * @param {function} callback回调 @param $imgobj
     * @returns {undefined} 异步方法，不返回值
     */

    function getDomImage(file, imgtoList, callback) {
        var $imagewrap;
        FileAPI.getInfo(file, function(err, info) {
            var r = getRatio(info, imgtoList);
            var img = FileAPI.Image(file);

            img.matrix.dw = info.width * r;
            img.matrix.dh = info.height * r;

            if (imgtoList.height === 0) {
                img.matrix.dw = imgtoList.width;
                img.matrix.dh = imgtoList.width * info.height / info.width;
            }

            if (imgtoList.width === 0) {
                img.matrix.dw = imgtoList.height;
                img.matrix.dh = imgtoList.height * info.width / info.height;
            }

            img.get(function(error, domimg) {
                if (error) {
                    alert("图片读取出错！");
                    return;
                }
                $imagewrap = $('<div />').append($(domimg));
                callback($imagewrap);
            });

        });
    }

    function recurseIterate(array, callback) {
        recurseIterate.i = recurseIterate.i || 0;
        if (i >= array.length) {
            return;
        }
        callback();

    }



    return {
        getCropArea: getCropArea,
        getCenterImage: getCenterImage,
        config: config,
        getDomImage: getDomImage,
        getCenterCropImage: getCenterCropImage

    };
};