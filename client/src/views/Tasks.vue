<template>
  <div class="tasks">
    <div class="task-list__header">
      <h1 class="ui-title-1">Library</h1>
      <div class="buttons-list">
        <div
          class="button button--round button-default"
          :class="{ active: filter === 'active' }"
          @click="filter = 'active'"
        >
          Active
        </div>
        <div
          class="button button--round button-default"
          :class="{ active: filter === 'completed' }"
          @click="filter = 'completed'"
        >
          Completed
        </div>
        <div
          class="button button--round button-default"
          :class="{ active: filter === 'all' }"
          @click="filter = 'all'"
        >
        All
        </div>
      </div>
    </div>
    <div class="task-list">
      <task-item :filter="filter"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TaskItem from '@/components/TaskItem.vue';

export default defineComponent({
  name: 'Tasks',
  components: {
    TaskItem,
  },
  setup() {
    const filter = ref('active');

    return {
      filter,
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

      &.active {
        background-color: #444ce0;
        color: #fff;
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
