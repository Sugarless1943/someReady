<template>
  <div>
    <div>
      <el-table
        :data="tableData6"
        :span-method="arraySpanMethod"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="amount1"
          sortable
          label="数值 1">
        </el-table-column>
        <el-table-column
          prop="amount2"
          sortable
          label="数值 2">
        </el-table-column>
        <el-table-column
          prop="amount3"
          sortable
          label="数值 3">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
      name: "test01",
      data() {
        return {
          tableData6: [{
            id: '12987122',
            name: '王小虎',
            amount1: '1',
            amount2: '2',
            amount3: '3'
          }, {
            id: '12987123',
            name: '王小虎',
            amount1: '1',
            amount2: '2',
            amount3: '3'
          }, {
            id: '12987124',
            name: '王小虎',
            amount1: '1',
            amount2: '2',
            amount3: '3'
          }, {
            id: '12987125',
            name: '王小虎',
            amount1: '1',
            amount2: '2',
            amount3: '3'
          }, {
            id: '12987126',
            name: '王小虎',
            amount1: '1',
            amount2: '2',
            amount3: '3'
          }]
        }
      },
      methods: {
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
          if (rowIndex % 2 === 0) {
            if (columnIndex === 0) {
              return [1, 2];
            } else if (columnIndex === 1) {
              return [0, 0];
            }
          }
        },
      }
    }
</script>

<style scoped>

</style>
