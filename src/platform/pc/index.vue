<template>
  <div>
    <Header v-show="routerPath!=='/building'" />
    <router-view></router-view>
    <!-- <HkMap /> -->
    <Footer v-show="routerPath!=='/building'"/>
    <Sidebar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    Header: () => import(/* webpackChunkName: "main" */ '@/components/business/pc/header/InsHeader.vue'),
    Footer: () => import('@/components/hkTasteBusiness/pc/footer/InsFooterLayout1.vue'),
    Sidebar: () => import(/* webpackChunkName: "main" */ '@/components/business/pc/header/InsSidebar.vue')
    // HkMap: () => import('@/components/hkTasteBusiness/pc/home/HkMap.vue')
  }
})
export default class pcIndex extends Vue {
  get routerPath() {
    return this.$route.path;
  }
}
</script>

<style lang="less" scoped>
</style>
