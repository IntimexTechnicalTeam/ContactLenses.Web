<template>
 <div id="footer">
    <div class="mobile-mapinformation">
        <div class="mobilemap">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.1861947863495!2d114.20403351536899!3d22.384337145494694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040645abb09ba3%3A0x4c46848ccf55c7bd!2sShatin%20Industrial%20Center!5e0!3m2!1szh-TW!2shk!4v1650419025774!5m2!1szh-TW!2shk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="mobile-information">
            <p class="shop_address">{{$t('HkMap.Address')}}</p>
            <p class="shop_tel">+852 26372000</p>
            <p class="shop_fax">+852 26374000</p>
            <p class="shop_email">hk@eandeoptics.com</p>
        </div>
    </div>
    <div class="footerBottom">
      <ul v-for="(n,index) in footerMenus" :key="index" class="firstmenu" @click="showSecond(index)">
        <li>
          <router-link
            :to="n.Type === 0 ? n.Url : n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 ? '/product/CatProduct?catId=' + n.Value.Id : n.Type === 5 ? '/product/list?key=&attr=' + n.Value.Id : '/product/list?key=&attr=' + n.ParentId + '&attrId=' + n.Value.Id"
          >{{n.Name}}<span class="open-icon"></span></router-link>
          <ul class="secondmenu">
            <li v-for="(c,index2) in n.Childs" :key="index2">
                <router-link :to="To(c)">{{c.Name}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="footer-box">
      <p>Copyright {{currentYear}} | Dreimlens Corporation LTD | Powered by Eventizer Limited</p>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class InsFooter extends Vue {
  currentYear: number = 0;
  clickIndex: number = 0;
  footerMenus: any[] = [];
  showMeun (item, index) {
    $('.sub' + index).slideToggle();
  }
  closeSlideMenu (n) {
    this.$store.dispatch('isShowMenu', false);
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
  }
  created () {
    var date = new Date();
    this.currentYear = date.getFullYear();
    this.getMenu();
  }
  @Watch('$route', { deep: true })
  onIdChange () {
    $('.submeunMain').hide();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.submeunMain{
  display: none;
}
.SubMeun0{
  display: none;
}
.SubMeun1{
  display: none;
}
#footer{
  width: 100%;
  background-size: cover;
  display: inline-block;
  .footer-box{
    width: 90%;
    margin: 1rem auto 1rem auto;
    >p{
      width:100%;
      margin: 0 auto;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      color: #0d57a0;
    }
  }
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
.footerBottom{
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .firstmenu{
    line-height: 3rem;
    width: 100%;
    li{
      width: 100%;
      background: #0e579c;
      text-align: center;
      a{
        font-size: 18px;
        color:#fff;
        font-weight: bold;
        /* display: block; */
        /* width:100%; */
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .open-icon{
          display: none;
        }
      }
      .router-link-exact-active{
        /* background-color: #0e579c; */
        .open-icon{
          width: 20px;
          height: 20px;
          display: block;
          background: url(/images/mobile/open.png) right center no-repeat;
          background-size: contain;
          margin-left: 1rem;
        }
      }
    }
    .secondmenu{
      display: none;
    }
    .menuBlock{
    display: block;
  }
  }
}
}

</style>
