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
          @onStart="onStart"
        ></start-screen>
        <question v-else-if="state == 'question'"
          @onSuccess="onQuestionSuccess"
          @onError="onQuestionError"
        ></question>
        <message
          v-else-if="state == 'message'"
          :type="message.type"
          :text="message.text"
          @onNext="onNext"
        ></message>
        <result-screen
          v-else-if="state == 'result'"
          :stats="stats"
          @repeat="onStart"
          @nextLevel="onNextLevel"
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
      stats: {
        success: 0,
        error: 0
      },
      message: {
        type: '',
        text: ''
      },
      questMax: 3
    }
  },
  computed: {
    questDone() {
      return this.stats.success + this.stats.error;
    },
    progressStyles() {
      return {
        width: this.questDone / this.questMax * 100 + '%'
      }
    }
  },
  methods: {
    onStart() {
      this.state = 'question';
      this.stats.success = 0;
      this.stats.error = 0;
    },
    onQuestionSuccess() {
      this.state = 'message';
      this.message.text = 'Хорошая работа!';
      this.message.type = 'success';
      this.stats.success++;
    },
    onQuestionError(msg) {
      this.state = 'message';
      this.message.text = msg;
      this.message.type = 'warning';
      this.stats.error++;
    },
    onNext() {
      if (this.questDone < this.questMax) {
        this.state = 'question';
      } else {
        this.state = 'result';
      }
    },
    onNextLevel() {

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
    max-width: 700px;
    margin: 0 auto;
    // /background-color: cyan;  
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
</style>
