<template>
  <div style="width: 100%;display: flex">
    <div class="alarmSet">
      <div v-for="item in AlarmLevelData" v-if="item.show" :key="item.index" :style="{ width: item.width+'%' }"
           :class="[item.key,{'ll':item.key.includes('l'),'rl':item.key.includes('r')}]">
        <p><span>{{item.label}}<i class="el-icon-close" @click="remove(item)"
                                  v-if="item.value != null && pageStatus != 'view'"></i></span></p>
        <input v-model.number="item.value" v-if="item.value != null" :disabled="pageStatus == 'view'">
      </div>
    </div>
    <el-dropdown style="margin-left: 5px;height: 25px" @command="handleCommand" v-if="pageStatus != 'view'">
      <span class="el-dropdown-link">
        添加<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in AlarmLevelData" :key="item.key" :command="item" v-if="item.show == false">
          {{labelHead(item.key)}}{{item.label}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>
  export default {
    props: ['stickData', 'pageStatus'],
    data() {
      return {
        defaultData: [
          {
            index: 0,
            key: 'l1',
            width: 10,
            label: 'Ⅰ级',
            value: null,
            show: true
          },
          {
            index: 1,
            key: 'l2',
            width: 10,
            label: 'Ⅱ级',
            value: null,
            show: true
          },
          {
            index: 2,
            key: 'l3',
            width: 10,
            label: 'Ⅲ级',
            value: null,
            show: true
          },
          {
            index: 3,
            key: 'l4',
            width: 10,
            label: 'Ⅳ级',
            value: null,
            show: true
          },
          {
            index: 4,
            key: 'mid',
            width: 20,
            label: '正常',
            value: null,
            show: true
          },
          {
            index: 5,
            key: 'r4',
            width: 10,
            label: 'Ⅳ级',
            value: null,
            show: true
          },
          {
            index: 6,
            key: 'r3',
            width: 10,
            label: 'Ⅲ级',
            value: null,
            show: true
          },
          {
            index: 7,
            key: 'r2',
            width: 10,
            label: 'Ⅱ级',
            value: null,
            show: true
          },
          {
            index: 8,
            key: 'r1',
            width: 10,
            label: 'Ⅰ级',
            value: null,
            show: true
          }
        ],
        AlarmLevelData: []
      }
    },
    methods: {
      remove(item) {
        let nextKey = this.getNext(item);
        nextKey.width = nextKey.width - 0 + item.width;
        this.AlarmLevelData[item.index].show = false;
        this.AlarmLevelData[item.index].width = 10;
        this.AlarmLevelData[item.index].value = null;
      },

      getNext(item) {
        let nextKey;
        let keys = item.key.split('').shift();
        if (keys == 'l') {
          for (let i = 0; i < this.AlarmLevelData.length; i++) {
            if (i > item.index && this.AlarmLevelData[i].show) {
              nextKey = this.AlarmLevelData[i];
              break;
            }
          }
        } else if (keys == 'r') {
          for (let i = this.AlarmLevelData.length; i > 0; i--) {
            if (i < item.index && this.AlarmLevelData[i].show) {
              nextKey = this.AlarmLevelData[i];
              break;
            }
          }
        }
        return nextKey;
      },

      getPrev(item) {
        let prevKey;
        let keys = item.key.split('').shift();
        if (keys == 'l') {
          prevKey = {index: -1};
          for (let i = 3; i >= 0; i--) {
            if (i < item.index && this.AlarmLevelData[i].show) {
              prevKey = this.AlarmLevelData[i];
              break;
            }
          }
        } else if (keys == 'r') {
          prevKey = {index: 9};
          for (let i = 5; i <= 8; i++) {
            if (i > item.index && this.AlarmLevelData[i].show) {
              prevKey = this.AlarmLevelData[i];
              break;
            }
          }
        }
        return prevKey;
      },

      getNextAdd(item) {
        let next = this.getNext(item);
        let prev = this.getPrev(item);
        if (next.width === 10) {
          this.getNextAdd(next)
        } else if (item.index < 4) {
          item.width = (item.index - prev.index) * 10
          next.width = next.width - item.width
        } else if (item.index > 4) {
          item.width = (prev.index - item.index) * 10
          next.width = next.width - item.width
        }
      },

      labelHead(key) {
        let head = key.split("").shift();
        if (head == 'l') {
          return '左'
        } else if (head == 'r') {
          return '右'
        } else {
          return ''
        }
      },

      handleCommand(item) {
        this.getNextAdd(item);
        item.show = true;
        item.value = 0;
      },

      result() {
        let obj = {}
        let insertData = (start, end, key) => {
          let data = this.AlarmLevelData;
          if (data[start].show || data[end].show) {
            obj[key] = {}
            if (data[start].show) {
              obj[key]['low'] = data[start].value;
            }
            if (data[end].show) {
              obj[key]['high'] = data[end].value;
            }
          }
        }
        insertData(0, 8, '1')
        insertData(1, 7, '2')
        insertData(2, 6, '3')
        insertData(3, 5, '4')

        //获取中间两边的数字
        //left
        let midLeft, midRight
        for (let i = 3; i >= 0; i--) {
          if (this.AlarmLevelData[i].show) {
            midLeft = this.AlarmLevelData[i].value
            break;
          }
        }
        for (let i = 5; i <= 8; i++) {
          if (this.AlarmLevelData[i].show) {
            midRight = this.AlarmLevelData[i].value
            break;
          }
        }
        if (midLeft || midLeft == 0 || midRight || midRight == 0) {
          obj['0'] = {}
          if (midLeft || midLeft == 0) {
            obj['0']['low'] = midLeft
          }
          if (midRight || midRight == 0) {
            obj['0']['high'] = midRight
          }
        }

        obj.delay = this.stickData.delay;
        obj.restoreDelay = this.stickData.restoreDelay;
        // obj.type = this.stickData.type;

        return obj

      },

      //对结果进行校验
      verify() {
        let result = []
        let reg = /^[-0-9.]+$/
        let [noRepeat,toBig,sortArr,regFlag] = [true,false,[],true]
        this.AlarmLevelData.forEach(item => {
          if(item.show && item.value !== null){
            result.push(item.value)
          }
          if(item.value != null && !reg.test(item.value)){
            regFlag = false
          }
        })

        if(result.length > 0){
          sortArr = result.slice(0).sort((a,b) => {
            return a-b
          })
          for(let i=0;i<sortArr.length;i++){
            if(sortArr[i] == sortArr[i+1]){
              noRepeat = false
            }
          }
        }else{
          noRepeat = false
        }

        if(noRepeat && sortArr.join('') === result.join('') && regFlag){
          toBig = true
        }

        return toBig
      },

      init(data) {
        const self = this

        this.AlarmLevelData = JSON.parse(JSON.stringify(this.defaultData))

        let nextWidth = (index) => {
          let THIS = this.AlarmLevelData[index];
          THIS.show = false;
          let next = this.getNext(this.AlarmLevelData[index]);

          if (next.key.split('').shift() == 'l' || next.key.split('').shift() == 'r') {
            next.width = next.width + THIS.width
          }
        }

        let resetData = (start, end, key) => {
          if (data[key]) {
            if (data[key]['low'] || data[key]['low'] == 0) {
              this.AlarmLevelData[start].value = data[key].low
            } else {
              nextWidth(start);
            }
            if (data[key]['high'] || data[key]['high'] == 0) {
              this.AlarmLevelData[end].value = data[key].high
            } else {
              nextWidth(end);
            }
          } else {
            nextWidth(start)
            nextWidth(end)
          }
        }

        resetData(0, 8, '1')
        resetData(1, 7, '2')
        resetData(2, 6, '3')
        resetData(3, 5, '4')

        //计算mid宽度
        self.AlarmLevelData[4].width = 100
        self.AlarmLevelData.forEach((item,index) => {
          if(item.show && index != 4){
            self.AlarmLevelData[4].width -= item.width
          }
        })
      }
    },

  }
</script>

<style lang="scss" scoped>
  .alarmSet {
    /*border: 1px solid red;*/
    height: 80px;
    width: 80%;
    margin-top: -20px;
    margin-left: 20px;
    padding: 30px 0;
    box-sizing: border-box;
    display: inline-block;
    flex: 1;
    div {
      width: 10%;
      height: 100%;
      display: inline-block;
      position: relative;
      p {
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 12px;
        position: absolute;
        top: -30px;
        span {
          position: relative;
          i {
            font-size: 12px;
            background: #999;
            border-radius: 12px;
            color: #fff;
            position: absolute;
            top: -3px;
            right: -10px;
            cursor: pointer;
          }
        }

      }
      input {
        width: 40px;
        height: 12px;
        position: absolute;
        text-align: center;
      }
    }

    .l1 {
      background: #B71C1C;
    }
    .l2 {
      background: #FF7043;
    }
    .l3 {
      background: #FFC107;
    }
    .l4 {
      background: #42A5F5;
    }
    .mid {
      background: #8BC34A;
    }
    .r4 {
      background: #42A5F5;
    }
    .r3 {
      background: #FFC107;
    }
    .r2 {
      background: #FF7043;
    }
    .r1 {
      background: #B71C1C;
    }

    .ll:after {
      content: '';
      width: 1px;
      height: 12px;
      background: #999;
      position: absolute;
      right: -1px;
      top: -14px;
    }
    .ll:before {
      content: '';
      width: 1px;
      height: 12px;
      background: #999;
      position: absolute;
      right: -1px;
      top: 22px;
    }
    .ll > input {
      bottom: -35px;
      right: -22px;
    }

    .rl:after {
      content: '';
      width: 1px;
      height: 12px;
      background: #999;
      position: absolute;
      left: 0;
      top: -14px;
    }
    .rl:before {
      content: '';
      width: 1px;
      height: 12px;
      background: #999;
      position: absolute;
      left: 0;
      top: 22px;
    }
    .rl > input {
      bottom: -35px;
      left: -22px;
    }
  }
</style>
