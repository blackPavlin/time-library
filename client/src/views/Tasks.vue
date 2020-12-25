<template>
  <div class="tasks">
    <div class="task-list__header">
      <h1 class="ui-title-1">Library</h1>
      <div class="buttons-list">
        <div
          class="button button--round button-default"
          @click="filter = 'active'"
        >
          Active
        </div>
        <div
          class="button button--round button-default"
          @click="filter = 'completed'"
        >
          Completed
        </div>
        <div
          class="button button--round button-default"
          @click="filter = 'all'"
        >
        All
        </div>
      </div>
    </div>
    <div class="task-list">
      <transition-group name="taskList">
        <TaskItem v-bind="tasks"/>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unreachable */
import { defineComponent, ref, computed } from 'vue';
import TaskItem from '@/components/TaskItem.vue';
import store, { Task } from '@/store';

export default defineComponent({
  name: 'Tasks',
  components: {
    TaskItem,
  },
  setup() {
    const filter = ref('active');
    const showPopup = ref(false);
    const titleEditing = ref('');
    const descrEditing = ref('');
    const editingTaskID = ref('');

    store.dispatch('getTasks');

    const tasks = computed((): Task[] => {
      switch (filter.value) {
        case 'active':
          return store.getters.getActiveTasks;
          break;
        case 'completed':
          return store.getters.getCompletedTasks;
          break;
        default:
          return store.getters.getTasks;
          break;
      }
    });
    console.log(store.getters.getTasks);

    return {
      tasks,
      showPopup,
      titleEditing,
      descrEditing,
      editingTaskID,
    };
  },
});
</script>

<style lang="scss" scoped>
  .task-item__header {
    display: flex;
    align-items: center;
    margin-bottom: 18px;

    & .ui-checkbox-wrapper {
      margin-right: 8px;
    }

    & .ui-title-2 {
      margin-bottom: 6px;
    }
  }

  .task-list__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    & .ui-title-1 {
      margin-bottom: 0px;
    }
  }

  .buttons-list {
    .button {
      margin-right: 12px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .ui-messageBox__wrapper {
    &.active {
      display: flex;
    }

    .button-light {
      margin-right: 8px;
    }
  }
</style>
