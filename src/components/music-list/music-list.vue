<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" ref="bgImage" :style="bgStyle">
      <!-- bg-image撑开空间,长宽比例10：7：width：100%; height: 0; padding-top: 70%; -->
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" :style="playStyle" class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <!-- 高斯模糊层 -->
      <!-- <div class="filter" ref="filter"></div> -->
    </div>
    <div class="bg-layer" ref="layer" :style="layerStyle"></div>
    <scroll @scroll="scroll" :data="songs" :probe-type="probeType" :listen-scroll="listenScroll" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
    <loading v-show="!this.songs"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '@/base/scroll/scroll';
import Loading from '@/base/loading/loading';
import SongList from '@/base/song-list/song-list';

const RESERVED_HEIGHT = 40; // 滚动覆盖时顶部预留高度

export default {
  components: {
    Scroll,
    Loading,
    SongList
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollY: 0
    };
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight; // bg高度
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT; // 跟随滚动的遮罩层的最小滚动距离(负值)
    this.$refs.list.$el.style.top = `${this.imageHeight}px`; // 设置歌曲列表的top值————bg高度
  },
  computed: {
    playStyle() {
      let display = '';
      if (this.scrollY < this.minTranslateY) {
        display = 'none';
      }
      return `display: ${display}`;
    },
    bgStyle() {
      let zIndex = 0;
      let paddingTop = '70%';
      let height = 0;
      let scale = 1;
      const scalePercent = Math.abs(this.scrollY / this.imageHeight);
      if (this.scrollY < this.minTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = RESERVED_HEIGHT + 'px';
      }
      if (this.scrollY > 0) { // 向下拉
        scale = 1 + scalePercent;
      }
      let style = `background-image: url(${this.bgImage}); 
      z-index: ${zIndex}; padding-top: ${paddingTop}; height: ${height};
      transform: scale(${scale}); 
      webkit-transform: scale(${scale})`;
      return style;
    },
    layerStyles() { // 设置跟随滚动的遮罩层滚送距离
      let translateHeight = Math.max(this.minTranslateY, this.scrollY); // minTranslateY&scrollY为负数
      return `transform: translate3d(0, ${translateHeight}px, 0); 
      webkit-transform: translate3d(0, ${translateHeight}px, 0);
      `;
    },
    layerStyle: {
      get() {
        let translateHeight = Math.max(this.minTranslateY, this.scrollY); // minTranslateY&scrollY为负数
        return `transform: translate3d(0, ${translateHeight}px, 0); webkit-transform: translate3d(0, ${translateHeight}px, 0);
      `;
      },
      set() {
      }
    }
  },
  watch: {
    scrollY(newY) {
      // 用computed代替watch————layerStyle()、bgStyle()
      // let translateHeight = Math.max(this.minTranslateY, newY);
      // this.$refs.layer.style.transform = `translate3d(0, ${translateHeight}px, 0)`;
      // let zIndex = 0;
      // if (this.scrollY < this.minTranslateY) {
      //   zIndex = 10;
      //   this.$refs.bgImage.style.paddingTop = 0;
      //   this.$refs.bgImage.style.height = RESERVED_HEIGHT + 'px';
      // } else {
      //   this.$refs.bgImage.style.paddingTop = '70%';
      //   this.$refs.bgImage.style.height = 0;
      // }
      // this.$refs.bgImage.style.zIndex = zIndex;
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    scroll(pos) {
      this.scrollY = pos.y; // return滚动距离
    }
  }
};
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;

    .song-list-wrapper {
      z-index: -1;
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>