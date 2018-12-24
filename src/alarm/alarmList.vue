<template>
  <div style="width: 300px;height: 400px">
    <div class="alarmList">
      <ul>
        <li v-for="item in alarmList">
          <header @click="timeSelect(item.time)">{{item.time}}</header>
          <main>
            <span>
              <i :class="item.level">{{levelDic(item.level)}}</i>
              {{item.levelName}}
            </span>
            <span>
              {{item.value}}{{item.unit}}
            </span>
          </main>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

    import filter from '../filters'

    export default {
      name: "alarmList",
      data() {
        return {
          alarmList: [
            {
              time: '2018-08-30 12:30:20',
              level: 'NR',
              levelName: '恢复',
              value: 44,
              unit: 'mm'
            },{
              time: '2018-08-30 12:30:20',
              level: 'LEVEL3',
              levelName: '高高',
              value: 44,
              unit: 'mm'
            },{
              time: '2018-08-30 12:30:20',
              level: 'LEVEL3',
              levelName: '高高',
              value: 44,
              unit: 'mm'
            }
          ]
        }
      },

      methods: {
        levelDic(str) {
          return filter.level(str)
        },

        timeSelect(time) {

        }
      },

      created() {
        // console.log(filter.level('LEVEL3'))
      }
    }
</script>

<style lang="scss" scoped>
  .alarmList {
    background: #F2F2F2;
    height: 100%;
    border: 1px solid red;
    overflow-x: hidden;
    overflow-y: auto;
    color: #C5C5C5;
    font-size: 14px;

    ul {
      padding: 20px;
      margin: 0;

      li {
        list-style: none;
        position: relative;

        header {
          &:before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border: 2px solid #C5C5C5;
            margin-right: 5px;
            border-radius: 10px;
          }

          &:hover {
            color: #3a8ee6;
            cursor: pointer;
          }
        }

        main {
          display: flex;
          justify-content: space-between;
          padding-left: 10px;
          height: 36px;
          align-items: center;

          span:first-child {
            padding-left: 5px;
          }

          i {
            display: inline-block;
            width: 45px;
            margin-right: 10px;
          }
        }

        &:not(:last-child):before {
          content: '';
          display: block;
          position: absolute;
          top: 16px;
          left: 3px;
          height: 32px;
          border: 1px dashed #ccc;
        }
      }
    }
  }

  /**/
  .icon-circle {
    content: '';
    display: inline-block;
    margin-right: 10px;
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }

  .NR {
    color: #03C87B;
    &:before {
      @extend .icon-circle;
      background: #03C87B;
    }
  }

  .LEVEL1 {
    color: #A8071A;
    &:before {
      @extend .icon-circle;
      background: #A8071A;
    }
  }

  .LEVEL2 {
    color: #FF441C;
    &:before {
      @extend .icon-circle;
      background: #FF441C;
    }
  }

  .LEVEL3{
    color: #FF9901;
    &:before {
      @extend .icon-circle;
      background: #FF9901;
    }
  }
</style>
