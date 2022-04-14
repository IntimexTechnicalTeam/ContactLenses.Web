<template>
  <div class="shoppingcart_warrper">
    <!--main-content-->
        <div class="shoppingcart_header">{{$t('Order.OrderList')}}      •</div>
        <div class="ShoppingCartItem_warpper"  v-for="(one,index) in items" :key="index">
            <div class="shoppingcart_item_image">
                <a class="product-img" v-bind:href="'/product/Detail/'+one.Product.Sku">
                    <img v-bind:src="one.Product.Img_M" alt />
                  </a>
            </div>
            <div class="shoppingcart_item_detail">
                <div class="shoppingcart_item_code">{{$t('product.ProductCode')}}: {{one.Product.Code}}</div>
                <div class="shoppingcart_item_name">{{$t('product.ProductName')}}: {{one.Product.Name}}</div>
                <!-- <div class="shoppingcart_item_attr">
                      <span v-if="one.AttrName1">{{one.AttrTypeName1}}：{{one.AttrName1}}</span>&nbsp;
                      <span v-if="one.AttrName2">{{one.AttrTypeName2}}：{{one.AttrName2}}</span>&nbsp;
                      <span v-if="one.AttrName3">{{one.AttrTypeName3}}：{{one.AttrName3}}</span>&nbsp;
                </div> -->
                <div class="shoppingcart_item_qty">
                  <span class="qty-title">{{$t('Shoppingcart.Quantity')}}</span>
                  <div class="common-num">
                      <a
                        class="reduce-num"
                        href="javascript:;"
                        v-on:click=" minusQty(one,one.Id,$event);"
                      >-</a>
                      <div class="num-content">
                        <input
                          class="input-text"
                          type="text"
                          data-num="1"
                          disabled
                          v-model="one.Qty"
                          v-on:change="updateQty(one,one.Id,$event)"
                        />
                      </div>
                      <a class="add-num" href="javascript:;" v-on:click="plusQty(one,one.Id,$event);" :class="{'disabled':one.IsAdd}">+</a>
                      </div>
                </div>
                <!-- <div class="shoppingcart_item_price">
                    <div>{{Currency.Code}} {{(one.Product.SalePrice) | PriceFormat}}</div>
                </div> -->
                <div class="merchant-box">
                  <button @click="boxShow(index)" class="edit">{{$t('product.EditDetails')}}</button>
                  <button class="close"  v-on:click="removeItem(index)">
                    {{$t('product.Delete')}}
                  </button>
                </div>
            </div>
            <div class="clear"></div>
            <div class="edit-box" v-show="items[index].boxshow">
                <span class="edit_title">{{$t('product.RequiredInformation')}}</span>
                <!-- <span class="result">{{$t('product.RefractionResult')}}</span> -->
                <ElForm :model="editForm" :rules="edit" ref="editForm">
                  <!-- <span class="result">{{$t('product.RefractionResult')}}</span> -->
                  <!-- <FormItem v-for="(item,index) in (one.LensExtAttrItem)" :key="index" :label="item.Id" class="title-item">
                    <ElInput v-model="item.Text" clearable=""></ElInput>
                  </FormItem> -->
                  <div class="itemInformation">
                    <div v-for="(item,index) in (one.LensExtAttrItem)" :key="index" class="editform-box">
                    <span class="item-name">{{item.MutiLang}}</span>
                    <ElInput v-model="item.Text" clearable=""></ElInput>
                  </div>
                  </div>
                  <span class="edit_title">{{$t('product.ToCustomise')}}</span>
                  <div class="parameter_table">
                    <FormItem v-for="(item,index) in (one.LensAttrView)" :key="index" :label="item.AttrName">
                     <ElInput v-model="item.AttrValue" clearable=""></ElInput>
                    </FormItem>
                  </div>
                  <div class="edit_btn_box">
                    <b class="btn saveBtn" @click="saveItem(index)">{{$t('product.Save')}}</b>
                    <b class="btn canelBtn" @click="Reset(index)">{{$t('product.Reset')}}</b>
                    </div>
                </ElForm>
              </div>
          </div>
        <div>
        <div class="address" v-for="(item, index) in addressList" :key="index" :class="activeIndex === index ? 'active' : ''" @click="changeList(index)">
          <div>{{item.Country.Name}}</div>
          <div>{{item.DeliveryId}}</div>
        </div>
          <!-- <div class="shoppingcart_total1">{{Currency.Code}} {{(totalAmount) | PriceFormat}}</div> -->
          <div class="shoppingcart_total"><ElButton type="success" @click="submit"><span style="font-size:1.5rem;">{{ $t('Shoppingcart.Checkout') }}</span></ElButton></div>
        </div>
    <!--main-content-->
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Input, FormItem, Button as ElButton } from 'element-ui';
import ShopCart from '../../model/ShopCart';
import ShopCartItem from '../../model/shopCartItem';
import Currency from '../../model/currency';
import Order from '@/model/order';
import Address from '../../model/address';
class Update {
  itemId!: string;
  qty!: number;
  constructor (itemId:string, qty:number) {
    this.itemId = itemId;
    this.qty = qty;
  }
}
@Component({
  components: {
    ElButton,
    Form,
    Input,
    FormItem
  }
})
export default class InsShoppingcart extends Vue {
  private ShoppingCart:ShopCart = new ShopCart();
  private Order:Order =new Order();
  editForm: any = {
    ShoppingCartId: '',
    Sku: '',
    LensExtAttrItem: [
      /* {
        Id: 'Remark',
        Text: ''
      } */
      /* {
        Id: 'CustomerCode',
        Text: ''
      },
      {
        Id: 'Remarks',
        Text: ''
      } */
    ],
    LensAttrView: {},
    AddressId: ''
  }
  get edit () {
    return {
      CustomerCode: [{
        require: true,
        tigger: 'blur'
      }],
      RefractionResult: [{
        require: true,
        tigger: 'blur'
      }],
      ResultLeft: [{
        require: true,
        tigger: 'blur'
      }],
      ResultRight: [{
        require: true,
        tigger: 'blur'
      }],
      CorneaLeft: [{
        require: true,
        tigger: 'blur'
      }],
      CorneaRight: [{
        require: true,
        tigger: 'blur'
      }],
      LensMaterial: [{
        require: true,
        tigger: 'blur'
      }],
      LensColor: [{
        require: true,
        tigger: 'blur'
      }],
      OverallDiameter: [{
        require: true,
        tigger: 'blur'
      }],
      Remarks: [{
        require: true,
        tigger: 'blur'
      }],
      Prower: [{
        require: true,
        tigger: 'blur'
      }],
      BC: [{
        require: true,
        tigger: 'blur'
      }],
      Diam: [{
        require: true,
        tigger: 'blur'
      }],
      OZ: [{
        require: true,
        tigger: 'blur'
      }],
      CT: [{
        require: true,
        tigger: 'blur'
      }]
    };
  }
  prodcutSrc: string = require('@/assets/Images/270_b.jpg');
  step: number = 1;
  totalAmount: number = 0;
  // itemsAmount: number = 0;
  // ItemsTaxAmount: number = 0;
  Currency: Currency = new Currency();
  MaxQty: number = 20;
  // cartItems: any[] = [];
  // currentCode: any = '';
  items: any[] = [
  ];
  activeIndex = null;
  itemQty:number=0;
  private UpdateQueQue:Update[] = [];
  isAdd:boolean = false;
  addressList: Address[] = [];
  mounted () {
    // this.loadItems();
  }
  created () {
    this.load().then(() => { this.$HiddenLayer(); });
  }
  load () {
    let load = this.$Api.shoppingCart.getShoppingCart().then((result) => {
      this.ShoppingCart = result.ShopCart;
      this.Currency = result.ShopCart.DefaultCurrency;
      this.items = result.ShopCart.Items;
      this.items.forEach(v => {
        this.$set(v, 'IsAdd', false);
      });
      if (this.ShoppingCart.Items.length > 0) {
        this.address();
      }
      if (this.ShoppingCart.Items.length === 0) this.$Confirm(this.$t('Message.Message'), this.$t('Shoppingcart.None'), () => { this.$router.push('/product/search/-'); }, () => { this.$router.push('/'); });
    });
    this.loadItems();
    return load;
  }
  address () {
    this.$Api.delivery.getAddress().then((result) => {
      this.addressList = result.data;
      // console.log(result.data);
    });
  }
  changeList(index) {
    this.activeIndex = index;
    this.editForm.AddressId = this.addressList[index].DeliveryId;
    console.log(this.addressList[index].DeliveryId);
  }
  loadItems () {
    var _this = this;
    var itemsprice = 0;
    var Currencys;
    var itemQ;
    _this.items.forEach(element => {
      itemsprice += element.Product.SalePrice * element.Qty;
      Currencys = element.Product.Currency.Code;
      itemQ = element.Qty;
    });
    // _this.Currency = Currencys;
    _this.totalAmount = itemsprice;
    _this.itemQty = itemQ;
  }
  @Watch('items', { deep: true })
  onItemsChange (o, n) {
    this.loadItems();
  }
  removeItem (one) {
    // this.loadItems();
    let item:ShopCartItem = this.items.splice(one, 1)[0];
    this.$Api.shoppingCart.removeItem(item.Id).then(result => {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    });
  }
  boxShow(index) {
    Vue.set(this.items[index], 'boxshow', true);
  }
  saveItem (index) {
    Vue.set(this.items[index], 'boxshow', false);
    Vue.set(this.items[index], 'ShoppingCartId', this.items[index].Id);
    Vue.set(this.items[index], 'Sku', this.items[index].Product.Sku);
    for (var i = 0; i < this.items[index].LensExtAttrItem.length; i++) {
      Vue.set(this.items[index], this.items[index].LensExtAttrItem[i].Id, this.items[index].LensExtAttrItem[i].Text);
    }
  }
  next () {
    // if (!this.items || this.items.length === 0) {
    //     showInfo('<%=Resources.Caption.CartEmpty%>');
    //     return false;
    // }
  }
  minusQty (one, id, event) {
    let _this = this;
    one.Qty--;
    if (one.Qty < 1) {
      one.Qty = 1;
    }
    this.Shake(() => {
      this.$Api.shoppingCart.updateItemQty(id, one.Qty).then((result) => {
            this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
            one.IsAdd = false;
      });
    }, 500);
  }
  plusQty (one, id, event) {
    var a = one.Qty;
    let _this = this;
    one.Qty++;
    if (one.IsAdd === false) {
        one.IsAdd = true;
      setTimeout(() => {
             _this.$Api.shoppingCart.updateItemQty(id, one.Qty).then((result) => {
               if (result.Message.Succeeded) {
                 _this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
                 one.IsAdd = false;
               } else {
                 one.Qty = a;
                  this.$message({
                      message: result.Message.Message as string,
                      type: 'success',
                      customClass: 'messageboxNoraml'
                });
               }
            });
      }, 500);
    }
  }
  updateQty (one, id, event) {
    let _this = this;
    if (one.Qty < 1) {
      one.Qty = 1;
    }
    // if (one.Qty >= this.MaxQty) {
    //   one.Qty = this.MaxQty;
    // }
  }
  submit () {
    /* let temp = {};
    let item:Update;
    let waittingList = [Promise.resolve('head')];
    while (this.UpdateQueQue.length !== 0) {
      item = this.UpdateQueQue.shift() as Update;
      temp[item.itemId] = item.qty;
    }
    Object.keys(temp).forEach((element) => {
      waittingList.push(this.$Api.shoppingCart.updateItemQty(element, temp[element]));
    });
    Promise.all(waittingList).then((result) => {
      // this.$router.push('/account/checkout');
      if (this.$Storage.get('isLogin') === 1) this.$router.push('/account/checkout');
      else {
        // this.$Login(() => { this.$ShowLayer(); this.load().then(() => { this.$HiddenLayer(); }); });
        this.$router.push('/account/login?returnurl=/account/checkout');
      }
    }); */
    let temp = {
      AddressId: this.editForm.AddressId,
      Items: this.items
    };
    this.$Api.order.saveOrder(temp).then((result) => {
      if (result.Succeeded) {
        /* this.$message({
          message: '创建订单成功',
          type: 'success'
        }); */
        this.$router.push('/order/List');
      } else {
        this.$message({
          message: result.Message,
          type: 'error'
        });
      }
    });
  }
}
</script>
<style lang="less">
.ShoppingCartItem_warpper .el-input-number {
    position: relative;
    display: inline-block;
    width: 8rem;
    border: none;
}
</style>
<style scoped lang='less'>
/*我的最爱*/
  .disabled {
      pointer-events: none;
      filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
      -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
      opacity: 0.5; /*其他，透明度50%*/
  }
