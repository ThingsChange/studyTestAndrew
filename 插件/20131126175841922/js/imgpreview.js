/**
 * Created by wanglijun on 2016/9/2.
 */
function imgPreview(config) {
    var width = config.width || 200;
    var height = config.height || 200;

    return {
        /**
         * ie9- 预览图片
         * @param {type} input_file ,$('input[type=file]') 或者 $('input[type=file]')[0]
         * @param {type} callback 回掉参数为，$(居中的图片)
         * @returns {interval}
         */
        iePreview: function(input_file, callback) {
            $(input_file).select();
            $(input_file).blur();
            var src = document.selection.createRange().text;
            if (/.+\.(jpg|gif|png)$/.test(src) === false) {
                alert('not image!');
                return;
            }

            var imgitem = $('<div></div>').appendTo('body');
            var f = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "' , sizingMethod= 'image' )";
            imgitem.css({
                filter: f,
                display: 'none',
                width: '1px',
                height: '1px'
            });

            var itval = setInterval(function() {
                    var w = imgitem.width();
                    if (w !== 1) {
                        window.clearInterval(itval);
                        var boxWidth = width;
                        var boxHeight = height;

                        var zoom = imgPreview.calcZoom({
                            boxWidth: boxWidth,
                            boxHeight: boxHeight,
                            imgWidth: imgitem.width(),
                            imgHeight: imgitem.height()
                        });

                        var fn = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "' , sizingMethod= 'scale' )";
                        var out = $('<div></div>').css(zoom).css({
                            'filter': fn,
                            display: 'block'
                        });
                        callback(out);
                        imgitem.remove();
                    }
                },
                16);
        },
        /**
         * html5 objecturl 预览
         * @param {type} input_file ,$('input[type=file]') 或者 $('input[type=file]')[0]
         * @param {type} callback 回掉参数为，$(居中的图片)
         * @returns {undefined}
         */
        canvasPreview: function(input_file, callback) {
            var files = $(input_file).prop('files');
            $.each(files,
                function(index, val) {
                    var img = new Image();
                    img.src = window.URL.createObjectURL(val);
                    img.onload = function() {
                        window.URL.revokeObjectURL(img.src);
                        var boxWidth = width;
                        var boxHeight = height;

                        var zoom = imgPreview.calcZoom({
                            boxWidth: boxWidth,
                            boxHeight: boxHeight,
                            imgWidth: img.naturalWidth,
                            imgHeight: img.naturalHeight
                        });
                        //var canvas = document.createElement( 'canvas' );
                        //canvas.width = parseInt(zoom.width);
                        //canvas.height = parseInt(zoom.height);
                        //
                        //var ctx = canvas.getContext("2d");
                        //ctx.drawImage(img, 0,0,canvas.width, canvas.height);
                        //var out = $(canvas).css(zoom);
                        //canvas裸压缩成像质量太差，如果要高质量压缩请参考 https://github.com/mailru/FileAPI
                        var out = $(img).css(zoom);
                        callback(out);
                    };
                });
        },
        preview: function() {
            if (document.body.filters) {
                this.iePreview.apply(this, arguments);
            } else if (window.HTMLCanvasElement) {
                this.canvasPreview.apply(this, arguments);
            }
        }
    };
}

imgPreview.calcZoom = function(param) {
    var boxw = param.boxWidth;
    var boxh = param.boxHeight;
    var imgw = param.imgWidth;
    var imgh = param.imgHeight;

    var out = {
        width: '0px',
        height: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px'
    };

    if (boxw / boxh > imgw / imgh) {
        out.height = boxh;
        out.width = imgw / imgh * boxh;
        out.marginLeft = (boxw - out.width) / 2;
        out.marginRight = boxw - out.marginLeft - out.width;
    } else {
        out.width = boxw;
        out.height = imgh / imgw * boxw;
        out.marginTop = (boxh - out.height) / 2;
        out.marginBottom = boxh - out.marginTop - out.height;
    }
    return out;
};
