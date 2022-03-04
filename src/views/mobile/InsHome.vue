<template>
  <div class="home" v-cloak>
    <HomeBanner :page="'Home'" />
    <HkPromotion />
    <HkBranch />
    <HkLiveBox v-if="FrontE.version !== 1" />

    <div class="activity" v-if="FrontE.version !== 1 && FrontE.calendar">
      <div class="TitleBg"><div class="innerBox">{{$t('home.Activity')}}</div></div>
      <ins-full-calendar />
      <!-- <ins-calendar /> -->
    </div>

    <InsBaiduMap :lng="113.090191" :lat="22.601079" markText="markText" v-if="AreaCode === 'CN'" />

    <div class="map-main googleMap" v-else>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.524633715289!2d114.15097431550411!3d22.333810985306158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400ad2b69d883%3A0x7c2d810e7fef31f0!2sIntimex+Business+Solutions+Co.%2C+Ltd.!5e0!3m2!1sen!2shk!4v1476954339617" width="100%" height="500" frameborder="0" style="border:0" allowfullscreen=""></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    HomeBanner: () => import('@/components/base/mobile/InsBanner.vue'),
    HkPromotion: () => import('@/components/hkTasteBusiness/mobile/home/HkPromotion.vue'),
    HkBranch: () => import('@/components/hkTasteBusiness/mobile/home/HkBranch.vue'),
    HkLiveBox: () => import('@/components/hkTasteBusiness/mobile/home/HkLiveBox.vue'),
    InsFullCalendar: () => import('@/components/business/mobile/home/InsFullCalendar.vue'),
    InsCalendar: () => import('@/components/business/mobile/home/InsCalendar.vue'),
    InsBaiduMap: () => import('@/components/business/mobile/promotion/InsBaiduMap.vue')
  }
})
export default class InsHome extends Vue {
  swiperOption: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };

  get AreaCode () {
    return localStorage.getItem('AreaCode') || '';
  }
}
</script>

<style lang="less" scoped>
/deep/ .banner {
  .swiper-pagination-bullet{
    width: 12px!important;
    height: 12px!important;
    background: #fff;
    opacity: 1;
  }

  .swiper-pagination-bullet-active{
    background: #666666!important;
  }
}

.activity {
  width: 90%;
  margin: 5rem auto;

  .TitleBg{
    width: 90%;
    height: 5rem;
    border:1px solid #4d4d4d;
    margin: 0 auto;
    padding: .5rem;
    margin-bottom: 4rem;
    .innerBox{
      width: 100%;
      height: 100%;
      background:#4d4d4d;
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      font-family: 'Arial';
    }
  }
}

.ins-calendar {
  margin: 2rem auto;
}
</style>
