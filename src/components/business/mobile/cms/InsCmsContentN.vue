<template>
  <div id="container">
    <!-- 其他页面 -->
    <div class="CmsOther">
        <p class="HeadTitle">{{TitleName}}</p>
        <div class="NormalContent" v-html="content.Body"></div>
    </div>

  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FrontE } from '@/sdk/common/SysConst';
import Cookie from 'js-cookie';
@Component({
})
export default class InsCmsContent extends Vue {
  NewsNav: string = 'NewsNav';
  CateName: string = '';
  CateDesc: string = '';
  content: any[] = [];
  private ImgList: string[] = [];
  private ImgCover: string[] = [];
  private ispic:boolean=false;
  IsMobile:boolean=false;
  MapInfo:string='';
  ShopList:any[]=[];
  FormContent:any='';
  IsPay:boolean= false;
  IsLogin:boolean=false;
  cindex:number=0;
  private htmlString: string = '';
  Signer: any = null;
  FormTitle:string='';
  NewcateId:string='';
  private waiting: boolean = true;
  OtherPageImg:string='';
  TitleName:string='';
  get id () {
    return this.$route.params.id ? this.$route.params.id : '';
  }
  get currentlang () {
    return this.$Storage.get('locale');
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  get queryLang () {
    return this.$route.query.Lang || '';
  }
  created () {
    this.getContent();
  }
  getContent () {
    this.$Api.cms.getContentByDevice({ Key: this.id, ContentId: this.id, IsMobile: false }).then(result => {
    this.content = result.CMS;
    this.TitleName = result.CMS.Title;
    this.OtherPageImg = result.CMS.Cover;
    this.NewcateId = result.CMS.CatId;
    this.CateDesc = result.CMS.Desc;
    this.waiting = false;
    if (result.CMS.Title) document.title = result.CMS.Title;
  });
}
  // 根据设备类型获取CMSCategory信息
  @Watch('$route', { deep: true })
  onIdChange () {
    this.getContent();
  }
  mounted () {
    window['regAndPay'] = this.$Api.regAndPay;
    window['router'] = this.$router;
    // window['getPanel'] = this.$Api.getPanel;
    window['Elalert'] = this.$alert;
  }
}
</script>
<style lang="less" scoped>
.CmsOther {
    .HeadTitle {
    font-size: 25px;
    color: #0e579c;
    margin: 15px 0;
    font-weight: 700;
    text-align: center;
    width: 90%;
    margin: 0 auto;
  }
  .NormalContent {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    /deep/ .NormalText {
      padding-top: 50px;
      padding-bottom: 50px;
      p{
        line-height: 30px;
        color: #0e579c;
        font-size: 20px;
        font-weight: 700;
      }
    }
  /deep/ .CmsInfo{
  width:100%;
  margin:0 auto;
  padding: 2rem 0;
  text-align: center;
  .bigTitle{
    font-size: 1.8rem;
    font-weight: bold;
    color: #0e579c;
  }
    .preface{
      .infoText{
        text-indent: 2rem;
      }
    }
    .infoText{
      font-size: 1.5rem;
      color:#3f95d2;
      text-align: left;
      line-height: 3rem;
      letter-spacing: 0.3rem;
      strong{
        font-weight: bold;
        font-size: 1.6rem;
      }
    }
    .explainText{
      font-size: 1.3rem;
      color:#3f95d2;
      text-align: left;
      line-height: 3rem;
      letter-spacing: 0.5rem;
    }
    .smallTitle{
      font-size: 1.7rem;
      color:#0e579c;
      line-height: 3rem;
      margin:2rem auto;
    }
    table{
      margin:3rem auto;
      border:1px solid #808080;
      border-collapse: collapse;
      td{
        border:1px solid #808080;
        vertical-align: center;
        text-align: center;
        p{
          padding: 1rem;
        }
      }
      tbody tr:nth-child(even) {
        background-color: antiquewhite;
      }
    }
    .footerTitle,
    .contact{
      color:#0e579c;
      line-height: 3rem;
      font-size: 1.3rem;
    }
    .needInfo{
      span{
        color:#f70a0a;
        font-size: 1.5rem;
      }
    }
    }
  }
}
</style>
