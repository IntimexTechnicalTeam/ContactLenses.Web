<template>
  <div class="banner pcbanner">
    <transition name="slide">
      <div key="1" v-if="!waiting" style="display:flex;">
        <div class="showImg" @mouseover="changeInterval(true)" @mouseleave="changeInterval(false)">
          <a :href="slide.Url || 'javascript:;'" :target="slide.Url ? '_blank' : '_self'" v-for="(slide, index) in bannerList" :key="index" v-show="index === currentIndex">
            <img :src="slide.Image">
          </a>
          <div class="banner-circle">
            <ul>
              <li @click="changeImg(index)" v-for="(slide, index) in bannerList" :key="index" :class="index === currentIndex ? 'active' : ''"></li>
            </ul>
          </div>
        </div>
        <!-- <div class="swiperbg">
          <swiper :options="swiperOption" v-if="initSwiper && bannerList.length >0">
            <swiperSlide
              v-for="(slide, index) in bannerList"
              :key="index"
              class="swiper-container-indexMain"
            >
            <a :href="slide.Url || 'javascript:;'" :target="slide.Url ? '_blank' : '_self'">
              <img :src="slide.Image"/>
            </a>
            </swiperSlide>
            <div class="swiper-pagination cliBtn" slot="pagination"></div>
            <div
              class="swiper-button-prev"
              slot="button-prev"
              v-if="swiperOption.navigation && swiperOption.navigation.nextEl"
            ></div>
            <div
              class="swiper-button-next"
              slot="button-next"
              v-if="swiperOption.navigation && swiperOption.navigation.prevEl"
            ></div>
          </swiper>
        </div> -->
      </div>
    </transition>
    <transition name="slide">
      <div class="faker" key="2" v-if="waiting" v-loading="true">
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { Message, Loading } from 'element-ui';
import animate from 'animate.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
// banner组件通信传值设定：
// initOptions：swiper初始化相关参数
// page：getHeaderBanner的传参
// initSwiper：是否为轮播，默认非轮播
// data：自定义banner数据

@Component({ components: { swiper, swiperSlide } })
export default class InsBanner extends Vue {
  private waiting: boolean = true;
  @Prop() private initOptions!: object;
  @Prop({ default: '' }) private page!: string;
  @Prop({ default: false }) private initSwiper!: boolean;
  @Prop() private data!: any;
  bannerList: object[] = [];
  bannerImg: string = '';
  isload: boolean = false;
  currentIndex = 0;
  timer: any = null;
 /*  swiperOption: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.cliuBtn',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }; */

  // get swiper () {
  //   return this.$refs.mySwiper.swiper;
  // }

  getBanner () {
    let _this = this;
    sdk.api.promotion.getHeaderBanner(this.page).then(
      function (data) {
        _this.bannerList = data;
        _this.bannerImg = data[0].Image;
        _this.waiting = false;
      },
      function (data) {
        Message({
          message: data,
          type: 'error'
        });
      }
    );
  }
  startInterval() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex > this.bannerList.length - 1) {
        this.currentIndex = 0;
      }
    }, 4000);
  }

  changeImg(index) {
    this.currentIndex = index;
  }

  changeInterval(val) {
    if (val) {
      clearInterval(this.timer);
    } else {
      this.startInterval();
    }
  }

  created () {
    /* if (this.initOptions) {
      this.swiperOption = this.initOptions;
    } */
  }

  mounted () {
    // if (this.bannerList.length === 1) {
    // 只有1个slide，swiper会失效且隐藏切换按钮
    // this.swiper.destroy(false);
    // }
    if (this.page) {
      this.getBanner();
    } else {
      this.waiting = false;
      if (this.initSwiper) {
        this.bannerList = this.data;
        this.isload = true;
      } else {
        if (typeof this.data === 'object') {
          this.bannerImg = this.data[0].Image;
        } else if (typeof this.data === 'string') {
          this.bannerImg = this.data;
        }
      }
    }
    this.startInterval();
  }
}
</script>
<style lang="less">
.pcbanner .swiper-pagination-bullet{
  width: 12px!important;
  height: 12px!important;
  border:1px solid #fff;
  background: none;
  opacity: 1;
}
.pcbanner .swiper-pagination-bullet-active{
  background: #fff!important;
}
</style>
<style scoped lang="less">
.pcbanner{
  min-width: 1200px;
  min-height: 28.7vw;
}
.swiperbg {
  width: 100%;
  background:#FFF;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

}
.swiper-container-indexMain img {
  width: 100%;
  /* height: 100%; */
  /* min-height: 28.7vw; */
}
.faker{
  width: 100vw;
  height: 28.7vw;
  background-color: aliceblue;
}
</style>

<style lang="less" scoped>
.showImg{
  width:100%;
  overflow: hidden;
  position: relative;
  a{
    display: block;
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .banner-circle ul{
    position: absolute;
    bottom: 0;
    width:100%;
    height: 20px;
    text-align: center;
    li{
      display: inline-block;
      width: 14px;
      height: 14px;
      margin:0 5px;
      border-radius: 7px;
      background-color: #fff;
      cursor: pointer;
    }
    .active{
      background-color: rgba(125, 125, 125, .8);
    }
  }
}
</style>
