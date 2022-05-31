<template>
    <div class="langSwitch">
        <!-- <p @click="changeLang('S')" :class="{'active': $Storage.get('locale') === 'S'}">简</p> |
        <p @click="changeLang('C')" :class="{'active': $Storage.get('locale') === 'C'}">繁</p> |
        <p @click="changeLang('E')" :class="{'active': $Storage.get('locale') === 'E'}">Eng</p> -->

      <!-- <p @click="changeLang(lang.value)" v-for="(lang,index) in FrontE.langList" :key="index" :class="{'active': $Storage.get('locale') === lang.value}">{{lang.name}}</p> -->
      <select  v-model="currentlang">
        <option :value="lang.value" v-for="(lang,index) in FrontE.langList" :key="index">{{lang.name}}</option>
      </select>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component
export default class InsLangSwitch extends Vue {
  get currentlang () {
    return this.$i18n.locale;
  }
  set currentlang (val) {
    this.changeLang(val);
  }
  changeLang (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      localStorage.setItem('locale', lang);
      this.Reload();
    }).catch((error) => {
      console.log(error);
    });
 }
}
</script>
<style scoped lang="less">
.langSwitch {
    width: 100px;
    margin-left: 10px;
    margin-right: 10px;
    p {
      display: inline-block;
      padding: 5px 10px;
      cursor: pointer;
    }
    .active{
      background: grey;
      color: #fff!important;
    }
    select{
      width: 100%;
      background: transparent url('/images/pc/select-down.png')  right center no-repeat;
      background-size: 1rem;
      border:none;
      box-sizing: border-box;
      text-align: left;
      color:#0e559c;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      font-size: 1.4rem;
      outline: none;
      padding: 0 1rem;
      padding-left: 10px;
      cursor: pointer;
      option{
        color:#666666;
        outline: none;
      }
    }
}
</style>
