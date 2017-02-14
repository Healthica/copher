<template>
  <div class="modal">
    <div class="headerButtons">
      <div class="editFields">Edit Fields</div>
      <div class="closeButton">&times;</div>
    </div>
    {{ event.id }}
    <p>
      <input type="text" v-model="event.title" />
    </p>
    <p>
      {{ event.time }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['event'],
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
.modal {
  padding: 36px 24px;
  position: relative;
}
.headerButtons {
  position: absolute;
  top: 0;
  right: 0;
}
.headerButtons > div {
  display: inline-block;
  padding: 6px 12px;
  opacity: 0.8;
  vertical-align: middle;
  cursor: pointer;
}
.headerButtons > div:hover {
  opacity: 1;
}
.editFields {
  font-size: 14px;
}
.closeButton {
  font-size: 20px;
}
</style>
