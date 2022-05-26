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
                      <!-- <a
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
            <div class="edit-box mobile-edit-box" v-show="items[index].boxshow">
                <div class="mobileProductInfo">
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
                      <div class="merchant-one-calc">
                        <p class="quantity">{{$t('product.Quantity')}}</p>
                        <div class="common-num">
                          <a href="javascript:;" class="reduce-num" v-on:click="minusQty(one,one.Id,$event)">-</a>
                          <div class="num-content">
                            <input type="text" data-num="1" disabled v-model="one.Qty" v-on:change="updateQty(one,one.Id,$event)" class="input-text">
                          </div>
                          <a href="javascript:;" v-on:click="plusQty(one,one.Id,$event)" class="add-num" :class="{'disabled':one.IsAdd}">+</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="edit_title">{{$t('product.RequiredInformation')}}</span>
                <!-- <span class="result">{{$t('product.RefractionResult')}}</span> -->
                <ElForm :model="editForm" :rules="edit" ref="editForm">
                  <!-- <span class="result">{{$t('product.RefractionResult')}}</span> -->
                  <!-- <FormItem v-for="(item,index) in (one.LensExtAttrItem)" :key="index" :label="item.Id" class="title-item">
                    <ElInput v-model="item.Text" clearable=""></ElInput>
                  </FormItem> -->
                  <div class="mobile-itemInformation">
                    <div v-for="(item,index) in (one.LensExtAttrItem)" :key="index" class="mobile-editform-box" :id="index">
                      <div class="mobileInput">
                        <span class="item-name">{{item.MutiLang}}</span>
                        <span class="item-code">{{item.Code}}</span>
                        <ElInput v-model="item.Text" clearable="" :type="index === 6 ? 'textarea' : 'text'" @focus="inputFocus(item,index)" @blur="inputBlur(item,index)" :key="index"></ElInput>
                      </div>
                      <p class="mobiletest" v-show="one.LensExtAttrItem[index].testShow"></p>
                    </div>
                  </div>
                  <span class="edit_title"  :class="one.IsMake === false ? 'customized' : '' ">{{$t('product.ToCustomise')}}</span>
                  <div class="ToCustomiseBox"  :class="one.IsMake === false ? 'customized' : '' "></div>
                  <!-- <div class="mobile-parameter_table">
                    <FormItem v-for="(item,index) in (one.LensAttrView)" :key="index" :label="item.AttrName">
                     <ElInput v-model="item.AttrValue" clearable="" @focus="inputFocus(item,index)" @blur="inputBlur(item,index)"></ElInput>
                     <span class="mobileTips" v-show="one.LensAttrView[index].tipShow">{{$t('product.PleaseEnter')}}{{item.AttrName}}</span>
                    </FormItem>
                  </div> -->
                  <div class="mobile-editBtn_box">
                    <b class="btn saveBtn" @click="saveItem(one,index)">{{$t('product.Save')}}</b>
                    <b class="btn canelBtn" @click="Reset(index)">{{$t('product.Reset')}}</b>
                    </div>
                </ElForm>
              </div>
          </div>
        <div>
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
                      <Radio v-model="payment" :label="pay" :disabled="ShoppingCart.Currency.Code === 'RMB' && pay.Code === 'Stripe'"><img v-bind:src="pay.Img"  class="paymentImg"/><span v-show="pay.Code==='FPS'">{{pay.Desc}}</span></Radio>

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
          <div class="shoppingcart_total"><ElButton type="success" @click="checkOut"><span style="font-size:1.5rem;">{{$t('Shoppingcart.SubmitOrder')}}</span></ElButton></div>
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
    InsExpressWay: () => import(/* webpackChunkName: "checkout" */ '@/components/temp/InsExpressWayM.vue')
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
      var EditBox = document.querySelectorAll(".editform-box");
      for (var i = 0; i < EditBox.length; i++) {
        if (EditBox[i].id === "7") {
          EditBox[7].className = "IsMakeNone";
        }
        if (EditBox[i].id === "8") {
          EditBox[8].className = "IsMakeNone";
        }
        if (EditBox[i].id === "9") {
          EditBox[9].className = "IsMakeNone";
        }
        if (EditBox[i].id === "10") {
          EditBox[10].className = "IsMakeNone";
        }
        if (EditBox[i].id === "11") {
          EditBox[11].className = "IsMakeNone";
        }
        if (EditBox[i].id === "12") {
          EditBox[12].className = "IsMakeNone";
        }
        if (EditBox[i].id === "13") {
          EditBox[13].className = "IsMakeNone";
        }
        if (EditBox[i].id === "14") {
          EditBox[14].className = "IsMakeNone";
        }
        if (EditBox[i].id === "15") {
          EditBox[15].className = "IsMakeNone";
        }
        if (EditBox[i].id === "16") {
          EditBox[16].className = "IsMakeNone";
        }
      }
    }
  }
  //鼠标点入
  inputFocus(item, index) {
    //Vue.set(item, 'testShow', false)
    var EditBox=document.querySelectorAll('.mobile-editform-box');
    for(var i=0;i<EditBox.length;i++){
      var testText=EditBox[i].getElementsByClassName('mobiletest')[0];
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
    var EditBox=document.querySelectorAll('.mobile-editform-box');
    for(var i=0;i<EditBox.length;i++){
      var testText=EditBox[i].getElementsByClassName('mobiletest')[0];
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
    var EditBox=document.querySelectorAll('.mobile-editform-box');
    var Lat=this.items[index].LensExtAttrItem;
    if(this.items[index].CorneaLeft === '' || this.items[index].CorneaRight === '' || this.items[index].CustomerCode === '' || this.items[index].LensDiameter === '' || this.items[index].ResultLeft === '' || this.items[index].ResultRight === '') {
      Message({
        message: this.$t('Shoppingcart.SaveError') as string,
        type: 'error',
        duration:3500
      });
      for(var i=0;i<EditBox.length;i++){
        var testText=EditBox[i].getElementsByClassName('mobiletest')[0];
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
        var testText=EditBox[i].getElementsByClassName('mobiletest')[0];
        if(EditBox[i].id === '7'){
          if(Lat[7].Text === ''){
            Vue.set(Lat[7],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[7].MutiLang;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '8'){
          if(Lat[8].Text === ''){
            Vue.set(Lat[8],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[8].MutiLang;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '9'){
          if(Lat[9].Text === ''){
            Vue.set(Lat[9],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[9].MutiLang;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '10'){
          if(Lat[10].Text === ''){
            Vue.set(Lat[10],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[10].MutiLang;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '11'){
          if(Lat[11].Text === ''){
            Vue.set(Lat[11],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[11].MutiLang;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '12'){
          if(Lat[12].Text === ''){
            Vue.set(Lat[12],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[12].MutiLang;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '13'){
          if(Lat[13].Text === ''){
            Vue.set(Lat[13],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[13].MutiLang;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '14'){
          if(Lat[14].Text === ''){
            Vue.set(Lat[14],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[14].MutiLang;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '15'){
          if(Lat[15].Text === ''){
            Vue.set(Lat[15],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[15].MutiLang;
          }else{
            testText.innerHTML = ''
          }
        }
        if(EditBox[i].id === '16'){
          if(Lat[16].Text === ''){
            Vue.set(Lat[16],'testShow',true);
            testText.innerHTML = this.$t('product.PleaseEnter')  as string + Lat[16].MutiLang;
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
          var EditBox=document.querySelectorAll('.mobile-editform-box');
          for(var y=0;y<LatList.length;y++){
            console.log(ItemsArr[i])
            for(var z=0;z<EditBox.length;z++){
                var testText=EditBox[z].getElementsByClassName('mobiletest')[0];
                if (ItemsArr[i].IsMake) {
                  if(LatList[7].Text === ''){
                    Vue.set(LatList[7],'testShow',true);
                    testText.innerHTML = this.$t('product.PleaseEnter') + LatList[7].MutiLang as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                  if(LatList[8].Text === ''){
                    Vue.set(LatList[8],'testShow',true);
                    testText.innerHTML = this.$t('product.PleaseEnter') + LatList[8].MutiLang as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                  if(LatList[9].Text === ''){
                    Vue.set(LatList[9],'testShow',true);
                    testText.innerHTML = this.$t('product.PleaseEnter') + LatList[9].MutiLang as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                  if(LatList[10].Text === ''){
                    Vue.set(LatList[10],'testShow',true);
                    testText.innerHTML = this.$t('product.PleaseEnter') + LatList[10].MutiLang as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                  if(LatList[11].Text === ''){
                    Vue.set(LatList[11],'testShow',true);
                    testText.innerHTML = this.$t('product.PleaseEnter') + LatList[11].MutiLang as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                  if(LatList[12].Text === ''){
                    Vue.set(LatList[12],'testShow',true);
                    testText.innerHTML = this.$t('product.PleaseEnter') + LatList[12].MutiLang as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                  if(LatList[13].Text === ''){
                    Vue.set(LatList[13],'testShow',true);
                    testText.innerHTML = this.$t('product.PleaseEnter') + LatList[13].MutiLang as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                  if(LatList[14].Text === ''){
                    Vue.set(LatList[14],'testShow',true);
                    testText.innerHTML = this.$t('product.PleaseEnter') + LatList[14].MutiLang as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                  if(LatList[15].Text === ''){
                    Vue.set(LatList[15],'testShow',true);
                    testText.innerHTML = this.$t('product.PleaseEnter') + LatList[15].MutiLang as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
                  if(LatList[16].Text === ''){
                    Vue.set(LatList[16],'testShow',true);
                    testText.innerHTML = this.$t('product.PleaseEnter') + LatList[16].MutiLang as string;
                    Vue.set(ItemsArr[i], 'boxshow', true);
                  }
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
<style lang="less">
.ShoppingCartItem_warpper .el-input-number {
    position: relative;
    display: inline-block;
    width: 8rem;
    border: none;
}
</style>
<style scoped lang='less'>
/deep/ .el-radio {
  display: flex;
  align-items: center;
}
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
    width:32%;
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
.mobileAddrBox{
  width: 95%;
  margin: 0 auto;
  .bottomBtn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
.shoppingcart_total{
    text-align: center;
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
.mobile_userAddress{
  .choose{
    font-size: 20px;
    color:#0e579c;
    font-weight: bold;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .address{
    width: 98%;
    padding: 10px 1%;
    margin:20px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .mobileAdd_info{
      width:95%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin:0 auto;
      .mobileChecked{
        width:2rem;
        height: 2rem;
        border-radius: 50%;
        border: 1px solid #0e579c;
      }
      .mobileAddInfo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 1rem;
        span{
          font-size: 16px;
          color: #000;
          line-height: 30px;
          font-weight: bold;
          background: url(/images/mobile/iov-required.png) left center no-repeat;
          text-indent: 1rem;
        }
        span:nth-child(2){
          background: none;
        }
      }
    }
    .mobilebtnBox{
      width:70%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin:0 auto;
      button{
        border:none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        color:#fff;
        background: #0e579c;
      }
      button:nth-child(1){
        margin-bottom: 0.5rem;
      }
    }
  }
  .active{
    box-shadow: 0 0 10px #efefef;
    .mobileChecked{
      background: url(/images/mobile/choose.png) center center no-repeat;
      background-size: 100%;
    }
  }
}
.mobileAdd{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  .noAddress{
    margin:30px auto;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color:#bbb;
    font-weight: bold;
  }
  .clickAdd{
    border:none;
    background: #0e579c;
    color:#fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    padding: 0 2rem;
    border-radius: 15px;
  }
}
.mobileNoAddress{
  width: 90%;
  margin:2rem auto;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color:#0e579c;
  height: 2rem;
  line-height: 2rem;
}
</style>
<style lang="less">
.mobile-edit-box{
  width: 92%;
  margin:3rem auto;
  box-shadow: 0 0 20px #d4d4d4;
  border-radius: 20px;
  padding: 2rem 3%;
  overflow: hidden;
  position: relative;
  .edit_title{
    color:#0e579c;
    border-bottom: 1px solid #0e579c;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
    .customized{
      display: none;
    }
  }
  .mobileProductInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 2rem;
    .productInfo-left{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .productimg{
        width:10rem;
        height: 10rem;
        display: block;
        border-radius: 10px;
        overflow: hidden;
        img{
          width:100%;
          height: 10rem;
        }
      }
      .product-message{
        margin-left: 1rem;
        p{
          color:#000;
          font-size: 16px;
          font-weight: bold;
          height: 2rem;
          line-height: 2rem;
        }
        .merchant-one-calc{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
  .mobile-itemInformation{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
  }
  /* .mobile-editform-box:nth-child(1){
    span{
      visibility: hidden;
    }
    span:before{
      content: 'Weaer Name / number';
      visibility: visible;
    }
  } */
  .mobile-editform-box{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100px;
    .item-name{
      width: 54%;
    }
    .item-code{
      margin-right: 1rem;
      display: none;
    }
    .el-input__inner{
      border:2px solid #0e579c;
      padding: 0;
      padding: 0 0.5rem;
    }
    .el-input__suffix{
      display: none;
    }
    .mobiletest{
      color:#d92526;
    }
  }
  .mobileInput{
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
  .mobileTips{
    color:#d92526;
  }
  .mobile-editform-box:nth-child(1),
  .mobile-editform-box:nth-child(2),
  .mobile-editform-box:nth-child(4),
  .mobile-editform-box:nth-child(6){
    .item-name{
      background: url(/images/mobile/iov-required.png) left center no-repeat;
      text-indent: 1rem;
    }
  }
  .mobile-editform-box:nth-child(2),
  .mobile-editform-box:nth-child(3),
  .mobile-editform-box:nth-child(4),
  .mobile-editform-box:nth-child(5){
    width:50%;
    overflow: hidden;
    .item-code{
      display: block;
    }
    .el-input{
      width:7rem;
    }
  }
  .mobile-editform-box:nth-child(2),
  .mobile-editform-box:nth-child(4){
    .item-name{
      width:7rem;
    }
    .el-input{
      width:4rem;
    }
  }
  .mobile-editform-box:nth-child(6){
    .item-name{
      width:12rem;
    }
    .el-input{
      width:85%;
    }
  }
  .mobile-editform-box:nth-child(7){
    height:150px;
    .mobileInput{
      width:100%;
      .item-name{
        width:8rem;
      }
      .el-textarea__inner{
        border:2px solid #0e579c;
        height: 10rem;
        resize: none;
      }
    }
  }
  .mobile-editform-box:nth-child(8),
  .mobile-editform-box:nth-child(9),
  .mobile-editform-box:nth-child(10),
  .mobile-editform-box:nth-child(11),
  .mobile-editform-box:nth-child(12),
  .mobile-editform-box:nth-child(13),
  .mobile-editform-box:nth-child(14),
  .mobile-editform-box:nth-child(15),
  .mobile-editform-box:nth-child(16),
  .mobile-editform-box:nth-child(17){
    position: absolute;
    left:3rem;
    .item-name{
      width: 10rem;
    }
    .el-input{
      width: 8rem;
    }
    .IsMakeNone {
      display: none;
    }
  }
  .mobile-editBtn_box{
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
  .mobile-editform-box:nth-child(8){
    bottom:600px;
  }
  .mobile-editform-box:nth-child(9){
    bottom:540px;
  }
  .mobile-editform-box:nth-child(10){
    bottom:480px;
  }
  .mobile-editform-box:nth-child(11){
    bottom:420px;
  }
  .mobile-editform-box:nth-child(12){
    bottom:360px;
  }
  .mobile-editform-box:nth-child(13){
    bottom:300px;
  }
  .mobile-editform-box:nth-child(14){
    bottom:185px;
  }
  .mobile-editform-box:nth-child(15){
    bottom:240px;
  }
  .mobile-editform-box:nth-child(16){
    bottom:120px;
  }
  .mobile-editform-box:nth-child(17){
    bottom:60px;
  }
  .ToCustomiseBox{
    width:98%;
    border:1px solid #0e579c;
    padding: 3rem 0;
    height: 560px;
    margin:2rem auto;
  }
}
.el-button--success{
  background: #0e579c!important;
  color:#fff!important;
  border-radius: 25px!important;
  border:none!important;
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
      font-size: 1.6rem;
      &:nth-child(2) {
        color: #d92526;
        text-align: right;
      }
    }
  }
}
</style>
