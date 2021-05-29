<template>
  <div
    class="ui-messageBox__wrapper"
    @click="$emit('close')"
  >
    <div class="ui-messageBox fadeInDown" @click.stop="">
      <div class="ui-messageBox__header">
        <span class="messageBox-title">{{ title }}</span>
        <span class="button-close" @click="$emit('close')"></span>
      </div>
      <div class="ui-messageBox__content">
        <p>Title</p>
        <input
          type="text"
          v-model="editingTitle"
          @keyup.esc="$emit('close')"
        >
        <p>Description</p>
        <textarea
          v-model='editingDescription'
          @keyup.esc="$emit('close')"
        ></textarea>
      </div>
      <div class="ui-messageBox__footer">
        <button class="button button-light" @click="$emit('close')">Cancel</button>
        <button class="button button-primary" @click="finishEdit">OK</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'EditModal',
  props: {
    taskID: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  setup(props, { emit }) {
    const editingTitle = ref(props.title);
    const editingDescription = ref(props.description);

    const finishEdit = async () => {
      try {
        const payload = {
          taskID: props.taskID,
          task: {
            title: editingTitle.value,
            description: editingDescription.value,
          },
        };

        await store.dispatch('updateTask', payload);
        emit('close');
      } catch (error) {
        console.log(error);
      }
    };

    return {
      editingTitle,
      editingDescription,
      finishEdit,
    };
  },
});
</script>

<style lang="scss" scoped>
  .ui-messageBox__wrapper {
    display: flex;

    .button-light {
      margin-right: 8px;
    }
  }

  .ui-messageBox__content {
    p {
      margin-bottom: .5rem;
    }
  }
</style>
