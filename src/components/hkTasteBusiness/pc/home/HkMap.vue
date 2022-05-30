<template>
  <div class="map-menu">
    <div class="footer-menu">
      <component :navData="NavData" v-bind:is="CurrentNav" class="footermenuul"></component>
    </div>
    <div class="mapinformation">
        <div class="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.1861947863495!2d114.20403351536899!3d22.384337145494694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040645abb09ba3%3A0x4c46848ccf55c7bd!2sShatin%20Industrial%20Center!5e0!3m2!1szh-TW!2shk!4v1650419025774!5m2!1szh-TW!2shk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="pc-information">
            <p class="shop_address">{{$t('HkMap.Address')}}</p>
            <p class="shop_tel">+852 26372000</p>
            <p class="shop_fax">+852 26374000</p>
            <p class="shop_email">hk@eandeoptics.com</p>
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
.footer-menu ul{
  flex-wrap: nowrap;
}
.mapinformation{
    width: 1100px;
    margin:100px auto 50px auto;
}
.map{
    width: 600px;
    height: 450px;
    overflow: hidden;
}
.pc-information{
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.pc-information p{
    color: #12549e;
    font-weight: bold;
    font-size: 17px;
    padding-left: 50px;
    margin-bottom: 30px;
}
.pc-information p:nth-child(2),
.pc-information p:nth-child(3),
.pc-information p:nth-child(4){
  height: 50px;
  line-height: 50px;
}
.shop_address{
    background: url(/images/pc/address.png) no-repeat left center;
    width:344px!important;
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
</style>
