<template>
  <div class="in_select_container" :style="styla" v-if="items.length>0">
    <!-- <div class="in_select_label">{{items[0].Type.Name}}</div> -->
    <div class="in_select_warpper">
      <input type="text" style="display:none;" v-model="Value" />
      <div
        class="in_select_main"
        @click="DropdownShow=!DropdownShow"
        :class="{'choised':Value,'select_focus':DropdownShow}"
      >{{Value?Value:Placeholder}}</div>
      <transition name="fade">
        <div class="in_select_dropdown" v-show="DropdownShow" @mouseleave="leftDropdown">
          <ul class="in_select_dropdown_none" v-if="None">
            <li>暂无内容</li>
          </ul>
          <ul class="in_select_dropdown_content" @click="choice">
            <li v-for="(content,index) in items" :key="index" :data-key="index">{{content.Text}}</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
// import ProductAttr from '@/model/ProductAttr';
import LensMaterial from '@/model/LensMaterial';
@Component
export default class InsSelect3 extends Vue {
  // data
  private Value: string = '';
  private RealValue: string = '';
  private AdditionalPrice: object = {};
  private None: boolean = false;
  private Content: string[] = [];
  private DropdownShow: boolean = false;
  private Placeholder = this.$t('RegNPay.PleaseSelect') as string;
  //   props
  @Prop() private readonly label!: string;
  @Prop() private readonly styla!: string;
  @Prop() private readonly items!: LensMaterial[];
  //   method
  choice (e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.nodeName !== 'LI') {
      return;
    }
    this.Value = this.items[target.dataset.key as string].Text;
    this.RealValue = this.items[target.dataset.key as string].Id;
    /* this.AdditionalPrice = {
      TypeId: this.items[target.dataset.key as string].Type.TypeId,
      AdditionalPrice: this.items[target.dataset.key as string].AdditionalPrice
    }; */
    this.DropdownShow = false;
    this.$emit('input', this.RealValue);
    /* this.$emit('changePrice', this.AdditionalPrice); */
  }
  leftDropdown (e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.nodeName === 'DIV') {
      this.DropdownShow = false;
    }
  }
  //   created
  created () {
      // console.log(this.items);
      console.log(this.items.length);
    if (this.items.length > 0) {
      /* this.Value = this.items[0].Name; */
      /* this.Value = this.items[0].Text;
      this.RealValue = this.items[0].Id; */
      console.log('this');
      /* this.AdditionalPrice = {
        TypeId: this.items['0'].Type.TypeId,
        AdditionalPrice: this.items['0'].AdditionalPrice
      }; */
      /* this.$emit('changePrice', this.AdditionalPrice); */
      this.$emit('input', this.RealValue);
    }
  }
  @Watch('items', { deep: true })
  onItemsChange () {
    if (this.items.length > 0) {
      /* this.Value = this.items[0].Name; */
      this.Value = this.items[0].Text;
      this.RealValue = this.items[0].Id;
      /* this.AdditionalPrice = {
        TypeId: this.items['0'].Type.TypeId,
        AdditionalPrice: this.items['0'].AdditionalPrice
      }; */
      /* this.$emit('changePrice', this.AdditionalPrice); */
      this.$emit('input', this.RealValue);
    }
  }
}
</script>
<style scoped>
.in_select_container {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  user-select: none;
  width: 100%;
}
.in_select_label {
  width: 100px;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: left;
}
.in_select_warpper {
  box-sizing: border-box;
  width: 90%;
  height: 40px;
  position: relative;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;

  text-align: left;
}
.in_select_main {
  font-size: 16px;
  height: 100%;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  border-radius: 5px;
  border-radius: 10px;
  box-shadow: 0 0 5px #dedede;
  width: 100%;
}
.in_select_main::after {
  content: "\25BC";
  position: absolute;
  right: 0;
  top: 2px;
  height: 8.4px;
  width: 8.4px;
  /* border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transform-origin: 25% 75%;
  transform: rotateZ(-45deg); */
}
.in_select_dropdown {
  position: absolute;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  background-color: white;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 2019;
  margin:0 auto;
  height: 200px;
  overflow-y: scroll;
}
::-webkit-scrollbar{
  width:5px;
}
::-webkit-scrollbar-thumb {
border-radius:10px;
background:rgba(0,0,0,0.1);
-webkit-box-shadow:inset 6px rgba(0,0,0,0.5);
}
.in_select_dropdown li {
  font-size: 16px;
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
  color:#0e579c;
  text-align: center;
}
.in_select_dropdown li:hover {
  background: rgba(0, 0, 0, 0.1);
}
.in_select_dropdown ul {
  margin: 3px 3px 3px 3px;
}
.select_focus {
  border: 1px solid rgba(0, 0, 255, 0.2);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
}
.choised {
  color: #0e579c;
  line-height: 40px;
  text-align: center;
  font-weight: bold;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  transform: translate3d(0,0,0);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate3d(0,0,0);
}
</style>