#main-content {
  width: 90%;
  margin: 0 auto;
}
/*购物流程*/

.ShoppingCartItem_warpper{
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
    .merchant-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .edit,
      .close{
        border:none;
        background: #0e579c;
        color:#fff;
        padding: 0.5rem 1rem;
        width: 5rem;
        border-radius: 5px;
      }
    }
}
.shoppingcart_item_name,
.shoppingcart_item_qty,
.merchant-box{
  margin-top:1rem
}
.shoppingcart_item_image{
    /* margin: 0 0 0 1rem; */
    float: left;
}
.shoppingcart_item_image img{
    width: 10rem;
    height: 10rem;
    border-radius: 10px;
}
.shoppingcart_item_detail{
    margin: 0 0 0 1rem;
    width:63%;
    float: right;
}
.clear{
  float: clear;
}
.shoppingcart_item_name,
.shoppingcart_item_code,
.shoppingcart_item_attr,
.shoppingcart_item_price,
.qty-title{
    line-height: 2.5rem;
    font-size: 1.2rem;
    color:#000;
    font-weight: bold;
    // width: 10rem;
}
.shoppingcart_item_price >div{
    font-size: 1.2rem;
    color:#d92526;
}
.shoppingcart_item_qty{
    display: flex;
    width:100%;
    justify-content: space-between;
    align-items: center;
    .qty_count{
        line-height: 26px;
        font-size: 1.2rem
    }
}
.shoppingcart_item_attr{
    span{
        margin-right: 1rem;
    }
}
.shoppingcart_item_price{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.shoppingcart_warrper{
    background-color: white;
    padding: 2rem 0;
    border-radius: .5rem;
    width: 93%;
    margin: 0 auto;
    // min-height: calc(100vh - 402px);
    .shoppingcart_header{
        font-size: 2rem;
        line-height: 5rem;
        text-align: left;
        font-weight: 700;
        color:#0e579c;
    }
}
.shoppingcart_total{
    text-align: right;
    padding: 1rem;
}
.shoppingcart_total1{
    font-size: 1.5rem;
    text-align: right;
    padding: 1rem;
    color:#d92526;
}
.num-content{
    float: left;
}
.num-content .input-text {
  display: inline-block;
  width: 38px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #fff;
  border:none;
  color:#000;
  font-weight: bold;
}
.common-num {
  display: inline-block;
}
.common-num a{
    float: left;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    background-color: #0e579c;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.active{
  background: #6c6c6c;
}

</style>
<style lang="less">
.edit-box{
  width: 100%;
  overflow: hidden;
  position: relative;
  .edit_title{
    color:#0e579c;
    border-bottom: 1px solid #0e579c;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
  }
  .itemInformation{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  /* .editform-box:nth-child(1){
    span{
      visibility: hidden;
    }
    span:before{
      content: 'Weaer Name / number';
      visibility: visible;
    }
  } */
  .editform-box{
    width: 100%;
    .item-name{
      width: 54%;
    }
    .el-input__inner{
      border:2px solid #0e579c;
    }
  }
  .editform-box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    span{
      font-size: 18px;
      color:#000;
      font-weight: bold;
    }
  }
  .editform-box:nth-child(2),
  .editform-box:nth-child(3),
  .editform-box:nth-child(4),
  .editform-box:nth-child(5){
    width:45%;
    overflow: hidden;
    .el-input--suffix{
      width: 5rem;
      .el-input__inner{
        padding: 0 0.5rem;
      }
    }
  }
  .editform-box:nth-child(7),
  .editform-box:nth-child(8),
  .editform-box:nth-child(9),
  .editform-box:nth-child(10),
  .editform-box:nth-child(11),
  .editform-box:nth-child(12),
  .editform-box:nth-child(13),
  .editform-box:nth-child(14),
  .editform-box:nth-child(15),
  .editform-box:nth-child(16){
    flex-direction: column;
    width: 49%;
    .item-name{
      width: 100%;
      display: block;
      background: #0e579c;
      color: #fff;
      text-align: center;
      height: 5rem;
      line-height: 5rem;
    }
    .el-input__inner{
      border-radius: 0;
      text-align: center;
      height: 5rem;
      line-height: 5rem;
      margin-top: 0.5rem;
    }
  }
  .editform-box:last-child{
    .item-name{
      width: 20%;
    }
    .el-input__inner{
      height: 8rem;
      width: 100%;
      overflow: scroll;
      word-break: break-all;
    }
  }
  .parameter_table{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .el-form-item{
      width: 45%;
      .el-form-item__label{
        color: #000;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        padding: 0;
      }
      .el-input__inner{
        border:1px solid #0e579c;
        padding: 0 1rem;
      }
    }
  }
  .edit_btn_box{
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin:0 auto;
    .btn{
      width: 8rem;
      background: #0e579c;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      color: #fff;
      font-size: 18px;
      border-radius: 5px;
    }
  }
}
</style>
