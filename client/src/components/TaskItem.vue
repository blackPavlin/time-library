<template>
  <div
    class="task-item"
    v-for="task in tasksFilter"
    :key="task._id"
    :class="{ completed: task.completed }"
  >
    <div class="ui-card ui-card--shadow">
      <div class="task-item__info">
        <div class="task-item__main-info">
          <span
            class="ui-label"
            :class="[{'ui-label--primary': !task.completed}, {'ui-label--light': task.completed}]"
          >
            {{ task.whatWatch }}
          </span>
          <span>Total Time: {{ getHoursAndMinutes(task.time) }} </span>
        </div>
        <span class="button-close" @click="deleteTask(task._id)"></span>
      </div>
       <div class="task-item__content">
          <div class="task-item__header">
            <div class="ui-checkbox-wrapper">
              <input
                class="ui-checkbox"
                type="checkbox"
                v-model="task.completed"
                @click="taskCompleted(task._id, task.completed)"
              >
            </div>
            <span class="ui-title-2"> {{ task.title }} </span>
          </div>
          <div class="task-item__body">
            <p class="ui-text-regular"> {{ task.description }} </p>
          </div>
          <div class="task-item__footer">
            <div class="tag-list">
              <div
                class="ui-tag__wrapper"
                v-for="tag in task.tags"
                :key="tag.title"
              >
                <div class="ui-tag">
                  <span class="tag-title"> {{ tag.title }} </span>
                </div>
              </div>
            </div>
            <div class="buttons-list">
              <div
                class="button button--round button-default"
                @click="taskEdit(task._id, task.title, task.description)"
              >
                Edit
              </div>
              <div
                class="button button--round"
                :class="[{ 'button-primary': !task.completed }, { 'button-light': task.completed }]"
                @click="taskCompleted(task._id, task.completed)"
              >
                <span v-if="task.completed">Return</span>
                <span v-else>Done</span>
              </div>
            </div>
          </div>
       </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TaskItem',
  props: {
    tasks: Array,
  },
});
</script>

<style lang="scss" scoped>
  .task-item {
    margin-bottom: 20px;

    & .ui-checkbox:checked:before {
      border-color: #909399;
    }

    &.completed {
      .ui-title-2, .ui-text-regular, .ui-tag {
        text-decoration: line-through;
        color: #909399;
      }
    }

    &:last-child {
      margin-bottom: 0px;
    }
  }

  .task-item__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    & .button-close {
      width: 20px;
      height: 20px;
    }

    & .ui-label {
      margin-right: 8px;
    }
  }

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

  .task-item__body {
    margin-bottom: 20px;
  }

  .task-item__footer {
    & .buttons-list {
      text-align: right;
    }
  }
</style>
