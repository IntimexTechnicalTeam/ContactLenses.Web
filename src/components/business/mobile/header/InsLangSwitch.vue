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
  width: 8rem;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 5px;
    p {
      display: inline-block;
      padding: 0 10px;
      cursor: pointer;
      position: relative;

      &:not(:last-child) {
        &::after {
          position: absolute;
          content: '';
          top: 1px;
          right: 0;
          height: 100%;
          width: 2px;
          display: block;
          background-color: #fff;
        }
      }

      &:last-child {
        padding-right: 0;
      }
    }
    select{
      width: 100%;
      background: transparent url('/images/mobile/mobileIndex_14.png')  90% 50% no-repeat;
      background-size: 1.5rem;
      border:none;
      box-sizing: border-box;
      color:#666666;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      font-size: 1.4rem;
      outline: none;
      color:#fff;
      padding-left: 1rem;
      option{
        color:#666666;
        outline: none;
      }
    }
}
</style>
