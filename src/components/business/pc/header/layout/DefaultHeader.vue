<template>
<div class="header-layout"  v-cloak>
  <div class="headerBg">
      <div class="headerTop">
        <!-- logo开始 -->
        <div class="logoBox">
            <a href="/"><img src="/images/pc/Tailor-logo.png"></a>
        </div>
        <!-- logo结束 -->
        <div class="inner">
            <!-- 会员登陆开始 -->
            <InsLogin class="memberLogin"></InsLogin>
            <!-- 会员登陆结束 -->
            <!-- 切换语言开始 -->
            <!-- <CodeSelect v-if="FrontE.version !== 1" /> -->
            <div class="langBox">
                <InsLangSwitch></InsLangSwitch>
            </div>
            <!-- 切换语言结束 -->
            <!-- 购物车开始 -->
              <Shopcart class="memberLogin"></Shopcart>
              <!-- 购物车结束 -->
            <!-- 搜索框开始 -->
            <div class="search-box">
                <!-- <el-select v-model="searchType" placeholder="please select">
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->

                <div class="search-input">
                  <input type="text" v-model="key" @keyup.enter="search" />
                  <span class="searchBtn" @click="search"></span>
                </div>
            </div>
            <!--搜索框结束  -->
            <!-- 我的喜爱开始 -->
            <!-- <div class="cartTop">
                <router-link to="/account/MyFavorite">
                        <i class="handle-icon fav-icon"></i>
                </router-link>
            </div> -->
            <!-- 我的喜爱结束 -->
            <!-- 购物车开始 -->
            <!-- <Shopcart class="memberLogin"></Shopcart> -->
            <!-- 购物车结束 -->
        </div>
      </div>
      <!-- 导航栏开始 -->
      <Menu />
      <!-- 导航栏结束 -->
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    Menu: () =>
      import('@/components/business/pc/header/InsMenu.vue'),
    Shopcart: () =>
      import('@/components/business/pc/header/InsShoppingCart.vue'),
    InsLogin: () =>
      import('@/components/business/pc/header/InsLogin.vue'),
    InsLangSwitch: () =>
      import('@/components/business/pc/header/InsLangSwitch.vue'),
    CodeSelect: () =>
      import('@/components/business/pc/header/InsCodeSelect.vue')
  }
})
export default class DefaultHeader extends Vue {
  @Prop() private showInFixed!: boolean;

  private key: string = '';

  private typeList: any[] = [{
    value: 0,
    label: 'Product'
  }, {
    value: 1,
    label: 'CMS'
  }];

  private searchType: number = 0;

  getMenu () {
    this.$Api.promotion
      .getMenu()
      .then(result => {
        this.$store.dispatch('setHeaderMenus', result.ReturnValue.HeaderMenus);
        this.$store.dispatch('setFooterMenus', result.ReturnValue.FooterMenus);
      })
      .catch(error => {
        console.log(error);
      });
  }

  search () {
    switch (this.searchType) {
      case 0:
        this.searchPro();
        break;
      case 1:
        this.searchCms();
        break;
    }
  }

  searchPro () {
    this.$store.dispatch('setSearchKey', this.key);
    if (this.key !== '') {
      this.$router.push({
        path: '/product/search',
        name: 'productSearch',
        params: {
          key: this.key
        }
      });
    } else {
      this.$router.push({
        path: '/product/search/-'
      });
    }
  }

  searchCms () {
    this.$router.push({
      path: '/cms/search',
      name: 'cmsSearch',
      params: {
        key: this.key
      }
    });
  }

  get currentlang () {
    return this.$i18n.locale;
  }
  private changLange (lang) {
    this.$Api.member
      .setUILanguage(lang)
      .then(result => {
        this.$i18n.locale = lang;
        localStorage.setItem('locale', lang);
        this.Reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  created () {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
  }

  mounted () {
    this.getMenu();
  }
}
</script>

<style scoped lang="less">
.showMenuYes{
  height:151px;
  transition:all 1s;
}
#header{
  z-index: 9999;
  top:0px;
  width: 100%;
  display: flex;
}
.headerBg{
   width: 100%;
   background:#fff;
   background-size: cover;
   display: inline-block;
   box-shadow: 0 0 10px 0 #d4d5d1;
}
.headerTop{
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: auto;
}
.logoBox{
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.logoBox a{
    display: flex;
}
.logoBox a img{
   width: 100%;
}

.inner{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:50%;
}

.memberLogin{
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 10px;
}
.cartTop{
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 10px;
}
.langBox{
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
}
.langBox a{
   color:#323232;
   font-size: 14px;
    line-height: 32px;
    width: 40px;
    display: inline-block;
    text-align: center;
}
.langBox a:nth-child(2){
    margin-right: 0px!important;
}
.langActive{
    background: #808080;
    color:#FFF!important;
}

.fav-icon {
    background: url('/images/pc/pcindex_08.png') no-repeat center center;
    display: inline-block;
    width: 25px;
    height: 25px;
    background-size: contain;
}

// new css
.header-layout {
 /deep/ .header_menu {
   width:1200px;
   margin: 30px auto 10px;
   > ul {
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     align-items: center;
     flex-wrap: nowrap;
     > li {
      display: flex;
      align-items: center;
      position: relative;
      width:106px;

      > a {
        width: 100%;
        font-size: 16px;
        color: #000;
        display: block;
        text-align: center;
        font-weight: 500;
        text-transform: uppercase;
        padding: 10px 5px;
      }

      &:hover{
        > a  {
          background: #429cd8;
          color: #fff;
        }
      }

      ul {
        box-shadow: 0 0 5px #ccc;

        li {
          border: 0;
          > a {
            font-size: 18px;
            color: #429cd8;
            display: block;
            text-align: center;
            font-weight: 500;
            text-transform: uppercase;
            padding: 10px 5px;
          }

          &:hover{
             > a {
              background: #429cd8;
              color: #fff;
            }
          }
        }
      }
     }
     > .eLi{
       width:auto;
     }
   }
 }
}

.search-box {
  display: flex;
  align-items: center;

  /deep/ .el-select {
    width: 100px;

    .el-input__inner {
      height: 34px;
      line-height: 34px;
      border-radius: 0;
    }

    .el-input__icon {
      line-height: 34px;
    }
  }

  .search-input {
    width: 340px;
    display: flex;
    align-items: center;
    margin-right: 20px;
    border-radius: 14px;
    box-shadow: 5px 5px 8px #c1c1c1;
    padding: 5px 0;

    > input {
      width: 305px;
      border:none;
      background: transparent;
      line-height: 30px;
      text-indent: 10px;
      outline: 0;
      border-right: 2px solid #0e559c;
    }

    .searchBtn{
      width: 50px;
      height: 25px;
      display: inline-block;
      background: url('/images/pc/pcindex_03.png') no-repeat center center;
      cursor: pointer;
      background-size: 55%;
    }
  }
}
</style>
