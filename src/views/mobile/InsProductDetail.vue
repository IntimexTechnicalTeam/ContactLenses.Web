<template>
  <div class="productDetail_container">
     <div v-if="this.Permission == 3" class="IsDetailshow">

     {{$t('messageTips.NoProduct')}}

    </div>
    <div v-else>
    <div class="productDetail_main" :style="'flex-wrap: wrap;'">
      <div class="ProductUp">
          <div class="prev" @click="getGetProductUp()"><img src="/images/pc/pleft.png"></div>
          <div class="next" @click="getGetProductDown()"><img src="/images/pc/pright.png"></div>
      </div>
      <ProductSwiper width="100%"  :imgList="ImgList" :ProductTitleName="ProductTitleName"></ProductSwiper>
      <PkProductInfo :panelDetail="PanelDetail"  :ProductSku="ProductSku" :AddPrice="getNewsPrice" width="100%" style="margin-top:2rem;"></PkProductInfo>
      <!-- <div class="ProductRate"><Rate  v-model="Score" disabled  disabled-void-color="#5f6548" disabled-void-icon-class="el-icon-star-off"></Rate></div> -->
      <inPanel :panelDetail="PanelDetail" width="100%" :ProductSku="ProductSku"  @getPrice="showPrice" itemscopestyle="margin-top:2rem;"></inPanel>
      <!-- <PkProductDetailCate :source="ExtAttrList" :cateTree="CatalogTree" width="100%" style="margin-top:2rem;"></PkProductDetailCate> -->
      <div class="M_productDetail">
        <h1 class="product_info">{{ $t("product.ProductInformation") }}</h1>
        <div class="detail-header">
          <div class="detail-products detail-title">{{ $t("product.Products") }}</div>
          <div class="detail-parameter detail-title">{{ $t("product.Parameter") }}</div>
        </div>
        <div class="detailHtml" v-html="Detail"></div>
      </div>
    </div>
    <!-- <div class="tab_warpper">
      <div class="tab_header">
        <div class="detail_title" @click="IsDetail=true" v-bind:class="{isActive:IsDetail}">{{$t('product.ProductIntroduction')}}</div>
        <div class="comment_title" @click="IsDetail=false" v-bind:class="{isActive:!IsDetail}">{{$t('product.comments.title')}}</div>
      </div>
      <div class="clear"></div>
      <div class="product_detail" v-html="Tabs.Detail" v-show="IsDetail && Tabs.Detail!=''"></div>
      <div class="product_detail" v-show="IsDetail" v-if="Tabs.Detail==''"><h3>{{$t('messageTips.NoContent')}}</h3></div>
      <inComments :ProductSku="ProductSku" v-show="!IsDetail"></inComments>
    </div>
    <div class id="tab"></div> -->
    <inYouWouldLike
      :pageNum="2"
      :title="$i18n.t('product.youWouldLike')"
      :ProductSku="ProductSku"
    ></inYouWouldLike>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inTab from '@/components/business/mobile/product/InsTab.vue';
