<template>
  <div class="banner mobileBanner">
    <transition name="slide">
      <div key="1" v-if="!waiting" style="display:flex;">
        <div class="header-index">
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
          <!-- <swiper :options="swiperOption" v-if="bannerList.length>0 && initSwiper">
            <swiperSlide
              v-for="(slide, index) in bannerList"
              :key="index"
            >
              <a :href="slide.Url || 'javascript:;'" :target="slide.Url ? '_blank' : '_self'">
                <img :src="slide.Image" />
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
          </swiper> -->
          <!-- <img :src="bannerImg" v-else /> -->
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { Message } from 'element-ui';
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
  /* swiperOption: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.cliBtn',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }; */
  getBanner () {
    let _this = this;
    sdk.api.promotion.getHeaderBanner(this.page).then(
      function (data) {
        _this.bannerList = data;
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
.mobileBanner .swiper-pagination-bullet{
  width: 12px!important;
  height: 12px!important;
  background: #fff;
  opacity: 1;
}
.mobileBanner .swiper-pagination-bullet-active{
  background: #666666!important;
}
</style>
<style scoped lang="less">
.faker{
  width: 100vw;
  height: 28.7vw;
  background-color: aliceblue;
}
.picbg {
  width: 100vw;
}
.header-index {
  position: relative;
  background:#fff;
  background-size: 100%;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
}
.header-index .header_mid {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  width: 96%;
  z-index: 999;
}
.header-index .header_mid .big_text {
  overflow: hidden;
  height: 6rem;
}
.header-index .header_mid .big_text_in {
  margin-top: 100px;
  transition: all 1.5s;
}
.header-index .header_mid .big_text_in p {
  font-size: 2.5rem;
  text-align: center;
  color: #fff;
  font-family: "Georgia";
}
.header-index .header_mid .tutor-btn {
  margin: 0 auto;
  width: 55%;
  height: 3rem;
  margin-top: 2.5rem;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
}
.header-index .header_mid .tutor-btn img {
  width: 13%;
}
.header-index .header_mid .tutor-btn a {
  color: #fff;
  line-height: 3rem;
  font-size: 1.4rem;
  text-align: center;
  text-decoration: none;
  /*margin-left:10px;*/
}
.header-index .header_mid .tutor-btn:hover {
  cursor: pointer;
}
.banner {
  width: 100%;
  position: relative;
  margin: 0 auto;

  > img {
    width: 100%;
  }
}
.swiper-container {
  width: 100%;
}
.swiper-pagination {
  text-align: center;
  width: 100%;
  // bottom: 150px;
}
.swiper-container-horizontal
  > .swiper-pagination-bullets.swiper-pagination-bullet {
  margin: 0 8px;
  width: 15px;
  height: 15px;
}

.swiper-slide {
  img {
    width: 100%;
  }
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
