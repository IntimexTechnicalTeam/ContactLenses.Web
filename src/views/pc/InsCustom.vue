<template>
  <div id="container" v-cloak>
    <!--main-content-->
    <div id="main-content">
      <div class="favorite-box order-box">
        <div class="favorite-box-top">
          <span class="login-register-title">{{$t('Shoppingcart.ShoppingcartTitle')}}    •</span>
          <div class="clear"></div>
        </div>
        <div class="favorite-box-content">
          <div class="order-one shoppingcart-one">
            <!-- <div class="order-one-title shoppingcart-one-title">
              <span class="order-merchant">{{$t('Shoppingcart.Merchant')}}</span>
              <span class="order-product-name">{{$t('Shoppingcart.Product')}}</span>
              <span class="order-quantity">{{$t('Shoppingcart.Quantity')}}</span>
              <span class="order-price">{{$t('Shoppingcart.Price')}}</span>
              <div class="clear"></div>
            </div> -->
            <div class="favorite-one merchant-one" v-for="(one,index) in items" :key="index">
              <div class="favorite-header">
                <div class="favorite-left">
                <a class="product-img" v-bind:href="'/product/Detail/'+one.Product.Sku">
                <img v-bind:src="one.Product.Img_M" alt />
              </a>
              <div class="favorite-one-messge">
                <p class="product-code">{{$t('product.ProductCode')}}：{{one.Product.Code}}</p>
                <p class="product-title">{{$t('product.ProductName')}}：{{one.Product.Name}}</p>
                <span class="parameter">{{$t('product.LensColor')}}：{{one.LensColor}}</span>
                <!-- <p class="product-code">
                  <span v-if="one.AttrName1">{{one.AttrTypeName1}}：{{one.AttrName1}}</span>&nbsp;
                  <span v-if="one.AttrName2">{{one.AttrTypeName2}}：{{one.AttrName2}}</span>&nbsp;
                  <span v-if="one.AttrName3">{{one.AttrTypeName3}}：{{one.AttrName3}}</span>&nbsp;
                </p> -->
                <p class="product-price">
                  <span
                    class="p-price-discount"
                  >{{Currency.Code}} {{(one.Product.SalePrice) | PriceFormat}}</span>
                </p>
              </div>
              </div>
              <div class="favorite-right">
                <div class="merchant-one-calc">
                  <p class="quantity">{{$t('product.Quantity')}}</p>
                  <div class="common-num">
                  <!--   <a
                      class="reduce-num"
                      href="javascript:;"
                      v-on:click=" minusQty(one,one.Id,$event);"
                    >-</a> -->
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
                    <!-- <a class="add-num" href="javascript:;" v-on:click="plusQty(one,one.Id,$event);" :class="{'disabled':one.IsAdd}">+</a> -->
                  </div>
                </div>
                <div class="merchant-del-box">
                  <b class="cart-delete" v-on:click="removeItem(index)">{{$t('product.Delete')}}</b>
                  <button @click="boxShow(index)" class="edit">{{$t('product.EditDetails')}}</button>
                </div>
              </div>
              </div>
              <!-- <div class="merchant-total-price">
                <p>{{Currency.Code}} {{(one.Product.SalePrice * one.Qty) | PriceFormat}}</p>
              </div> -->
              <div class="edit-box" v-show="items[index].boxshow">
                <div class="productInfo">
                  <div class="productInfo-left">
                    <a v-bind:href="'/product/Detail/'+one.Product.Sku" class="productimg">
                      <img v-bind:src="one.Product.Img_M" alt />
                    </a>
                    <div class="product-message">
                      <p class="product-code">
                        {{$t('product.ProductCode')}}：{{one.Product.Code}}
                      </p>
                      <p class="product-title">
                        {{$t('product.ProductName')}}：{{one.Product.Name}}
                      </p>
                      <p class="product-parameter">
                        {{$t('product.LensColor')}}：{{one.LensColor}}
                      </p>
                    </div>
                  </div>
                  <div class="merchant-one-calc">
                    <p class="quantity">
                      {{$t('product.Quantity')}}
                    </p>
                    <div class="common-num">
                      <a href="javascript:;" class="reduce-num" v-on:click="minusQty(one,one.Id,$event)">-</a>
                      <div class="num-content">
                        <input type="text" data-num="1" disabled v-model="one.Qty" v-on:change="updateQty(one,one.Id,$event)" class="input-text">
                      </div>
                      <a href="javascript:;" v-on:click="plusQty(one,one.Id,$event)" class="add-num" :class="{'disabled':one.IsAdd}">+</a>
                    </div>
                  </div>
                </div>
                <span class="edit_title">{{$t('product.RequiredInformation')}}</span>
                <ElForm :model="editForm" :rules="edit" ref="editForm">
                  <div class="itemInformation">
                    <div v-for="(item,index) in (one.LensExtAttrItem)" :key="index" class="editform-box" :id="index">
                      <div class="input-box">
                        <span class="item-name">{{item.MutiLang}}</span>
                        <span class="item-code">{{item.Code}}</span>
                      <ElInput v-model="item.Text" clearable="" :type="index === 6 ? 'textarea' : 'text'" @focus="inputFocus(item,index)" @blur="inputBlur(item,index)" :key="index"></ElInput>
                      </div>
                      <p class="testInput" v-show="one.LensExtAttrItem[index].testShow"></p>
                    </div>
                  </div>
                  <!-- <span class="edit_title">{{$t('product.ToCustomise')}}</span>
                  <div class="parameter_table">
                    <FormItem v-for="(item,index) in (one.LensAttrView)" :key="index" :label="item.AttrName">
                     <ElInput v-model="item.AttrValue" clearable="" @focus="inputFocus(item,index)" @blur="inputBlur(item,index)"></ElInput>
                     <span class="tips" v-show="one.LensAttrView[index].tipShow">{{$t('product.PleaseEnter')}}{{item.AttrName}}</span>
                    </FormItem>
                  </div> -->
                  <span class="edit_title"  :class="one.IsMake === false ? 'customized' : '' ">{{$t('product.ToCustomise')}}</span>
                  <div class="toCustomise" :class="one.IsMake === false ? 'customized' : '' "></div>
                  <div class="edit_btn_box">
                    <b class="btn saveBtn" @click="saveItem(one,index)">{{$t('product.Save')}}</b>
                    <b class="btn canelBtn" @click="Reset(index)">{{$t('product.Reset')}}</b>
                    </div>
                </ElForm>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <InsExpressWay
            @expressError="express=false" @express="express=true" @PickAddressError="PickAddress = false" @PickAddress="PickAddress = true"
            :checkouting="checkouting"
             @getAdditionlCost="showAdditionlCost"
             @getDeliveryDate="showDeliveryDate"
             @getRemark="showRemark"
            @expressChange="(value)=>{this.express = value;}"
            :lockFare="!checkouting" />
        <div  class="payment_warpper">
                <div class="payment_main">
                  <div class="payment_title">{{$t('CheckOut.PayBy')}}</div>
                  <div class="payment_item" v-for="(pay, index) in payments" :key="index">
                    <Radio v-model="payment" :label="pay" :disabled="ShoppingCart.Currency.Code === 'RMB' && pay.Code === 'Stripe'"><img v-bind:src="pay.Img" /><span v-show="pay.Code==='FPS'">{{pay.Desc}}</span></Radio>

                    <p class="noRMBStripe" v-if="ShoppingCart.Currency.Code === 'RMB' && pay.Code === 'Stripe'">{{$t('Message.noRMBStripe')}}</p>
                  </div>
                </div>
        </div>
        <div class="price">
          <div class="price_item">
            <span>{{$t('Order.DeliveryCharge')}}:</span>
            <span>{{ShoppingCart.DefaultCurrency.Code}} {{($store.state.express.DiscountPrice + AdditionlCost) | PriceFormat}}</span>
          </div>
          <div class="price_item">
            <span>{{$t('Order.CommodityPrice')}}:</span>
            <span>{{ShoppingCart.DefaultCurrency.Code}} {{(totalAmount) | PriceFormat}}</span>
          </div>
            <div class="price_item">
            <span>{{$t('CheckOut.Total')}}:</span>
            <span class="DefaultCurrency">{{ShoppingCart.DefaultCurrency.Code}} {{parseFloat((parseFloat(cp))+ $store.state.express.DiscountPrice + AdditionlCost).toFixed(2)}}</span>
            <p v-show="ShoppingCart.DefaultCurrency.Code!=ShoppingCart.Currency.Code" class="Currency">
              <span>≈{{ShoppingCart.Currency.Code}} {{parseFloat(((parseFloat(cp))+ $store.state.express.DiscountPrice + AdditionlCost)*Shoppcart.ExchangeRate).toFixed(2)}}</span>
          </p>
          </div>
        </div>
        <div class="shoppingcart-handle">
          <!-- <p>
            <span>{{$t('Shoppingcart.Total')}}</span>
            <span class="total-price">{{Currency.Code}} {{(totalAmount) | PriceFormat}}</span>
          </p> -->
          <a href="javascript:;" class="btn" @click="submitLogin" v-if="this.$Storage.get('isLogin') === 0">{{$t('Shoppingcart.Login')}}</a>
          <a href="javascript:;" class="btn" @click="checkOut" v-if="this.$Storage.get('isLogin') === 1">{{$t('Shoppingcart.SubmitOrder')}}</a>
        </div>
      </div>
    </div>
    <!--main-content-->
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// import { Form, Input, Message, FormItem, Button } from 'element-ui';
import { Form, Input, Row, Col, Button, Select, Option, FormItem, Card, Message, Radio } from 'element-ui';
import ShopCart from '../../model/ShopCart';
import ShopCartItem from '../../model/shopCartItem';
import PaymentM from '@/model/payment';
import Currency from '../../model/currency';
import Order, { CreateOrder } from '@/model/order';
import Address from '../../model/address';
import { Country } from '@/model/country';
import lang from '@/lang';
import { Province } from '@/model/province';
import storage from '@/sdk/common/Storage';
import Coupon from '@/model/coupon';
import Express from '@/model/express';
import PickupAddress from '@/model/pickupAddress';
import PromotionDiscount from '@/model/PromotionDiscount';
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
    Form,
    Input,
    FormItem,
    Row,
    Col,
    Button,
    Select,
    Option,
    Card,
    Radio,
    InsExpressWay: () => import(/* webpackChunkName: "checkout" */ '@/components/temp/InsExpressWay.vue')
  }
})
export default class InsShoppingcart extends Vue {
  private ShoppingCart:ShopCart = new ShopCart();
  private Order:Order =new Order();
  private Shoppcart:ShopCart = new ShopCart();
  private totalAmount:number = 0;
  private allShopCart:boolean = false;
  private payment: PaymentM = new PaymentM();
  private payments:PaymentM[] = [new PaymentM()];
  private orderId:number = 0;
  private delete1: any = [];
  private promotionCode:string = '';
  private checkouting = true;
  private express:boolean = false;
  private PickAddress: boolean = false;
  // 優惠券相關
  private coupon:Coupon[] = [];
  private selectedCoupon:Coupon[] = [];
  private multiple:Coupon[] = [];
  private single:Coupon[] = [];
  private all = {};
  private currentPrice: number = 0;
  private ll: boolean = false;
  private exp: number = 0;
  COloading = false;
  private showDistcount :boolean = false;
  private AdditionlCost:number = 0;
  private TimeRangeId:string='';
  private DeliveryDate:string='';
  private Remark:string='';
  private ProductList:any = [];
  private SettlementProfilesList:any = [];
  private DiscountVal: number = 0;
  currentCode:string='HKD';
  memberInfo:any={};
  /* addAddress = false;
  addressBlock = false; */
  AddrShow = false;
  editForm: any = {
    ShoppingCartId: '',
    Sku: '',
    LensExtAttrItem: [
      {
        /* Text: '',
        num1: '',
        num2: '',
        textarea: '' */
      }
    ],
    LensAttrView: {},
    AddressId: ''
  }
  get edit () {
    return {
      /* Text: [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }
      ] */
    };
  }
 get discount () {
    return this.$store.state.discount;
  }
  get cp () {
    return this.discount.Id === '-1'
      ? this.currentPrice
      : (this.discount.IsDiscount ? ((this.currentPrice) * (1 - this.discount.Favorable / 100)).toFixed(2) : (this.currentPrice) - this.discount.Favorable);
  }
  prodcutSrc: string = require('@/assets/Images/270_b.jpg');
  // boxshow = true;
  step: number = 1;
  // itemsAmount: number = 0;
  // ItemsTaxAmount: number = 0;
  Currency: Currency = new Currency();
  MaxQty: number = 20;
  // cartItems: any[] = [];
  // currentCode: any = '';
  items: any[] = [
  ];
  // testText = '';
  // item: any[] =[];
  activeIndex = null;
  itemQty:number=0;
  private UpdateQueQue:Update[] = [];
  isAdd:boolean = false;
  addressList: Address[] = [];
  CountryId: number = 786;
  countryList: any[] = [];
  private province!:Province;
  provinceList: any[] = [];
  validator: any = '';
  addr: any = {};
  value: any = '';
  // private addressList:Address[] = [];
  addListlength:any='';
  private AddForm = {
    FirstName: '',
    LastName: '',
    Mobile: '',
    Phone: '',
    PostalCode: '',
    CountryId: '',
    Province: '',
    Address: '',
    Default: ''
  }
  showAdditionlCost (valA, valB) {
    this.AdditionlCost = valA;
    this.TimeRangeId = valB;
  }
  showDeliveryDate (val) {
    this.DeliveryDate = val;
    console.log(this.DeliveryDate, 'this.DeliveryDatethis.DeliveryDatethis.DeliveryDate');
  }
  showRemark (val) {
    this.Remark = val;
  }
  get newaddress () {
    return {
      FirstName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserName'),
          trigger: 'blur'
        }
      ],
      LastName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserLastName'),
          trigger: 'blur'
        }
      ],
      Mobile: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserPhone'),
          trigger: 'blur'
        },
        { validator: function (rule, value, callback) {
             /* eslint-disable */
            var mobile = /^(\+)?(\d{0,4}\-?)?\d{7,11}$/;
            if ( mobile.test(value) === false ) {
              var t = lang.messages[storage.get('locale')].Input['phoneincorrect'];
                callback(new Error(t));
            } else {
                callback();
            }
        },
        trigger: 'blur' }
      ],
      CountryId: [
        {
          required: true,
          message: this.$t('Address.Country'),
          trigger: ['blur', 'change']
        }
      ],
      Address: [
        {
          required: true,
          message: this.$t('Address.Address'),
          trigger: 'blur'
        }
      ]
    };
  }
  updateProfile (profile) {
    if (profile.Gender === '') profile.Gender = '0';
    return this.$Api.member.updateProfile(profile);
  }
  Cancel () {
    this.AddrShow = false;
  }
  getShop() {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
      this.$store.dispatch('setAddress', this.$Api.checkout.getAddress2());
      let pm = this.$Api.checkout.getPaymentMethod().then(result => {
        this.payments = result.Payment;
      });
      Promise.all([this.$store.state.shopCart, this.$store.state.address, pm]).then((result) => {
        console.log(result,'resultresult');
        let sc = result[0];
        this.totalAmount = sc.ShopCart.TotalAmount;
        console.log(this.totalAmount,'this.totalAmount');
        this.currentPrice = this.totalP;
        this.Shoppcart = sc.ShopCart;
        for (var i = 0; i < this.Shoppcart.Items.length; i++) {
         this.Shoppcart.Items[i].DiscountVal = 0;
          }

        this.$HiddenLayer();
        this.$Api.member.getActiveCoupon({ Page: 1, PageSize: 10 }).then((result) => {
          this.coupon = result.Coupon;
          this.coupon.forEach((element) => {
            if (element.MeetAmount > this.totalP) return;
            element.canCheck = false;
            this.$set(this.all, element.Id, element);
            if (element.IsAdditional === true) this.multiple.push(element);
            else this.single.push(element);
          });
        });
      });
  }
  get totalP () {
    this.currentPrice = this.totalAmount;
    return this.totalAmount;
  }
  get exdp () {
    this.exp = this.$store.state.express.DiscountPrice;
    return Number(this.$store.state.express.DiscountPrice as string);
  }
  created () {
     this.getShop();
    this.load().then(() => { this.$HiddenLayer(); });
  }
  load () {
    let pm = this.$Api.checkout.getPaymentMethod().then(result => {
      this.payments = result.Payment;
    });
    let load = this.$Api.shoppingCart.shoppingGet().then((result) => {
      this.ShoppingCart = result.ShopCart;
      this.Currency = result.ShopCart.DefaultCurrency;
      this.items = result.ShopCart.Items;
      this.items.forEach(v => {
        this.$set(v, 'IsAdd', false);
      });
      if (this.$Storage.get('isLogin') === 1 && this.ShoppingCart.Items.length > 0) {
        this.address();
      }
      if (this.ShoppingCart.Items.length === 0) this.$Confirm(this.$t('Message.Message'), this.$t('Shoppingcart.None'), () => { this.$router.push('/product/search/-'); }, () => { this.$router.push('/'); });
    });
    this.loadItems();
    return load;
  }
  @Watch('payments')
  onPaymentMethodsChange (o, n) {
    if (this.payments.length > 0) this.payment = this.payments[0];
  }
  address () {
    this.$Api.delivery.getAddress().then((result) => {
      this.addressList = result.data;
    });
  }
  addClick () {
    this.AddrShow = true;
  }
  changeList(index) {
    this.activeIndex = index;
    this.editForm.AddressId = this.addressList[index].DeliveryId;
  }
  loadItems () {
    var _this = this;
    var itemsprice = 0;
    var Currencys;
    var itemQ;
    // _this.items.forEach(element => {
    //   itemsprice += element.Product.SalePrice * element.Qty;
    //   Currencys = element.Product.Currency.Code;
    //   itemQ = element.Qty;
    // });
    // // _this.Currency = Currencys;
    // _this.totalAmount = itemsprice;
    _this.itemQty = itemQ;
    var InputBox=document.querySelectorAll('.input-box');
    var ItemsLea=this.items;
    for(var r=0;r<ItemsLea.length;r++){
      for(var i=0;i<InputBox.length;i++){
        var Leai=ItemsLea[r].LensExtAttrItem;
        if(Leai[2].Visable === 0){
          Leai[2].MutiLang = '';
        }
        if(Leai[4].Visable === 0){
          Leai[4].MutiLang = '';
        }
      }
    }
  }
  @Watch('items', { deep: true })
  onItemsChange (o, n) {
    this.loadItems();
  }
  removeItem (one) {
    // this.loadItems();
    let item:ShopCartItem = this.items.splice(one, 1)[0];
    this.$Api.shoppingCart.removeItem(item.Id).then(result => {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
    });
  }
