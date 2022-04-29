<template>
<div class="cateMain">
  <!-- 获取所在的产品目录 -->
  <!-- <div  class="detail-select-attribute" v-for="(cat,index) in cateTree" :key="'cat'+index">
    <div>
      <ul class="common-select">
        <li v-if="cat.ParentId!=0">{{cat.Name}}</li>
      </ul>
      <div class="clear"></div>
    </div>
  </div> -->
    <!-- 获取所在的产品非库存属性 -->
  <!-- <div  class="detail-select-attribute" v-for="(attr,index) in source" :key="'attr'+index">
    <div v-if="attr.length>0">
      <ul class="common-select">
        <li v-for="(one,index) in attr" :key="'sub'+index">{{one.Name}}</li>
      </ul>
      <div class="clear"></div>
    </div>
  </div> -->
  <h1 class="product_info">{{ $t("product.ProductInformation") }}</h1>
    <div class="M-detail-box">
      <div class="detail-header">
        <div class="detail-products detail-title">{{ $t("product.Products") }}</div>
        <div class="detail-parameter detail-title">{{ $t("product.Parameter") }}</div>
      </div>
      <div class="detail-body">
        <div class="catalogue">
          <div
            class="detail-select-attribute"
            v-for="(cat, index) in cateTree"
            :key="'cat' + index"
          >
            <div>
              <ul class="common-select">
                <li v-if="cat.ParentId != 0">{{ cat.Name }}</li>
              </ul>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="detailtype">
          <div
            class="detail-select-attribute"
            v-for="(attr, index) in source"
            :key="'attr' + index"
          >
            <div v-if="attr.length > 0">
              <ul class="common-select">
                <li v-for="(one, index) in attr" :key="'sub' + index">
                  {{one.Type.Name}}
                </li>
              </ul>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="attribute">
          <div
            class="detail-select-attribute"
            v-for="(attr, index) in source"
            :key="'attr' + index"
          >
            <div v-if="attr.length > 0">
              <ul class="common-select">
                <li v-for="(one, index) in attr" :key="'sub' + index">
                  {{ one.Name }}
                </li>
              </ul>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class PkProductDetailCate extends Vue {
  @Prop() private readonly source!: string[];
  @Prop() private readonly cateTree!: string[];
}
</script>
<style scoped lang="less">
/* ul,li{
  list-style: none;
}
.cateMain{
    width: 95%;
    margin: 0 auto;
}
.clear{
  clear: both;
}
.detail-select-attribute{
  width:100%;
  display: block;
  margin-bottom: 1rem;
}
.detail-select-attribute .detail-select-title{
    width: 20%;
    margin-right: 5%;
    word-break: break-all;
    float: left;
    font-size: 1.2rem;
    text-align: right;
}
.detail-select-attribute .common-select{
  width:75%;
  word-break: break-all;
  float: left;
}
.detail-select-attribute .common-select li{
    display: inline-block;
    background-color: #262626;
    color: #FFF;
    margin-right: 0.5rem;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    padding-top: .7rem;
    padding-bottom: .7rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 5px;
} */
.cateMain{
  text-align: center;
  width: 100%;
}
.product_info{
  text-align: center;
  margin:30px auto;
  font-size: 2rem;
}
.M-detail-box{
  .detail-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    }
  .detail-title{
    background-color: #808080;
    color:#fff;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    font-weight: bold;
  }
  .detail-products{
    width: 70%;
  }
  .detail-parameter{
    width: 29%;
  }
  .detail-body{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top:2rem;
    li{
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color:#000;
      font-size: 1.2rem;
    }
  }
  .catalogue{
    width: 20%;
  }
  .detailtype{
    width: 50%;
  }
  .attribute{
    width: 30%;
  }
}
</style>
