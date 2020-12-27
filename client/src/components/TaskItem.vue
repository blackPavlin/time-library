<template>
  <transition-group name="taskList">
    <div
      class="task-item"
      v-for="task in tasks"
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
          <span class="button-close" @click="removeTask(task._id)"></span>
        </div>
        <div class="task-item__content">
            <div class="task-item__header">
              <div class="ui-checkbox-wrapper">
                <input
                  class="ui-checkbox"
                  type="checkbox"
                  v-model="task.completed"
                  @click="completeTask(task._id, task.completed)"
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
                  :key="tag"
                >
                  <div class="ui-tag">
                    <span class="tag-title"> {{ tag }} </span>
                  </div>
                </div>
              </div>
              <div class="buttons-list">
                <div
                  class="button button--round button-default"
                  @click="startEditTask(task._id, task.title, task.description)"
                >
                  Edit
                </div>
                <div
                  class="button button--round"
                  :class="[{'button-primary': !task.completed}, {'button-light': task.completed}]"
                  @click="completeTask(task._id, task.completed)"
                >
                  <span v-if="task.completed">Return</span>
                  <span v-else>Done</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts">
/* eslint-disable no-unreachable */
import { defineComponent, computed, ref } from 'vue';
import store, { Task } from '@/store';
import { useTime } from '@/composition/time';

export default defineComponent({
  name: 'TaskItem',
  props: {
    filter: String,
  },
  setup(props) {
    const showEditPopup = ref(false);
    const editTaskID = ref('');
    const editTitle = ref('');
    const editDescription = ref('');

    store.dispatch('getTasks');

    const tasks = computed((): Task[] => {
      switch (props.filter) {
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

    const completeTask = async (taskID: string, completed: boolean): Promise<void> => {
      try {
        const payload = {
          taskID,
          task: {
            completed: !completed,
          },
        };

        await store.dispatch('updateTask', payload);
      } catch (error) {
        console.error(error);
      }
    };

    const removeTask = async (taskID: string): Promise<void> => {
      try {
        await store.dispatch('removeTask', taskID);
      } catch (error) {
        console.error(error);
      }
    };

    const startEditTask = (taskID: string, title: string, description: string) => {
      showEditPopup.value = true;

      editTaskID.value = taskID;
      editTitle.value = title;
      editDescription.value = description;
    };

    return {
      ...useTime(),
      tasks,
      completeTask,
      removeTask,
      showEditPopup,
      startEditTask,
    };
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
