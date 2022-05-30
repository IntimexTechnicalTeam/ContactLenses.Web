<template>
  <div class="home" v-cloak>
    <HomeBanner :initOptions="swiperOption" :page="'Home'" :initSwiper="true" class="banner" />
    <div class="content-box">
    <HkPromotion />
    <!-- <HkBranch /> -->
    <HkLiveBox />
    <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    HomeBanner: () => import('@/components/base/mobile/InsBanner.vue'),
    HkPromotion: () => import('@/components/hkTasteBusiness/mobile/home/HkPromotion.vue'),
    HkLiveBox: () => import('@/components/hkTasteBusiness/mobile/home/HkLiveBox.vue'),
    // HkMap: () => import('@/components/hkTasteBusiness/mobile/home/HkMap.vue')
    Footer: () => import('@/components/hkTasteBusiness/mobile/home/HkMap.vue')
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
}
</script>

<style lang="less" scoped>
.banner {
  // min-height: 100vh;
  background-color: white;
}
.content-box{
  background: url(/images/mobile/mobile_background.jpg) no-repeat center center;
  background-size: cover;
}
</style>
