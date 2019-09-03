<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist">
      <ul>
        <li class="item" v-for="(item, index) in topList" :key="index">
          <div class="icon">
            <img v-lazy="item.frontPicUrl" width="110" height="110" />
          </div>
          <ul class="songlist">
            <h3 class="topic-tit ">{{item.title}}</h3>
            <li class="song" v-for="(song, songIndex) in item.song" :key="songIndex">
              <span>{{songIndex+1}}</span>
              <span>{{song.title}} - {{song.singerName}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { getRankList } from 'api/rank';

import Scroll from '@/base/scroll/scroll';

export default {
  components: {
    Scroll
  },
  data() {
    return {
      topList: []
    };
  },
  mounted() {
    getRankList().then(res => {
      // console.log(res);
      let group = res.group;
      group.forEach(item => {
        this.topList.push(...item.toplist);
      });
    });
  }
};
</script>

<style scoped lang="scss">
@import "common/scss/variable";
@import "common/scss/mixin";

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .toplist {
    height: 100%;
    overflow: hidden;

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 110px;

      &:last-child {
        padding-bottom: 20px;
      }

      .icon {
        flex: 0 0 110px;
        width: 100px;
        height: 110px;
      }

      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 110px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-ll;
        font-size: $font-size-medium;

        .topic-tit {
          font-size: $font-size-medium-x;
          font-weight: 500;
          margin-bottom: 5px;
          margin-top: 8px;
        }

        .song {
          @include no-wrap();
          line-height: 26px;
        }
      }
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