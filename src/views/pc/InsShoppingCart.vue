<template>
  <div id="container" v-cloak>
    <!--main-content-->
    <div id="main-content">
      <div class="favorite-box order-box">
        <div class="favorite-box-top">
          <div class="login-register-title">{{$t('Shoppingcart.ShoppingcartTitle')}}    •</div>
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
               <!--  <p class="product-price">
                  <span
                    class="p-price-discount"
                  >{{Currency.Code}} {{(one.Product.SalePrice) | PriceFormat}}</span>
                </p> -->
              </div>
              <div class="merchant-one-calc">
                <p class="quantity">{{$t('product.Quantity')}}</p>
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
                  <div class="clear"></div>
                </div>
              </div>
              <!-- <div class="merchant-total-price">
                <p>{{Currency.Code}} {{(one.Product.SalePrice * one.Qty) | PriceFormat}}</p>
              </div> -->
              <div class="merchant-del-box">
                <b class="cart-delete" v-on:click="removeItem(index)">{{$t('product.Delete')}}</b>
                <button @click="boxShow(index)" class="edit">{{$t('product.EditDetails')}}</button>
              </div>
              <div class="edit-box" v-show="items[index].boxshow">
                <span class="edit_title">{{$t('product.RequiredInformation')}}</span>
                <ElForm :model="editForm" :rules="edit" ref="editForm">
                  <div class="itemInformation">
                    <div v-for="(item,index) in (one.LensExtAttrItem)" :key="index" class="editform-box">
                      <div class="input-box">
                        <span class="item-name">{{item.MutiLang}}</span>
                      <ElInput v-model="item.Text" clearable="" :type="index === 16 ? 'textarea' : 'text'" @focus="inputFocus(item,index)" @blur="inputBlur(item,index)"></ElInput>
                      </div>
                      <span class="tips" v-show="one.LensExtAttrItem[index].tipShow">{{$t('product.PleaseEnter')}}{{item.MutiLang}}</span>
                    </div>
                  </div>
                  <span class="edit_title">{{$t('product.ToCustomise')}}</span>
                  <div class="parameter_table">
                    <FormItem v-for="(item,index) in (one.LensAttrView)" :key="index" :label="item.AttrName">
                     <ElInput v-model="item.AttrValue" clearable="" @focus="inputFocus(item,index)" @blur="inputBlur(item,index)"></ElInput>
                     <span class="tips" v-show="one.LensAttrView[index].tipShow">{{$t('product.PleaseEnter')}}{{item.AttrName}}</span>
                    </FormItem>
                  </div>
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
        <div class="userAddress" v-show="addressList.length">
          <div class="choose">{{$t('DeliveryAddress.ChooseAddress')}}</div>
          <div class="address" v-for="(item, index) in addressList" :key="index">
            <div class="information-box" :class="activeIndex === index ? 'active' : ''" @click="changeList(index)">
              <div class="checked"></div>
                <div class="addInfo">
                  <span>{{$t('CheckOut.Name')}}：{{item.FirstName}}{{item.LastName}}</span>
                  <span>{{$t('CheckOut.Phone')}}：{{item.Mobile}}</span>
                  <span>{{$t('CheckOut.Address')}}：{{item.Address}}</span>
                </div>
            </div>
            <div class="btnBox">
              <button @click="editAddr(index)">{{$t('product.EditDetails')}}</button>
              <button @click="removeAddr(item.DeliveryId)">{{$t('product.Delete')}}</button>
            </div>
          </div>
        </div>
        <div class="noAddress" v-show="!addressList.length">{{$t('DeliveryAddress.NoAddress')}}</div>
        <div class="addAddress">
            <button class="clickAdd" @click="addClick()">{{$t('DeliveryAddress.AddAddress')}}</button>
          </div>
        <!-- <div class="addAddress" v-if="addAddress">
          <span class="noAddress">{{$t('DeliveryAddress.AddDeliveryAddress')}}</span>
          <button class="clickAdd" @click="addClick()">{{$t('DeliveryAddress.AddDeliveryAddress')}}</button>
        </div> -->
        <div class="AddAddress-box" v-show="AddrShow">
          <div  class="MemberInfoMain">
                <ElForm
                  :model="AddForm"
                  status-icon
                  :rules="newaddress"
                  ref="AddForm"
                  class="login-form"
                >
                <input type="hidden" id="editDeliveryId" runat="server" />
                <FormItem :label="$t('DeliveryAddress.AddFirstName')" prop="FirstName">
                  <ElInput
                    v-model="AddForm.FirstName"
                    prefix-icon="el-icon-user"
                    :placeholder="$t('DeliveryAddress.AddFirstName')"
                    clearable
                  ></ElInput>
                </FormItem>

                 <FormItem :label="$t('DeliveryAddress.AddLastName')" prop="LastName">
                  <ElInput
                    v-model="AddForm.LastName"
                    prefix-icon="el-icon-user"
                    :placeholder="$t('DeliveryAddress.AddLastName')"
                    clearable
                  ></ElInput>
                </FormItem>

                <FormItem :label="$t('DeliveryAddress.PostalCode')" prop="PostalCode">
                  <ElInput
                    v-model="AddForm.PostalCode"
                    prefix-icon="el-icon-tickets"
                    :placeholder="$t('DeliveryAddress.PostalCode')"
                    clearable
                  ></ElInput>
                </FormItem>
                <FormItem :label="$t('DeliveryAddress.Mobile')" prop="Mobile">
                  <ElInput
                    v-model="AddForm.Mobile"
                    prefix-icon="el-icon-phone"
                    :placeholder="$t('DeliveryAddress.Mobile')"
                    clearable
                  ></ElInput>
                </FormItem>
                <FormItem :label="$t('DeliveryAddress.Area')" prop="CountryId">
                  <Select
                    v-model="AddForm.CountryId"
                     value-key="Id"
                    :placeholder="$t('DeliveryAddress.Area')"
                    style="width: 100%;"
                    v-on:change="selectCountry($event)"
                  >
                    <Option
                    :label="country.Name"
                    v-for="(country,index) in countryList"
                    :key="index"
                     v-bind:value="(country.Id).toString()"
                    ></Option>

                  </Select>
                </FormItem>
                <div v-show="provinceList.length>0">
                  <FormItem :label="$t('DeliveryAddress.Province')" prop="Province">
                    <Select
                      v-model="AddForm.Province"
                      :placeholder="$t('DeliveryAddress.Province')"
                      style="width: 100%;"
                      value-key="Id"
                    >
                      <Option
                      v-bind:value="(province.Id).toString()"
                      v-for="(province,index) in provinceList"
                      :label="province.Name"
                      :key="index"
                      ></Option>

                    </Select>
                </FormItem>
                </div>
                  <FormItem :label="$t('DeliveryAddress.Address')" prop="Address">
                  <ElInput
                    v-model="AddForm.Address"
                    prefix-icon="el-icon-location-outline"
                    :placeholder="$t('DeliveryAddress.Address')"
                    clearable
                  ></ElInput>
                </FormItem>

                <!-- <FormItem :label="$t('DeliveryAddress.DefaultAddress')" >
                  <Select
                    :placeholder="$t('DeliveryAddress.DefaultAddress')"
                    style="width: 100%;"
                    v-model="AddForm.Default"
                  >
                  <Option :label="$t('DeliveryAddress.YesBtn')" :value="true"></Option>
                  <Option :label="$t('DeliveryAddress.NoBtn')" :value="false"></Option>
                  </Select>
                </FormItem> -->

                 <div class="bottomBtn">
                   <FormItem>
                    <ElButton
                      type="primary"
                      @click="saveAddress('AddForm')"
                      style="margin-top: 10px;"
                    >{{$t('DeliveryAddress.SaveBtn')}}</ElButton>
                  </FormItem>
                  <FormItem>
                    <ElButton
                      type="primary"
                      @click="Cancel()"
                      style="margin-top: 10px;"
                    >{{$t('Message.Cancel')}}</ElButton>
                  </FormItem>
                 </div>
               </ElForm>
          </div>
        </div>
        <div class="shoppingcart-handle">
          <!-- <p>
            <span>{{$t('Shoppingcart.Total')}}</span>
            <span class="total-price">{{Currency.Code}} {{(totalAmount) | PriceFormat}}</span>
          </p> -->
          <a href="javascript:;" class="btn" @click="submitLogin" v-if="this.$Storage.get('isLogin') === 0">{{$t('Shoppingcart.Login')}}</a>
          <a href="javascript:;" class="btn" @click="submit" v-if="this.$Storage.get('isLogin') === 1">{{$t('Shoppingcart.CheckoutList')}}</a>
        </div>
      </div>
    </div>
    <!--main-content-->
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// import { Form, Input, Message, FormItem, Button } from 'element-ui';
import { Form, Input, Row, Col, Button, Select, Option, FormItem, Card, Message } from 'element-ui';
import ShopCart from '../../model/ShopCart';
import ShopCartItem from '../../model/shopCartItem';
import Currency from '../../model/currency';
import Order from '@/model/order';
import Address from '../../model/address';
import { Country } from '@/model/country';
import lang from '@/lang';
import { Province } from '@/model/province';
import storage from '@/sdk/common/Storage';
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
    Card
  }
})
export default class InsShoppingcart extends Vue {
  private ShoppingCart:ShopCart = new ShopCart();
  private Order:Order =new Order();
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
  prodcutSrc: string = require('@/assets/Images/270_b.jpg');
  // boxshow = true;
  tipShow =true;
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
  goAnchor (selector) {
    var anchor = this.$el.querySelector(selector); // 参数为要跳转到的元素id
  }
  //   加载国家列表
  getCountry () {
    let _this = this;
    this.$Api.delivery.getCountry().then((result) => {
      _this.countryList = result.data;
    });
  }

