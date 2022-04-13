<template>
  <div class="map-menu">
    <div class="mapinformation">
        <div class="map"></div>
        <div class="information">
            <p class="shop_address">Unit 7, G/F, Block B, Sha Tin Industrial Centre, Sha Tin, Hong Kong</p>
            <p class="shop_tel">(852) 2648 3338</p>
            <p class="shop_email">info@dreimlens@gmail.com</p>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    components: {
        Menu: () => import('@/components/business/mobile/header/InsElMenu.vue')
    }
})
export default class InsMenuLayout extends Vue {
  showMemNav: boolean = false;
  searchKey: string = '';

  handleOpen (key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose (key, keyPath) {
    console.log(key, keyPath);
  }

  closeSlideMenu () {
    this.$store.dispatch('isShowMenu', false);
  }

  searchFun (key) {
    this.$store.dispatch('setSearchKey', key);
    if (key !== '') {
      this.$router.push({
        path: '/product/search',
        name: 'productSearch',
        params: {
          key: key
        }
      });
      this.$store.dispatch('isShowMenu', !this.$store.state.isShowMenu);
    } else {
      this.$router.push({
        path: '/product/search/-'
      });
      this.$store.dispatch('isShowMenu', !this.$store.state.isShowMenu);
    }
  }

  get user () {
    return this.$store.state.user;
  }

  get isLogin () {
    return this.$store.state.isLogin;
  }
}
</script>
<style scoped lang="less">
.map-menu{
}
.footer-menu{
  width: 100%;
  margin:0 auto;
}
.footer-menu ul,
.mapinformation{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.mapinformation{
  margin:0 auto 50px auto;
  border-top: 2px solid #3ba0d8;
  width: 90%;
  margin:0 auto;
}
.map{
    background: url(/images/pc/google_map.png) no-repeat center center;
    width: 100%;
    height: 445px;
    margin: 30px auto;
}
.information{
}
.information p{
    color: #12549e;
    font-weight: bold;
    font-size: 17px;
    height: 30px;
    line-height: 30px;
    padding-left: 40px;
}
.shop_address{
    background: url(/images/pc/address.png) no-repeat left center;
}
.shop_tel{
    background: url(/images/pc/phone.png) no-repeat left center;
    margin:80px 0;
}
.shop_email{
    background: url(/images/pc/Email-filled.png) no-repeat left center;
}
</style>
