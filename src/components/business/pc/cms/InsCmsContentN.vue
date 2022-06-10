<template>
  <div id="container">
    <!-- 其他页面 -->
    <div class="CmsOther">
        <p class="HeadTitle">{{TitleName}}</p>
        <div class="NormalContent" v-html="content.Body"></div>
        <button class="toProduct" @click="toProduct()">{{$t('product.buyNow')}}</button>
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
  toProduct () {
    this.$router.push('/product/cat/23');
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
  text-align: center;
    padding-top: 50px;
    padding-bottom: 50px;
    .HeadTitle {
      font-size: 25px;
      color: #0e579c;
      margin: 15px 0;
      font-weight: 700;
      text-align: center;
    }
  .NormalContent {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    /deep/ .NormalText {
      width:95%;
      margin:0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      .tList{
        width: 375px;
        margin-bottom: 1rem;
        img{
          width:50%;
        }
      }
      p{
        line-height: 30px;
        color: #0e579c;
        font-size: 20px;
        font-weight: 700;
      }
    }
    /deep/ .CmsInfo{
      width:1200px;
      margin: 50px auto;
      text-align: center;
      .bigTitle{
        text-align: center;
        color:#0e579c;
        margin-bottom: 30px;
        font-size: 35px;
        font-weight: bold;
      }
      .btlImg{
        margin:30px auto;
      }
        .smallTitle{
          font-size: 25px;
          color:#0e579c;
          margin: 15px 0;
        }
        p{
          line-height: 40px;
          color:#000;
          font-size: 18px;
          letter-spacing:3px;
        }
        .x-tit{
          color:#439cd8;
          font-size: 22px;
        }
        .preface{
          .infoText{
            text-indent: 30px;
          }
        }
        .s-tit{
          color:rgb(248, 4, 4);
        }
        .explainText{
          font-size: 20px;
          font-weight: bold;
          color: #439cd8;
        }
        table{
          margin:25px auto;
          border:1px solid #808080;
          border-collapse: collapse;
          td{
            border:1px solid #808080;
            vertical-align: center;
            text-align: center;
            p{
              padding: 10px;
            }
          }
          tbody tr:nth-child(even) {
            background-color: antiquewhite;
          }
        }
        .footerTitle{
          border-top:1px solid #000;
          padding-top: 20px;
          line-height: 40px;
          height: 40px;
          font-size: 24px;
          text-align: center;
          color: #0e579c;
        }
        .contact{
          text-align: center;
          color:#439cd8;
          margin:20px auto;
        }
        .needInfo{
          text-align: center;
          color:#f90914;
        }
        .remarks{
          strong{
            color: #439cd8;
          }
        }
        .infoText-s{
          .infoText{
            text-indent: 30px;
            color:#0e579c;
          }
        }
        .subtitle{
          font-size: 28px;
          text-align: center;
        }
    }
  }
  .toProduct{
    padding: 1rem 1.5rem;
    margin:1rem auto;
    border:none;
    font-size: 16px;
    font-weight: bold;
    background: #0e579c;
    color: #fff;
  }
}
</style>
