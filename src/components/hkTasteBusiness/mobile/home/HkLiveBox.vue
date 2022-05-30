<template>
  <div class="liveBox mobileVersion" style="text-align: center;">
    <div class="liveBox_in">
        <div class="videoBg">
            <p v-html="videoContent.Body"></p>
        </div>
        <div class="mapBg">
           <p v-html="fbContent.Body"></p>
        </div>
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
    this.$Api.cms.getContentByDevice({ ContentId: 20294, IsMobile: true }).then(result => {
      this.videoContent = result.CMS;
    });
  }
  getFbContent () {
    this.$Api.cms.getContentByDevice({ ContentId: 20299, IsMobile: true }).then(result => {
      this.fbContent = result.CMS;
    });
  }
  created () {
    this.getVideoContent();
    this.getFbContent();
  }
  get lang () {
    return this.$Storage.get('locale');
  }
}
</script>
<style  lang="less">
.mobileVersion{
  .videoBg{
    iframe{
      width: 100%;
      height: 20rem;
    }
    img{
      width: 100%;
    }
  }
  .mapBg{
    /* iframe{
      width: 100%;
    } */
    img{
      width: 100%;
    }
  }
}
</style>
<style scoped lang="less">
/*live*/
.liveBox {
    width: 100%;
    .liveBox_in{
    width: 90%;
    margin: 0 auto 3rem auto;
    padding-top:3rem;
      .videoBg{
        margin-top: 2rem;
        margin-bottom: 3rem;
        background-size: 100% 100%;
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        img{
          width: 100%;
        }
      }
      .hotTitle{
        width: 100%;
        height: 6rem;
        margin: 0 auto;
      }
      .hotTitleE{
        width: 100%;
        height: 6rem;
        margin: 0 auto;
        background-size: contain;
      }
    }

}
</style>
