<template>
  <div class="particulars">
    <div class="lens-box">
      <div class="title">
        <span>{{$t('home.LookFor')}}</span>
      </div>
      <div class="lensBg">
        <div class="leftlens">
          <span>{{$t('home.Obtain')}}</span>
          <button class="more">{{$t('home.DiscoverMore')}}</button>
        </div>
        <img src="/images/pc/lens.png" alt="" class="right-lens" />
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
  readMore () {
    this.$router.push('/CMS/content/20295');
  }
}
</script>
<style scoped lang="less">
.lens-box {
  margin-top: 50px;
}
.title {
  font-size: 30px;
  color: #0e579c;
  margin: 0 auto;
  font-weight: bold;
  text-align: center;
  span{
    border-bottom: 8px dotted #3f9ed8;
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
.leftlens span {
  color: #0d579e;
  width: 367px;
  font-size: 30px;
  line-height: 40px;
  margin-bottom: 50px;
}
.more {
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  color: #fff;
  background: #0e579c;
  box-shadow: 5px 5px 8px #bdbdbd;
  margin: 0 auto;
  border: none;
  display: block;
}
.about-swiper{
    width: 670px;
    height: 450px;
}
.indexRecommendInner{
  box-shadow: 5px 5px 0px #429bd7;
}
.swiper-container{
  height: 370px;
}
.swiper-slide img{
    width: 670px;
    height: 372px;
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
