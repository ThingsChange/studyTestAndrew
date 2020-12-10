<template>
  <section>
  <div class="container">
    <button class="liti-button" @click="showDetail('session')">session缓存</button>
    <button class="liti-button" @click="showDetail('local')">local缓存</button>
    <button class="liti-button" @click="showDetail('cookie')">cookie缓存</button>
    <div class="info-wrap" v-if="sessionType">
      <p class="user-info">相关信息</p>
      <p class="session-detail">{{sessionStr}}</p>
    </div>
    <div class="clear-button">
      <button class="liti-button" @click="clearCache(sessionType)">清除 <span style="color: red">{{sessionType}}</span> </button>
      <button class="liti-button clearAll" @click="clearCache">一键清除缓存</button>
    </div>
  </div>
  </section>
</template>

<script>
import MessageBox from '../../components/MessageBox';
import { Bridge } from '../../helpers/index';

const { closeWindow } = Bridge;
export default {
  data() {
    return {
      sessionStr: '',
      sessionType: ''
    }
  },
  mounted() {
  },
  methods: {
    showDetail(type) {
      const sMap = {
        session: sessionStorage,
        local: localStorage,
        cookie: document.cookie
      }
      this.sessionStr = JSON.parse(JSON.stringify(sMap[type]))
      this.sessionType = type
    },
    clearLocal() {
      localStorage.clear();
    },
    clearCookie() {
      this.delAllCookie();
    },
    clearCache(type) {
      if (type === 'session') {
        sessionStorage.clear()
        this.sessionStr = sessionStorage
        return
      }
      if (type === 'local') {
        localStorage.clear();
        this.sessionStr = localStorage
        return
      }
      if (type === 'cookie') {
        this.delAllCookie();
        this.sessionStr = document.cookie
        return
      }
      if (!type) {
        sessionStorage.clear()
        localStorage.clear();
        this.delAllCookie();
      }
      MessageBox.alert('清除成功', '提示').then(() => {
        closeWindow.exec();
      });
    },
    // 删除cookie中所有定变量函数
    delAllCookie() {
      const date = new Date();
      date.setTime(date.getTime() - 10000);
      const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (let i = keys.length; i--;) document.cookie = `${keys[i]}=; expire=${date.toGMTString()}; path=/`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .container { background: #272727; color: white; }
}
/* 浅色模式 */
@media (prefers-color-scheme: light) {
  .container { background: white; color: #333; }
}
.info-wrap{
  filter: invert(1) hue-rotate(.5turn);
}
.clear-button{
  display: flex;
  margin-top: 1rem;
  width: 50vw;
  justify-content: space-between;
}
  .info-wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
  .session-detail{
    border: 1px solid yellowgreen;
    padding: .5rem;
    max-height: 10rem;
    overflow: auto;
    max-width: 90%;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .container{
    display: flex;
    /*justify-content: center;*/
    /*align-items: center;*/

    /*flex-direction: column;*/
    /*flex-flow: column;*/
    height: 100vh;
    box-sizing: border-box;
    align-items: flex-start;
    padding-top:1rem;
    flex-wrap:wrap;
    justify-content: space-around;
  }
  .liti-button {
    /*position: absolute;*/
    top: 50%;
    left: 50%;
    width: 2.5rem;
    outline: none;
    border: none;
    color: white;
    padding: 0.3rem 0.1rem;
    border-radius: 0.2rem;
    cursor: pointer;
    background: linear-gradient(#3de5fb, #26acbd);
    text-shadow: 0 1px 1px grey;
    /*位置的三个参数
            1  X轴方向扩散，负值在左，正值在右
            2 Y轴方向扩散，正值向下，负值向上
            3 模糊半径   0时不模糊，就正常的阴影，越大越模糊 类似0实体阴影，数值大的变成了模糊阴影
            4，颜色可放在这三个数字前面，也可以放在这三个数字后面，这四个参数为一组，可以设置多组。
            */
    box-shadow: 0 0.2rem 0 #068494, 0 0.2rem 0.2rem grey;
  }
  .liti-button:active {
    box-shadow: 0 0.1rem 0 #068494, 0 0.1rem 0.1rem grey;
    transform: translate(0, 0.05rem);
  }
</style>