  //   加载对应省列表
  getProvince (num) {
    let _this = this;
    var cid = num;
    if (cid && cid !== '') {
      this.$Api.delivery.getProvince(cid).then((result) => {
        _this.provinceList = result.data;
      });
    } else {
      _this.AddForm.Province = '';
    }
  }

  selectCountry (event) {
    var cid = event;
    let _this = this;
    if (cid && cid !== '') {
      _this.AddForm.Province = '';
      _this.getProvince(cid);
    } else {
      _this.AddForm.Province = '';
    }
  }
  // 加载地址列表
  getAddress () {
    let _this = this;
    this.$Api.delivery.getAddress().then((result) => {
      _this.addressList = result.data;
    });
  }
  removeAddr (cid) {
    let _this = this;
    var addId = cid;
    this.$Api.delivery.removeAddress(addId).then((result) => {
      _this.$message({
        message: this.$t('MyFavorite.RemoveSuccess') as string,
        type: 'success',
        customClass: 'messageBoxMobile'
      });
      this.getAddress();
    });
  }
  editAddr (index, val) {
    this.AddrShow = true;
    this.goAnchor(val);
    let _this = this;
    Object.keys(this.AddForm).forEach((element) => {
      this.AddForm[element] = this.addressList[index][element];
    });
    this.AddForm['DeliveryId'] = this.addressList[index].DeliveryId;
    this.$Api.delivery.getProvince(this.addressList[index].CountryId).then((result) => {
      _this.provinceList = result.data;
    });
  }
  private saveAddress (formName) {
    this.AddrShow = false;
    let _this = this;
    this.AddForm.Phone = this.AddForm.Mobile;
    if (!this.AddForm.Province) {
      this.AddForm.Province = '0';
    }
    (this.$refs.AddForm as Form).validate(valid => {
      if (valid) {
        this.$Api.delivery.saveAddress(this.AddForm).then((result) => {
          this.getAddress();
          this.AddForm = {
            FirstName: '',
            LastName: '',
            Mobile: '',
            Phone: '',
            PostalCode: '',
            CountryId: '',
            Province: '',
            Address: '',
            Default: ''
          };
          _this.$message({
            message: this.$t('Message.SavedSuccessfully') as string,
            type: 'success',
            customClass: 'messageBoxMobile'
          });
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  Cancel () {
    this.AddrShow = false;
  }
  created () {
    this.load().then(() => { this.$HiddenLayer(); });
  }
  load () {
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
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
    });
  }
  boxShow(index) {
    Vue.set(this.items[index], 'boxshow', true);
    
  }
  inputFocus(item, index) {
    Vue.set(item, 'tipShow', false);
  }
  inputBlur(item, index) {
    /* if(item.Text === '' || item.AttrValue === '') {
      item.tipShow = true;
    } else {
      item.tipShow = false;
    } */
    if (index === 16) {
      item.tipShow = false;
    }
    console.log(this.items[index]);
  }
  saveItem (one,index) {
    Vue.set(this.items[index], 'ShoppingCartId', this.items[index].Id);
    Vue.set(this.items[index], 'Sku', this.items[index].Product.Sku);
    for (var i = 0; i < this.items[index].LensExtAttrItem.length; i++) {
      Vue.set(this.items[index], this.items[index].LensExtAttrItem[i].Id, this.items[index].LensExtAttrItem[i].Text);
    }
    var attrviews=this.items[index].LensAttrView;
    var attrValue=attrviews.some(function(item){
      return item.AttrValue === ''
    })
    if(this.items[index].BC === '' || this.items[index].CT === '' || this.items[index].CorneaLeft === '' || this.items[index].CorneaRight === '' || this.items[index].CustomerCode === '' || this.items[index].Diam === '' || this.items[index].FiveCW === '' || this.items[index].FourCW === '' || this.items[index].LensDiameter === '' || this.items[index].OZ === '' || this.items[index].PCW === '' || this.items[index].Power === '' || this.items[index].ResultLeft === '' || this.items[index].ResultRight === '' || this.items[index].ThreeCW === '' || this.items[index].TwoCW === '' || attrValue) {
      Message({
        message: this.$t('Shoppingcart.SaveError') as string,
        type: 'error',
        duration:3500
      })
      for(var j=0;j<this.items[index].LensExtAttrItem.length;j++){
        if(this.items[index].LensExtAttrItem[j].Text === ''){
          Vue.set(this.items[index].LensExtAttrItem[j], 'tipShow', true);
        }
      }
      for(var k=0;k<this.items[index].LensAttrView.length;k++){
        if(this.items[index].LensAttrView[k].AttrValue === ''){
          Vue.set(this.items[index].LensAttrView[k],'tipShow', true);
          }
        }
        this.items[index].LensExtAttrItem[16].tipShow = false;
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
    for (var i = 0; i < this.items[index].LensAttrView.length; i++) {
      this.items[index].LensAttrView[i].AttrValue = '';
    }
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
            this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
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
                 _this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
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
    /* console.log('22' + this.items);
    this.editForm.shoppingCart = this.items.Id;
    this.editForm.Sku = this.items.Product.Sku;
    console.log('11' + this.editForm.shoppingCart);
    this.$Api.order.saveOrder(this.items).then((result) => {
      console.log(result);
    }); */
    let temp = {
      AddressId: this.editForm.AddressId,
      Items: this.items
    };
    if (this.editForm.AddressId === '') {
      /* this.$Confirm(this.$t('Message.Message'), this.$t('Shoppingcart.NoneAddress'), () => { this.$router.push('/account/deliveryAddress'); }, () => { this.$router.push('/account/deliveryAddress'); }); */
      Message({
        message: this.$t('Shoppingcart.NoneAddress') as string,
        type: 'error',
        duration: 3500
      })
    } else {
      this.$Api.order.saveOrder(temp).then((result) => {
        if (result.Succeeded) {
          this.$router.push('/order/List');
        } else {
        var ItemsArr = temp.Items;
        for(var i = 0; i < ItemsArr.length; i++){
         var ax=ItemsArr[i].LensAttrView;
         var ac=ax.some(function(item){
           return item.AttrValue === ''
         })
         if(ac || ItemsArr[i].BC === '' || ItemsArr[i].CT === '' || ItemsArr[i].CorneaLeft === '' || ItemsArr[i].CorneaRight === '' || ItemsArr[i].CustomerCode === '' || ItemsArr[i].Diam === '' || ItemsArr[i].FiveCW === '' || ItemsArr[i].FourCW === '' || ItemsArr[i].LensDiameter === '' || ItemsArr[i].OZ === '' || ItemsArr[i].PCW === '' || ItemsArr[i].Power === '' || ItemsArr[i].ResultLeft === '' || ItemsArr[i].ResultRight === '' || ItemsArr[i].ThreeCW === '' || ItemsArr[i].TwoCW === ''){
           Message({
            message: this.$t('Shoppingcart.SaveError') as string,
            type: 'error',
            duration:3500
           })
          for(var j=0;j<ItemsArr[i].LensExtAttrItem.length;j++){
            if(ItemsArr[i].LensExtAttrItem[j].Text === ''){
              Vue.set(ItemsArr[i].LensExtAttrItem[j], 'tipShow', true);
            }
          }
          for(var k=0;k<ItemsArr[i].LensAttrView.length;k++){
            if(ItemsArr[i].LensAttrView[k].AttrValue === ''){
              Vue.set(ItemsArr[i].LensAttrView[k],'tipShow', true);
            }
          }
          ItemsArr[i].LensExtAttrItem[16].tipShow = false;
          Vue.set(ItemsArr[i], 'boxshow', true); 
         }
        }
      }
    });
    }
    // console.log(temp);
  }
  mounted () {
   // this.getAddress();
    this.getCountry();
  }
  @Watch('this.addListlength')
  onCountryChange (n, o) {

  }
}
</script>
<style scoped lang='less'>
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
.favorite-one .product-img {
  float: left;
  width: 10%;
  height: auto;
  border: 1px solid #e6e6e6;
}
.num-content .input-text {
  display: inline-block;
  font-size: 18px;
  width: 38px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: none;
  color: #000;
  outline: none;
  font-weight: bold;
  background-color: #fff;
}
.favorite-one-messge .product-title,
.favorite-one-messge .product-code {
  color: #333;
  font-size: 18px;
  margin: 15px 0;
  font-weight: bold;
}
/* .favorite-one-messge .product-code {
  color: #b2b2b2;
  font-size: 14px;
} */
.merchant-one-calc .quantity{
  color: #333;
  font-size: 18px;
  font-weight: bold;
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
.num-content {
  float: left;
}
.favorite-one .product-img img {
  width: 100%;
}
.merchant-one .favorite-one-messge {
  width: 38.7%;
}
.favorite-one-messge {
  float: left;
  margin-left: 1.7%;
  width: 51.7%;
  text-align: left;
}
.shoppingcart-one {
  margin-bottom: 60px;
}

.shoppingcart-one-title {
  border-bottom: 1px solid #1b1b1b;
  padding: 0 0 0 20px;
}

.shoppingcart-one-title span {
  font-size: 16px;
}

.shoppingcart-one-title .order-merchant {
  width: 10%;
  color: #1b1b1b;
  font-size: 18px;
}

.shoppingcart-one-title .order-product-name {
  width: 38%;
  margin-left: 1.6%;
  text-indent: 130px;
}

.shoppingcart-one-title .order-quantity {
  width: 11%;
  margin-left: 4.2%;
  text-align: center;
}

.shoppingcart-one-title .order-price {
  margin-left: 5.9%;
  width: 15.2%;
  text-align: center;
}

.merchant-one {
  border-top: 0;
  cursor: pointer;
}

/* .merchant-one:hover {
  background: #efefef;
} */

.merchant-one .favorite-one-messge {
  width: 38.7%;
}

.merchant-one-calc {
  width: 10%;
  margin-left: 4.3%;
  float: left;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.merchant-one-calc .common-num {
  display: inline-block;
  border-radius: 3px;
}

.merchant-total-quantity {
  float: left;
  width: 15.5%;
  margin-left: 70px;
}

.merchant-total-quantity p {
  font-size: 20px;
  color: #d92526;
  text-align: center;
}

.merchant-total-price {
  float: left;
  width: 180px;
  margin-left: 6%;
}

.merchant-total-price p {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #d92526;
  line-height: 20px;
}

.merchant-del-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
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
.edit_input{
}
.edit_name{
  width:36%;
}
.edit_name_input{
  width: 55%;
}
.edit_refraction{
  width:29%;
}
.edit_left{
  /* width:4%; */
}
.edit_position_input{
  width:20.8%;
}
.positionRight{
  /* width:4%; */
  margin-left: 30px;
}
.edit_keratometry{
  width:29%;
}
.edit_lensmaterial{
  width:26%;
}
.edit_stuff_input{
  width: 65%;
}
.edit_color{
  width:24%;
}
.edit_color_input{
  width:67%;
}
.edit_overall{
  width:29%;
}
.edit_diameter_input{
  width:62%;
}
.edit_remarks{
  width:20%;
}
.edit_remarks_input{
  width: 71%;
  height: 100px;
  overflow: hidden;
  overflow-y: scroll;
}
.edit_table{
  thead{
    tr{
      td{
        text-align: center;
        background: #0e579c;
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 20px;
      }
    }
  }
  tbody{
    tr{
      td{
        input{
          border:1px solid #0e579c;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
      }
    }
  }
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
  }
}

.shoppingcart-handle {
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
  width: 340px;
  height: 45px;
  line-height: 45px;
  color: #fff;
  font-size: 26px;
  text-align: center;
  margin-top: 50px;
  background-color: @primary_color;
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
  background-color: #fa4343;
}
.cart-delete,
.edit {
  display: inline-block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #0e579c;
  color: #fff;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  border:none;
}
.favorite-box .login-register-title {
  margin-left: 0;
}
.login-register-title {
  float: left;
  width: 300px;
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
  .choose{
    font-size: 25px;
    color:#0e579c;
    line-height: 30px;
    font-weight: bold;
  }
  .address{
    width: 98%;
    padding: 10px 1%;
    margin:20px auto;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 2px #000;
    .checked{
      width: 20px;
      height: 20px;
      border:1px solid #0e579c;
      border-radius: 50%;
      margin-right: 20px;
    }
    .information-box{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .addInfo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span{
          text-align: left;
          font-size: 16px;
          color: #000;
          height: 30px;
          line-height: 30px;
          width: 100%;
        }
      }
    }
    .btnBox{
      width: 30%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      button{
        width: 100px;
        height: 45px;
        line-height: 45px;
        border:none;
        background: #e6e6e6;
        color:#000;
      }
    }
  }
}

.active{
  .checked{  
    background: url(/images/pc/choose.png) center center no-repeat;
  }
}
.addAddress{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
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
  width:98%;
  margin:100px auto 30px auto;
  box-shadow: 0 0 5px #f2f0f0;
  padding: 30px 1%;
  border-radius: 20px;
  .edit_title{
    height: 50px;
    line-height: 50px;
    font-size: 25px;
    font-weight: bold;
    color:#0e579c;
    border-bottom: 1px solid #0e579c;
  }
  .itemInformation{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .editform-box{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 30px;
      height: 60px;
      .input-box{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .item-name{
          width: 55%;
          font-size: 18px;
          color:#000;
          font-weight: bold;
          background: url(/images/pc/iov-required.png) no-repeat left center;
          text-indent: 11px;
        }
        .el-input__inner{
          border:1px solid #0e579c;
        }
        .el-textarea__inner{
          height: 150px;
          line-height: 30px;
        }
      }
      .tips{
        font-size: 14px;
        color:#d92526;
      }
    }
    .editform-box:nth-child(1){
      width:73%;
      margin-top: 30px;
      .item-name{
        width: 20%;
      }
    }
    .editform-box:nth-child(2)
    .editform-box:nth-child(3)
    .editform-box:nth-child(4)
    .editform-box:nth-child(5){
      justify-content: flex-start;
      width: 35%;
      .item-name{
        margin-right: 20px;
        width:34%;
      }
      .el-input{
        width: 30%;
      }
    }
    .editform-box:nth-child(6){
      width: 90%;
      .item-name{
        width: 15%;
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
      height: 140px;
      .input-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .item-name{
          background: url(/images/pc/iov-required.png) no-repeat 30% center;
          background-color: #0b57a3;
          color: #fff;
          width: 100%;
          height: 50px;
          line-height: 50px;
          text-align: center;
          margin-bottom: 10px;
          text-indent: 0;
        }
        .el-input__inner{
          border-radius: 0;
          height: 50px;
          line-height: 50px;
          text-align: center;
          margin-bottom: 10px;
        }
      }
    }
    .editform-box:last-child{
      height: 150px;
      width: 100%;
      align-items: flex-start;
      .item-name{
        width: 10%;
        background: none;
      }
      .el-input__inner{
        height: 250px;
        word-wrap: break-word;
        word-break: normal;
      }
    }
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
        .tips{
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
</style>
