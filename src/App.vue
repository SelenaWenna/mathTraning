<template>
  <div class="traning"> 
    <h1>Математический тренажер</h1>
    <hr>
    <div class="progress">
      <div class="progress-bar" :style="progressStyles"></div>
    </div>
    <div class="box">
      <transition name="flip" mode="out-in">
        <start-screen
          v-if="state == 'start'"
          @toChooseLevel="toChooseLevel"
        ></start-screen>
        <chooseLevel
          v-else-if="state == 'choose'"
          :settings="settings[currentSettings.signId]"
          @onStart="onStart"
          @toStartScreen="toStartScreen"
        ></chooseLevel>
        <question v-else-if="state == 'question'"
          :sign="settings[currentSettings.signId].sign"
          :level="currentSettings.level"
          :settings="settings[currentSettings.signId].levels[currentSettings.level]"
          @onNext="onNext"
          @toResultScreen="toResultScreen"
        ></question>
        <result-screen
          v-else-if="state == 'result'"
          :stats="success"
          :questMax="questMax"
          :startTime="startTime"
          @repeat="onStart"
          @nextLevel="onNextLevel"
          @toStartScreen="toStartScreen"
        ></result-screen>
        <div v-else>Неизвестное состояние</div>
      </transition>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      state: 'start',
      success: 0,
      message: {
        type: '',
        text: ''
      },
      startTime: new Date(),
      questMax: 20,
      currentSettings: {
        signId: 0, // плюс
        level: 0
      },
      settings: [
        { // Плюс
          sign: '+',
          levels: [
            {
              min: 0,
              max: 10
            },
            {
              min: 0,
              max: 15
            },
            {
              min: 1,
              max: 20
            },
            {
              min: 1,
              max: 30
            },
            {
              min: 1,
              max: 40
            },
            {
              min: 1,
              max: 50
            },
            {
              min: 1,
              max: 60
            },
            {
              min: 1,
              max: 70
            },
            {
              min: 1,
              max: 80
            },
      ]
        },
        { // Минус
          sign: '-',
          levels: [
            {
              min: 0,
              max: 10
            },
            {
              min: 0,
              max: 15
            },
            {
              min: 0,
              max: 20
            },
            {
              min: 0,
              max: 30
            },
            {
              min: 0,
              max: 40
            },
            {
              min: 0,
              max: 50
            },
            {
              min: 0,
              max: 60
            },
            {
              min: 0,
              max: 70
            },
            {
              min: 0,
              max: 80
            },
             {
              min: 0,
              max: 90
            },
             {
              min: 0,
              max: 100
            },
          ]
         },
        { // Умножить
          sign: '*',
          levels: [
            {
              min: 0,
              max: 10
            },
            {
              min: 0,
              max: 10
            },
            {
              min: 0,
              max: 10
            },
            {
              min: 0,
              max: 10
            },
            {
              min: 0,
              max: 10
            },
            {
              min: 0,
              max: 10
            },
            {
              min: 0,
              max: 10
            },
            {
              min: 0,
              max: 10
            },
          ]
         },
        { // Разделить
          sign: ':',
          levels: [
            {
              min: 1,
              max: 10
            },
            {
              min: 1,
              max: 10
            },
            {
              min: 1,
              max: 10
            },
            {
              min: 1,
              max: 10
            },
            {
              min: 1,
              max: 10
            },
            {
              min: 1,
              max: 10
            },
            {
              min: 1,
              max: 10
            },
            {
              min: 1,
              max: 10
            },
          ]
         },
      ]
    }
  },
  computed: {
    progressStyles() {
      return {
        width: this.success / this.questMax * 100 + '%'
      }
    }
  },
  methods: {
    onStart(levelId) {
      this.state = 'question';
      this.success = 0;
      this.startTime = new Date();

      if (levelId !== undefined) {
        this.currentSettings.level = levelId;
      }
    },
    onNext() {
      this.success++;
      
      if (this.success == this.questMax) {
        this.state = 'result';
      }
    },
    onNextLevel() {
      if (this.settings[this.currentSettings.signId].levels[this.currentSettings.level+1] !== undefined) {
        this.currentSettings.level++;
      }

      this.success = 0;
      this.state = 'question';
    },
    toStartScreen() {
      this.state = 'start';
    },
    toChooseLevel(signId) {
      this.state = 'choose';
      this.currentSettings.signId = signId;
    },
    toResultScreen() {
      this.state = 'result';
    }
  }
}
</script>

<style lang="scss">
  @import "../node_modules/bootstrap/scss/functions";
  @import "../node_modules/bootstrap/scss/variables";
  @import "../node_modules/bootstrap/scss/mixins";
  @import "../node_modules/bootstrap/scss/alert";
  @import "../node_modules/bootstrap/scss/buttons";
  @import "../node_modules/bootstrap/scss/progress";

  .traning {
    width: 300px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .box {
    margin-top: 10px;
  }

  .flip {
    &-enter {

      &-active {
        animation: flipInX .3s linear;
      }
    }

    &-leave {

      &-active {
        animation: flipOutX .3s linear;
      }
    }
  }

  @keyframes flipInX {
    from {
      transform: rotateX(90deg);
    }

    to {
      transform: rotateX(0deg);
    }
  }

  @keyframes flipOutX {
    from {
      transform: rotateX(0deg);
    }

    to {
      transform: rotateX(90deg);
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .btn {
    padding: 20px 30px;
    margin: 5px;
      &-esc {
      padding: {
        right: 15px;
        left: 15px;
      }
    }
  }

  h3 {
    width: calc(100% - 30px);
  }
</style>
