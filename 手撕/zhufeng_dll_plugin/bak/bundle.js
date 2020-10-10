(function (modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }
  return __webpack_require__("./src/index.js");
})
  ({
    "./node_modules/_isarray@2.0.5@isarray/index.js":
      (function (module, exports, __webpack_require__) {
        module.exports = (__webpack_require__("dll-reference _dll_utils"))("./node_modules/_isarray@2.0.5@isarray/index.js");
      }),
    "./src/index.js":
      (function (module, exports, __webpack_require__) {debugger
        let isarray = __webpack_require__("./node_modules/_isarray@2.0.5@isarray/index.js");
        console.log('isarray([1,2,3])', isarray([1, 2, 3]));
      }),
    "dll-reference _dll_utils":
      (function (module, exports) {
        module.exports = window._dll_utils;//utils.dll.js文件里的__webpack_require__
      })
  });