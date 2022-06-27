<template>
<div class="productDetailWarper PcVersion">
  <div v-if="this.Permission == 3" class="IsDetailshow">
     {{$t('messageTips.NoProduct')}}
  </div>
  <div v-else>
  <div class="productDetail_container">
    <div class="ProductUp">
          <div class="prev" @click="getGetProductUp()"><img src="/images/pc/pleft.png"></div>
          <div class="next" @click="getGetProductDown()"><img src="/images/pc/pright.png"></div>
      </div>
    <div class="productDetail_main">
      <inPreview style="width:50%" :imgList="ImgList" :pageNum="userAgent === 'mobile' ?  1 : 4" :ProductTitleName="ProductTitleName"></inPreview>
      <div style="width:30%;margin-left:5%;float:right;">
          <PkProductInfo :panelDetail.sync="PanelDetail"  :ProductSku="ProductCode" width="100%" :AddPrice="getNewsPrice" style="margin-top:4rem;margin-bottom: 2rem;"></PkProductInfo>
          <inPanel :panelDetail.sync="PanelDetail" :ProductSku="ProductCode" @getPrice="showPrice" width="100%"></inPanel>
      </div>
    </div>
    <!-- <PkProductDetailCate :source="ExtAttrList" :cateTree="CatalogTree"  width="100%" style="margin-top:2rem;"></PkProductDetailCate> -->
    <div class="productDetail">
      <h1 class="product_info">{{ $t("product.ProductInformation") }}</h1>
      <div class="detail-header">
        <div class="detail-products detail-title">{{ $t("product.Products") }}</div>
        <div class="detail-parameter detail-title">{{ $t("product.Parameter") }}</div>
      </div>
      <div class="detailHtml" v-html="Detail"></div>
    </div>
  </div>
    <div class="commentsLine"></div>
    <div class="maincontent">
    <inYouWouldLike
      styla="margin-bottom:50px;"
      :pageNum="4"
      :title="$i18n.t('product.youWouldLike')"
      :ProductSku="ProductCode"
    ></inYouWouldLike>
    </div>
    </div>

</div>

