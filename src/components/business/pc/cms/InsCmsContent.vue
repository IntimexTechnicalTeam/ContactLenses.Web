<template>
  <div id="container" class="PcContact">
  <!-- 联络我们页面 -->
    <div class="Cmsbg" v-if="NewcateId=='40112'">
      <transition name="slide">
        <div key="1" v-if="!waiting" style="display:flex;">
           <div class="DetailTitle"><!-- <img :src="ImgList" v-show="ImgList!==null"> -->
           <img :src="OtherPageImg" v-show="OtherPageImg!==null"><div class="TitleBg"><div class="innerBoxText">{{CateName}}</div></div></div>
      </div>
      </transition>
      <transition name="slide">
        <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
      </transition>
      <div class="CmsContent">
        <div class="MapInfo">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.1861947863495!2d114.20403351536899!3d22.384337145494694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040645abb09ba3%3A0x4c46848ccf55c7bd!2sShatin%20Industrial%20Center!5e0!3m2!1szh-TW!2shk!4v1650419025774!5m2!1szh-TW!2shk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
          <div class="CmsMap">
            <p v-html="content.Body" class="cmsbody"></p>
          </div>
         <div class="clear"></div>
      </div>
    </div>
    <!-- 其他页面 -->
    <div class="CmsOther" v-else>
        <transition name="slide">
          <div key="1" v-if="!waiting" style="display:flex;">
              <div class="DetailTitle" v-show="OtherPageImg!==null"><img :src="OtherPageImg"><div class="TitleBg"><div class="innerBoxText">{{CateName}}</div></div></div>
        </div>
        </transition>
        <div class="NormalContent" v-html="content.Body"></div>
    </div>

  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FrontE } from '@/sdk/common/SysConst';
import Cookie from 'js-cookie';
@Component({
  components: {
    PkcmsBanner: () => import('@/components/hkTasteBusiness/pc/cms/PkcmsBanner.vue')
  }
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
    this.getCategoryByDevice(result.CMS.CatId);
    this.CateDesc = result.CMS.Desc;
    this.waiting = false;
    if (result.CMS.Title) document.title = result.CMS.Title;
  });
}
  // 根据设备类型获取CMSCategory信息
  getCategoryByDevice (cateId) {
      this.$Api.cms.getCategoryByDevice({ CatId: cateId, IsMobile: false }).then(async (result) => {
      // this.ImgList = result.ImagePath;
      this.ImgList = result.ImagePath;
      this.ImgCover = result.Cover;
      this.MapInfo = result.Content;
      this.CateName = result.Name;
      this.waiting = false;
    }).catch((error) => {
      console.log(error, 'error');
      this.$message({
        message: error,
        type: 'error'
      });
    });
  }
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
<style lang="less">
.PcContact .activeColor .content p:nth-child(1){
    color: #333!important;
    text-decoration: underline;
    font-weight: 700;
}
.PcContact .aboutBg{
    width: 80%;
    background-size: 100%;
    min-height: 65rem;
    padding: 10%;
    word-break: break-all;
}
.PcContact .abooutImg{
    width: 70%;
    margin: 0 auto;
    margin-bottom: 1rem;
    img{
      width: 100%;
    }
}
.PcContact .contactBox{
  width: 100%;
  p{
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    font-size: 1.4rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color:#0a57b1;
    font-weight: bold;
    i,em{
      width: 60px;
      height: 35px;
    }
    .address{
      background: url(/images/pc/address.png) no-repeat center center;
    }
    .tel{
      background: url(/images/pc/phone.png) no-repeat center center;
    }
    .fax{
      background: url(/images/pc/fax.png) no-repeat center center;
    }
    .email{
      background: url(/images/pc/Email-filled.png) no-repeat center center;
    }
  }
}
.PcContact  .MapInfo{
  width:70%;
  float:left;
  padding-top: 3rem;
  iframe{
    width:100%;
    height: 250px;
  }
  img{
    width:100%;
  }
}
.PcContact .CmsContent{
    position: relative;
    width: 1200px;
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   .aboutUSImg{
     width:10%;
     float:left;
     box-sizing: border-box;
     display: flex;
     justify-content: flex-end;
     margin-left: 3%;
     padding-top: 10%;
     img{
       width: 100%;
     }
   }
   .aboutUSbg{
     width: 83%;
     float: left;
     background: #FFF;
     border-radius: 10px;
     padding: 20px;
     .innerBox{
       border:1px solid #000;
       border-radius: 10px;
       position: relative;
        min-height: 400px;
        padding: 30px;
        word-break: break-all;
        &::before{
            content: '';
            width: 98%;
            height: 20px;
            background-size: 100%;
            position: absolute;
            top: 10px;
            left: 1%;
        }
        &::after{
            content: '';
            width: 98%;
            height: 20px;
            background-size: 100%;
            position: absolute;
            bottom: 10px;
            left: 1%;
        }
     }
   }
  .CmsMapImg{
    width: 30%;
    position: absolute;
    right: 0px;
    top: 3rem;
    text-align: right;
    img{
      width:50%;
    }
  }
}
</style>
<style scoped lang="less">
.TitleName{
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: center;
  img{
    width: 100%;
  }
  .TitleBg{
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    padding: 10px 20px;
    margin-bottom: 20px;
    top: 100%;
    position: absolute;
    transform: translateY(-50%);
    background: #0e579c;
    border-radius: 20px;
    .innerBoxText{
      color:#fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: 700;
      font-family: 'Arial';
    }
  }
}

