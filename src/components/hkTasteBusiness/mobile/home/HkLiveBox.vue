<template>
  <div class="liveBox mobileVersion" style="text-align: center;">
    <div class="liveBox_in">
        <!-- <div class="TitleBg"><div class="innerBox">{{$t('Cms.WhatNews')}}</div></div> -->
        <div class="videoBg">
            <!-- <p v-html="videoContent.Body"></p> -->
            <iframe width="560" height="315" src="https://www.youtube.com/embed/7S4qFKeB2V8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="fbBg">
          <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDreimlens-115807627796417&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
        <!-- <div class="mapBg">
           <p v-html="fbContent.Body"></p>
        </div> -->
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkLiveBox extends Vue {
  /* videoContent:string='';
  fbContent:string='';
  getVideoContent () {
    this.$Api.cms.getContentByDevice({ ContentId: 20294, IsMobile: true }).then(result => {
      this.videoContent = result.CMS;
    });
  }
  getFbContent () {
    this.$Api.cms.getContentByDevice({ ContentId: 20299, IsMobile: true }).then(result => {
      this.fbContent = result.CMS;
    });
  } */
  created () {
    // this.getVideoContent();
    // this.getFbContent();
  }
  get lang () {
    return this.$Storage.get('locale');
  }
}
</script>
<style scoped lang="less">
.liveBox_in{
  width: 90%;
  margin: 30px auto;
  overflow: hidden;
  .videoBg{
    width: 100%;
    margin-bottom: 3rem;
    iframe{
      width: 100%;
    }
  }
  .fbBg{
    width:100%;
    /* iframe{
      width: 100%;
    } */
  }
}
</style>
