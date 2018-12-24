<template>
    <div class="alarmBar">
      <div v-for="item in defaultConfig" v-show="item.show" :style="{ width: item.width,background: item.color }">
        {{item.width}}
        <span>{{item.name}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "alarmBar",
      data() {
        return {
          defaultConfig: [
            {
              name: 'Ⅰ级告警',
              num: 0,
              width: '25%',
              color: '#B7180B',
              show: true
            },{
              name: 'Ⅱ级告警',
              num: 0,
              width: '25%',
              color: '#FF2600',
              show: true
            },{
              name: 'Ⅲ级告警',
              num: 0,
              width: '25%',
              color: '#FF9301',
              show: true
            },{
              name: 'Ⅳ级告警',
              num: 0,
              width: '25%',
              color: '#00C1FF',
              show: true
            }
          ]
        }
      },

      methods: {
        init(config = { 1: 1, 2: 18, 3: 15, 4: 12}) {
          let sum = 0
          let res = [...this.defaultConfig]
          for(let i in config){
            sum += config[i]
            res[i - 1].num = config[i]
          }

          if(sum) {
            res.forEach(item => {
              if(!item.num) item.show = false
              item.width = ((item.num / sum)*100).toFixed(2) + '%'
            })
            this.defaultConfig = res
          }
        }
      },

      created() {
        this.init()
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .alarmBar {
    display: flex;
    justify-content: space-around;

    div {
      margin: 0 5px;
      padding-left: 10px;
      color: #FFF;
      position: relative;
      min-width: 70px;

      span {
        position: absolute;
        left: 5px;
        top: -25px;
        color: #000;
      }
    }
  }
</style>
