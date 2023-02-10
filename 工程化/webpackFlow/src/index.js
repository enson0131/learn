
import { createApp } from 'vue'
import App from './App.vue';

import './styles/index.css'
import './utils/a.js';
// import './utils/b.js';

import * as $ from 'jquery';
import * as _ from 'lodash';

console.log(`$`, $);
console.log(`_`, _);

createApp(App).mount('#app');


