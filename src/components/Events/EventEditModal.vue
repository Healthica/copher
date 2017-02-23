<template>
  <div class="modal" @keyup.enter="modalOnEnter">
    <div class="headerButtons">
      <el-popover
        v-if="editMode"
        placement="left"
        title="Event Fields"
        width="240"
        trigger="click"
        content="Changes here will affect this event and future events of this type. Other existing events will not be modified. To change the type of each field, see the Migration tab.">
        <el-button slot="reference" class="el-button--link" icon="information" size="mini"></el-button>
      </el-popover>
      <div class="editFields">
        <el-button v-if="editMode" class="save-button" @click="editMode=false" type="success" size="small">Done</el-button>
        <span v-else-if="hasFields" @click="editMode=true">Edit Fields</span>
        <span v-else @click="editMode=true">Add Fields</span>
      </div>
      <div class="closeButton" @click="close">&times;</div>
    </div>
    <input class="uk-input eventModalTitle" type="text" placeholder="Event title" v-model="event.title" />
    <p>
      <el-date-picker
        v-model="event.time"
        type="datetime"
        :clearable="false">
      </el-date-picker>
    </p>
    <div v-for="(f, i) in event.fields">
      <div class="field-edit-main" v-if="editMode">
        <!-- <a :class="{notVisible: i === 0}" @click="moveFieldUp(f.id)">
          <span uk-icon="icon: triangle-up"></span>
        </a>
        <a :class="{notVisible: i === (event.fields.length-1)}" @click="moveFieldDown(f.id)">
          <span uk-icon="icon: triangle-down"></span>
        </a> -->
        <div class="field-type">
          <label class="uk-form-label" for="form-stacked-text">Field type</label>
          <div class="uk-form-controls">
            <input class="uk-input" type="text" :value="fieldType(f.type)" disabled />
          </div>
        </div>
        <div class="field-title">
          <label class="uk-form-label" for="form-stacked-text">Title</label>
          <div class="uk-form-controls">
            <input class="uk-input" type="text" placeholder="Field title" v-model="f.title" />
          </div>
        </div>
        <a @click="deleteField(f.id)">
          <span uk-icon="icon: close"></span>
        </a>
      </div>
      <field-view class="event-options"
        :field="f" :view="editMode?'modalEdit':'modal'"
        :key="f.id"
        @deleteField="deleteField"
        @moveFieldUp="moveFieldUp"
        @moveFieldDown="moveFieldDown"
        >
      </field-view>
    </div>
    <div v-if="editMode" class="modalEditAddField">
      <button class="uk-button uk-button-default uk-button-small" type="button">New Field</button>
      <div uk-dropdown="mode: click" ref="newFieldDropdown">
        <ul class="uk-nav uk-dropdown-nav">
          <li><a @click="addField('checkbox')">Checkbox</a></li>
          <li><a @click="addField('duration')">Duration</a></li>
          <li><a @click="addField('rank_stars')">Stars</a></li>
          <li><a @click="addField('weight')">Weight</a></li>
          <li><a @click="addField('length')">Length</a></li>
          <li><a @click="addField('select')">Select</a></li>
          <li><a @click="addField('number')">Number</a></li>
          <li><a @click="addField('text')">Text</a></li>
          <li><a @click="addField('switch')">Switch</a></li>
        </ul>
      </div>
    </div>
    <div v-else class="modalEditActionsDropdown">
      <button class="uk-button uk-button-default uk-button-small" type="button">Actions</button>
      <div uk-dropdown="mode: click">
        <ul class="uk-nav uk-dropdown-nav">
          <li><a @click="eventAction('duplicate')">Duplicate</a></li>
          <li><a @click="eventAction('delete')">Delete</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import FieldView from './FieldView'
import uuid from 'uuid'

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
    modalOnEnter(ev) {
      if (ev.target.tagName.toLowerCase() !== 'textarea') {
        this.close()
      }
    },
    addField(field) {
      this.$refs['newFieldDropdown'].classList.remove('uk-open')
      this.event.fields.push(Object.assign({
        id: uuid.v4(),
        title: '',
        type: field
      }, this.defaultValue(field)))
    },
    fieldType(type) {
      switch (type) {
        case 'checkbox':
          return 'Checkbox'
          break;
        case 'duration':
          return 'Duration'
          break;
        case 'rank_stars':
          return 'Stars Rank'
          break;
        case 'weight':
          return 'Weight'
          break;
        case 'length':
          return 'Length'
          break;
        case 'select':
          return 'Select'
          break;
        case 'number':
          return 'Number'
          break;
        case 'text':
          return 'Text'
          break;
        case 'switch':
          return 'Switch'
          break;
        default:
          return type
      }
    },
    defaultValue(type) {
      switch (type) {
        case 'checkbox':
          return { value: [], options: { options: [''] } }
          break;
        case 'duration':
          return { value: 0 }
          break;
        case 'rank_stars':
          return { value: 2.5 }
          break;
        case 'weight':
          return { value: 70, options: { units: 'kg' } }
          break;
        case 'length':
          return { value: 5, options: { units: 'm' } }
        case 'select':
          return { value: '', options: { options: [''] } }
          break;
        case 'number':
          return { value: 0 }
          break;
        case 'text':
          return { title: 'Notes', value: '' }
          break;
        case 'switch':
          return { value: false }
          break;
        default:
          return {}
      }
    },
    deleteField(id) {
      this.$confirm('Deleting this field will also delete its value. Continue?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const i = _.findIndex(this.event.fields, e => e.id === id)
        if (i > -1) {
          this.event.fields.splice(i, 1)
        }
      }).catch(()=>{})
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
    },
    eventAction(action) {
      switch(action) {
        case 'delete':
          this.deleteEvent()
          break;
        case 'duplicate':
          this.$emit('duplicateEvent', this.event)
          break;
        default:
          console.error('Unknown action', action)
      }
    },
    deleteEvent() {
      this.$confirm('This will permenantly delete the event and all its data. Continue?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.event._isDeleted = true
        this.close()
        this.$store.dispatch('deleteEvent', this.event)
      }).catch(()=>{})
    }
  }
}
</script>

<style scoped>
.notVisible {
  visibility: hidden;
}
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
.field-edit-main {
  margin-top: 30px;
  display: flex;
}
.field-edit-main > *:not(.field-title):not(.field-type) {
  font-size: 10px;
  flex-grow: 0;
  align-self: flex-end;
  margin: 0;
  margin-bottom: 6px;
  padding: 4px;
  color: #666;
}
.field-edit-main > *:not(.field-title):not(.field-type):hover {
  color: #000;
}
.field-edit-main .field-type {
  margin: 0 6px;
  flex-grow: 0;
}
.field-edit-main .field-title {
  margin: 0 6px;
  flex-grow: 2;
}
.field-edit-main .field-type-description {
  font-size: 12px;
  color: #838C91;
}
.event-options {
  display: block;
  /*margin-left: 62px;*/
  margin-top: 6px;
}
.modalEditAddField {
  margin-top: 36px;
}
.modalEditActionsDropdown {
  display: flex;
  justify-content: flex-end;
}
</style>
