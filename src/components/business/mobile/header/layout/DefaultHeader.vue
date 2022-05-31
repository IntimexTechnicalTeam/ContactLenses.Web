<template>
    <div class="header-box">
      <!-- <div class="headerTop">
          <ins-fav  />
          <shopcart class="shoppingcart" />
          <CodeSelect class="header-code" />
          <ins-lang-switch class="headerLang" />
      </div> -->
        <div class="flex-box">
          <img class="slide-menu" src="/images/mobile/Mobile-index_05.png" @click="showSlideMenu" v-show="!this.$store.state.isShowMenu" />
          <img class="close-meun" src="/images/mobile/out.png" @click="showSlideMenu" v-show="this.$store.state.isShowMenu"  />
        <ins-logo />
        <ins-login />
        <div class="search">
          <img src="/images/mobile/pcindex_03.png" @click="showSearch" class="searchbtn">
        </div>
        <div class="searchbox" v-show="searchBlock">
            <input type="text" v-model="searchKey" />
            <span class="search_btn"  @click="searchFun(searchKey)"><img src="/images/mobile/pcindex_03.png"></span>
        </div>
        <!-- <ins-menu /> -->
        <!-- <ins-menu :layout="1" /> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    InsLogo: () => import('@/components/base/mobile/InsLogo.vue'),
    InsLangSwitch: () => import('@/components/business/mobile/header/InsLangSwitch.vue'),
    InsLogin: () => import('@/components/business/mobile/header/InsLogin.vue'),
    InsFav: () => import('@/components/business/mobile/header/InsFav.vue'),
    InsMenu: () => import('@/components/business/mobile/header/InsMenu.vue'),
    CodeSelect: () =>
      import('@/components/business/mobile/header/InsCodeSelect.vue')
  }
})
export default class DefaultHeader extends Vue {
  @Prop() private showInFixed!: boolean;
  searchKey: string = '';
  searchBlock = false;

  showSearch () {
    /* let isShow = !JSON.parse(JSON.stringify(this.menuShow));
    this.$store.dispatch('isShowMenu', isShow); */
    if (this.searchBlock) {
      this.searchBlock = false;
    } else {
      this.searchBlock = true;
    }
  }

  showSlideMenu () {
    let isShow = !JSON.parse(JSON.stringify(this.menuShow));
    this.$store.dispatch('isShowMenu', isShow);
  }

  get menuShow () {
    return this.$store.state.isShowMenu;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
  get ShopCart () {
    return this.$store.state.shopCart;
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
  created() {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
  }
   @Watch('$route', { deep: true })
    onRouteChange (n, o) {
      this.$store.dispatch('isShowMenu', false);
      this.searchBlock = false;
    }
}
</script>

<style scoped lang="less">
    .header-box {
      .flex-box {
        height: 7rem;
        background-color: @positive_color;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;

        .logo {
          width: 15rem;
          margin: 0 auto 0 3rem;
        }

        .slide-menu {
          cursor: pointer;
          width: 3rem;
        }
        .close-meun {
          cursor: pointer;
          width: 2.5rem;
        }
      }
    }
.headerTop{
  width: 100%;
  display: flex;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  flex-wrap: wrap;
  .shoppingcart{
      padding-left: 1rem;
      padding-right: 1rem;
      float: left;
      height: 3.5rem;
      border-right: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .headerLang{
    width:20%;
    border-left: 1px solid #e6e6e6;
    position: absolute;
    right: 0px;
    height: 3.5rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-code{
    width:20%;
    border-left: 1px solid #e6e6e6;
    position: absolute;
    right: 25%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.shoppingcart {
  margin:0 0.5rem;
}
.searchbox{
  width: 100%;
  position: absolute;
  z-index: 99999;
  top:7rem;
  left:0;
  background: #fff;
  border-radius: 15px;
  padding: .5rem 0;
  height: 3rem;
  line-height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  input{
    width: 80%;
    border:none;
    height: 3rem;
    line-height: 3rem;
  }
  .search_btn{
    width: 3rem;
    height: 3rem;
    padding-left: .5rem;
    border-left: 2px solid #0e559c;
    img{
      width:100%;
    }
  }
}
</style>