.CmsNormal{
  width: 100%;
  display: inline-block;
  background: #FFF;
  padding-bottom: 5rem;
}
.TitleBg{
  height: 50px;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 20px;
  .innerBoxText{
    width: 100%;
    height: 100%;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 700;
    font-family: 'Arial';
  }
}
.Cmsbg{
  width:100%;
  background: url('/images/pc/pc_background.jpg') no-repeat center center;
  background-size:100% 100%;
  display: block;
  box-sizing: border-box;
  display: inline-block;
}
.Banner {
  width: 100%;
  height: 20rem;
  display:flex;
  align-items: center;
  padding-left:2rem;
  .innerBox{
      width: 1200px;
      margin: 0 auto;
  }
}
.Banner img {
  width: 100%;
  height: 20rem;
}
.CmsMap {
    width: 70%;
    float: left;
    margin-left: 5%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 5rem;
    .cmsbody{
      width:100%;
    }
    .addressBox{
      width: 100%;
      float: left;
      display: flex;
      flex-wrap: wrap;
    }
}

.CmsMap
{
  position: relative;
  .addressIcon{
    width: 100%;
    font-size: 1.4rem;
    margin-bottom: 2rem;
    padding-top: 2rem;
    align-items: center;
    display: flex;
    i{
      background: url('/images/mobile/Mobile-Contact-05.png') no-repeat center center;
      background-size: 100% 100%;
      width:2rem;
      height:2rem;
      display: inline-block;
      margin-right:.5rem;
    }
  }
  .perList{
    margin-bottom: 3rem;
    width: 48%;
    margin-right:4%;
    &:nth-child(2n){
      margin-right:0%!important;
    }
    p{
      font-size:1.4rem;
      cursor: pointer;
      &:nth-child(1):hover{
        color:#262626 ;
      }
    }
  }
}
.clear {
  clear: both;
}
</style>
<style lang="less" scoped>
.CmsOther {
  .NormalContent {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    /deep/  .pc-about-text{
      width:100%;
      margin-top: 3rem;
      p{
        font-size: 18px;
        color:#808080;
        font-weight: bold;
        line-height: 45px;
      }
        .pc-about-img{
          width:100%;
          margin:0 auto;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          margin-top: 2rem;
          .Img-01{
            width:55%;
            /* height: 310px; */
          }
          .Img-02{
            width:43%;
            /* height: 310px; */
            margin-left: 1.5rem;
          }
        }
    }
    /deep/ .Cmsguide{
      width:1200px;
      margin:30px auto;
      p{
        line-height: 30px;
        color:#0e579c;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
