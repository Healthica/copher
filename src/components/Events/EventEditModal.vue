<template>
  <div class="modal" @keyup.enter="close">
    <div class="headerButtons">
      <el-button v-if="editMode" class="el-button--link" icon="information" size="mini" @click="showEditInfo"></el-button>
      <div class="editFields">
        <el-button v-if="editMode" class="save-button" @click="editMode=false" type="success" size="small">Done</el-button>
        <span v-else-if="hasFields" @click="editMode=true">Edit Fields</span>
        <span v-else @click="editMode=true">Add Fields</span>
      </div>
      <div class="closeButton" @click="close">&times;</div>
    </div>
    <el-input class="eventModalTitle" placeholder="Event title" v-model="event.title"></el-input>
    <p>
      <el-date-picker
        v-model="event.time"
        type="datetime"
        :clearable="false">
      </el-date-picker>
    </p>
    <field-view class="event-field"
      v-for="f in event.fields"
      :field="f" :view="editMode?'modalEdit':'modal'"
      :key="f.id"
      @deleteField="deleteField"
      @moveFieldUp="moveFieldUp"
      @moveFieldDown="moveFieldDown"
      >
    </field-view>
    <el-dropdown v-if="editMode" trigger="click" @command="addField">
      <el-button type="primary" size="small">
        Add Field <i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="checkbox">Checkbox</el-dropdown-item>
        <el-dropdown-item command="duration">Duration</el-dropdown-item>
        <el-dropdown-item command="stars">Stars Rank</el-dropdown-item>
        <el-dropdown-item command="weight">Weight</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import FieldView from './FieldView'

export default {
  props: ['event'],
  components: {
    FieldView
  },
  data() {
    return {
      editMode: false
    }
  },
  computed: {
    hasFields() {
      return this.event.fields && this.event.fields.length > 0
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    addField(field) {
      console.log('Add', field)
    },
    showEditInfo() {
      console.log('Show edit info')
    },
    deleteField(id) {
      const i = _.findIndex(this.event.fields, e => e.id === id)
      if (i > -1) {
        this.event.fields.splice(i, 1)
      }
    },
    moveFieldUp(id) {
      const i = _.findIndex(this.event.fields, e => e.id === id)
      if (i > 0) {
        this.event.fields.splice(i, 0, this.event.fields.splice(i - 1, 1)[0])
      }
    },
    moveFieldDown(id) {
      const i = _.findIndex(this.event.fields, e => e.id === id)
      if (i > -1 && i < this.event.fields.length - 1) {
        this.event.fields.splice(i, 0, this.event.fields.splice(i + 1, 1)[0])
      }
    }
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
