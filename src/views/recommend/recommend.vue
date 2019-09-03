<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" class="needsclick" :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" :key="item.dissid" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <loading v-show="!discList.length"></loading>
  </div>
</template>

<script>
import Slider from '@/base/slider/slider';
import Scroll from '@/base/scroll/scroll';
import Loading from '@/base/loading/loading';
import { _getRecommend, _getDiscList } from 'api/recommend';
import { playlistMixin } from 'common/js/mixin';

export default {
  mixins: [playlistMixin],
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created() {
    this.getRecommend();
    this.getDiscList();
    // 测试接口
    // this.$http.get('/baidu?h=dkjf');
    // this.$http.get('/getSingerList?-=getUCGI2941480161451777&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D');
    // this.$http.get('getRankList?-=getUCGI7808212081466872&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A4%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%222019-08-27%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D');
    // let vKeyUrl = '/getVKey';
    // let vKeyUrl = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
    // this.$http.get(vKeyUrl, {
    //   params: {
    //     g_tk: 195219765,
    //     jsonpCallback: '',
    //     loginUin: '', // 可以传空值
    //     hostUin: 0,
    //     format: 'json',
    //     inCharset: 'utf8',
    //     outCharset: 'utf-8',
    //     notice: 0,
    //     platform: 'yqq',
    //     needNewCode: 0,
    //     cid: 205361747,
    //     callback: '',
    //     uin: '', // 可以传空值
    //     songmid: '002qpjAV2lYx81',
    //     filename: 'C400002qpjAV2lYx81.m4a',
    //     guid: 5527834659
    //   }
    // }).then(res => {
    //   console.log(res);
    // });
  },
  methods: {
    getRecommend() { // 获取推荐页轮播图数据
      _getRecommend().then(res => {
        // console.log(res.slider);
        this.recommends = res.slider;
      });
    },
    getDiscList() { // 获取歌单列表
      _getDiscList().then(res => {
        // console.log(res.list);
        this.discList = res.list;
      });
    },
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true;
        this.$refs.scroll.refresh();
      }
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '';
      this.$nextTick(() => {
        this.$refs.recommend.style.bottom = bottom;
        this.$refs.scroll.refresh();
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "common/scss/variable";

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
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