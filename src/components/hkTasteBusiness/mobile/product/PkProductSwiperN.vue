<template>
  <div class="in_preview_warpper pkswiperN">
      <div v-if="!isClick">
        <swiper :options="swiperOption" ref="mySwiper" v-if="imgList.length>0">
            <!-- slides -->
            <swiperSlide v-for="(slide, index) in imgList" :key="index">
                <img :src="slide[0]" class="BannerImg"  @click="viewImg(index)">
            </swiperSlide>
        </swiper>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
      <div class="AttrImg" v-else>
           <img :src="AttrImg" class="BannerImg"  @click="viewImg(0)">
           <div class="RetrunImg" @click="RetrunImg">
             <i class="el-icon-refresh-right"></i>
             <p>{{$t('Notification.Back')}}</p>
           </div>
      </div>
          <div v-if="!isClick">
            <Viewer :images="imgList"
                      class="viewer" ref="viewer"
                      @inited="inited"
              >
              <img v-for="(item,index) in imgList" :src="item[0]" :key="index" :alt="ProductTitleName" class="PreViewimage">
              </Viewer>
          </div>
            <div v-else>
                <Viewer
                      class="viewerN" ref="viewerN"
                      @inited="initedN"
              >
              <img :src="AttrImg"  :alt="ProductTitleName" class="PreViewimage">
              </Viewer>
            </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
import 'viewerjs/dist/viewer.css';
import { component as Viewer } from 'v-viewer';
// import Viewer from 'v-viewerc/component.vue';
@Component({ components: { swiper, swiperSlide, Viewer } })
export default class PkProductSwiper extends Vue {
  @Prop() private readonly imgList!: string[];
  @Prop() private readonly ProductTitleName!: string[];
  private currentIndex = 0;
      swiperOption: object = {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: 'l-btn',
          prevEl: 'r-btn'
        }
      };
  $viewer: any;
  get isClick () {
    return this.$store.state.isClick;
  }
  @Watch('imgList', { deep: true })
    imgListChange () {
      if (this.AttrImg === '') {
          this.$store.dispatch('setAttrImgList', this.imgList[0][0]);
      }
  }
  get AttrImg () {
        return this.$store.state.AttrImgList;
  }
  inited(Viewer) {
      this.$viewer = Viewer;
  }
  initedN(Viewer) {
    this.$viewer = Viewer;
  }
  viewImg (val) {
      this.$viewer.view(val);
  }
  RetrunImg () {
      this.$store.dispatch('isClick', false);
  }
}
</script>
<style lang="less">
.PreViewimage {
    display: none;
}
.viewer-container {
  z-index: 9999999!important;
}
.viewer-title{
  font-size: 16px!important;
  opacity: 0.9;
  color: #fff;
}
.pkswiperN{
 .swiper-pagination-bullet {
    margin-left: 5px;
    width: 10px!important;
    height: 10px!important;
    background: #fff;
    opacity: 1;
    border:2px solid #0e579c;
  }
.swiper-pagination-bullet-active{
    border:none;
    width: 10px!important;
    height: 10px!important;
    background:#0e579c!important;
  }
.swiper-pagination{
      margin-top: -1rem;
      transform: translateX(-50%) translateY(-50%);
      left: 50%;
  }
}
.swiper-btn{
  width: 90%;
  margin:20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .s-btn{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
  }
  .l-btn{
    background: url(/images/mobile/pleft.png) no-repeat center center;
    background-size: contain;
  }
  .r-btn{
    background: url(/images/mobile/pright.png) no-repeat center center;
    background-size: contain;
  }
}
</style>
<style scoped lang="less">
.pkswiperN{
    width: 100%;
}
.pkswiperN .BannerImg{
    width: 100%;
    display: block;
}
.AttrImg {
  width: 100%;
  display: inline-block;
  position: relative;
  img {
    width: 100%;
  }
  .RetrunImg {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 60px;
    color: #fff;
    text-align: center;
    i {
      font-size: 25px;
      color: #fff;
      width: 100%;
      padding-top: 5px;
    }
  }
}
</style>