</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inTab from '@/components/business/pc/product/InsTab.vue';
import inYouWouldLike from '@/components/business/pc/product/InsYouWouldLike.vue';
import YouWouldLike from '@/model/youWouldLike';
import PanelDetail from '@/model/PanelDetail';
import inPanel from '@/components/hkTasteBusiness/pc/product/InsPanel.vue';
import inPreview from '@/components/business/pc/product/InsPreviewN.vue';
import inProductUpOrDown from '@/components/business/pc/product/InsProductUpOrDown.vue';
import ProductAttr from '@/model/ProductAttr';
import Tab from '@/model/Tab';
import inComments from '@/components/business/pc/product/InsComments.vue';
import PkProductDetailCate from '@/components/hkTasteBusiness/pc/product/HkProductDetailCate.vue';
import PkProductInfo from '@/components/hkTasteBusiness/pc/product/PkProductInfo.vue';
import ProductListSwiper from '@/components/hkTasteBusiness/pc/product/HkProductListSwiper.vue';
import { Rate } from 'element-ui';
@Component({ components: {
  inPreview,
  inPanel,
  inTab,
  inYouWouldLike,
  inComments,
  inProductUpOrDown,
  PkProductDetailCate,
  PkProductInfo,
  ProductListSwiper,
  Rate
} })
export default class InsProductDetail extends Vue {
  private Slider: YouWouldLike[] = [];
  private Tabs: Tab[] = [new Tab('none')];
  private PanelDetail: PanelDetail = new PanelDetail('', '', '', '', 0, 0, 0, 0, '');
  private Src: string = '';
  private IsDetail:boolean = true;
  private ImgList: string[] = [];
  private ProductCode:string = '0';
  private ExtAttrList: any[] = [];
  private Detail: string = '';
  private ProductSku:string = '0';
  private Score:number=0;
  private CatalogTree: any[] = [];
  private getNewsPrice:number=0;
  private PriceA:number=0;
  private PriceB:number=0;
  private PriceC:number=0;
  private ProductTitleName:string = '';
  private IsDetailshow:boolean = false;
  private Permission: string = '';
  private CateId:string='';
  get pc () {
    return this.$route.params.id;
  }
  showPrice (val) {
    if (val[0]) {
      this.PriceA = val[0].AdditionalPrice;
    }
    if (val[1]) {
      this.PriceB = val[1].AdditionalPrice;
    }
    if (val[2]) {
      this.PriceC = val[2].AdditionalPrice;
    }
    this.getNewsPrice = this.PriceA + this.PriceB + this.PriceC;
  }
  created () {
    this.getProduct();
  }
  // 获取上个产品
  getGetProductUp () {
    this.$Api.product.GetProductUpOrDown(this.$route.params.id, this.PanelDetail.CatId, true).then((result) => {
      this.$router.push('/product/detail/' + result);
     }).catch(error => {
      console.log(error);
          this.$message({
            message: this.$t('messageTips.NoMore') as string,
            type: 'error',
            customClass: 'messageBoxMobile'
          });
    }); ;
  }
    // 获取下个产品
  getGetProductDown () {
    this.$Api.product.GetProductUpOrDown(this.$route.params.id, this.PanelDetail.CatId, false).then((result) => {
      this.$router.push('/product/detail/' + result);
     }).catch(error => {
      console.log(error);
          this.$message({
            message: this.$t('messageTips.NoMore') as string,
            type: 'error',
            customClass: 'messageBoxMobile'
          });
    }); ;
  }
  getProduct () {
    var that = this;
    that.ProductCode = that.$route.params.id ? that.$route.params.id : '0';
    // 获取产品详情数据
    that.$Api.product.GetProduct(that.pc).then((result) => {
      console.log(result.PanelDetail.IsMake);
    if (result) {
      that.$nextTick(() => {
        document.title = result.PanelDetail.Name;
      });
      that.PanelDetail = result.PanelDetail;
      that.ExtAttrList = result.PanelDetail.ExtAttrList;
      that.Detail = result.Tab.Detail;
      that.CatalogTree = result.PanelDetail.CatalogTree;
      that.Score = result.PanelDetail.Score;
      that.ImgList = result.AdditionalImage;
      that.Permission = result.PanelDetail.Permission;
      if (that.Permission === '2') {
        if (this.$Storage.get('isLogin') === 0) {
        this.$Confirm(this.$t('Message.Logout'), this.$t('product.loginow'), () => { this.$router.push('/account/login'); }, () => { this.$router.push('/'); });
         }
      }

      // if (that.Permission === '3') {
      //   this.$Confirm(this.$t('Message.Logout'), this.$t('product.loginow'), () => { this.$router.push('/account/login'); }, () => { this.$router.push('/account/login'); });
      // }

      that.Tabs = result.Tab;
      this.ProductTitleName = result.PanelDetail.Name;
      that.$HiddenLayer();
    } else {
      this.$Confirm(this.$t('Message.Message'), this.$t('Message.FindNoProduct'), () => { this.Reload(); }, () => { this.$router.push('/'); });
      }
    });
  }
  mounted () {
    this.$store.dispatch('isClick', false);
    this.$store.dispatch('setAttrImgList', '');
  }
  @Watch('pc', { deep: true })
  onWatchRoute (o, n) {
    this.$store.dispatch('setProductDetailSku', this.pc);
    this.getProduct();
  }
  gotoSlider () {
    this.$nextTick(() => {
      let target = document.getElementById('tab') as HTMLElement;
      target.scrollIntoView();
    });
  }
}
</script>
<style  lang="less">
.PcVersion .product_detail p,.product_detail h3{
  padding:2rem;
}
.PcVersion .product_detail h3{
  font-size:1.4rem;
  font-weight:100;
}
.PcVersion .el-rate__decimal {
    display: inline-block;
    overflow: hidden;
    font-size: 18px;
}
.PcVersion .productDetail_container .in_pdWindow_item_description{
    .currentPricesMain{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .primePricesMain{
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
.PcVersion .productDetail_container {
  .currentPricesMain{
    display: flex;
    float: right;
    align-items: baseline;
    height: 3rem;
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 1.6rem;
      }
      &:nth-child(2){
        font-size:2rem;
        color:#b40606;
        font-weight: 700;
      }
    }
  }
  .primePricesMain{
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 1rem;
        color: #999;
        text-decoration: line-through;
      }
      &:nth-child(2){
        font-size: 1rem;
        color: #999;
        text-decoration: line-through;
      }
    }
  }
}
.productDetail{
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .detail-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    .detail-title{
      background: #808080;
      color:#fff;
      height: 45px;
      line-height: 45px;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .detail-products{
      width: 59%;
    }
    .detail-parameter{
      width:40%;
    }
  }
  .detailHtml{
    width:100%;
    table{
      width:100%;
      margin: 0 auto;
      border-bottom: 1px solid #808080;
      border-collapse: collapse;
      td{
        border:1px solid #808080;
        text-align: center;
        padding: 10px 0!important;
        font-family: 'Arial', 'Microsoft YaHei'!important;
        border-right: none;
        border-left: none;
        p{
          font-size: 17px!important;
          color:#000;
          font-family: 'Arial', 'Microsoft YaHei'!important;
          font-weight: bold;
        }
        span{
          font-size: 17px!important;
          color:#000;
          font-family: 'Arial', 'Microsoft YaHei'!important;
          font-weight: bold;
          text-align: center;
        }
      }
      .firstRow{
        td{
          border-top: none;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.ProducBanner{
    width: 100%;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    .innerBanner{
      width: 100%;
      margin:0 auto;
      img{
        width: 100%;
      }
    }
  }
.productDetailWarper{
  width: 100%;
  display: inline-block;
  background: #fff;
  background-size: 100% 100%;
  box-sizing: border-box;
  .IsDetailshow {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 60px 0;
    min-height: 400px;
        font-size: 20px;
  }
}
.commentsLine{
    width: 100%;
    height: 1px;
    /* background: #000; */
    margin-top: 100px;
}
.isActive{
  color:#FFF!important;
  background: #262626 !important;
  border:1px solid #262626;
}
.productDetail_container {
  margin:50px auto 0 auto;
  width:1200px;
  display: block;
  .tab_warpper{
    margin: 5rem 0 0 0;
    .tab_header{
      display: inline-block;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 10px;
      .comment_title,.detail_title{
        width: 20%;
        text-align: center;
        font-size: 20px;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border:1px solid #000;
        float: left;
        margin-right:24px;
        cursor: pointer;
        background: #FFF;
        border-radius: 5px;
        color:#000;
      }
      .comment_title{
        border:1px solid #000;
        color:#000;
        cursor: pointer;
      }
    }
    .product_detail{
      background-color: white;
      padding: 1rem;
      display: block;
      clear: both;
      min-height: 300px;
      border:1px solid #000;
      border-radius: 5px;
      p{
        font-size: 1.6rem;
     }
    }
  }
}
.productDetail_main {
  box-sizing: border-box;
  width: 100%;
  display: inline-block;
  padding-top: 30px;
}
.productDetail_price_warpper {
  display: flex;
  flex-wrap: nowrap;
  height: 60px;
  line-height: 60px;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0 10px;
  margin: 10px 0;
}
.productDetail_price {
  display: flex;
  flex-wrap: nowrap;
}
.productDetail_price_lable {
  font-size: 24px;
}
.productDetail_precentPrice_content {
  margin-left: 20px;
  font-size: 24px;
}
.productDetail_precentPrice_content_heightLine {
  color: red;
}
.productDetail_primePrice_content {
  margin-left: 20px;
  font-size: 24px;
  text-decoration: line-through;
}
.ProductUp {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  img {
    width: 50px;
    cursor: pointer;
  }
}
</style>
