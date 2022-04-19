<template>
  <div class="indexHotVideo">
    <div class="HotVideoMain">
      <div class="leftVideo">
        <!-- <div class="point">
          <h1 class="youtube">Youtube</h1>
          <h1 class="facebook">Facebook</h1>
        </div> -->
        <p v-html="videoContent.Body"></p>
      </div>
      <div class="fb">
        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      </div>
      <!-- <div class="rightVideo"><p v-html="fbContent.Body"></p></div> -->
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkLiveBox extends Vue {
  videoContent:string='';
  fbContent:string='';
  getVideoContent () {
    this.$Api.cms.getContentByDevice({ ContentId: 20294, IsMobile: false }).then(result => {
      this.videoContent = result.CMS;
    });
  }
  getFbContent () {
    this.$Api.cms.getContentByDevice({ ContentId: 20299, IsMobile: false }).then(result => {
      this.fbContent = result.CMS;
    });
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  created () {
    this.getVideoContent();
    // this.getFbContent();
  }
}
</script>
<style  lang="less">
.HotVideoMain .leftVideo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.HotVideoMain .leftVideo .point{
  width: 90%;
  height: 140px;
  padding: 0 5%;
  background-color: #429bd7;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.HotVideoMain .leftVideo .point{
  color:#fff;
}
.HotVideoMain .leftVideo .point .youtube{
  background: url(/images/pc/youtube_triangle.png) no-repeat right center;
  width: 150px;
}
.point .facebook{
  background: url(/images/pc/fb_triangle.png) no-repeat right center;
  width:175px;
}
.HotVideoMain .leftVideo iframe{
  width: 100%;
  height: 500px;
}
.HotVideoMain .leftVideo img{
  width: 100%;
}
.HotVideoMain .rightVideo iframe{
  width: 100%;
  height: 500px;
}
.HotVideoMain .rightVideo img{
  width: 100%;
}
</style>
<style scoped lang="less">
.TitleBg{
  width: 500px;
  height: 70px;
  border:1px solid #4d4d4d;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 20px;
  .innerBox{
    width: 100%;
    height: 100%;
    background:#4d4d4d;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 700;
    font-family: 'Arial';
  }
}
.indexHotVideo{
    width: 100%;
    background-size: 100% 100%;
    display: inline-block;
    padding-top: 90px;
    padding-bottom: 90px;
}
.HotVideoMain{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
}
.HotVideoMain .leftVideo{
    width: 55%;
    /* float: left;
    margin-right: 5%; */
    background-size: 100% 100%;
    box-sizing: border-box;
    /* padding: 30px; */
}
.HotVideoMain .leftVideo img{
    width: 100%;
    margin: 0 auto;
}
.HotVideoMain .rightVideo{
    width: 40%;
    float: left;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 30px;
}
.HotVideoMain .rightVideo img{
    width: 100%;
}
.indexVideoTitle{
    width: 544px;
    height: 114px;
    background-size: 100%;
    margin: 0 auto;
    margin-bottom: 70px;
}
.indexVideoTitleE{
    width: 544px;
    height: 114px;
    background-size: 100%;
    margin: 0 auto;
    margin-bottom: 70px;
}
</style>