import inYouWouldLike from '@/components/business/mobile/product/InsYouWouldLike2.vue';
import YouWouldLike from '@/model/youWouldLike';
import PanelDetail from '@/model/PanelDetail';
import inPanel from '@/components/business/mobile/product/InsPanel.vue';
import inPreview from '@/components/business/mobile/product/InsPreview.vue';
import ProductSwiper from '@/components/hkTasteBusiness/mobile/product/PkProductSwiperN.vue';
import PkProductDetailCate from '@/components/hkTasteBusiness/mobile/product/HkProductDetailCate.vue';
import PkProductInfo from '@/components/hkTasteBusiness/mobile/product/PkProductInfo.vue';
import ProductAttr from '@/model/ProductAttr';
import Button from '@/model/Button';
import Tab from '@/model/Tab';
import inAccordion from '@/components/base/mobile/InsAccordion.vue';
import inComments from '@/components/business/mobile/product/InsComments.vue';
import inProductUpOrDown from '@/components/business/mobile/product/InsProductUpOrDown.vue';
import ProductListSwiper from '@/components/hkTasteBusiness/mobile/product/HkProductListSwiper.vue';
import { Rate } from 'element-ui';
@Component({ components: {
  inPreview,
  inPanel,
  inTab,
  inYouWouldLike,
  inAccordion,
  inComments,
  ProductSwiper,
  PkProductDetailCate,
  PkProductInfo,
  inProductUpOrDown,
  ProductListSwiper,
  Rate
} })
export default class ProductDetail extends Vue {
  private Slider: YouWouldLike[] = [];
  private Tabs: Tab = new Tab('none');
  private Detail: string = '';
  private PanelDetail: PanelDetail = new PanelDetail('', '', '', '', 0, 0, 0, 0, '');
  private Src: string = '';
  private ImgList: string[] = [];
  private ExtAttrList: any[] = [];
  private ProductSku:string = '0';
  private IsDetail:boolean = true;
  private Score:number=0;
  private CatalogTree: any[] = [];
  private getNewsPrice:number=0;
  private PriceA:number=0;
  private PriceB:number=0;
  private PriceC:number=0;
  private ProductTitleName:string = '';
  private Permission: string = '';
  getProduct () {
    this.ProductSku = this.$route.params.id ? this.$route.params.id : '0';
    // 获取产品详情数据
    this.$Api.product.GetProduct(this.ProductSku).then((result) => {
       if (result) {
          this.PanelDetail = result.PanelDetail;
          console.log(result, 'this.PanelDetailthis.PanelDetail');
          this.ExtAttrList = result.PanelDetail.ExtAttrList;
          this.Detail = result.Tab.Detail;
          this.CatalogTree = result.PanelDetail.CatalogTree;
          this.ImgList = result.AdditionalImage;
          this.Tabs = result.Tab;
          this.Score = result.PanelDetail.Score;
          this.Permission = result.PanelDetail.Permission;

      if (this.Permission === '2') {
        if (this.$Storage.get('isLogin') === 0) {
        this.$Confirm(this.$t('Message.Logout'), this.$t('product.loginow'), () => { this.$router.push('/account/login'); }, () => { this.$router.push('/'); });
         }
      }
          this.$HiddenLayer();
          this.ProductTitleName = result.PanelDetail.Name;
          this.$nextTick(() => {
            document.title = result.PanelDetail.Name;
          });
       } else {
          this.$Confirm(this.$t('Message.Message'), this.$t('Message.FindNoProduct'), () => { this.Reload(); }, () => { this.$router.push('/'); });
       }
    });
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
  @Watch('$route', { deep: true })
  onWatchRoute (o, n) {
    this.getProduct();
  }
  mounted () {
    this.$store.dispatch('isClick', false);
    this.$store.dispatch('setAttrImgList', '');
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
.product_detail p,.product_detail h3{
  padding:2rem;
}
.product_detail h3{
  font-size:1.4rem;
  font-weight:100;
}
.el-rate__decimal {
    display: inline-block;
    overflow: hidden;
    font-size: 18px;
}
.productDetail_container .in_pdWindow_item_description{
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
.productDetail_container {
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
        font-size: 1.2rem;
        color: #999;
        text-decoration: line-through;
      }
      &:nth-child(2){
        font-size: 1.2rem;
        color: #999;
        text-decoration: line-through;
      }
    }
  }
}
.M_productDetail{
  .detailHtml{
    table{
      width:100%;
      margin: 0 auto;
      border-bottom: 1px solid #808080;
      border-collapse: collapse;
      td{
        border-bottom: 1px solid #808080;
        padding: 1rem .5rem!important;
        font-family: 'Arial', 'Microsoft YaHei'!important;
        text-align: center;
        p{
          font-size: 16px!important;
          color:#000;
          font-family: 'Arial', 'Microsoft YaHei'!important;
          font-weight: bold;
          text-align: left!important;
          span{
            font-size: 16px!important;
            color:#000;
            font-family: 'Arial', 'Microsoft YaHei'!important;
            text-align: left!important;
          }
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
<style scoped lang="less">
.ProducBanner{
    width: 100%;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
  }
.ProductRate{
  width: 90%;
  margin: 0 auto;
  margin-top: .5rem;
}
.isActive{
  color:#FFF!important;
  background: #262626 !important;
  border:1px solid #262626!important;
}
.productDetail_container {
  width: 93%;
  background: #fff;
  background-size: 100% 100%;
  box-sizing: border-box;
  margin:0 auto;
  .IsDetailshow {
    width: 98%;
    margin: 0 auto;
    text-align: center;
    padding: 60px 0;
    font-size: 1.4rem;
  }
  .tab_warpper{
    margin: 5rem 0 0 0;
    .tab_header{
      width: 95%;
      margin:0 auto;
      .comment_title,.detail_title{
        width: 48%;
        color:#000000;
        text-align: center;
        font-size: 1.4rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        float: left;
        border-radius: 5px;
      }
      .detail_title{
        margin-right: calc(4% - 4px);
         border:1px solid #000;
      }
      .comment_title{
        border:1px solid #000;
      }
    }
    .product_detail{
      width: 95%;
      margin:0 auto;
      background: #fff;
      border: 1px solid #000;
      min-height: 20rem;
      border-radius: 5px;
      margin-top: 1rem;
      margin-bottom: 1rem;
      p{
        font-size: 1.6rem;
     }
    }
  }
}
.productDetail_main {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
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
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  img {
    width: 3rem;
    cursor: pointer;
  }
}
.M_productDetail{
  width:95%;
  margin:1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .product_info{
    text-align: center;
    margin:.5rem auto;
    font-size: 2rem;
  }
  .detail-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:100%;
    .detail-title{
      background-color: #808080;
      color:#fff;
      height: 45px;
      line-height: 45px;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .detail-products{
      width:59%;
    }
    .detail-parameter{
      width: 40%;
    }
  }
  .detailHtml{
    width:100%;
  }
}
</style>
