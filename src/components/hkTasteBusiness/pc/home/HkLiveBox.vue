<template>
  <div class="indexHotVideo">
    <div class="HotVideoMain">
      <div class="leftVideo">
        <!-- <div class="point">
          <h1 class="youtube">Youtube</h1>
          <h1 class="facebook">Facebook</h1>
        </div> -->
        <!-- <p v-html="videoContent.Body"></p> -->
        <iframe width="560" height="315" src="https://www.youtube.com/embed/7S4qFKeB2V8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="fb">
        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3D115809401129573%26id%3D115807627796417%26substory_index%3D0&show_text=true&width=500" width="500" height="534" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      </div>
      <!-- <div class="rightVideo"><p v-html="fbContent.Body"></p></div> -->
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkLiveBox extends Vue {
  /* videoContent:string='';
  fbContent:string=''; */
  /* getVideoContent () {
    this.$Api.cms.getContentByDevice({ ContentId: 20294, IsMobile: false }).then(result => {
      this.videoContent = result.CMS;
    });
  }
  getFbContent () {
    this.$Api.cms.getContentByDevice({ ContentId: 20299, IsMobile: false }).then(result => {
      this.fbContent = result.CMS;
    });
  } */
  get lang () {
    return this.$Storage.get('locale');
  }
  created () {
    // this.getVideoContent();
    // this.getFbContent();
  }
}
</script>
<style  lang="less">
.HotVideoMain{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 auto 50px auto;
  .leftVideo{
    width:600px;
    height: 350px;
    iframe{
      width:100%;
      height: 350px;
    }
  }
}
</style>
