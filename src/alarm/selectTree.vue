<template>
  <div class="selectTree">
    <header id="selectTree_header" @click="open()">
      <span v-if="content"></span>
      <span style="color: #C0C4CC" v-else>全部</span>
      <i :class="['el-icon-arrow-down', {'go180':selFlag, 'back180': !selFlag}]" style="color: #C0C4CC"></i>
    </header>
    <main id="selectTree_main" v-show="selFlag">
      <p>111</p>
    </main>
  </div>

</template>

<script>
    export default {
      name: "selectTree",
      data() {
        return {
          selFlag: false,
          content: ''
        }
      },

      methods: {

      },

      mounted() {
        document.getElementById('app').addEventListener('click', e => {
          let el = e.toElement
          let parents = [e.toElement.id]
          while(el.parentNode){
            parents.push(el.parentNode.id)
            el = el.parentNode
          }

          if(parents.includes('selectTree_header')){
            this.selFlag = !this.selFlag
          }else if(this.selFlag && !parents.includes('selectTree_main')) {
            this.selFlag = false
          }
        })
      }
    }
</script>

<style lang="scss" scoped>
  .selectTree {
    position: relative;

    &>header {
      display: flex;
      width: 160px;
      height: 36px;
      line-height: 36px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 0 16px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;

      &:hover {
        border-color: #c0c4cc;
        cursor: pointer;
      }

      span:first-child {
        font-size: 14px;
      }
    }

    main {
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      position: absolute;
      width: 300px;
      margin: 12px 0 5px;

      &:before {
        content: '';
        width: 0;
        display: block;
        border: 6px solid;
        border-color: transparent transparent #dcdfe6 transparent;
        position: absolute;
        top: -12px;
        left: 50px;
      }

      &:after {
        content: '';
        width: 0;
        display: block;
        border: 6px solid;
        border-color: transparent transparent #fff transparent;
        position: absolute;
        top: -11px;
        left: 50px;
      }
    }


  }

  .go180 {
    transform: rotate(-180deg);
    transition: all 0.3s;
  }

  .back180 {
    transform: rotate(0deg);
    transition: all 0.3s;
  }
</style>
