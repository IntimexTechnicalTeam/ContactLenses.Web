<template>
  <!-- 商品推荐开始 -->
    <div class="indexMiddle">
    <div class="indexRecommend">
      <div class="indexRecommendInner">
        <!-- <div class="RecommendText">{{Title1}}</div> -->
        <div class="title">
          <span>{{$t('home.Choices')}}</span>
        </div>
        <div class="RecommendBg">
            <div class="s1-btn s1-next"> &#60; </div>
            <swiper :options="swiperOptionT1" v-if="banner1.length > 0">
              <!-- slides -->
                <swiperSlide v-for="(slide, index1) in banner1" :key="index1" >
                  <router-link :to="'/product/detail/'+slide.Sku"><img :src="slide.Img" /></router-link>
                </swiperSlide>
            </swiper>
            <div class="s1-btn s1-prev"> &#62; </div>
        </div>
        <!-- <p>{{content1}}</p> -->
      </div>
      <button class="btn btn-success" @click="ToProduct()">{{$t('home.Shop')}}</button>
    <!-- 商品推荐结束 -->
    <div class="clear"></div>
    <HkLens />
  </div>
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    /* HkHotProduct: () => import('@/components/hkTasteBusiness/pc/home/HkHotProduct.vue'), */
    HkLens: () => import('@/components/hkTasteBusiness/pc/home/HkLens.vue'),
    swiper,
    swiperSlide
  }
})
export default class HkPromotion extends Vue {
  banner1: any[] = [];
  /* banner2: any[] = [];
  banner3: any[] = []; */
  content1:string='';
  /* content2:string='';
  content3:string=''; */
  Title1:string='';
  /* Title2:string='';
  Title3:string=''; */
  current:boolean=false;
  swiperOptionT1: object = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.s1-next',
      prevEl: '.s1-prev'
    }
  };
  el:number=0;
  getHeaderBannerLst () {
    var _this = this;
    this.$Api.promotion.getPromotion('Home', 1).then(result => {
      // _this.banner1 = result.Promotion._BannerList;
      _this.banner1 = result.Promotion._PrmtProductList;
      console.log(result);
      _this.Title1 = result.Promotion.Name;
      _this.content1 = result.Promotion._BannerList[0].Content;
    });
  }
  created () {
    this.getHeaderBannerLst();
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  ToProduct () {
    this.$router.push('/product/cat/23');
  }
}
</script>
<style>
.indexMiddle  .swiperInner{
  padding: 10px;
}
</style>
<style lang="less" scoped>
.title{
  font-size: 33px;
  color: #0e579c;
  margin:0 auto;
  font-weight: bold;
  span{
    /* padding-bottom: 10px;
    background: url(/images/pc/spot.png) center 33px repeat-x; */
    border-bottom: 10px dotted #429bd7;
    padding-bottom: 10px;
  }
}
.indexMiddle{
    min-height: 1122px;
    width: 100%;
    background-size: 100% 100%;
    display: inline-block;
    /* padding-top: 125px; */
    margin-top: 50px;
    /* padding-bottom: 160px; */
    position: relative;
    /* margin-top: -5px; */
}
.indexRecommend{
    width: 1200px;
    margin: 0 auto;
}
.indexRecommendInner{
    width:100%;
    text-align: center;
}
.indexRecommendInner:nth-child(3){
    margin-right: 0%!important;
}
.RecommendTitle1{
    width: 100%;
    background: url('/images/pc/index_18.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendTitle1_E{
    width: 100%;
    background: url('/images/pc/hotpotE.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendTitle2{
    width: 100%;
    background: url('/images/pc/index_19.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendTitle2_E{
    width: 100%;
    background: url('/images/pc/BBQE.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendTitle3{
    width: 100%;
    background: url('/images/pc/index_21.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendTitle3_E{
    width: 100%;
    background: url('/images/pc/dishE.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendBg{
    width: 100%;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin:100px auto 20px auto;
}
.swiper-container{
  width:860px;
  overflow: hidden;
}
.RecommendBg img{
  width: 100%;
  height: 200px;
}

.swiper-container .swiper-slide{
  width: 200px!important;
  height: 200px;
  margin-left: 20px;
}

.swiper-container .swiper-slide:nth-child(1){
  margin-left: 0;
}

.indexRecommendInner p{
    text-align: center;
    color: #806339;
    font-size: 36px;
    padding-top: 20px;
    padding-bottom: 20px;
    display: block;
}
.s1-btn{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f3f3f3;
  color: #1f5190;
  font-size: 30px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.btn-success{
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  color:#fff;
  background: #0e579c;
  box-shadow: 5px 5px 8px #bdbdbd;
  margin:0 auto;
  border:none;
  display: block;
}
</style>
