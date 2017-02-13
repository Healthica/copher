<template>
  <div class="log-app">
    <div class="new-event-container">
      <input type="text"
        v-model="newEventText"
        @keyup.enter="addEvent"
        class="new-event-input"
        placeholder="What would you like to log?"
        tabindex="1"
        />
      <el-button class="save-button" @click="addEvent" type="success">Save</el-button>
    </div>
    <ul>
      <li v-for="e in events.data">{{ e.id }} - {{ e.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      newEventText: ''
    }
  },
  computed: {
    ...mapGetters(['events'])
  },
  methods: {
    querySearch(queryString, cb) {
      const results = [
        { "value": "vue", "link": "https://github.com/vuejs/vue" },
        { "value": "element", "link": "https://github.com/ElemeFE/element" },
        { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" }
      ]
      cb(results)
    },
    handleSelect() {
      this.addEvent()
    },
    addEvent() {
      this.$store.dispatch('addEvent', { id: Math.round(Math.random() * 1000), title: this.newEventText })
      this.$store.dispatch('syncEvents')
      this.newEventText = ''
    }
  },
  created() {
    this.$store.dispatch('syncEvents')
  }
}
</script>

<style scoped>
.log-app {
  padding-bottom: 1px;
  padding-top: 68px;
  height: 100%;
  overflow-y: scroll;
}
.log-app::-webkit-scrollbar {
  display: none;
}
.new-event-container {
  position: fixed;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 68px;
  right: 0;
  top: 0;
  left: 180px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
  z-index: 10001;
  min-width: 600px;
}
.new-event-input {
  font-size: 18px;
  width: 100%;
  height: 68px;
  line-height: 68px;
  padding: 0 10px 0 30px;
  border: 0;
  overflow: hidden;
  white-space: nowrap;
  background: 0 0;
}
.new-event-input:focus {
  outline: 0;
  box-shadow: none;
}
.new-event-input:focus::-webkit-input-placeholder { color: transparent; }
.new-event-input:focus:-moz-placeholder { color: transparent; }
.new-event-input:focus::-moz-placeholder { color: transparent; }
.new-event-input:focus:-ms-input-placeholder { color: transparent; }

.save-button {
  margin-right: 15px;
}
</style>
