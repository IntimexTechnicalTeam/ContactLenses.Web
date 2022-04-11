<template>
    <div class="in_pdWindow_page_item" :style="styla" @mouseenter="Enter=true" @mouseleave="Enter=false" @click="click" v-if="item">
        <img :src="(item.Image?item.Image:item.Img_L?item.Img_L:item.Img)"  :class="{'height_line':Enter}" :style="imgStyla" :data-key="item.Sku" @error="loadError" />
        <div class="in_pdWindow_item_description">
             <router-link :to="'/product/detail/'+item.Sku" class="in_pdWindow_item_title" >&nbsp;{{item.Name}}</router-link >
            <!-- <div class="in_pdWindow_item_code">&nbsp;{{item.Code}}</div> -->
            <!-- <div class="in_pdWindow_item_price">
              <inPrices :primePrices="item.ListPrice" :currentPrices="item.SalePrice" :currency="item.Currency" :DefaultListPrice="item.DefaultListPrice" :DefaultSalePrice="item.DefaultSalePrice" :DefaultCurrency="item.DefaultCurrency" size="small"></inPrices>
            </div> -->
            <span class="in_pdWindow_item_code">{{item.Code}}</span>
        </div>
        <div class="imgbox">
          <div class="shopMark">
            <div class="innerBox">
                <!-- <a  href="javascript:;"><i class="indexfav" v-bind:class="{'indexfav_hover':item.IsFavorite}"  v-on:click="addToFavorite(item)"></i><span v-on:click="addToFavorite(item)">{{$t('MyFavorite.MyFavorite')}}</span></a> -->
                <a  href="javascript:;" ><span v-on:click="addCart(item)">{{$t('home.ViewDetail')}}</span></a>
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
import inButton from '@/components/base/mobile/InsButton.vue';
import inPrices from '@/components/base/mobile/InsPrices.vue';
import YouWouldLike from '@/model/youWouldLike';
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component({ components: { inButton, inPrices } })
export default class InsProductWindow extends Vue {
    private Enter:boolean = false;
    @Prop() private item!:YouWouldLike;
    @Prop() private imgStyla!:string;
    @Prop() private styla!:string;
    buttonSubmit (item) {
      this.$router.push({
        path: '/product/detail',
        name: 'ProductsDetail',
        params: {
          id: item.Sku
        }
      });
    }
    click (e) {
      let target = e.target as HTMLElement;
      if (target.nodeName === 'IMG') { this.$router.push('/product/detail/' + target.dataset.key); };
    }
    loadError (e) {
      e.target.src = '/static/Image/proddef.jpg';
    }
}
</script>
<style lang="less">
.imgbox{
    position: relative;
    display: inline-block;
    width: 100%;
    /* overflow: hidden; */
}

.imgbox:hover .shopMark{
    bottom: 0px;
}
.imgbox .shopMark{
    /* position: absolute;
    left: 0px;
    bottom: -100%;
    right: 0px;
    height:100%;
    background:rgba(0,0,0,.5);
    transition: all .3s; */
    display: flex;
    align-items: center;
    justify-content: center;
    .innerBox{
      width: 100%;
      display: inline-block;
    }
}
.imgbox .shopMark a{
    text-align: center;
    display: block;
}
.imgbox .shopMark a:hover{
  transform: translateY(-3px);
}
.imgbox .shopMark a:nth-child(1){
    // padding-top: 60px;
    padding-bottom: 20px;
}
.imgbox .shopMark a span{
    color: #FFF;
    font-size: 16px;
    margin-top: 2rem;
    display: block;
    background-color: #0e559c;
    height: 40px;
    line-height: 40px;
}
.imgbox .shopMark i{
    width: 35px;
    height: 35px;
    display: block;
    margin: 0 auto;
}
.imgbox .shopMark .indexfav{
    background: url(/images/pc/index_42.png) no-repeat center center;
    background-size: 100%;
}
.imgbox .shopMark .indexfav_hover{
    background: url(/images/pc/index_42hover.png) no-repeat center center!important;
    background-size: 100%;
}
.imgbox .shopMark .showDetail{
    background: url(/images/pc/viewDetail.png) no-repeat center center;
    background-size: 100%;
}
.in_pdWindow_item_price .currentPricesMain ,.in_pdWindow_item_price .primePricesMain{
  width: 100%;
  display: inline-block;
  text-align: center;
}
.in_pdWindow_item_price .currentPricesMain  .small:nth-child(1) {
  font-size: 1.2rem;
  word-break: break-all;
  text-align: center;
  color: #0b0b0b;
  display: inline-block;
}
.in_pdWindow_item_price .currentPricesMain .small:nth-child(2) {
    font-size: 1.4rem;
    color: #cd0909;
    display: inline-block;
}
.in_pdWindow_item_price .primePricesMain  .small:nth-child(1) {
  font-size: 1.2rem;
  word-break: break-all;
  text-align: center;
  color: #999;
  display: inline-block;
  text-decoration: line-through;
}
.in_pdWindow_item_price .primePricesMain .small:nth-child(2) {
    font-size: 1.2rem;
    color: #999;
  display: inline-block;
}
</style>
<style lang="less" scoped>
.in_pdWindow_page_item img {
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  border: 1px solid #cdcdcd;
}
.height_line {
  border: 1px solid black !important;
}
.in_pdWindow_item_description{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.in_pdWindow_item_title {
    font-size: 1.6rem;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    color: #0e559c;
    line-height: 25px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    margin-top: .5rem;
    margin-bottom: .5rem;
    border: 1px solid #0e559c;
}
.in_pdWindow_item_code {
  color: #0e559c;
  text-align: center;
  border-bottom: 2px solid #0e559c;
  width: auto;
  margin:1rem auto 0 auto;
  font-size: 1.3rem;
}
</style>
