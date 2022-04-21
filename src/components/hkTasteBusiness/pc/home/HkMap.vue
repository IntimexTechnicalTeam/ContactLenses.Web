<template>
  <div class="map-menu">
    <div class="footer-menu">
      <component :navData="NavData" v-bind:is="CurrentNav" class="footermenuul"></component>
    </div>
    <div class="mapinformation">
        <div class="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.1861947863495!2d114.20403351536899!3d22.384337145494694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040645abb09ba3%3A0x4c46848ccf55c7bd!2sShatin%20Industrial%20Center!5e0!3m2!1szh-TW!2shk!4v1650419025774!5m2!1szh-TW!2shk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
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
        'navLayout1': () => import('@/components/business/pc/header/InsNavLayout1.vue'), // 非遞歸組件
        'navLayout2': () => import('@/components/business/pc/header/InsNavLayout2.vue') // 遞歸組件
    }
})
export default class InsMenu extends Vue {
    @Prop({ default: 'header' }) private type!: string;
    CurrentNav: string = 'navLayout2';

    get NavData () {
      if (this.type === 'header') {
        return this.$store.state.headerMenus;
      } else {
        return this.$store.state.footerMenus;
      }
    }

    mounted () {
      var _this = this;
      // api
      //   .getMenuData(2)
      //   .then((res: any) => {
      //     this.NavData = res.data.requestDetail;
      //     this.$store.dispatch('setMenuData', this.NavData);
      //     console.log(res, '请求返回数据');
      //   })
      //   .catch((err: any) => {
      //   // 请求失败后的处理函数
      //     console.log(err);
      //   });

      // this.$store.dispatch('setMenuData', this.NavData);
    }
}
</script>
<style scoped lang="less">
.footer-menu{
    width: 1200px;
    margin:0 auto;
    border-top: 2px solid #3ba0d8;
    padding-top: 30px;
}
.footer-menu ul,
.mapinformation{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.mapinformation{
    width: 1100px;
    margin:100px auto 50px auto;
}
.map{
    width: 600px;
    height: 600px;
    overflow: hidden;
}
.information{
    width: 400px;
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
