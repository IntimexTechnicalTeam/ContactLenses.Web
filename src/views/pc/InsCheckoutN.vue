<template>
  <div class="checkoutn_warpper PcV">
    <div class="favorite-box-top">
      <div class="login-register-title">{{$t('Action.Checkout')}}</div>
      <div class="clear"></div>
    </div>
    <div class="main_warpper">
        <div class="checkoutl">
            <InsExpressWay
            @expressError="express=false" @express="express=true" @PickAddressError="PickAddress = false" @PickAddress="PickAddress = true"
            :checkouting="checkouting"
             @getAdditionlCost="showAdditionlCost"
             @getDeliveryDate="showDeliveryDate"
             @getRemark="showRemark"
            @expressChange="(value)=>{this.express = value;}"
            :lockFare="!checkouting" />
            <div class="coupon_warpper" v-if="promotionCode === '' && coupon.length > 0">
                  <div class="coupon_alltitle">{{$t('MyCoupon.Coupon')}}</div>
                  <div class="coupon_main">
                    <div v-if="checkouting">
                        <CheckboxGroup size="mini" v-model="delete1">
                            <Checkbox v-for="(item,index) in coupon" :key="index" :min="0" :max="100" :label="item.Id" :disabled="item.canCheck" @change="checkChange(item)">
                              <div class="coupon_item">
                                <div class="coupon_title">{{item.Title}}</div>
                                <div class="coupon_remark" v-if="!item.IsDiscount">{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Minus')}} {{item.DiscountAmount}}</div>
                                <div class="coupon_remark" v-else>{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Hit')}} {{item.DiscountAmount}} {{$t('Order.Precent')}}</div>
                                <div class="coupon_expiryDate">{{$t('CheckOut.expiryDate')}} : {{item.EffectiveDate}}-{{item.ExpiryDate}}</div>
                                <div class="coupon_is_valid">
                                  <span class="valid_content">{{ !item.canCheck ? $t('MyCoupon.NotUse') : $t('MyCoupon.DoNotUse') }}</span>
                                </div>
                              </div>
                            </Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div v-else>
                      <CheckboxGroup size="mini" v-model="delete1">
                          <Checkbox v-for="(item,index) in selectedCoupon" :key="index" :min="0" :max="100" :label="item.Id" :disabled="true" >
                            <div class="coupon_item">
                              <div class="coupon_title">{{item.Title}}</div>
                              <div class="coupon_remark" v-if="!item.IsDiscount">{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Minus')}} {{item.DiscountAmount}}</div>
                              <div class="coupon_remark" v-else>{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Hit')}} {{item.DiscountAmount}} {{$t('Order.Precent')}}</div>
                              <div class="coupon_expiryDate">{{$t('CheckOut.expiryDate')}} : {{item.EffectiveDate}}-{{item.ExpiryDate}}</div>
                              <div class="coupon_is_valid">
                                <span class="valid_content">{{ !item.canCheck ? $t('MyCoupon.NotUse') : $t('MyCoupon.DoNotUse') }}</span>
                              </div>
                            </div>
                          </Checkbox>
                      </CheckboxGroup>
                    </div>
                  </div>
            </div>

            <div v-else-if="promotionCode !== '' && coupon.length > 0" class="candp">{{this.$t('CheckOut.CandP')}}</div>
            <div class="payment_warpper" v-else-if='coupon.length === 0'>
                <div class="payment_main">
                  <div class="payment_title">{{$t('CheckOut.PayBy')}}</div>
                  <div class="payment_item" v-for="(pay, index) in payments" :key="index">
                    <Radio v-model="payment" :label="pay" :disabled="Shoppcart.Currency.Code === 'RMB' && pay.Code === 'Stripe'"><img v-bind:src="pay.Img" /><span v-show="pay.Code==='FPS'">{{pay.Desc}}</span></Radio>

                    <p class="noRMBStripe" v-if="Shoppcart.Currency.Code === 'RMB' && pay.Code === 'Stripe'">{{$t('Message.noRMBStripe')}}</p>
                  </div>
                </div>
            </div>
        </div>
        <div class="checkoutr">
            <div class="shopCart_warpper">
              <div class="shopcartTitle">{{$t('CheckOut.Ordersummary')}}</div>
              <div :style="{ height: items*144 + 'px'}" class="item_change">

                <!-- <ShoppingCartItem v-for="(item,index) in Shoppcart.Items" :key="index" :index="index" :ShopcartItem="item" :lock="true" ></ShoppingCartItem> -->

                    <div class="ShoppingCartItem_warpper" :class="{ bg: index%2 !== 0 }" v-for="(item,index) in Shoppcart.Items"  :key="index" :index="index">
                        <div class="shoppingcart_item_image">
                            <img :src="item.Product.Img" />
                        </div>
                        <div class="shoppingcart_item_detail">
                            <div class="shoppingcart_item_name">{{item.Product.Name}}</div>
                            <div class="shoppingcart_item_code">{{item.Product.Code}}</div>

                            <div class="shoppingcart_item_qty">
                                <div class="qty_count">{{$t('Shoppingcart.Quantity')}}:&nbsp;{{item.Qty}}</div>
                                <div>
                                <div class="qty_count"  :class="{ Sabg: item.DiscountVal !==0 }">{{currentCode}} {{(item.Product.SalePrice * item.Qty) | PriceFormat}}</div>
                                <div class="qty_count" v-if="item.DiscountVal !==0" :class="{ Sared: item.DiscountVal !==0 }">{{currentCode}} {{(item.Product.SalePrice * item.Qty - item.DiscountVal) | PriceFormat}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
              <div class="shopcartItem_border">
                  <div class="show_all" @click="allShopCart=!allShopCart">{{allShopCart ? $t('Shoppingcart.hide')  : $t('Shoppingcart.more')}}</div>
              </div>
              <div class="price">
                <div class="price_item">
                  <span>{{$t('Order.DeliveryCharge')}}:</span>
                  <span>{{Shoppcart.DefaultCurrency.Code}} {{($store.state.express.DiscountPrice + AdditionlCost) | PriceFormat}}</span>
                </div>
                <div class="price_item">
                  <span>{{$t('Order.CommodityPrice')}}:</span>
                  <span>{{Shoppcart.DefaultCurrency.Code}} {{(totalAmount) | PriceFormat}}</span>
                </div>
              </div>
              <div class="discount">
                <p class="price_item" v-show="checkouting">
                  <span>{{$t('CheckOut.Couponcode')}}</span>
                  <span style="flex-shrink:0;">
                    <ElInput :placeholder="$t('CheckOut.Couponcode')" class="input-text promotion_code" v-bind:disabled="orderSure" v-model="promotionCode" clearable></ElInput>
                    <a
                      href="javascript:;"
                      class="promotion-code-btn"
                      v-on:click="searchCoupon"
                    >{{$t('CheckOut.confirm')}}</a>
                  </span>
                </p>
                <p v-if="promotionCode===''" class="promotionCodeTips">{{$t('Action.PromotionCodeTips')}}</p>
                <div class="price_item">
                  <span>{{$t('Order.Discount')}}:</span>
                  <p v-show="showDistcount" style="width:100%">
                    <span class="promotionA"><i>{{promotionCode}};</i><br/>{{$t('Message.AdditionalDiscount')}}</span>
                    <span class="promotionB">-{{Shoppcart.DefaultCurrency.Code}} {{(totalAmount - (parseFloat(cp))) | PriceFormat}}</span>
                    <span class="promotionC" @click="promotionCodeCancel">{{$t('Message.Delete')}}</span>
                  </p>
                  <span v-show="!showDistcount">{{Shoppcart.DefaultCurrency.Code}} {{(totalAmount - (parseFloat(cp))) | PriceFormat}}</span>
                </div>
              </div>
              <div class="price">
                <div class="priceTotal">
                  <span>{{$t('CheckOut.Total')}}:</span>
                  <span class="DefaultCurrency">{{Shoppcart.DefaultCurrency.Code}} {{parseFloat((parseFloat(cp))+ $store.state.express.DiscountPrice + AdditionlCost).toFixed(2)}}</span>
                  <p v-show="Shoppcart.DefaultCurrency.Code!=Shoppcart.Currency.Code" class="Currency">
                      <span>≈{{Shoppcart.Currency.Code}} {{parseFloat(((parseFloat(cp))+ $store.state.express.DiscountPrice + AdditionlCost)*Shoppcart.ExchangeRate).toFixed(2)}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div v-if="coupon.length > 0" class="payment_warpper">
                <div class="payment_main">
                  <div class="payment_title">{{$t('CheckOut.PayBy')}}</div>
                  <div class="payment_item" v-for="(pay, index) in payments" :key="index">
                    <Radio v-model="payment" :label="pay" :disabled="Shoppcart.Currency.Code === 'RMB' && pay.Code === 'Stripe'"><img v-bind:src="pay.Img" /><span v-show="pay.Code==='FPS'">{{pay.Desc}}</span></Radio>

                    <p class="noRMBStripe" v-if="Shoppcart.Currency.Code === 'RMB' && pay.Code === 'Stripe'">{{$t('Message.noRMBStripe')}}</p>
                  </div>
                </div>
            </div>
        </div>
    </div>
    <div class="btn_warpper">
      <InsButton v-show="checkouting" style="display:inline-block;margin: 20px;" width="300px" size="middle" :nama="$t('CheckOut.BacktoShoppingCart')" @click="Hyperlink" />
      <InsButton style="display:inline-block;margin: 20px;" width="300px" size="middle" :nama="$t('CheckOut.Checkout')" @click="checkOut" :loading="COloading" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import ShopCart from '@/model/ShopCart';
import PaymentM from '@/model/payment';
import Order, { CreateOrder } from '@/model/order';
import PickupAddress from '@/model/pickupAddress';
import PromotionDiscount from '@/model/PromotionDiscount';
import Express from '@/model/express';
import Coupon from '@/model/coupon';
import { CheckboxGroup, Checkbox, Radio, Input as ElInput } from 'element-ui';
@Component({ components: {
  ShoppingCartItem: () => import(/* webpackChunkName: "checkout" */ '@/components/business/pc/account/InsShoppingcartItem.vue'),
  Collaspe: () => import(/* webpackChunkName: "checkout" */ '@/components/service/Collapse.vue'),
  InsExpressWay: () => import(/* webpackChunkName: "checkout" */ '@/components/temp/InsExpressWay.vue'),
  InsCoupon: () => import(/* webpackChunkName: "checkout" */ '@/components/temp/InsCoupon.vue'),
  InsButton: () => import(/* webpackChunkName: "checkout" */ '@/components/base/pc/InsButton.vue'),
  CheckboxGroup,
  Checkbox,
  Radio,
  ElInput
} })
export default class InsCheckoutN extends Vue {
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
    data () {
      return {
        orderSure: false
      };
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
    Hyperlink () {
      this.$router.push('/account/shoppingcart');
    }
    getShoping() {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.shoppingGet());
      this.$store.dispatch('setAddress', this.$Api.checkout.getAddress2());
      let pm = this.$Api.checkout.getPaymentMethod().then(result => {
        this.payments = result.Payment;
      });
      Promise.all([this.$store.state.shopCart, this.$store.state.address, pm]).then((result) => {
        let sc = result[0];
        this.totalAmount = sc.ShopCart.TotalAmount;
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
    created () {
      this.getShoping();
    }
    get items () {
      if (this.allShopCart) return this.Shoppcart.Items.length;
      else return this.Shoppcart.Items.length > 3 ? 3 : this.Shoppcart.Items.length;
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
    pay () {
      let order;
      let profile = this.$store.state.memberInfo;
      if (this.$store.state.DeliveryType === 'D') order = new CreateOrder(this.$store.state.pickUpExpress ? -1 : this.$store.state.selectAddress.DeliveryId, this.$store.state.express.Id, this.payment.Id, 'D', '', '', this.$store.state.DPickPhone, this.$store.state.DPickName, this.promotionCode, this.TimeRangeId, this.DeliveryDate, this.Remark, this.$store.state.expressPoint.Id, '', '', '', this.delete1);
      else if (this.$store.state.DeliveryType === 'P') order = new CreateOrder(this.$store.state.pickupAddress.Id, '', this.payment.Id, 'P', this.$store.state.pickupAddress.PickupDate, this.$store.state.pickupAddress.PickupTime, this.$store.state.pickupAddress.Phone, this.$store.state.pickupAddress.Name, this.promotionCode, '', '', '', this.$store.state.pickupAddress.ExpressPointId, this.$store.state.pickupAddress.PickupAddress, this.$store.state.pickupAddress.PickupAddressPhone, this.$store.state.pickupAddress.PickupCompanyName, this.delete1);

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
    updateProfile (profile) {
      if (profile.Gender === '') profile.Gender = '0';
      return this.$Api.member.updateProfile(profile);
    }
    createOrder (order) {
      // （新）順豐自提點判斷處理
      if (this.$store.state.newSF) {
        // order.DeliveryType = 'P';
        order.ComeFrom = 1;
        order.AddressId = -1;
        order.ExpressId = this.$store.state.express.Id;
        order.ExpressPointId = this.$store.state.expressPoint.Id;
      }

      this.COloading = true;
      this.$Api.order.createOrder(
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
        } else { Vue.prototype.$Confirm('error', result.Message, () => { this.COloading = false; }, () => { this.COloading = false; }); }
      });
    }
    setPromotionCode (code) {
      this.promotionCode = code;
    }
    checkChange (item) {
      let canPush = true;
      this.selectedCoupon.forEach((e, index) => {
        if (e.Id === item.Id) {
          canPush = false;
          this.selectedCoupon.splice(index, 1);
        }
      });
      if (canPush) this.selectedCoupon.push(item);
    }
  @Watch('delete1', { deep: true })
    onSelectedChange (n, old) {
      if (n.length === 0) {
        this.single.forEach(element => {
          element.canCheck = false;
        });
        this.multiple.forEach(element => {
          element.canCheck = false;
        });
        if (this.ll) { this.ll = false; return; }
      }
      let current = this.delete1[this.delete1.length - 1];
      if (old.length === 0 && n.length === 1) {
        if (this.all[current].IsAdditional === true) {
          this.single.forEach(element => {
            if (this.all[current].Id !== element.Id) { element.canCheck = true; }
          });
        } else {
          this.single.forEach(element => {
            if (this.all[current].Id !== element.Id) { element.canCheck = true; }
          });
          this.multiple.forEach(element => {
            element.canCheck = true;
          });
        }
      }
      // 計算多個優惠
      let mult:any[] = [];
      let temp = this.totalP;
      this.currentPrice = this.totalP;
      this.delete1.forEach(element => {
        if (this.all[element].IsDiscount) mult.push(this.all[element]);
        else {
          temp = this.currentPrice - this.all[element].DiscountAmount;
        }
      });
      mult.forEach((element) => {
        temp -= this.currentPrice * (element.DiscountAmount / 100);
      });
      this.currentPrice = temp;
    }
  get totalP () {
    this.currentPrice = this.totalAmount;
    return this.totalAmount;
  }
  get exdp () {
    this.exp = this.$store.state.express.DiscountPrice;
    return Number(this.$store.state.express.DiscountPrice as string);
  }
  @Watch('exp')
  onExpChange () {
    // this.ll = true;
    if (this.delete1.length !== 0) { this.delete1 = []; };
    if (this.selectedCoupon.length !== 0) { this.selectedCoupon = []; };
  }
  @Watch('payments')
  onPaymentMethodsChange (o, n) {
    if (this.payments.length > 0) this.payment = this.payments[0];
  }
  get discount () {
    return this.$store.state.discount;
  }
  get cp () {
    return this.discount.Id === '-1'
      ? this.currentPrice
      : (this.discount.IsDiscount ? ((this.currentPrice) * (1 - this.discount.Favorable / 100)).toFixed(2) : (this.currentPrice) - this.discount.Favorable);
  }
  // searchCoupon () {
  //   if (this.totalAmount !== this.currentPrice) { this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.CandP')); return; }
  //   this.$Api.order.getPromotionCodeFrontView(this.promotionCode).then((result) => {
  //     this.$store.dispatch('setPromotionDiscount', result.PromotionDiscount);
  //     this.$emit('promotionCode', this.promotionCode);
  //     this.showDistcount = true;
  //   }).catch((error) => {
  //     console.log(this.$t('Message.Message'), error);
  //     this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.promotionCodeError'));
  //   });
  // }

  // PromotionCodeV2版本
    searchCoupon () {
    if (this.totalAmount !== this.currentPrice) { this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.CandP')); return; }

    if (this.showDistcount) {
        this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.promotionCodetips1')); return;
    }
    let exCond = {
      Code: this.promotionCode,
      ProductList: this.ProductList
    };

      for (var i = 0; i < this.Shoppcart.Items.length; i++) {
        let obj = {
         Sku: '',
         Qty: 0,
         UnitPrice: 0
        };
                    obj.Sku = this.Shoppcart.Items[i].Product.Sku;
                    obj.Qty = this.Shoppcart.Items[i].Qty;
                    obj.UnitPrice = this.Shoppcart.Items[i].Product.SalePrice;

                    this.ProductList.push(obj);
        }
    this.$Api.order.getPromotionCodeFrontView2(exCond).then((result) => {
      this.$store.dispatch('setPromotionDiscount', result.PromotionDiscount);
      this.$emit('promotionCode', this.promotionCode);
      this.showDistcount = true;
        if (!result.PromotionDiscount.IsTotalOrderDiscount) {
            this.SettlementProfilesList = result.PromotionDiscount.SettlementProfilesList;

      for (var i = 0; i < this.SettlementProfilesList.length; i++) {
         this.Shoppcart.Items.forEach(element => {
            if (element.Product.Sku === this.SettlementProfilesList[i].Sku) {
                 element.DiscountVal = this.SettlementProfilesList[i].DiscountVal;
            }
          });
      }
      }
    }).catch((error) => {
      console.log(this.$t('Message.Message'), error);
      this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.promotionCodeError'));
    });
  }
  promotionCodeCancel () {
      this.$store.dispatch('setPromotionDiscount', new PromotionDiscount());
      this.ProductList = [];
       this.Shoppcart.Items.forEach(element => {
                 element.DiscountVal = 0;
          });
      this.$emit('promotionCode', '');
      this.promotionCode = '';
      this.showDistcount = false;
      this.$message({
        message: this.$t('Message.SuccessfullyDeleted') as string,
        type: 'success',
        customClass: 'messageBoxMobile'
      });
  }
  @Watch('promotionCode')
  onPromotionCode () {
    if (!this.promotionCode) {
      this.$store.dispatch('setPromotionDiscount', new PromotionDiscount());
      this.$emit('promotionCode', '');
       this.ProductList = [];
         this.Shoppcart.Items.forEach(element => {
                 element.DiscountVal = 0;
          });
      this.showDistcount = false;
    }
  }
      LoadData () {
      this.$Api.shoppingCart.LoadData().then((result) => {
        this.currentCode = result.DefaultCurrency.Code;
      });
    }
       mounted () {
      this.LoadData();
    }
}
</script>
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
.PcV{
  .payment_item{
    .el-radio__label{
      display: flex;
      align-items: center;
    }
  }
}

.coupon_warpper{
  .el-checkbox__input{
      display: none;
    }
  .el-checkbox{
    width: 100%;
    .el-checkbox__label{
      width: 100%;
      padding: 0;
    }
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
      color: @primary_color2;
      border: solid 1px @primary_color2;
  }
  .el-checkbox__label{
      // color: @primary_color2;
      border: solid 1px transparent;
  }
}
</style>
<style lang="less">
.PcV .el-input__inner{
  width: auto!important;
  padding-right: 0px!important;
}
.PcV .el-radio, .el-radio--medium.is-bordered .el-radio__label{
    display: inline-flex;
    justify-items: center;
    align-items: center;

}
.coupon_warpper{
  .el-checkbox__input{
      display: none;
    }
  .el-checkbox{
    width: 100%;
    .el-checkbox__label{
      width: 100%;
      padding: 0;
    }
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
      color: @primary_color2;
      border: solid 1px @primary_color2;
  }
  .el-checkbox__label{
      // color: @primary_color2;
      border: solid 1px transparent;
  }
}
</style>
<style lang="less" scoped>
  /deep/ .shoppingcart_item_name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
.checkoutn_warpper{
  margin: 100px auto;
  width: 1200px;
  .main_warpper{
    display: flex;
    width: 1200px;
    margin: 0 auto;
    .checkoutl{
        width: 70%;
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
    }
    .checkoutr{
        padding: 0 20px;
        width: 30%;
        // height: 500px;
        // background-color: blanchedalmond;
        .shopCart_warpper{
          border: solid 1px rgba(0,0,0,.1);
          .shopcartTitle{
            background-color: @base_color;
            padding: 20px;
            color: white;
          }
          .item_change{
            overflow: hidden;
            transition: 1s height ease-in-out;
          }
          .shopcartItem_border{
              margin: 20px;
              border-top: solid 1px rgba(0, 0, 0, 0.5);
              position: relative;
              .show_all{
                  cursor: pointer;
                  padding: 0 6px;
                  background-color: white;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
              }
          }
          .price_item{
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
          }
          .discount,.price{
            margin: 20px;
            border-bottom: solid 1px rgba(0,0,0,.1);
          }
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
                img{
                    height: 60px;
                }
            }
        }
    }
  }
  .btn_warpper{
    text-align: right;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: height .5s;
}
.coupon_warpper{
  margin: 20px auto;
  border: solid 1px rgba(0,0,0,.1);
  .coupon_alltitle{
    background-color:@base_color;
    padding: 20px;
    color: white;
  }
  .coupon_main{
    padding: 20px;
    .coupon_item{
    text-align: left;
    .coupon_expiryDate,.coupon_remark{
      padding: 10px 30px;
      font-size: @sub_font_size;
      // line-height: 4rem;
    }
    .coupon_title{
      font-size: @main_font_size;
      background-color: @base_color;
      display: inline-block;
      padding: 10px 40px;
      color: white;
    }
    position: relative;
    // margin-top: @main_font_size;
    padding: @main_font_size;
    border-bottom: 1px solid rgba(0,0,0,.1);
    // border-radius: .5rem;
    overflow: hidden;
    .coupon_is_valid{
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 75%;
      background-color: black;
      color: white;
      transform:translate(50%, -50%) rotateZ(45deg);
      .valid_content{
        font-size: @main_font_size;
        position:absolute;
        top: 82%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
  }
}
.candp{
  text-align: center;
  font-size: @main_font_size
}
.input-text {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  box-sizing: border-box;
}
.promotion_code {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  // border: 1px solid #e8e8e8;
  height: 40px !important;
  line-height: 40px !important;
  outline: none;
  // padding: 0 5px;
  width: 150px !important;
  box-sizing: border-box;
  vertical-align: top;
}
.promotion-code-btn {
  background-color: #074493;
  display: inline-block;
  vertical-align: top;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  color: #fff;
  font-size: 12px;
  z-index: 0;
  position: relative;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.login-register-title {
  float: left;
  width: 300px;
  height: 45px;
  line-height: 45px;
  margin-bottom: 20px;
  text-align: center;
  color: #fff;
  font-size: 26px;
  background-color: @primary_color;
  clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
  -webkit-clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
  -moz-clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
  -ms-clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
}
.promotionCodeTips{
  text-align: right;
  color:#262626;
}
.DefaultCurrency {
  float: right;
}
.Currency {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
.priceTotal{
  padding: 20px 0;
}
.promotionA {
  display: block;
  color: green;
  text-decoration: underline;
  margin-bottom: 10px;
  width: 50%;
  float: left;
  i{
    font-style: normal;
    color: green;
    text-decoration: underline;
  }
}
.promotionB {
    display: block;
    margin-bottom: 10px;
    text-align: right;
    color: #c62828;
    width: 50%;
    float: left;
}
.promotionC {
  display: block;
  text-decoration: underline;
  text-align: right;
  cursor: pointer;
  color: green;
}

.noRMBStripe {
  display: inline-block;
  color: red;
}
.ShoppingCartItem_warpper{
    display: flex;
    flex-wrap: nowrap;
    padding: 20px 0;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    position: relative;
    .close{
        position: absolute;
        top: 12px;
        right: 12px;
        i{
            font-size: 12px;
        }
    }
}
.shoppingcart_item_image{
    margin: 0 0 0 12px;
}
.shoppingcart_item_image > img{
    width: 100px;
    height: 100px;
}
.shoppingcart_item_detail{
    margin: 0 0 0 12px;
}
.shoppingcart_item_detail > div{

}
.shoppingcart_item_name{
    line-height: 24px;
    font-size: 18px;
    width: 200px;
    // height: 2.5rem;
    // width: 10rem;
}
.shoppingcart_item_code,
.shoppingcart_item_attr,
.shoppingcart_item_price{
    font-size: 12px;
    padding: 6px 0;
    span{
        font-size: 12px;
    }
    div{
        font-size: 12px;
    }
}
.shoppingcart_item_qty{
    display: flex;
    justify-content: space-between;
    .qty_count{
        font-size: 12px;
        line-height: 26px;
    }
    .Sabg{
      text-decoration: line-through
    }
    .Sared{
      color: #c62828;
    }
}
.shoppingcart_item_attr{
    span{
        margin-right: 12px;
    }
}
.shoppingcart_item_price{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
</style>
