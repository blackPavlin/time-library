<template>
  <div class="ui-messageBox__wrapper">
    <div class="ui-messageBox fadeInDown">
      <div class="ui-messageBox__header">
        <span class="messageBox-title">Delete - {{ title }}</span>
        <span
          class="button-close ui-messageBox-close"
          @click="$emit('close')"
        ></span>
      </div>
      <div class="ui-messageBox__content">
        <span>Are you sure?</span>
      </div>
      <div class="ui-messageBox__footer">
        <div
          class="button button-light ui-messageBox-cancel"
          @click="$emit('close')"
        >Cancel</div>
        <div
          class="button button-primary ui-messageBox-ok"
          @click="removeTask()"
        >OK</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'EditModal',
  props: {
    taskID: { type: String, required: true },
    title: { type: String, required: true },
  },
  setup(props, { emit }) {
    const removeTask = async (): Promise<void> => {
      try {
        await store.dispatch('removeTask', props.taskID);
        emit('close');
      } catch (error) {
        console.error(error);
      }
    };

    return {
      removeTask,
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
