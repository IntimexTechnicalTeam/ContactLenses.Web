<template>
  <div class="particulars">
    <div class="lens-box">
      <div class="title title1">
        <h2>{{$t('home.LookFor')}}</h2>
        <span class="dot"></span>
      </div>
      <div class="lensBg">
        <img src="/images/pc/lens.png" alt="" class="right-lens" />
        <div class="leftlens">
          <h2>{{$t('home.Obtain')}}</h2>
          <button class="more">{{$t('home.DiscoverMore')}}</button>
        </div>
      </div>
    </div>
    <div class="about">
      <div class="title title2">
        <h2>{{$t('Cms.AboutUS')}}</h2>
        <span class="dot"></span>
      </div>
      <div class="aboutcontent">
        <div class="about-swiper">
          <div class="indexRecommendInner">
          <div class="RecommendBg">
            <swiper :options="swiperOptionT2">
              <swiperSlide v-for="(slide, index2) in banner2" :key="index2">
                <router-link :to="slide.Url"><img :src="slide.Image" /></router-link>
              </swiperSlide>
            </swiper>
            <div class="swiper-pagination" slot="pagination"></div>
        </div>
      </div>
        </div>
        <div class="aboutInformation">
          <p>
            Welcome to Dreimlens Corporation Limited, an advanced Rigid Gas
            Permeable Contact Lens Manufacturer, providing fast and high-quality
            services for ophthalmic and Optometric professionals all over the
            world.
          </p>
          <button class="more">{{$t('home.ReadMore')}}</button>
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
  swiperOptionT2: object = {
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
  };
  el: number = 0;
  getHeaderBannerLst() {
    var _this = this;
    this.$Api.promotion.getPromotion('Home', 2).then((result) => {
      _this.banner2 = result.Promotion._BannerList;
      _this.content2 = result.Promotion._BannerList[0].Content;
    });
  }
  created() {
    this.getHeaderBannerLst();
  }
  get lang() {
    return this.$Storage.get('locale');
  }
}
</script>
<style scoped lang="less">
.particulars{
  width:85%;
  margin:0 auto;
  overflow: hidden;
  text-align: center;
}
.lens-box {
}
.title {
  text-align: center;
  margin:20px auto;
  > h2{
    color:#0e559c;
    font-weight: bold;
    font-size: 2rem;
  }
  > span{
    display: block;
    background: url(/images/mobile/dot.png) center center;
    height: 20px;
  }
}
.title1 {
  width: 20rem;
}
.title2 {
  width: 11rem;
}
.about{
}
.lensBg,
.aboutcontent {
}
.leftlens h2 {
  color: #429cd8;
  font-size: 17px;
  margin:30px auto 50px auto;
}
.lensBg img{
  width: 100%;
}
.more {
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  color: #fff;
  background: #0e579c;
  box-shadow: 5px 5px 8px #bdbdbd;
  margin: 0 auto 30px auto;
  border: none;
  display: block;
}
.about-swiper{
  width:90%;
  margin:0 auto;
    box-shadow: 5px 5px 0px #429bd7;
    .swiper-slide{
      width: 100%!important;
      img{
        width: 100%;
      }
    }
}
.aboutInformation p{
    color: #429cd8;
    font-weight: bold;
    font-size: 17px;
    margin:30px auto;
}
</style>