boxShow(index) {
    Vue.set(this.items[index], "boxshow", true);
      if (!this.items[index].IsMake) {
            var Lt=this.items[index].LensExtAttrItem;
            Lt.splice(7,10)
          }
  }
  //鼠标点入
  inputFocus(item, index) {
    //Vue.set(item, 'testShow', false)
    var EditBox=document.querySelectorAll('.editform-box');
    for(var i=0;i<EditBox.length;i++){
      var testText=EditBox[i].getElementsByClassName('testInput')[0];
      if(EditBox[i].id === '0'){
        if(item.Id === 'CustomerCode'){
          if(item.Text === ''){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.CustomerCodeName') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }else if(EditBox[i].id === '1'){
        if(item.Id === 'ResultLeft'){
          if(item.Text === ''){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Result') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }else if(EditBox[i].id === '2'){
        if(item.Id === 'ResultRight'){
          if(item.Text === ''){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Result') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }else if(EditBox[i].id === '3'){
        if(item.Id === 'CorneaLeft'){
          if(item.Text === ''){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Cornea') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }else if(EditBox[i].id === '4'){
        if(item.Id === 'CorneaRight'){
          if(item.Text === ''){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Cornea') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }else if(EditBox[i].id === '5'){
        if(item.Id === 'LensDiameter'){
          if(item.Text === ''){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.LensDiameter') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }
    }
  }
  //鼠标离开
  inputBlur(item, index) {
    //Vue.set(item, 'testShow', false)
    var EditBox=document.querySelectorAll('.editform-box');
    for(var i=0;i<EditBox.length;i++){
      var testText=EditBox[i].getElementsByClassName('testInput')[0];
      var text = item.Text;
      if(EditBox[i].id === '0'){
        if(item.Id === 'CustomerCode'){
          var Cvalue= /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
          if(item.Text === '' || Cvalue.test(text) === false){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.CustomerCodeName') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }else if(EditBox[i].id === '1'){
        var Rvalue=/^((?:-(?:([0-9]|[1][0-9]).([0-9]{2})|([0-9]|1[0-9]|20)))|([0-9]|[1][0-9]).([0-9]{2})|([0-9]|1[0-9]|20))$/;
        if(item.Id === 'ResultLeft'){
          if(item.Text === '' || Rvalue.test(text) === false){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Result') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }else if(EditBox[i].id === '2'){
        var Rvalue=/^((?:-(?:([0-9]|[1][0-9]).([0-9]{2})|([0-9]|1[0-9]|20)))|([0-9]|[1][0-9]).([0-9]{2})|([0-9]|1[0-9]|20))$/;
        if(item.Id === 'ResultRight'){
          if(item.Text === '' || Rvalue.test(text) === false){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Result') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }else if(EditBox[i].id === '3'){
        var Rvalue=/^((3[6-9]|3[6-9].[0-9]{1,2})|(4[0-8]|4[0-7].[0-9]{1,2}))$/;
        if(item.Id === 'CorneaLeft'){
          if(item.Text === '' || Rvalue.test(text) === false){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Cornea') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }else if(EditBox[i].id === '4'){
        var Rvalue=/^((3[6-9]|3[6-9].[0-9]{1,2})|(4[0-8]|4[0-7].[0-9]{1,2}))$/;
        if(item.Id === 'CorneaRight'){
          if(item.Text === '' || Rvalue.test(text) === false){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Cornea') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }
      else if(EditBox[i].id === '5'){
        var Rvalue=/^([8-9]|[8-9].[0-9]{2}|1[0-1]|1[0-1].[0-5]{2})$/;
        if(item.Id === 'LensDiameter'){
          if(item.Text === '' || Rvalue.test(text) === false){
            Vue.set(item,'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.LensDiameter') as string
          }else{
            Vue.set(item,'testShow',false);
            testText.innerHTML = ''
          }
        }
      }
    }
  }
  saveItem (one,index) {
    Vue.set(this.items[index], 'ShoppingCartId', this.items[index].Id);
    Vue.set(this.items[index], 'Sku', this.items[index].Product.Sku);
    for (var i = 0; i < this.items[index].LensExtAttrItem.length; i++) {
      Vue.set(this.items[index], this.items[index].LensExtAttrItem[i].Id, this.items[index].LensExtAttrItem[i].Text);
    }
    var EditBox=document.querySelectorAll('.editform-box');
    var Lat=this.items[index].LensExtAttrItem;
    if(this.items[index].CorneaLeft === '' || this.items[index].CorneaRight === '' || this.items[index].CustomerCode === '' || this.items[index].LensDiameter === '' || this.items[index].ResultLeft === '' || this.items[index].ResultRight === '') {
      Message({
        message: this.$t('Shoppingcart.SaveError') as string,
        type: 'error',
        duration:3500
      });
      for(var i=0;i<EditBox.length;i++){
        var testText=EditBox[i].getElementsByClassName('testInput')[0];
        if(EditBox[i].id === '0'){
          if(Lat[0].Text === ''){
            Vue.set(Lat[0],'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.CustomerCodeName') as string;
          }
        }
        if(EditBox[i].id === '1'){
          if(Lat[1].Text === ''){
            Vue.set(Lat[1],'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Result') as string;
          }
        }
        if(EditBox[i].id === '2'){
          if(Lat[2].Text === ''){
            Vue.set(Lat[2],'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Result') as string;
          }
        }
        if(EditBox[i].id === '3'){
          if(Lat[3].Text === ''){
            Vue.set(Lat[3],'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Cornea') as string;
          }
        }
        if(EditBox[i].id === '4'){
          if(Lat[4].Text === ''){
            Vue.set(Lat[4],'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.Cornea') as string;
          }
        }
        if(EditBox[i].id === '5'){
          if(Lat[5].Text === ''){
            Vue.set(Lat[5],'testShow',true);
            testText.innerHTML = this.$t('Shoppingcart.LensDiameter') as string;
          }
        }
      }
    }else if(this.items[index].IsMake) {
      if(this.items[index].Power === '' || this.items[index].BC === '' || this.items[index].Diam === '' || this.items[index].OZ === '' || this.items[index].CT === '' || this.items[index].TwoCW === '' || this.items[index].ThreeCW === '' || this.items[index].FourCW === '' || this.items[index].FiveCW === '' || this.items[index].PCW === '') {
        for(var i=0;i<EditBox.length;i++){
        var testText=EditBox[i].getElementsByClassName('testInput')[0];
        if(EditBox[i].id === '7'){
          if(Lat[7].Text === ''){
            Vue.set(Lat[7],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[7].MutiLang as string;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '8'){
          if(Lat[8].Text === ''){
            Vue.set(Lat[8],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[8].MutiLang as string;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '9'){
          if(Lat[9].Text === ''){
            Vue.set(Lat[9],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[9].MutiLang as string;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '10'){
          if(Lat[10].Text === ''){
            Vue.set(Lat[10],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[10].MutiLang as string;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '11'){
          if(Lat[11].Text === ''){
            Vue.set(Lat[11],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[11].MutiLang as string;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '12'){
          if(Lat[12].Text === ''){
            Vue.set(Lat[12],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[12].MutiLang as string;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '13'){
          if(Lat[13].Text === ''){
            Vue.set(Lat[13],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[13].MutiLang as string;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '14'){
          if(Lat[14].Text === ''){
            Vue.set(Lat[14],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[14].MutiLang as string;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '15'){
          if(Lat[15].Text === ''){
            Vue.set(Lat[15],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[15].MutiLang as string;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '16'){
          if(Lat[16].Text === ''){
            Vue.set(Lat[16],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[16].MutiLang as string;
          }else{
            testText.innerHTML = ''
          }
        }
      }
      }else{
        Message({
          message: this.$t('Shoppingcart.Savedsuccess') as string,
          type: 'success',
          duration:3000
        })
        Vue.set(this.items[index], 'boxshow', false);
      }
    }else{
      Message({
        message: this.$t('Shoppingcart.Savedsuccess') as string,
        type: 'success',
        duration:3000
      })
      Vue.set(this.items[index], 'boxshow', false);
    }
  }
  Reset (index) {
    for (var a = 0; a < this.items[index].LensExtAttrItem.length; a++) {
      this.items[index].LensExtAttrItem[a].Text = '';
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
    // console.log(event, 'eventevent');
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
    // this.UpdateQueQue.push(new Update(id, one.Qty));
    // _this.loadItems();
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
  submitLogin () {
    this.$router.push('/account/login?returnurl=/account/checkout');
  }
  getProfile() {
     var _this=this;
      this.$Api.member.getProfile().then(
        function (data) {
          if (data) {
              _this.memberInfo = data;
          }
        },
      );
  }
  pay () {
    let order;
    let profile = this.memberInfo;
    let OrderD={
      AddressId: this.$store.state.pickUpExpress ? -1 : this.$store.state.selectAddress.DeliveryId,
      DeliveryType:'D',
      ExpressId: this.$store.state.express.Id,
      ExpressPointId: this.$store.state.expressPoint.Id,
      PaymentMethod: this.payment.Id,
      PickupDate: "",
      PickupCompanyName: "",
      PickupAddress: "",
      PickupAddressPhone: this.$store.state.DPickPhone,
      PickupTime:'',
      PickUpName: this.$store.state.DPickName,
      PickUpPhone: "",
      DeliveryDate: this.DeliveryDate,
      DeliveryTime: "",
      ComeFrom: 0,
      TimeRangeId: this.TimeRangeId,
      Items:this.items
    }
    let OrderP={
      AddressId: this.$store.state.pickupAddress.Id,
      DeliveryType:'P',
      ExpressId: this.$store.state.express.Id,
      ExpressPointId: this.$store.state.pickupAddress.ExpressPointId,
      PaymentMethod: this.payment.Id,
      PickupDate: this.$store.state.pickupAddress.PickupDate,
      PickupCompanyName: this.$store.state.pickupAddress.PickupCompanyName,
      PickupAddress:  this.$store.state.pickupAddress.PickupAddress,
      PickupAddressPhone: this.$store.state.pickupAddress.PickupAddressPhone,
      PickupTime:  this.$store.state.pickupAddress.PickupTime,
      PickUpName: this.$store.state.pickupAddress.Name,
      PickUpPhone: this.$store.state.pickupAddress.Phone,
      DeliveryDate: this.DeliveryDate,
      DeliveryTime: "",
      ComeFrom: 0,
      TimeRangeId: this.TimeRangeId,
      Items:this.items
    }
    if (this.$store.state.DeliveryType === 'D') order = OrderD
      else if (this.$store.state.DeliveryType === 'P') order = OrderP;
    if (this.$store.state.pickUpExpress && !this.$store.state.PickupInfoRequire) {
      this.createOrder(order);
    } else {
      if ((!order.PickupName && !profile.FirstName) && (!order.Mobile && !profile.PickupPhone)) { // 若無姓名與電話， 則updateprofile
        this.$Confirm(
          this.$t('Message.Message'),
          this.$t('CheckOut.Use') + ' ' + order.PickupName + ' ' + this.$t('CheckOut.As') + ' ' + this.$t('CheckOut.Name') + '</br>' +
        this.$t('CheckOut.Use') + ' ' + order.PickupPhone + ' ' + this.$t('CheckOut.As') + ' ' + this.$t('CheckOut.Phone'),
          () => {
            let pn = order.PickupName.split(' ');
            if (pn.length > 1) {
              profile.FirstName = pn[0];
              profile.LastName = pn[1];
            } else {
              profile.FirstName = order.PickupName;
              profile.LastName = order.PickupName;
            }
            profile.Mobile = order.PickupPhone;
            this.updateProfile(profile).then(() => { this.createOrder(order); });
          },
          () => { this.createOrder(order); }
        );
      } else if ((!order.PickupName && !profile.FirstName) && (!order.PickupPhone && profile.Mobile)) { // 若無姓名， 則updateprofile
        this.$Confirm(
          this.$t('Message.Message'),
          this.$t('CheckOut.Use') + ' ' + order.PickupName + ' ' + this.$t('CheckOut.As') + ' ' + this.$t('CheckOut.Name'),
          () => {
            let pn = order.PickupName.split(' ');
            if (pn.length > 1) {
              profile.FirstName = pn[0];
              profile.LastName = pn[1];
            } else {
              profile.FirstName = order.PickupName;
              profile.LastName = order.PickupName;
            }
            this.updateProfile(profile).then(() => { this.createOrder(order); });
          },
          () => { this.createOrder(order); }
        );
      } else if ((!order.PickupName && profile.FirstName) && (!order.PickupPhone && !profile.Mobile)) { // 若無電話， 則updateprofile
        this.$Confirm(
          this.$t('Message.Message'),
          this.$t('CheckOut.Use') + ' ' + order.PickupPhone + ' ' + this.$t('CheckOut.As') + ' ' + this.$t('CheckOut.Phone'),
          () => { profile.Mobile = order.PickupPhone; this.updateProfile(profile).then(() => { this.createOrder(order); }); },
          () => { this.createOrder(order); }
        );
      } else if (this.Shoppcart.Currency.Code === 'RMB' && this.payment.Code === 'Stripe') {
        this.$Confirm(
          this.$t('Message.Message'),
          this.$t('Message.noRMBStripe')
        );
      } else {
        this.createOrder(order);
      }
    }
  }
    createOrder (order) {
      let temp = {
        AddressId: this.editForm.AddressId,
        Items: this.items
      };
      console.log(order,'66666666666666666666666');
      // （新）順豐自提點判斷處理
      if (this.$store.state.newSF) {
        // order.DeliveryType = 'P';
        order.ComeFrom = 1;
        order.AddressId = -1;
        order.ExpressId = this.$store.state.express.Id;
        order.ExpressPointId = this.$store.state.expressPoint.Id;
      }

      this.COloading = true;
      this.$Api.order.saveOrder(
        order
      ).then((result) => {
        if (result.Succeeded) {
          this.orderId = result.ReturnValue;
          this.$store.dispatch('setDeliveryType', 'D');
          this.$store.dispatch('setExpress', new Express());
          this.$store.dispatch('setPickupAddress', new PickupAddress());
          this.$store.dispatch('setPromotionDiscount', new PromotionDiscount());
          this.$router.push({ name: 'completeCheckout', params: { id: result.ReturnValue } });
          this.COloading = false;
        } else {
          console.log(temp,'temptemptemptemptemptemptemptemptemp');
          this.FormSubmitCheck(temp);
          // Vue.prototype.$Confirm('error', result.Message, () => { this.COloading = false; }, () => { this.COloading = false; });
          }
      });
    }
    checkOut () {
      // （新）順豐自提點判斷處理
      if (this.$store.state.newSF) {
        if (this.$store.state.expressPoint.Id === '-1') {
          this.$Confirm(
            this.$t('Message.Message'),
            this.$t('Message.PlsAddPiUpAddr')
          );
          return;
        } else {
          this.$store.dispatch('setDeliveryType', 'P');
        }
      }

      if (this.$store.state.DeliveryType === 'D' && !this.express) { this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.confirmAddress')); return; }
      if (this.$store.state.DeliveryType === 'P' && !this.PickAddress && this.$store.state.PickupInfoRequire) {
        this.$Confirm(
          this.$t('Message.Message'), this.$t('CheckOut.PickAddressError')
        );
        return;
      } else if (this.$store.state.DeliveryType === 'P' && this.PickAddress) {
        this.$Api.delivery.savePickupInfo(this.$store.state.pickupAddress.Id, this.$store.state.pickupAddress.CompanyAddress);
      }
      if (this.$store.state.DeliveryType === 'D' && !this.PickAddress && this.$store.state.pickUpExpress) { this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.PickAddressError')); return; }

      if (this.payment !== undefined) {
        this.$Api.paymentApi.savePayMethod(this.payment.Id).then((result) => {
          this.pay();
          this.$store.dispatch('setPaymentMethod', this.payment);
        });
      } else {
        this.$Confirm(this.$t('Message.Message'));
      }
    }
    FormSubmitCheck(val) {
      var ItemsArr = val.Items;
        for(var i = 0; i < ItemsArr.length; i++){
          Message({
            message: this.$t('Shoppingcart.SaveError') as string,
            type: 'error',
            duration:3500
          })
          var LatList=ItemsArr[i].LensExtAttrItem;
          var EditBox=document.querySelectorAll('.editform-box');
          for(var y=0;y<LatList.length;y++){
            console.log(ItemsArr[i])
            for(var z=0;z<EditBox.length;z++){
                var testText=EditBox[z].getElementsByClassName('testInput')[0];
                if (ItemsArr[i].IsMake) {
                  if(EditBox[z].id === '7'){
                    if(LatList[7].Text === ''){
                      Vue.set(LatList[7],'testShow',true);
                      testText.innerHTML = this.$t('product.PleaseEnter') as string + LatList[7].MutiLang;
                      Vue.set(ItemsArr[i], 'boxshow', true);
                    }
                  }
                  if(EditBox[z].id === '8'){
                    if(LatList[8].Text === ''){
                      Vue.set(LatList[8],'testShow',true);
                      testText.innerHTML = this.$t('product.PleaseEnter') as string + LatList[8].MutiLang;
                      Vue.set(ItemsArr[i], 'boxshow', true);
                    }
                  }
                  if(EditBox[z].id === '9'){
                    if(LatList[9].Text === ''){
                      Vue.set(LatList[9],'testShow',true);
                      testText.innerHTML = this.$t('product.PleaseEnter') as string + LatList[9].MutiLang;
                      Vue.set(ItemsArr[i], 'boxshow', true);
                    }
                  }
                  if(EditBox[z].id === '10'){
                    if(LatList[10].Text === ''){
                      Vue.set(LatList[10],'testShow',true);
                      testText.innerHTML = this.$t('product.PleaseEnter') as string + LatList[10].MutiLang;
                      Vue.set(ItemsArr[i], 'boxshow', true);
                    }
                  }
                  if(EditBox[z].id === '11'){
                    if(LatList[11].Text === ''){
                      Vue.set(LatList[11],'testShow',true);
                      testText.innerHTML = this.$t('product.PleaseEnter') as string + LatList[11].MutiLang;
                      Vue.set(ItemsArr[i], 'boxshow', true);
                    }
                  }
                  if(EditBox[z].id === '12'){
                    if(LatList[12].Text === ''){
                      Vue.set(LatList[12],'testShow',true);
                      testText.innerHTML = this.$t('product.PleaseEnter') as string + LatList[12].MutiLang;
                      Vue.set(ItemsArr[i], 'boxshow', true);
                    }
                  }
                  if(EditBox[z].id === '13'){
                    if(LatList[13].Text === ''){
                      Vue.set(LatList[13],'testShow',true);
                      testText.innerHTML = this.$t('product.PleaseEnter') as string + LatList[13].MutiLang;
                      Vue.set(ItemsArr[i], 'boxshow', true);
                    }
                  }
                  if(EditBox[z].id === '14'){
                    if(LatList[14].Text === ''){
                      Vue.set(LatList[14],'testShow',true);
                      testText.innerHTML = this.$t('product.PleaseEnter') as string + LatList[14].MutiLang;
                      Vue.set(ItemsArr[i], 'boxshow', true);
                    }
                  }
                  if(EditBox[z].id === '15'){
                    if(LatList[15].Text === ''){
                      Vue.set(LatList[15],'testShow',true);
                      testText.innerHTML = this.$t('product.PleaseEnter') as string + LatList[15].MutiLang;
                      Vue.set(ItemsArr[i], 'boxshow', true);
                    }
                  }
                  if(EditBox[z].id === '16'){
                    if(LatList[16].Text === ''){
                      Vue.set(LatList[16],'testShow',true);
                      testText.innerHTML = this.$t('product.PleaseEnter') as string + LatList[16].MutiLang;
                      Vue.set(ItemsArr[i], 'boxshow', true);
                    }
                  }
                }else{
                  var Cr=ItemsArr[i].LensExtAttrItem;
                  Cr.splice(7,10)
                }
                if(EditBox[z].id === '0'){
                  if(LatList[0].Text === ''){
                    Vue.set(LatList[0],'testShow',true);
                    testText.innerHTML = this.$t('Shoppingcart.CustomerCodeName') as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                }
                if(EditBox[z].id === '1'){
                  if(LatList[1].Text === ''){
                    Vue.set(LatList[1],'testShow',true);
                    testText.innerHTML = this.$t('Shoppingcart.Result') as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                }
                if(EditBox[z].id === '2'){
                  if(LatList[2].Text === ''){
                    Vue.set(LatList[2],'testShow',true);
                    testText.innerHTML = this.$t('Shoppingcart.Result') as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                }
                if(EditBox[z].id === '3'){
                  if(LatList[3].Text === ''){
                    Vue.set(LatList[3],'testShow',true);
                    testText.innerHTML = this.$t('Shoppingcart.Cornea') as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                }
                if(EditBox[z].id === '4'){
                  if(LatList[4].Text === ''){
                    Vue.set(LatList[4],'testShow',true);
                    testText.innerHTML = this.$t('Shoppingcart.Cornea') as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                }
                if(EditBox[z].id === '5'){
                  if(LatList[5].Text === ''){
                    Vue.set(LatList[5],'testShow',true);
                    testText.innerHTML = this.$t('Shoppingcart.LensDiameter') as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                }
              }
            }
          }
    }
  LoadData () {
      this.$Api.shoppingCart.LoadData().then((result) => {
        this.currentCode = result.DefaultCurrency.Code;
      });
    }
    mounted () {
    this.getProfile();
    this.LoadData();
  }
  @Watch('this.addListlength')
  onCountryChange (n, o) {

  }
}
</script>
<style scoped lang='less'>
  .customized{
    display: none;
  }
/*我的最爱*/
  .disabled {
      pointer-events: none;
      filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
      -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
      opacity: 0.5; /*其他，透明度50%*/
  }
#main-content {
  width: 1200px;
  margin: 0 auto;
}
/*购物流程*/
.favorite-box{
  padding-top: 60px;
  padding-bottom: 60px;
}
.favorite-box-content {
  margin-top: 20px;
}
.favorite-header{
  width: 97%;
  margin:0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .favorite-left{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
  }
  .product-img{
    display: block;
    width: 139px;
    height: 139px;
    overflow: hidden;
    border-radius: 25px;
    img{
      width: 100%;
    }
  }
  .favorite-one-messge{
    margin-left: 5%;
    p{
      font-size: 20px;
      color:#000;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
    }
    .parameter{
      height: 30px;
      line-height: 30px;
    }
  }
}
.favorite-right{
  width:380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .merchant-one-calc{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .quantity{
      font-size: 20px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
      color: #000;
    }
    .common-num{
      .num-content{
        .input-text{
          border:none;
          background: #fff;
          font-size: 20px;
          color:#000;
          font-weight: bold;
          margin-left: 30px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
.order-one .product-price {
  margin-top: 14px;
}
.order-one .product-price .p-price-discount {
  color: #d92526;
  font-size: 16px;
}
.shoppingcart-one-title .order-product-name {
  width: 48.7%!important;
  margin-left: 1.6%;
  text-indent: 0px!important;
}
.shoppingcart-one-title span {
  font-size: 16px;
}
.order-one-title span {
  color: #1b1b1b;
  font-size: 14px;
  float: left;
  line-height: 35px;
}
.favorite-one .product-img img {
  width: 100%;
}
.favorite-one-messge {
  width: 51.7%;
  text-align: left;
  .parameter{
    color:#000;
    font-weight: bold;
  }
}
/* .merchant-one:hover {
  background: #efefef;
} */

.merchant-del-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin-top: 30px;
}
.editinformation{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  span{
    margin-top: 30px;
  }
  input{
    margin-top: 30px;
  }
}
.edit-title{
  color:#111;
  font-size: 20px;
  margin-right: 30px;
  color: #010101;
  font-weight: bold;
}
.edit_btn_box{
  display: flex;
  flex-direction: row;
  width: 60%;
  margin:30px auto;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  .btn{
    width: 45%;
    height: 40px;
    line-height: 40px;
    background: #0e579c;
    color: #fff;
    border:none;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
  }
  .canelBtn{
    background: none;
    height: 36px;
    border:2px solid #0e579c;
    color: #0e579c;
  }
}

.shoppingcart-handle {
  padding: 0 10px;
  text-align: right;
}
.AddAddress-box{
  width:60%;
  overflow: hidden;
  margin:0 auto;
}
.shoppingcart-handle span {
  display: inline-block;
  font-size: 20px;
  color: #333;
  line-height: 25px;
}

.shoppingcart-handle .total-price {
  width: 230px;
  font-size: 24px;
  color: #d92526;
}

.shoppingcart-handle .btn {
  display: inline-block;
  width: 250px;
  height: 45px;
  line-height: 45px;
  color: #fff;
  font-size: 26px;
  text-align: center;
  margin-top: 50px;
  background-color: #0e579c;
  border-radius: 5px;
}
.common-num a {
  float: left;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  color: #999999;
}
.cart-delete:hover {
  background-color: #0e579c;
  color: #fff;
}
.cart-delete,
.edit {
  display: inline-block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.cart-delete{
  border:2px solid #0e579c;
  color: #0e579c;
}
.edit{
  border:none;
  color:#fff;
  background: #0e579c;
}
.favorite-box .login-register-title {
  margin-left: 0;
}
.favorite-box-top{
  width: 94%;
  margin:0 auto;
}
.login-register-title {
  float: left;
  height: 45px;
  line-height: 45px;
  margin-left: 160px;
  text-align: center;
  color:#0b57a3;
  font-weight: bold;
  font-size: 2rem;
}
.merchant-one {
  border-top: 0;
}
.favorite-one {
  box-sizing: border-box;
  padding: 30px 20px;
  transition: 0.5s ease;
  -webkit-transition: 0.5s ease;
  -moz-transition: 0.5s ease;
  -ms-transition: 0.5s ease;
}
.userAddress{
  margin-top: 30px;
  .choose{
    font-size: 25px;
    color:#0e579c;
    line-height: 30px;
    font-weight: bold;
    border-bottom: 2px solid #0e579c;
  }
  .address{
    width: 1180px;
    padding: 10px 10px;
    margin:50px auto;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .checked{
      width: 20px;
      height: 20px;
      border:2px solid #0e579c;
      border-radius: 50%;
      margin-right: 20px;
    }
    .information-box{
      width: 765px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      .addInfo{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        width: 70%;
        span{
          text-align: left;
          font-size: 16px;
          color: #000;
          height: 30px;
          line-height: 30px;
          width: 100%;
          display: block;
          width:250px;
          font-weight: bold;
          background: url(/images/pc/iov-required.png) left center no-repeat;
          padding-left: 13px;
        }
        span:last-child{
          width: 100%;
        }
        span:nth-child(2){
          background: none;
        }
      }
    }
    .btnBox{
      width: 415px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .cart-delete{
        background: none;
        padding: 0;
      }
      .cart-delete:hover{
          background: #0e579c;
      }
      .edit{
        margin-left: 65px;
      }
    }
  }
}

.active{
  box-shadow: 0 0 15px #dbdbdb;
  border-radius: 20px;
  padding: 15px 1%;
  .checked{
    background: url(/images/pc/choose.png) center center no-repeat;
    background-size: 100%;
  }
}
.addAddress{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  .clickAdd{
    border:2px solid #0e579c;
    color:#0e579c;
    font-size: 18px;
    height: 50px;
    line-height: 50px;
    padding: 0 2rem;
    border-radius: 10px;
    width: 280px;
    background: none;
    font-weight: bold;
  }
}
.noAddress{
  margin: 30px auto;
  text-align: center;
  font-size: 30px;
  color:#000;
  font-weight: bold;
}
</style>
<style lang="less">
.edit-box{
  width:96%;
  margin:63px auto 30px auto;
  box-shadow: 0 0 20px #d4d4d4;
  padding: 30px 2%;
  border-radius: 20px;
  .productInfo{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .productInfo-left{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 60%;
      .productimg{
        display: block;
        width: 139px;
        overflow: hidden;
        height: 139px;
        border-radius: 25px;
        img{
          width: 100%;
        }
      }
      .product-message{
        margin-left: 30px;
        p{
          color: #000;
          font-size: 20px;
          height: 30px;
          line-height: 30px;
          font-weight: bold;
        }
        .product-parameter{
          font-weight: normal;
        }
      }
    }
    .merchant-one-calc{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-right: 170px;
      .quantity{
        font-size: 20px;
        font-weight: bold;
        color:#000;
      }
      .common-num{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border:1px solid #0e579c;
        border-radius: 30px;
        width: 100px;
        margin-left: 20px;
        a{
          width: 20px;
          height: 20px;
          display: block;
          background: #0e579c;
          color: #fff;
          text-align: center;
          line-height: 20px;
          font-size: 14px;
          border-radius: 50%;
          font-weight: bold;
        }
        .num-content{
          margin:0 5px;
          .input-text{
            border:none;
            background: #fff;
            width: 40px;
            height: 30px;
            line-height: 30px;
            font-size: 20px;
            font-weight: bold;
            color: #000;
            text-align: center;
          }
        }
      }
    }
  }
  .edit_title{
    height: 60px;
    line-height: 60px;
    font-size: 25px;
    font-weight: bold;
    color:#0e579c;
    border-bottom: 2px solid #0e579c;
  }
  .el-form{
    margin-top: 30px;
  }
  .itemInformation{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .editform-box{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 15px;
      .input-box{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .item-name{
          width: 160px;
          font-size: 17px;
          color:#000;
          font-weight: bold;
          background: url(/images/pc/iov-required.png) no-repeat left center;
          text-indent: 11px;
          margin-right: 10px;
          /* text-align: right; */
        }
        .item-code{
          font-size: 17px;
          color:#000;
          font-weight: bold;
          margin-right: 10px;
          display: none;
          width: 44px;
        }
        .el-input__suffix{
          display: none;
        }
        .el-input__inner{
          border:1px solid #0e579c;
        }
      }
      .testInput{
        font-size: 14px;
        color:#d92526;
        position: absolute;
        top:40px;
        width: 314px;
        overflow: hidden;
      }
    }
    .editform-box:nth-child(2),
    .editform-box:nth-child(3),
    .editform-box:nth-child(4),
    .editform-box:nth-child(5){
      .el-input{
        width: 90px;
      }
    }
    .editform-box:nth-child(7){
      width: 100%;
      .item-name{
        background: none;
        width:85px;
      }
      .el-textarea__inner{
        height: 100px;
        border:1px solid #0e579c;
        resize: none;
      }
    }
    .editform-box:nth-child(8),
    .editform-box:nth-child(9),
    .editform-box:nth-child(10),
    .editform-box:nth-child(11),
    .editform-box:nth-child(12),
    .editform-box:nth-child(13),
    .editform-box:nth-child(14),
    .editform-box:nth-child(15),
    .editform-box:nth-child(16),
    .editform-box:nth-child(17){
      position: absolute;
      top:401px;
      left: 1px;
      .item-name{
        /* background: none; */
        width: 80px;
        text-align: right;
      }
      .el-input{
        width: 115px;
      }
      .testInput {
        width: 200px!important;
        text-align: right!important;
      }
    }
    .editform-box:nth-child(3){
      position: relative;
      top:80px;
      right: 363px;
    }
    .editform-box:nth-child(4){
      position: relative;
      bottom: 85px;
      left: 799px;
    }
    .editform-box:nth-child(5){
      position: relative;
      left: 436px;
      bottom:5px;
    }
    .editform-box:nth-child(6){
      position: relative;
      right: 725px;
      bottom: 5px;
    }
    .editform-box:nth-child(1),
    .editform-box:nth-child(2),
    .editform-box:nth-child(3),
    .editform-box:nth-child(4),
    .editform-box:nth-child(5),
    .editform-box:nth-child(6){
      height: 70px;
    }
    .editform-box:nth-child(2),
    .editform-box:nth-child(3),
    .editform-box:nth-child(4),
    .editform-box:nth-child(5){
      .item-code{
        display: block;
      }
    }
    .editform-box:nth-child(9){
      left:224px;
    }
    .editform-box:nth-child(10){
      left:454px;
    }
    .editform-box:nth-child(11){
      left:670px;
    }
    .editform-box:nth-child(12){
      left:887px;
    }
    .editform-box:nth-child(13){
      top:461px;
    }
    .editform-box:nth-child(14){
      left:224px;
      top:461px;
    }
    .editform-box:nth-child(15){
      left:454px;
      top:461px;
    }
    .editform-box:nth-child(16){
      left:670px;
      top:461px;
    }
    .editform-box:nth-child(17){
      left:887px;
      top:461px;
    }
    .IsMakeNone {
      display: none;
    }
  }
  .toCustomise{
    border:1px solid #989898;
    padding: 30px 0;
    height: 100px;
    margin-top: 25px;
  }
  .parameter_table{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
    .el-form-item{
      height: 120px;
      width: 30%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      .el-form-item__label{
        width: 48%;
        text-align: left;
        color:#000;
        font-weight: bold;
        background: url(/images/pc/iov-required.png) no-repeat left center;
        text-indent: 8%;
      }
      .el-form-item__content{
        width: 25%;
        .el-input__inner{
          width: 100%;
          border:1px solid #0e579c;
        }
        .testInput{
          color:#d92526;
          font-size: 14px;
        }
      }
    }
  }
}
.bottomBtn{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.el-message{
  top:50%!important;
}
.payment_warpper{
    border: solid 1px rgba(0,0,0,.1);
    margin-top:20px ;
    .payment_main{
      .payment_title{
        background-color: @base_color;
        padding: 20px;
        color: white;
      }
    }
    .payment_item{
        padding: 10px 20px;
        display: flex;
        align-items: center;
        img{
            height: 60px;
        }
    }
}
.price {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  .price_item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
    span {
      font-size: 24px;
      &:nth-child(2) {
        color: #d92526;
        width: 200px;
        text-align: right;
      }
    }
  }
}
</style>
