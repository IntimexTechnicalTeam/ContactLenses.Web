<template>
    <div class="productTreepc">
      <div class="productMenuTree">
        <template v-if="direction === 'row'">
          <ins-select-search :data="catalogs" :type="1" :multiple="multiSelect" @changeSelect="changeSelectedAttr" />
        </template>

        <template v-if="direction === 'column'">
          <p class="Title" v-if="title">{{title}}</p>
          <Tree icon-class="el-icon-caret-right" :default-expand-all="expandAll" :data="catalogs" node-key="Id" :show-checkbox="treeType === 1 ? false : showCheckbox" :props="props" @node-click="handleNodeClick" @check="changeCSelect" :check-strictly="!multiSelect" ref="tree"></Tree>
        </template>
      </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Tree } from 'element-ui';
@Component({
  components: {
    InsSelectSearch: () => import(/* webpackChunkName: "product" */ '@/components/base/pc/InsSelectSearch.vue'),
    Tree
  }
})
export default class InsProductCatTree extends Vue {
    @Prop({ default: '' }) private title!: string;
    @Prop({ default: 'column' }) private direction!: string;
    @Prop({ default: 1 }) private treeType!: number; // 树形控件类型区分（0->产品属性，1->菜单）
    @Prop({ default: true }) private multiSelect!: boolean; // 是否为多选
    @Prop({ default: false }) private showCheckbox!: boolean; // 节点是否可被选择
    @Prop({ default: false }) private expandAll!: boolean; // 是否默认展开所有节点

    catalogs: object[] = []; // 产品目录数据
    props: object = {
      children: 'Children',
      label: 'Name'
    };

    // 获取产品目录列表
    getCatalogs () {
      this.$Api.product.getAttrList().then((result) => {
        this.catalogs = result;
        console.log(result, '获取产品目录列表');
      });
    }

    // url 选中目录数据
    get checkedKeys () {
      console.log(this.$route.query.catalogs, 'this.$route.query.catalogs');
      if (this.$route.query.catalogs) {
        return JSON.parse(this.$route.query.catalogs as string);
      } else {
        return [];
      }
    }

    // 获取选中目录
    getCheckedKeys () {
      console.log(this.checkedKeys, '获取选中目录');
      (this.$refs.tree as any).setCheckedKeys(this.checkedKeys);
      this.changeSelectedAttr(this.checkedKeys);
    }

    changeCSelect (key) {
      if (!this.multiSelect) {
        (this.$refs.tree as any).setCheckedKeys([key.Id]);
      }

      let a = (this.$refs.tree as any).getCheckedKeys();
      this.changeSelectedAttr(a);
    }

    handleNodeClick (data, node) {
      console.log(node, data, '选中node');
      if (this.treeType === 1) {
        this.changeSelectedAttr(data.Id);
      }
    }

    // 搜寻attr改变
    changeSelectedAttr (item) {
      if (this.treeType === 0) {
        console.log(item, '搜寻目录改变(checkbox)');
        this.$emit('changeSelect', item);
      } else {
        this.$router.push({ path: `/product/cat/${item}` });
        console.log(item, '搜寻目录改变(菜单)');
      }
    }

    mounted () {
      this.getCatalogs();
      if (this.direction === 'column' && this.checkedKeys.length) {
        this.getCheckedKeys();
      }
    }
}
</script>

<style scoped lang="less">
.productMenuTree {
    border: 1px solid #eee;

    .Title {
        background: @primary_color;
        text-align: center;
        font-size: 18px;
        color: #fff;
        padding: 20px 10px;
    }
}
</style>
<style lang="less" scoped>
.productTreepc{
  margin-top:1rem;
  width:250px;
  overflow: hidden;
    .productMenuTree{
      border:none;
      /deep/ .el-tree{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: -webkit-flex;
        -webkit-flex-direction: column;
        -webkit-justify-content: center;
        -webkit-align-items: center;
        .el-tree-node{
          width:100%;
          .el-tree-node__content{
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            display: -webkit-flex;
            -webkit-flex-direction: row;
            -webkit-justify-content: center;
            -webkit-align-items: center;
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            .el-tree-node__label{
              font-size: 18px;
              color:#0e579c;
              font-weight: bold;
              display: block;
              width: 100%;
            }
            .el-icon-caret-right{
              position: absolute;
              left:70%;
              color:#0e579c;
            }
            &:hover{
              border-radius: 12px;
              .el-tree-node__label{
                background: #0e579c;
                color:#fff;
              }
              .el-icon-caret-right{
                color: #fff;
              }
            }
          }
        }
        .is-expanded {
          .el-tree-node__content {
            background: #0e579c;
            border-radius: 12px;
            .el-tree-node__label,
            .expanded{
              color:#fff;
            }
          }
          .el-tree-node__children{
            .el-tree-node__content{
              background: #fff;
              padding: 0!important;
              .el-icon-caret-right{
                display: none;
              }
              .el-tree-node__label{
                color: #0e579c;
              }
              &:hover{
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                .el-tree-node__label{
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
}

</style>
