<template>
  <div class="mobile-map-menu">
    <div class="mobile-mapinformation">
        <div class="mobilemap">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.1861947863495!2d114.20403351536899!3d22.384337145494694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040645abb09ba3%3A0x4c46848ccf55c7bd!2sShatin%20Industrial%20Center!5e0!3m2!1szh-TW!2shk!4v1650419025774!5m2!1szh-TW!2shk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="mobile-information">
            <p class="shop_address">{{$t('HkMap.Address')}}</p>
            <p class="shop_tel">852-2648-3338</p>
            <p class="shop_fax">852-2648-7333</p>
            <p class="shop_email">hk@eandeoptics.com</p>
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
.mobile-map-menu{
}
.footer-menu{
  width: 100%;
  margin:0 auto;
}
.footer-menu ul,
.mobile-mapinformation{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.mobile-mapinformation{
  margin:0 auto 50px auto;
  border-top: 2px solid #3ba0d8;
  width: 90%;
  margin:0 auto;
  overflow: hidden;
  .mobilemap{
    width: 100%;
    height: 445px;
    margin: 30px auto;
    iframe{
      width:100%;
    }
  }
  .mobile-information{
    p{
      color: #12549e;
      font-weight: bold;
      font-size: 17px;
      padding-left: 40px;
    }
    p:nth-child(2),
    p:nth-child(3),
    p:nth-child(4){
      height: 50px;
      line-height: 50px;
    }
    .shop_address{
      background: url(/images/pc/address.png) no-repeat left center;
    }
    .shop_tel{
      background: url(/images/pc/phone.png) no-repeat left center;
    }
    .shop_fax{
      background: url(/images/pc/fax.png) no-repeat left center;
    }
    .shop_email{
      background: url(/images/pc/Email-filled.png) no-repeat left center;
    }
  }
}
</style>
