<template>
  <div class="PromotionMain">
    <!-- AD1 -->
    <div class="InnerSide">
      <div class="main">
        <div class="title title1">
          <span>{{$t('home.Choices')}}<div :class="lang === 'E' ? 'eSpot' : ''"></div></span>
        </div>
        <div class="swiperBg swipermain">
          <button class="s1-btn s1-next">&lt;</button>
          <div class="swiper_banner">
            <swiper :options="swiperOptionT1">
            <!-- slides -->
            <swiperSlide v-for="(slide, index1) in banner1" :key="index1">
              <router-link :to="'/product/detail/'+slide.Sku"
                ><img :src="slide.Img"
              /></router-link>
            </swiperSlide>
          </swiper>
          </div>
          <button class="s1-btn s1-prev">&gt;</button>
        </div>
      </div>
      <!-- AD2 -->
      <!-- <div class="main">
                <div class="RecommendText">{{Title2}}</div>
                <div class="swiperBg">
                <swiper :options="swiperOptionT2">
                  <swiperSlide v-for="(slide, index2) in banner2" :key="index2">
                    <router-link :to="slide.Url"><img :src="slide.Image" /></router-link>
                  </swiperSlide>
                </swiper>
                </div>
                <p class="content">{{content2}}</p>
            </div> -->

      <!-- AD3 -->
      <!-- <div class="main">
                  <div class="RecommendText">{{Title3}}</div>
                  <div class="swiperBg">
                  <swiper :options="swiperOptionT3" >
                    <swiperSlide v-for="(slide, index3) in banner3" :key="index3">
                      <router-link :to="slide.Url"><img :src="slide.Image" /></router-link>
                    </swiperSlide>
                  </swiper>
                  </div>
                <p class="content">{{content3}}</p>
            </div> -->
      <button class="btn btn-success" @click="ToProduct()">{{$t('home.Shop')}}</button>
    </div>
    <!-- 限时大平卖 -->
    <!-- <div class="SalesMain">
          <HkHotProduct />
    </div> -->
    <HkLens />
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    /* HkHotProduct: () => import('@/components/hkTasteBusiness/mobile/home/HkHotProduct.vue'), */
    HkLens: () => import('@/components/hkTasteBusiness/mobile/home/HkLens.vue'),
    swiper,
    swiperSlide
  }
})
export default class HkPromotion extends Vue {
  banner1: any[] = [];
  /* banner2: any[] = [];
  banner3: any[] = []; */
  /* content1:string=''; */
  /* content2:string='';
  content3:string=''; */
  /* Title1:string=''; */
  /* Title2:string='';
  Title3:string=''; */
  current: boolean = false;
  swiperOptionT1: object = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.s1-next',
      prevEl: '.s1-prev'
    },
    slidesPerView: 2,
    slidesPerColumn: 2,
    spaceBetween: 10
  };
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
  };
  swiperOptionT3: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.s3-next',
      prevEl: '.s3-next'
    }
  }; */
  el: number = 0;
  getHeaderBannerLst() {
    var _this = this;
    this.$Api.promotion.getPromotion('Home', 1).then((result) => {
      // _this.banner1 = result.Promotion._BannerList;
       _this.banner1 = result.Promotion._PrmtProductList;
      /* _this.Title1 = result.Promotion.Desc; */
      /* _this.content1 = result.Promotion._BannerList[0].Content; */
    });
    /* this.$Api.promotion.getPromotion('Home', 2).then(result => {
      _this.banner2 = result.Promotion._BannerList;
      _this.Title2 = result.Promotion.Desc;
      _this.content2 = result.Promotion._BannerList[0].Content;
    });
    this.$Api.promotion.getPromotion('Home', 3).then(result => {
      _this.banner3 = result.Promotion._BannerList;
      _this.Title3 = result.Promotion.Desc;
      _this.content3 = result.Promotion._BannerList[0].Content;
    }); */
  }
  get lang() {
    return this.$Storage.get('locale');
  }
  ToProduct () {
    this.$router.push('/product/cat/23');
  }
  created() {
    this.getHeaderBannerLst();
  }
}
</script>
<style lang="less" scoped>
.RecommendText {
  background: #4d4d4d;
  color: #fff;
  border: 2px solid #999999;
  display: block;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}
.PromotionMain {
  background-size: 100% 100%;
  display: inline-block;
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 2rem;
  margin-top: -0.5rem;
  position: relative;
  .SalesMain {
    width: 90%;
    margin: 0 auto;
    .hotTitle {
      width: 100%;
      background: url("/images/mobile/mobileIndex_04.png") center 0 no-repeat;
      height: 6rem;
      margin: 0 auto;
      background-size: contain;
    }
    .hotTitleE {
      width: 100%;
      background: url("/images/pc/bigsales.png") center 0 no-repeat;
      height: 6rem;
      margin: 0 auto;
      background-size: contain;
    }
  }
  .InnerSide {
    width: 95%;
    margin: 0 auto;
    .main {
      margin-bottom: 2rem;
      .title {
        text-align: center;
        margin: 20px auto;
        > span {
          color: #0e559c;
          font-weight: bold;
          font-size: 2rem;
          display: inline-block;
          div {
            width:100%;
            height: 20px;
            background: url(/images/mobile/spot.png) center center;
            display: inline-block;
          }
          .eSpot{
            background: url(/images/mobile/spot.png) 0 center;
          }
        }
      }
      .content {
        font-size: 2rem;
        text-align: center;
        color: #806339;
      }
      .titilBg {
        width: 100%;
        display: inline-block;
        img {
          width: 100%;
        }
      }
      .swiperBg {
        background-size: 100% 100%;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .swiper_banner{
          position: absolute;
          width: 60%;
          overflow: hidden;
          left:22%;
          top:120px;
        }
        .s1-btn {
          width: 5rem;
          height: 5rem;
          border: none;
          font-size: 35px;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #0e579c;
          background-color: #f3f3f3;
          border-radius: 50%;
          padding: 0;
        }
        img {
          width: calc(100% - 2px);
          border: 1px solid #4d4d4d;
        }
      }
    }
  }
}
.swiper-container {
  width: 100%;
  position: relative;
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
  width: 9rem !important;
  height: 9rem !important;
  img {
    width: 100%;
  }
}
.btn-success {
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
</style>
<style lang="less">
.swipermain {
  height: 220px;
  .swiper-wrapper {
    width: 100%;
    /* height: 230px; */
  }
}
.PromotionMain{
  .InnerSide{
     .main{
       height: 300px;
       .swipermain{
         a{
           width: 100%;
           height: 100%;
           display: block;
           img{
            border: none!important;
            height: 100%;
            }
          }
        }
      }
    }
  }
</style>
