<template>
    <div class="as-main">
      <el-table
          :data="treeData"
          border
          :cell-style="cellStyle"
          :row-style="showTr"
          :span-method="objectSpanMethod"
          class="treeTable">
          <el-table-column
            type="selection"
            fixed
            align="center"
            :selectable="selectable"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="55">
            <template slot-scope="scope">
              {{scope.row.index}}
              <div class="arrows">
                <i v-if="scope.row.children && !scope.row.pId"
                   :class="[scope.row.trClass]"
                   @click="showChild(scope.row)"
                   style="cursor: pointer;color: #409EFF"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名/组名"
            align="left"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名"
            align="left">
          </el-table-column>
          <el-table-column
            prop="phone"
            align="left"
            label="电话">
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [         //后台请求的数据
          {
            userName: 'nkjgk1',
            name: '王晓晓',
            phone: '13255632547',
            id: '1'
          },
          {
            userName: 'nkjgk2',
            name: '',
            phone: '',
            id: '2',
            children: [
              {
                userName: 'nkjgk',
                name: '王晓晓1',
                phone: '13255632547',
                type: 'peo',
                id: '21'
              },
              {
                userName: 'nkjgk',
                name: '王晓晓2',
                phone: '13255632547',
                type: 'peo',
                id: '22',
              }
            ]
          },
          {
            userName: 'nkjgk3',
            name: '王晓晓',
            phone: '13255632547',
            id: '3',
            children: [
              {
                userName: 'nkjgk',
                name: '王晓晓1',
                phone: '13255632547',
                type: 'peo',
                id: '31'
              },
              {
                userName: 'nkjgk',
                name: '王晓晓2',
                phone: '13255632547',
                type: 'peo',
                id: '32'
              },

            ]
          },
          {
            userName: 'nkjgk4',
            name: '王晓晓',
            phone: '13255632547',
            id: '4'
          },
        ],
        dataFormat: []
      }
    },

    computed: {
      treeData(){     //将来源数据抹平，隐藏子行
        let arr = [];
        this.tableData.forEach(function (item, index) {
          arr.push(Object.assign({},item,{
            trShow: true,
            trClass: 'el-icon-arrow-right',
            index: index + 1
          }));
          let pId = item.id;
          if (item.children && item.children.length > 0) {
            let chi = item.children;
            chi.forEach((item, index) => {
              arr.push(Object.assign({},item,{
                pId: pId,
                trShow: false,
                rowSpans: index === 0 ? [chi.length, 2] : [0 , 1]
              }))
            })
          }
        });

        this.dataFormat = arr
        return arr;
      }
    },

    methods: {

      showTr(row, index) {    //是否显示行
        if(row.row.trShow){
          return ''
        }else{
          return 'display: none'
        }
      },

      showChild(row) {     //展开子行的方法
        if (row.trClass == 'el-icon-arrow-right') {
          this.treeData.forEach(function (item, index) {
            if (item.pId == row.id) {
              item.trShow = true;
            }
          });
          row.trClass = 'el-icon-arrow-down';
        } else {
          this.treeData.forEach(function (item, index) {
            if (item.pId == row.id) {
              item.trShow = false;
            }
          });
          row.trClass = 'el-icon-arrow-right';
        }
      },

      cellStyle({row, column, rowIndex, columnIndex}) {
        if(columnIndex == 0) {
          if(row.rowSpans && row.rowSpans[0]){
            // return {display: 'none'}
          }
        }
      },

      selectable(row){  //禁用checked
        if(row.pId){
          return false;
        }else{
          return true
        }
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if(row.rowSpans) {
          if(columnIndex === 0){
            return row.rowSpans
          }

          if(columnIndex === 1){
            if(row.rowSpans[0]){
              return [0,1]
            }else {
              return [0,0]
            }
          }
        }
      },

      tableIndex(index) {
        return this.dataFormat[index].index
      }
    },
  }
</script>

<style lang="scss">
  .treeTable {
    .marLeft {
      margin-left: 10px;
    }

    .arrows {
      display: inline-block;
      width: 10px;
    }

    .is-disabled {
      display: none;
    }
  }
</style>
