<template>
  <div>
    <div class="alarmAlert">
      <!--<div v-for="item in alerts" :class="{'alertShow': item.alertShow}">{{item.content}}<button @click="close(item.id)">close</button></div>-->
      <Alerts v-for="item in alerts" :ref="'alert_' + item.id" :data="item" @close="close"></Alerts>
    </div>

    <button @click="addAlert()">click</button>
    <button @click="huadong()">click2</button>
    <button @click="test()">test</button>
  </div>

</template>

<script>
  import Alerts from './alerts'
    export default {
      name: "alarmAlert",
      components: { Alerts },
      data() {
        return {
          alerts: [],
          index: 3000
        }
      },
      methods: {
          addAlert() {
            const id = new Date().getTime()
            this.alerts.push({
              id: id,
              content: id,
              index: ++this.index
            })
          },

        close() {
          if(this.alerts.length - 1 == 0){
            this.alerts = []
          }else {
            this.alerts = [...this.alerts].splice(this.alerts.length - 1, 1)
          }
        },

        test() {
          this.$message({
            showClose: true,
            duration: 0,
            dangerouslyUseHTMLString: true,
            message: '<strong>这是 <i>HTML</i> 片段</strong>'
          });
        }
      },

      mounted() {
        console.log(this.alerts[0])
      }
    }
</script>

<style lang="scss" scoped>
  .alarmAlert {
    position: absolute;
    width: 600px;
    height: 40px;
    top: 60px;
    left: calc(50vw - 300px);
    border: 1px solid red;
  }

  .alertShow {
    top: 60px !important;
    opacity: 1 !important;
  }
</style>
