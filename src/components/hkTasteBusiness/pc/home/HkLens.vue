<template>
  <div class="particulars">
    <div class="lens-box">
      <div class="title">
        <span>{{$t('home.LookFor')}}</span>
      </div>
      <div class="lensBg">
        <div class="leftlens">
          <span>{{$t('home.Obtain')}}</span>
          <button class="more" @click="MoreProduct()">{{$t('home.DiscoverMore')}}</button>
        </div>
        <div class="right-lens-img">
          <img src="/images/pc/lens.jpg" alt="" class="right-lens" />
        </div>
      </div>
    </div>
    <div class="about" id="about">
      <div class="title">
        <span>{{$t('Cms.AboutUS')}}</span>
      </div>
      <div class="aboutcontent">
        <div class="about-swiper">
          <div class="indexRecommendInner">
            <div class="RecommendBg">
              <div class="aboutImg" @mouseover="changeInt(true)" @mouseleave="changeInt(false)">
                <router-link v-for="(slide, index2) in banner2" :key="index2" :to="slide.Url" v-show="index2 === currentIndex2"><img :src="slide.Image" /></router-link>
              </div>
              <div class="about-circle">
                <ul>
                  <li @click="imgChange(index2)" v-for="(slide, index2) in banner2" :key="index2" :class="index2 === currentIndex2 ? 'change' : ''"></li>
                </ul>
              </div>
              <!-- <swiper :options="swiperOptionT2" v-if="banner2.length > 0">
                <swiperSlide v-for="(slide, index2) in banner2" :key="index2">
                  <router-link :to="slide.Url"><img :src="slide.Image" /></router-link>
                </swiperSlide>
              </swiper>
              <div class="swiper-pagination" slot="pagination"></div> -->
          </div>
        </div>
      </div>
        <div class="aboutInformation">
          <p>{{$t('home.MoreText')}}</p>
          <button class="more" @click="readMore()">{{$t('home.ReadMore')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    swiper,
    swiperSlide
  }
})
export default class HkPromotion extends Vue {
  banner2: any[] = [];
  content2: string = '';
  current: boolean = false;
  currentIndex2 = 0;
  timer2: any = null;
  /* swiperOptionT2: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.s2-next',
      prevEl: '.s2-next'
    }
  }; */
  el: number = 0;
  getHeaderBannerLst() {
    var _this = this;
    this.$Api.promotion.getPromotion('Home', 2).then((result) => {
      _this.banner2 = result.Promotion._BannerList;
      _this.content2 = result.Promotion._BannerList[0].Content;
    });
  }
  startImg() {
    clearInterval(this.timer2);
    this.timer2 = setInterval(() => {
      this.currentIndex2++;
      if (this.currentIndex2 > this.banner2.length - 1) {
        this.currentIndex2 = 0;
      }
    }, 3000);
  }
  imgChange(index2) {
    this.currentIndex2 = index2;
  }
  changeInt(val) {
    if (val) {
      clearInterval(this.timer2);
    } else {
      this.startImg();
    }
  }
  created() {
    this.getHeaderBannerLst();
    this.startImg();
  }
  get lang() {
    return this.$Storage.get('locale');
  }
  readMore () {
    this.$router.push('/CMS/content/20295');
  }
  MoreProduct () {
    this.$router.push('/product/cat/23');
  }
}
</script>
<style scoped lang="less">
.lens-box {
  margin-top: 50px;
}
.title {
  font-size: 33px;
  color: #0e579c;
  margin: 0 auto;
  font-weight: bold;
  text-align: center;
  span{
    /* padding-bottom: 10px;
    background: url(/images/pc/spot.png) center 33px repeat-x; */
    border-bottom: 10px dotted #429bd7;
    padding-bottom: 10px;
  }
}
.about{
  margin-top: 50px;
}
.lensBg,
.aboutcontent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
}
.leftlens{
  width:500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.leftlens span {
  width: 379px;
  color: #429bd7;
  line-height: 35px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 30px;
}
.more {
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  color: #fff;
  background: #0e579c;
  box-shadow: 5px 5px 8px #bdbdbd;
  margin: 30px auto;
  border: none;
  display: block;
}
.right-lens-img{
  width:600px;
  img{
    width:100%;
  }
}
.about-swiper{
    width: 670px;
    height: 450px;
}
.indexRecommendInner{
  box-shadow: 5px 5px 0px #429bd7;
}
.RecommendBg{
  position: relative;
  .aboutImg{
    a{
      display: block;
      width: 100%;
      height: 100%;
      img{
        width:100%;
        height: 100%;
      }
    }
  }
  .about-circle {
    position: absolute;
    bottom: -25px;
    width:100%;
    text-align: center;
    ul {
      width:100%;
      height: 20px;
      text-align: center;
      li{
        display: inline-block;
        width: 9px;
        height: 9px;
        margin: 0 5px;
        border-radius: 7px;
        border: 1px solid #075796;
        cursor: pointer;
      }
      .change{
        background-color: #075796;
      }
    }
  }
}
.swiper-slide img{
    width: 670px;
}
.aboutInformation p{
    width: 379px;
    color: #429bd7;
    line-height: 35px;
    font-weight: bold;
    letter-spacing:2px;
    margin-bottom: 30px;
}
.swiper-pagination{
  margin:10px auto;
  right: 50%;
  left: 0;
}
</style>
<style lang="less">
.about{
  .swiper-pagination{
    .swiper-pagination-bullet{
      width: 10px!important;
      height: 10px!important;
      margin-left: 10px;
      background: #fff;
      border:1px solid #075796;
      opacity: 1;
    }
    .swiper-pagination-bullet:nth-child(1){
      margin-left: 0;
    }
    .swiper-pagination-bullet-active{
      background: #075796;
    }
  }
}
</style>
