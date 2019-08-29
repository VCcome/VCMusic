<template>
  <scroll :data="data" class="list-view" ref="listScroll" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
    <ul>
      <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.items" :key="index" class="list-group-item" @click="select(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item" :class="{'current':currentIndex===index}" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">{{item}}
        </li>
      </ul>
    </div>
    <loading v-show="!data.length"></loading>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll';
import Loading from '@/base/loading/loading';

import { getData } from 'common/js/dom';
import { setTimeout } from 'timers';

const ANCHOR_HEIGHT = 18; // 右边字母快捷方式的高度，根据每一块设定的字体大小和padding计算得到

export default {
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0 // 当前左侧列表的索引————对应右侧快捷菜单的索引
    };
  },
  computed: {
    shortcutList() { // 右边字母快捷方式数据
      return this.data.map((group) => {
        return group.title.substr(0, 1);
      });
    }
  },
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = []; // 记录左边列表每个区间的累计高度
    this.probeType = 3; // BScroll配置：可以监听不节流滚动
  },
  watch: {
    data() {
      setTimeout(() => {
        this.calculateHeight();
      }, 20); // 20毫秒（经验值）后DOM渲染完成
    },
    scrollY(newY) { // watch滚动高度，获取当前列表的索引
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      const listHeight = this.listHeight;
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = parseInt(getData(e.target, 'index'));
      this.touch.anchorIndex = anchorIndex; // 快捷菜单的锚点索引
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0; // 滚动的快捷菜单（字母）个数
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      // console.log(anchorIndex, this.listHeight);
      this.scrollTo(anchorIndex);
    },
    select(item) {
      this.$emit('select', item);
    },
    scroll(pos) {
      this.scrollY = pos.y; // 滚动高度
    },
    scrollTo(index) { // BScrll的滚动到元素（scrollToElement）函数
      // if (index >= 0 && index <= this.listHeight.length - 2) {} // 只有快捷菜单才执行，快捷菜单的顶部和底部空白区域不执行
      if (!index && index !== 0) { // 边界条件处理
        return;
      }
      if (index < 0) {
        index = 0;
      }
      if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      // this.scrollY = -this.listHeight[index];
      this.currentIndex = index; // 比上面的方法好，不会促发watch
      this.$refs.listScroll.scrollToElement(this.$refs.listGroup[index], 0);
    },
    calculateHeight() { // 计算左边列表每个区间的累计高度
      this.listHeight = []; // 记录左边列表每个区间的累计高度
      const list = this.$refs.listGroup; // 左边列表的DOM
      let height = 0;
      this.listHeight.push(height); // index=0时的高度设置为0, listHeight存的数组个数比元素个数多1个
      for (let i = 0; i < list.length; i++) {
        let item = list[i]; // 得到DOM的children
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "common/scss/variable";

.list-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
