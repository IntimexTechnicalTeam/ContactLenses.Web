<template>
  <div class="in_panel_warpper PcVersion" :style="warpperStyle">
    <div class="in_panel_content">
      <!-- <div @click="getColor()">1111</div> -->
      <!-- <div v-for="(item,index) in productColor" :key="index">{{item}}</div> -->
      <!-- <inSelect
        :items="panelDetail.LensMaterial"
        placeholder="请选择"
        v-model="ProductInfor['Attr'+(index+1)]"
        styla="padding: 0 10px;"
        @input="changeAttr"
        @changePrice="AdditionalPrice"
      ></inSelect> -->
      <div style="width: 100%;" v-if="panelDetail.IsMake">
        <span class="material">{{$t('product.Material')}}</span>
        <inSelect
          :items="panelDetail.LensMaterial"
          :Placeholder="$t('RegNPay.PleaseSelect')"
          v-model="MId"
          styla="padding: 0 10px;"
        ></inSelect>
        <span class="lensColor">{{$t('product.LensColor')}}</span>
        <colorSelect
          :items="colorList"
          v-model="LensColor"
          :Placeholder="$t('RegNPay.PleaseSelect')"
        ></colorSelect>
      </div>
      <inNum  :label="$i18n.t('product.countTitle')" v-model="ProductInfor.Qty" :v="ProductInfor.Qty" size="middle" :min="panelDetail.MinPurQty" :max="panelDetail.MaxPurQty" styla="padding: 0 10px;"></inNum>
      <div class="in_panel_iconList">
        <div v-for="item in panelDetail.icons" :key="item.id" class="in_panel_icon_warpper">
          <img :src="item.src" />
        </div>
      </div>
    </div>
    <!-- 正常购买流程 -->
    <div style="width: 100%;" v-if="!panelDetail.IsMake">
        <div class="in_panel_footer" v-if="panelDetail.ProductStatus!==-1 && panelDetail.SoldOutAttrComboList.length===0">
          <inButton
            v-for="item in panelDetail.button"
          :loading="(item.action === 'addToCart')?Loading:buyLoading"
            :nama="$i18n.t('product.'+item.nama)"
            :key="item.nama"
            width="48%"
            :type="(item.action === 'addToCart' || item.action === 'favorite' || item.action === 'buy') ? 'primary' : 'error'"
            :action="item.action"
            @click="Shopclick"
          ></inButton>
        </div>
        <div class="in_panel_footer" v-else>
            <!-- <button type="button" :disabled="SoldOutAttr" @click="Shopclick('buy')" class="CartBtn" style="margin-right:20px;">{{$t('product.buy')}}</button> -->
            <button type="button" :disabled="SoldOutAttr" @click="Shopclick('addToCart')" class="CartBtn">{{$t('product.addToCart')}}</button>
        </div>
    </div>
    <!-- 订制流程 -->
    <div class="" v-else>
      <div class="in_panel_footer none-error">
        <button type="button" :disabled="SoldOutAttr" @click="Customclick()" class="CartBtn">{{$t('product.ToCustomise')}}</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
