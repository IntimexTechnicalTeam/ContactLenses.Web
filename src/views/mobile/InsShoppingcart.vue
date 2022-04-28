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
            <div class="edit-box mobile-edit-box" v-show="items[index].boxshow">
                <span class="edit_title">{{$t('product.RequiredInformation')}}</span>
                <!-- <span class="result">{{$t('product.RefractionResult')}}</span> -->
                <ElForm :model="editForm" :rules="edit" ref="editForm">
                  <!-- <span class="result">{{$t('product.RefractionResult')}}</span> -->
                  <!-- <FormItem v-for="(item,index) in (one.LensExtAttrItem)" :key="index" :label="item.Id" class="title-item">
                    <ElInput v-model="item.Text" clearable=""></ElInput>
                  </FormItem> -->
                  <div class="mobile-itemInformation">
                    <div v-for="(item,index) in (one.LensExtAttrItem)" :key="index" class="mobile-editform-box">
                      <div class="mobileInput">
                        <span class="item-name">{{item.MutiLang}}</span>
                        <ElInput v-model="item.Text" clearable="" :type="index === 16 ? 'textarea' : 'text'" @focus="inputFocus(item,index)" @blur="inputBlur(item,index)"></ElInput>
                      </div>
                      <span class="mobileTips" v-show="one.LensExtAttrItem[index].tipShow">{{$t('product.PleaseEnter')}}{{item.MutiLang}}</span>
                    </div>
                  </div>
                  <span class="edit_title">{{$t('product.ToCustomise')}}</span>
                  <div class="mobile-parameter_table">
                    <FormItem v-for="(item,index) in (one.LensAttrView)" :key="index" :label="item.AttrName">
                     <ElInput v-model="item.AttrValue" clearable="" @focus="inputFocus(item,index)" @blur="inputBlur(item,index)"></ElInput>
                     <span class="mobileTips" v-show="one.LensAttrView[index].tipShow">{{$t('product.PleaseEnter')}}{{item.AttrName}}</span>
                    </FormItem>
                  </div>
                  <div class="mobile-editBtn_box">
                    <b class="btn saveBtn" @click="saveItem(one,index)">{{$t('product.Save')}}</b>
                    <b class="btn canelBtn" @click="Reset(index)">{{$t('product.Reset')}}</b>
                    </div>
                </ElForm>
              </div>
          </div>
        <div>
        <div class="mobile_userAddress">
          <div class="address" v-for="(item, index) in addressList" :key="index">
            <div class="mobileAdd_info" :class="activeIndex === index ? 'active' : ''" @click="changeList(index)">
              <div class="mobileChecked"></div>
              <span>{{$t('CheckOut.Name')}}：{{item.FirstName}}{{item.LastName}}</span>
              <span>{{$t('CheckOut.Phone')}}：{{item.Mobile}}</span>
              <span>{{$t('CheckOut.Address')}}：{{item.Address}}</span>
            </div>
            <div class="mobilebtnBox">
              <button @click="editAddr(index)">{{$t('product.EditDetails')}}</button>
              <button @click="removeAddr(item.DeliveryId)">{{$t('product.Delete')}}</button>
            </div>
          </div>
          <div class="mobileAdd">
            <button class="clickAdd" @click="addClick()">{{$t('DeliveryAddress.AddAddress')}}</button>
          </div>
        </div>
        <!-- <div class="addAddress" v-if="addAddress">
          <span class="noAddress">{{$t('DeliveryAddress.AddDeliveryAddress')}}</span>
          <button class="clickAdd" @click="addClick()">{{$t('DeliveryAddress.AddDeliveryAddress')}}</button>
        </div> -->
          <!-- <div class="shoppingcart_total1">{{Currency.Code}} {{(totalAmount) | PriceFormat}}</div> -->
          <div class="mobileAddrBox" v-show="AddrShow">
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
          <div class="shoppingcart_total"><ElButton type="success" @click="submit"><span style="font-size:1.5rem;">{{ $t('Shoppingcart.Checkout') }}</span></ElButton></div>
        </div>
    <!--main-content-->
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
    if(item.Text === '' || item.AttrValue === '') {
      item.tipShow = true;
    } else {
      item.tipShow = false;
    }
    if (index === 16) {
      item.tipShow = false;
    }
  }
  saveItem (one, index) {
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
        /* this.$message({
          message: '创建订单成功',
          type: 'success'
        }); */
        this.$router.push('/order/List');
      } else {
        Message({
          message: result.Message,
          type: 'error'
        })
      }
    });
    }
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
  .address{
    width: 98%;
    padding: 10px 1%;
    margin:20px auto;
    box-shadow: 0 0 10px #efefef;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .mobileAdd_info{
      width:70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .mobileChecked{
        width:1rem;
        height: 1rem;
        border-radius: 50%;
        box-shadow: 0 0 5px #c8c9ca;
      }
      span{
        font-size: 16px;
        color: #000;
        height: 30px;
        line-height: 30px;
      }
    }
    .active{
      .mobileChecked{
        background: #0e579c;
      }
    }
    .mobilebtnBox{
      width:25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      button{
        border:none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        color:#0e579c;
      }
      button:nth-child(1){
        margin-bottom: 0.5rem;
      }
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
</style>
<style lang="less">
.mobile-edit-box{
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
  .mobile-itemInformation{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
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
    .el-input__inner{
      border:2px solid #0e579c;
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
  .mobile-editform-box:nth-child(2),
  .mobile-editform-box:nth-child(3),
  .mobile-editform-box:nth-child(4),
  .mobile-editform-box:nth-child(5){
    width:45%;
    overflow: hidden;
    .el-input--suffix{
      width: 5rem;
      .el-input__inner{
        padding: 0 0.5rem;
      }
    }
  }
  .mobile-editform-box:nth-child(7),
  .mobile-editform-box:nth-child(8),
  .mobile-editform-box:nth-child(9),
  .mobile-editform-box:nth-child(10),
  .mobile-editform-box:nth-child(11),
  .mobile-editform-box:nth-child(12),
  .mobile-editform-box:nth-child(13),
  .mobile-editform-box:nth-child(14),
  .mobile-editform-box:nth-child(15),
  .mobile-editform-box:nth-child(16){
    flex-direction: column;
    width: 49%;
    height: 200px;
    .mobileInput{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
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
  .mobile-editform-box:last-child{
    .mobileInput{
      width: 100%;
    }
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
  .mobile-parameter_table{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .el-form-item{
      width: 45%;
      height: 165px;
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
}
</style>
