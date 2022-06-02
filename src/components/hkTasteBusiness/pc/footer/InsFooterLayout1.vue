<template>
<div id="footer" class="footer">
  <div class="footbg">
    <div class="footerMain">
        <div class="footerBottom">
          <div class="footerTop">
              <ul v-for="(n,index) in footerMenus" :key="index" class="firstmenu" @mouseenter.stop="showSecond(index)" @mouseleave.stop="hideSecond(index)">
                <li>
                  <router-link
                    :to="n.Type === 0 ? n.Url : n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 ? '/product/CatProduct?catId=' + n.Value.Id : n.Type === 5 ? '/product/list?key=&attr=' + n.Value.Id : '/product/list?key=&attr=' + n.ParentId + '&attrId=' + n.Value.Id"
                  >{{n.Name}}</router-link>
                  <ul class="secondmenu">
                    <li v-for="(c,index2) in n.Childs" :key="index2">
                       <router-link :to="To(c)">{{c.Name}}</router-link>
                    </li>
                  </ul>
                </li>
             </ul>
          </div>
        </div>
    </div>
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
  <span class="currentyear">Copyright {{currentYear}} © Dreimlens Corporation LTD | Powered by Eventizer Limited
    <a href="https://eventizer.hk/" target="_blank">
    </a>
  </span>
</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InsFooterLayout1 extends Vue {
  currentYear: number = 0;
  footerMenus: any[] = [];
  goToTop () {
    let sTop = document.documentElement.scrollTop;
    let times = setInterval(() => {
      sTop -= 50;
      if (sTop <= 0) {
        document.documentElement.scrollTop = 0;
        clearInterval(times);
      } else {
        document.documentElement.scrollTop = sTop;
      }
    }, 1);
  }
  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 && !this.$store.state.catMenuType ? '/product/cat/' + n.Value.Id : n.Type === 4 && this.$store.state.catMenuType ? '/product/search/-?catalogs=' + JSON.stringify([parseInt(n.Value.Id)]) + '&type=0' : n.Type === 5 ? '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.Value.Id), Vals: [] }]) + '&type=0' : '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.ParentId), Vals: [parseInt(n.Value.Id)] }]) + '&type=0';
  }
  getMenu () {
    this.$Api.promotion.getMenu().then((result) => {
      this.footerMenus = result.ReturnValue.FooterMenus;
    });
  }
  showSecond (index) {
    var menu = document.querySelectorAll('.firstmenu');
    var secondMenu = menu[index].getElementsByClassName('secondmenu')[0];
    if (this.footerMenus[index].Childs.length > 0) {
      if (secondMenu.className === 'secondmenu') {
        secondMenu.className = 'secondmenu menuBlock';
      } else {
        secondMenu.className = 'secondmenu';
      }
    }
    console.log('111');
  }
    hideSecond (index) {
    var menu = document.querySelectorAll('.firstmenu');
    var secondMenu = menu[index].getElementsByClassName('secondmenu')[0];
    if (this.footerMenus[index].Childs.length > 0) {
      if (secondMenu.className === 'secondmenu') {
        secondMenu.className = 'secondmenu';
      } else {
        secondMenu.className = 'secondmenu';
      }
    }
    console.log('111');
  }
  created () {
    var date = new Date();
    this.currentYear = date.getFullYear();
    this.getMenu();
  }
}
</script>

<style scoped lang="less">
/* 底部文件 */

.footer{
  width:1200px;
  margin:0 auto;
  border-top: 2px solid #429cd8;
  text-align: center;
  padding: 20px 0;
}
.footerTop{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width:1200px;
  margin: 0 auto;
  .firstmenu{
    margin-left: 1rem;
    line-height: 30px;
    text-align: center;
    position: relative;
    width: 15%;
    &:nth-child(1){
      margin-left: 0;
    }
    a{
      font-size: 16px;
      color:#0e559c;
      font-weight: bold;
      width:100%;
      display: block;
      padding-top: 10px;
      padding-bottom: 10px;
      &:hover{
        background: #0e559c;
        color:#fff;
      }
    }
  }
  .secondmenu{
    display: none;
    position: absolute;
    z-index:99999;
    background: #fff;
    width: 100%;
  }
  .menuBlock{
    display: block;
  }
}
.currentyear{
    color: #1254a0;
    font-weight: bold;
    font-size: 18px;
    width: 100%;
    display: inline-block;
    padding-top: 10px;
    border-top: 2px solid #429cd8;
}
.mapinformation{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 1100px;
    margin:30px auto 50px auto;
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
    width:261px!important;
    text-align: left;
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
