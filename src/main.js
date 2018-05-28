import Vue from 'vue'
import App from './App.vue'

import startScreen from './components/startScreen.vue'
import question from './components/question.vue'
import message from './components/message.vue'
import resultScreen from './components/resultScreen.vue'

Vue.component('startScreen', startScreen);
Vue.component('question', question);
Vue.component('message', message);
Vue.component('resultScreen', resultScreen);

new Vue({
  el: '#app',
  render: h => h(App)
})
