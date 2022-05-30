<template>
  <div class="indexHotVideo">
    <div class="HotVideoMain">
      <div class="leftVideo">
        <p v-html="videoContent.Body"></p>
      </div>
      <div class="rightVideo"><p v-html="fbContent.Body"></p></div>
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
    this.getFbContent();
  }
}
</script>
<style  lang="less">
.HotVideoMain{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}
.HotVideoMain .leftVideo iframe{
  width: 100%;
  height: 372px;
}
.HotVideoMain .leftVideo img{
  width: 100%;
}
.HotVideoMain .rightVideo iframe{
  width: 100%;
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
.HotVideoMain{
    width: 1200px;
    margin: 0 auto 50px auto;
}
.HotVideoMain .leftVideo{
    width: 670px;
}
.HotVideoMain .leftVideo img{
    width: 100%;
    margin: 0 auto;
}
.HotVideoMain .rightVideo{
    width: 29%;
}
.HotVideoMain .rightVideo img{
    width: 100%;
}
</style>
