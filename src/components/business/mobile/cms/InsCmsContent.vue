<template>
  <div id="container" class="MobileContact">
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
  getContent () {
    this.$Api.cms.getContentByDevice({ Key: this.id, ContentId: this.id, IsMobile: true }).then(result => {
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
  created () {
    this.getContent();
  }
  // 根据设备类型获取CMSCategory信息
  getCategoryByDevice (cateId) {
      this.$Api.cms.getCategoryByDevice({ CatId: cateId, IsMobile: true }).then(async (result) => {
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
.MobileContact{
    .OurStores{
      font-size: 2.5rem;
      font-weight: 700;
      color:#333333;
      text-align: right;
    }
    .BusinessHours{
      font-size: 1.6rem;
      color:#333333;
      margin-bottom: 30px;
      text-align: right;
    }
    .aboutUSbg{
      width: 100%;
      float: left;
      background: #FFF;
      border-radius: 10px;
      padding: 5px;
     .innerBox{
       border:1px solid #000;
       border-radius: 10px;
       position: relative;
        min-height: 400px;
        padding: 20px;
        p{
          font-size: 1.4rem;
          text-align: justify;
        }
        &::before{
            content: '';
            width: 98%;
            height: 20px;
            background: url(/images/mobile/productList_icon.png) no-repeat center center;
            background-size: 100%;
            position: absolute;
            top: 10px;
            left: 1%;
        }
        &::after{
            content: '';
            width: 98%;
            height: 20px;
            background: url(/images/mobile/productList_icon.png) no-repeat center center;
            background-size: 100%;
            position: absolute;
            bottom: 10px;
            left: 1%;
        }
     }
   }
  }
.MobileContact .activeColor .content p:nth-child(1){
    text-decoration: underline;
    font-weight: 700;
}
.MobileContact .aboutBg{
    width: 80%;
    background-size: 100%;
    min-height: 65rem;
    padding: 10%;
    word-break: break-all;
}
.MobileContact .abooutImg{
    width: 70%;
    margin: 0 auto;
    margin-bottom: 1rem;
    img{
      width: 100%;
    }
}
.MobileContact .contactBox{
  width: 100%;
  display: inline-block;
  margin-top:3rem;
  p{
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #0b56a7;
    i,em{
      width:3rem;
      height: 4rem;
      margin-right: 0.5rem;
    }
    .address{
      background: url(/images/mobile/address.png) no-repeat center center;
    }
    .tel{
      background: url(/images/mobile/phone.png) no-repeat center center;
    }
    .fax{
      background: url(/images/mobile/fax.png) no-repeat center center;
    }
    .email{
      background: url(/images/mobile/Email-filled.png) no-repeat center center;
    }
  }
}
.MobileContact .CmsMap .MapInfo{
  width:100%;
  margin-bottom: 1rem;
  iframe{
    width:100%;
    height: 30rem;
  }
  img{
    width:100%;
  }
}
</style>
<style lang="less" scoped>
.CmsOther {
  .NormalContent {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding-top: 5rem;
    /deep/  .pc-about-text{
      width:100%;
      margin:0 auto;
      p{
        color: #3f95d2;
        font-weight: bold;
        line-height: 2.3rem;
        font-size: 16px;
        span,strong {
          line-height: 2.3rem;
          font-size: 16px;
        }
      }
      .pc-about-img{
        width: 100%;
        margin: 2rem auto;
        overflow: hidden;
        img{
          width: 100%;
        }
        img:nth-child(1){
          margin-bottom: 2rem;
        }
      }
    }
    /deep/ .Cmsguide{
      width: 100%;
      margin:2rem auto;
      p{
        color:#0e579c;
        font-size: 20px;
        font-weight: bold;
        line-height: 30px;
      }
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
    width: 55%;
    height: 4.5rem;
    line-height: 4.5rem;
    margin: 0 auto;
    padding: 10px;
    margin-bottom: 20px;
    top: 100%;
    position: absolute;
    transform: translateY(-50%);
    background: #0e579c;
    border-radius: 20px;
    .innerBoxText{
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 700;
      font-family: 'Arial';
    }
  }
}
.CmsNormal{
  width: 100%;
  display: inline-block;
  background: #FFF;
}
.TitleBg{
  width: 55%;
  height: 4.5rem;
  margin: 0 auto;
  padding: .8rem;
  .innerBoxText{
    width: 100%;
    height: 100%;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 700;
    font-family: 'Arial';
  }
}
.Cmsbg{
  width:100%;
  background: url('/images/mobile/mobile_background.jpg') no-repeat center center;
  background-size: cover;
  display: inline-block;
  box-sizing: border-box;
  margin-top: -.5rem;
  padding-bottom: 2rem;
}
.Banner {
  width: 100%;
  height: 15rem;
  display:flex;
  align-items: center;
  position: relative;
}
.Banner img {
  width: 100%;
  height: 15rem;
}
#container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.CmsMap {
    width: 90%;
    margin: 0 auto;
    padding-top: 2rem;
}
.CmsContent{
  position: relative;
    width: 90%;
    margin: 0 auto;
    padding-top: 5rem;
    margin-top: 3rem;
  .mobileMap{
    width: 100%;
    overflow: hidden;
    iframe{
      width: 100%;
    }
  }
}
.CmsMap
{
  position: relative;
  .addressIcon{
    width: 100%;
    font-size: 1.4rem;
    margin-bottom: 2rem;
    align-items: center;
    display: flex;
    i{
      background: url('/images/mobile/Mobile-Contact-05.png') no-repeat center center;
      background-size: 100% 100%;
      width:2.5rem;
      height:2.5rem;
      display: inline-block;
      margin-right:.5rem;
    }
  }
  .perList{
    margin-bottom:3rem;
    width:calc(100% - 3rem);
    padding-left: 3rem;
    p{
      font-size:1.4rem;
    }
  }
}
.clear {
  clear: both;
}
</style>
