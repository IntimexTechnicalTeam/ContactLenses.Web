<template>
  <div class="particulars">
    <div class="mobile-lens-box">
      <div class="title title1">
        <span>{{$t('home.LookFor')}}<div :class="lang === 'E' ? 'espot' : ''"></div></span>
      </div>
      <div class="lensBg">
        <img src="/images/pc/lens.png" alt="" class="right-lens" />
        <div class="leftlens">
          <span>{{$t('home.Obtain')}}</span>
          <button class="more" @click="MoreProduct()">{{$t('home.DiscoverMore')}}</button>
        </div>
      </div>
    </div>
    <div class="about">
      <div class="title title2">
        <span>{{$t('Cms.AboutUS')}}<div :class="lang === 'E' ? 'espot' : ''"></div></span>
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
              <!-- <swiper :options="swiperOptionT2">
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
  > span{
    color:#0e559c;
    font-weight: bold;
    font-size: 2rem;
    display: inline-block;
    div{
      width:100%;
      height: 20px;
      background: url(/images/mobile/spot.png) 0 center;
      display: inline-block;
    }
    .espot{
      background: url(/images/mobile/spot.png) center center;
    }
  }
}
.about{
}
.lensBg,
.aboutcontent {
}
.leftlens span {
  color: #429cd8;
  font-size: 17px;
  margin:30px auto 50px auto;
  font-weight: bold;
  display: block;
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
  margin: 30px auto 30px auto;
  border: none;
  display: block;
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
.swiper-pagination{
  left:50%;
  margin-top:1rem;
}
</style>