// import ProductColor from '@/model/GetColor';
import ProductAttr from '@/model/ProductAttr';
import Button from '@/model/Button';
import inNum from '@/components/base/pc/InsNum.vue';
import inSelect from '@/components/base/pc/InsSelect3.vue';
import colorSelect from '@/components/base/pc/InsSelect4.vue';
import inButton from '@/components/base/pc/InsButton.vue';
import inPrices from '@/components/base/pc/InsPrices.vue';
import inRecommend from '@/components/business/pc/product/InsRecommend.vue';
import ShopCartItem from '@/model/shopCartItem';
import { Button as ElButton } from 'element-ui';
@Component({ components: { inNum, inSelect, colorSelect, inButton, inPrices, inRecommend, ElButton } })
export default class Panel extends Vue {
  @Prop() private panelDetail!: PanelDetail;
  @Prop() private readonly width!: string;
  @Prop() private readonly height!: string;
  @Prop() private readonly ProductSku!: string;
  private delay = 0;
  private Loading:boolean=false;
  private buyLoading:boolean=false;
  private ProductInfor: ShopCartItem = new ShopCartItem();
  private NewPrice:number=0;
  private attrPrices:any[]=[];
  private SoldOutAttr:boolean= false;
  private AttrArray:any = '';
  private AttrComboImgList:any ='';
  private AttrSelectImg:string ='';
  private MId:string = '';
  private LensColor:string = '';
  /* data() {
    return {
      colorList: []
    };
  } */
  colorList = [];
  get warpperStyle (): string {
    return 'width:' + this.width + ';height:' + this.height + ';';
  }
  Customclick () {
    if (this.$Storage.get('isLogin') === 0) {
      Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.Customclick); });
    } else {
      this.Loading = true;
      if (this.MId !== '') {
      this.$Api.shoppingCart.addItem(this.ProductSku, this.ProductInfor.Qty, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3, this.MId, this.LensColor)
          .then(
            (result) => {
              this.Loading = false;
            }).then(() => {
            this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
            this.$router.push('/account/custom');
          }).catch();
      } else {
        this.$message({
                    message: this.$t('product.SelectMaterial') as string,
                    type: 'error',
                    customClass: 'messageboxNoraml'
          });
      }
    }
  }
    Shopclick (action: string) {
    if (action) {
      if (this.$Storage.get('isLogin') === 0) {
       Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addCart); });
      } else if (this.$Storage.get('isLogin') === 1) {
        if (action === 'addToCart') {
        this.Loading = true;
        this.$Api.shoppingCart.addItem(this.ProductSku, this.ProductInfor.Qty, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3, this.MId, this.LensColor)
          .then(
            (result) => {
              this.$message({
                message: result.Message.Message as string,
                type: 'success',
                customClass: 'messageboxNoraml'
              });
              this.Loading = false;
            }).then(() => {
            this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
            this.$router.push('/account/custom');
          }).catch();
      } else if (action === 'buy') {
        this.buyLoading = true;
        this.$Api.shoppingCart.addItem(this.ProductSku, this.ProductInfor.Qty, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3, this.LensColor)
          .then(
            (result) => {
              this.buyLoading = false;
               if (result.Message.Succeeded === true) {
                  this.$router.push('/account/custom');
              } else {
                  this.$message({
                    message: result.Message.Message as string,
                    type: 'success',
                    customClass: 'messageboxNoraml'
                  });
              }
            }).catch();
      }
      }
    } else {
      Vue.prototype.$Confirm('action', Object.create(this.ProductInfor));
    }
  }
  addCart () {
      this.Loading = true;
      this.$Api.shoppingCart.addItem(this.ProductSku, this.ProductInfor.Qty, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3, this.MId, this.LensColor)
        .then(
          (result) => {
            this.$message({
              message: result.Message.Message as string,
              type: 'success',
              customClass: 'messageboxNoraml'
            });
            this.Loading = false;
          }).then(() => {
          this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
        }).catch();
  }
  addFavorite () {
    if (this.panelDetail.IsFavorite) {
      this.$Api.product.removeFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) { Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInRemoving')); this.panelDetail.IsFavorite = false; } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    } else {
      this.$Api.product.addFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) { Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInAdding')); this.panelDetail.IsFavorite = true; } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    }
  }
  // Shake (fn) {
  //   if (!(fn instanceof Function)) return;
  //   let timeout = 1000;
  //   if (this.delay === 0) { this.delay = setTimeout(fn, timeout); } else { clearTimeout(this.delay); this.delay = setTimeout(fn, timeout); }
  // }
  changeAttr () {
    this.Shake(() => {
      // 根据选择的属性值赋值给不同的数组
      console.log(this.panelDetail, 'this.panelDetailthis.panelDetail');
      if (this.panelDetail.AttrList[0].length > 0) {
        this.AttrArray = this.ProductInfor.Attr1;
         this.AttrComboImgList = this.ProductInfor.Attr1;
      }
      if (this.panelDetail.AttrList[0].length > 0 && this.panelDetail.AttrList[1].length > 0) {
        this.AttrArray = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2;
        this.AttrComboImgList = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2;
      }
      if (this.panelDetail.AttrList[0].length > 0 && this.panelDetail.AttrList[1].length > 0 && this.panelDetail.AttrList[2].length) {
        this.AttrArray = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2 + '-' + this.ProductInfor.Attr3;
        this.AttrComboImgList = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2 + '-' + this.ProductInfor.Attr3;
      }
      // 判断后台商品列表上架情况
      if (this.panelDetail.SoldOutAttrComboList.length > 0) {
           let flag = false;
            for (var k = 0; k < this.panelDetail.SoldOutAttrComboList.length; k++) {
                if (this.panelDetail.SoldOutAttrComboList[k] === this.AttrArray.toString()) {
                        this.SoldOutAttr = true;
                        flag = true;
                           break;
                  };
                  }
                  if (!flag) {
                    this.SoldOutAttr = false;
                  }
            }
      // 根据后台选择属性图片显示不同的值
      if (this.panelDetail.AttrComboImgList.length > 0) {
           let flagN = false;
            for (var r = 0; r < this.panelDetail.AttrComboImgList.length; r++) {
                if ((this.panelDetail.AttrComboImgList[r] as any).Key === this.AttrComboImgList.toString()) {
                        this.AttrSelectImg = this.panelDetail.AttrComboImgList[r].Img;
                        console.log(this.AttrSelectImg, 'this.AttrSelectImgthis.AttrSelectImg');
                        this.$store.dispatch('setAttrImgList', this.AttrSelectImg);
                        flagN = true;
                        break;
                  };
                  }
                  if (!flagN) {
                    this.AttrSelectImg = '';
                    this.$store.dispatch('setAttrImgList', '/images/pc/proddef.jpg');
                  }
            }
        this.$Api.product.checkProductStatus(this.ProductSku, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3).then((result) => {
          this.panelDetail.ProductStatus = result.object0.ReturnValue;
        });
    });
  }
  getAttrImage () {
    this.Shake(() => {
      this.$Api.product.getAttrImage(this.ProductSku, 1, this.ProductInfor.Attr1, this.ProductInfor.Attr2, 0).then((result) => {
        console.log(result, 'resultresult');
      });
    });
  }
  AdditionalPrice (getval) {
    let flag = false;
   for (var j = 0; j < this.attrPrices.length; j++) {
     if (this.attrPrices[j].TypeId === getval.TypeId) {
          flag = true;
          this.attrPrices[j] = {
          TypeId: getval.TypeId,
          AdditionalPrice: getval.AdditionalPrice
      };
        break;
      }
    }
    if (!flag) {
      this.attrPrices.push({
        TypeId: getval.TypeId,
        AdditionalPrice: getval.AdditionalPrice
      });
    }
    this.$emit('getPrice', this.attrPrices);
  }
  /* @Watch('panelDetail.AttrList', { deep: true })
  onPAChange () {
    if (this.panelDetail.AttrList.length > 0 && this.panelDetail.AttrList[0].length === 0) this.changeAttr();
  } */
  @Watch('MId')
  onColor () {
    this.$Api.product.getColor(this.MId).then((result) => {
      // console.log(result);
      this.colorList = result;
    });
  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style lang="less">
.PcVersion .in_panel_footer .addToCart {
    border: 1px solid #242424!important;
    background: #fff!important;
    color: #242424!important;
    width: 35%!important;
}
.PcVersion .in_panel_footer .buyNow{
    border: 1px solid #262626!important;
    background: #262626!important;
    background-size: contain;
    color: #fff;
    width: 35%!important;
}
.PcVersion  .el-button{
  padding: 20px 10px!important;
}
.PcVersion .in_panel_footer button:hover{
  transform: translateY(-3px);
  border:1px solid #262626!important;
}
.PcVersion .in_panel_footer .el-button+.el-button{
  margin-left:20px!important;
}
.PcVersion .in_panel_footer{
    justify-content: flex-start!important;
}
.PcVersion .in_panel_footer .actionBtn span{
  font-size: 18px;
}
.PcVersion  .in_num_label{
  display: inline-block;
  width: auto!important;
  margin-right: 1rem;
}
.PcVersion  .el-input-number{
  border:none!important;
  box-sizing: border-box;
}
.PcVersion  .el-input__inner{
  border:none!important;
  box-sizing: border-box;
  width: 4rem;
}
.PcVersion  .el-input-number__decrease,.PcVersion .el-input-number__increase{
    width: 2rem !important;
    border: 2px solid #0e579c;
    border-radius: 50%;
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.PcVersion .el-input-number__decrease i, .el-input-number__increase i{
  color:#000;
  font-weight: bold;
  font-size: 16px;
}
.PcVersion  .el-input-number{
  width: auto!important;
}
.PcVersion .el-input-number .el-input__inner{
  padding-left: 0rem;
  padding-right: 0rem;
  background: transparent!important;
  width: 10rem;
  line-height: 2rem!important;
  height: 2rem!important;
  color:#000!important;
  font-weight: 500;
  font-size: 1.4rem;
}
</style>
<style lang="less" scoped>
.in_panel_footer .actionBtn{
    width: 49%;
    display: block;
    text-align: center;
}
.in_panel_footer .addToCart{
  border:1px solid #f8ae57;
  background: #fff;
  color:#f8ae57;
}
.in_panel_footer .buyNow{
  border:1px solid #f8ae57;
  background: url('/static/Image/buynowbg.jpg') repeat-x center center;
  background-size: contain;
  color:#fff;
}
@media screen and (max-width: 800px)  {
  .in_panel_warpper {
    padding: 0 2rem;
  }
}
.Recommend{
  margin-top:12px;
}
.in_panel_header {
  text-align: left;
}
.in_panel_title {
  position: relative;
  font-size: 25px;
}
.in_panel_title img{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0,-50%);
  cursor: pointer;
}
.in_panel_content {
  min-height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.material,.lensColor{
  font-size: 20px;
  color:#0e579c;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  text-align: left;
  display: block;
  width: 100%;
}
.in_panel_footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
  font-size: 16px;
}
.productDetail_precentPrice_content {
  margin-left: 20px;
  font-size: 16px;
}
.productDetail_precentPrice_content_heightLine {
  color: red;
}
.productDetail_primePrice_content {
  margin-left: 20px;
  font-size: 16px;
  text-decoration: line-through;
}
.in_panel_iconList {
  margin-top: 40px;
  text-align: left;
  display: flex;
  flex-wrap: nowrap;
}
.in_panel_icon_warpper {
  margin-right: 10px;
}
    .in_panel_footer {
      .CartBtn{
        height: 50px;
        font-size: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: #0e579c;
        color: #fff;
        font-weight: bold;
        border-radius: 50px;
        transition: .1s;
        text-transform: uppercase;
        padding: 20px;
        border:none;
        width: 200px;
        /* margin-right: 4%; */
        margin:0 auto;
        &:disabled{
          cursor:not-allowed;
          background: #ccc;
          border: 1px solid #ccc;
          color: #333333;
           &:hover{
           transform: translateY(0px)!important;
          }
        }
      }
      .BuyBtn{
        height: 50px;
        font-size: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #333333;
        background-color: #333333;
        color: #fff;
        border-radius: 3px;
        transition: .1s;
        text-transform: uppercase;
        width: 48%;
        &:disabled{
          cursor:not-allowed;
          background: #ccc;
          border: 1px solid #ccc;
          color: #333333;
           &:hover{
           transform: translateY(0px)!important;
          }
        }
      }
      .in_btn {
        height: 60px;
        font-size: 24px;
        color: @base_color;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: #0e579c;
        border-radius: 30px;
        transition: .1s;
        margin:0 auto;
        &:hover{
          transform: translateY(-3px);
        }
        &:first-child {
          color: #fff;
        }
      }
    }
    .none-error{
      .in_btn:nth-child(2){
        display: none;
      }
    }
</style>
