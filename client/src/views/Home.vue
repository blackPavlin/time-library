<template>
  <div class="home">
    <h1 class="ui-title-1">Home</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-item" :class="{ errorInput: v.title.$error }">
        <input
          type="text"
          placeholder="What we will watch?"
          v-model="title"
          @change="v.title.$touch()"
          :class="{ error: v.title.$error }"
        >
        <p class="error" v-for="(error, index) of v.title.$errors" :key="index">
          {{ error.$message }}
        </p>
      </div>
      <div class="form-item">
        <textarea
          v-model="description"
          @keyup.enter="newTask"
        ></textarea>
      </div>
      <div class="options-list">
        <input
          class="what-watch--radio"
          type="radio"
          id="radioFilm"
          value="Film"
          v-model="whatWatch"
        >
        <label for="radioFilm">Film</label>
        <input
          class="what-watch--radio"
          type="radio"
          id="radioSerial"
          value="Serial"
          v-model="whatWatch"
        >
        <label for="radioSerial">Serial</label>
      </div>
      <div class="total-time">
        <div
          class="total-time__film"
          v-if="whatWatch === 'Film'"
        >
          <span class="time-title">Hours</span>
          <input
            class="time-input"
            type="number"
            v-model="filmHours"
            min="0"
          >
          <span class="time-title">Minutes</span>
          <input
            class="time-input"
            type="number"
            v-model="filmMinutes"
            min="0"
          >
          <p>{{ getHoursAndMinutes(filmTime) }}</p>
        </div>
        <div
          class="total-time__serial"
          v-if="whatWatch === 'Serial'"
        >
          <span class="time-title">How many season?</span>
          <input
            class="time-input"
            type="number"
            v-model="serialSeason"
            min="0"
          >
          <span class="time-title">How many series?</span>
            <input
              class="time-input"
              type="number"
              v-model="serialSeries"
              min="0"
            >
          <span class="time-title">How long is one series? (minutes)</span>
          <input
            class="time-input"
            type="number"
            v-model="serialSeriesMinutes"
            min="0"
          >
          <p>{{ getHoursAndMinutes(serialTime) }}</p>
        </div>
      </div>
      <div class="tag-list tag-list--add">
        <div class="ui-tag__wrapper" @click="tagMenuShow = !tagMenuShow">
          <div class="ui-tag">
            <span class="tag-title">Add New</span>
            <span class="button-close" :class="{ active: !tagMenuShow }"></span>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="tag-list tag-list--menu" v-if="tagMenuShow">
          <input
            class="tag-add--input"
            type="text"
            placeholder="New tag"
            v-model="tagTitle"
            @keypress.enter.prevent="newTag"
          >
          <div class="button button-default" @click="newTag">Add</div>
        </div>
      </transition>
      <div class="tag-list">
        <transition-group
          enter-active-class="animated fadeInRight"
          leave-active-class="animated fadeOutDown"
        >
          <div
            class="ui-tag__wrapper"
            v-for="tag in tags"
            :key="tag.title"
          >
            <div
              class="ui-tag"
              @click="useTag(tag.title)"
              :class="{ used: tag.use }"
            >
              <span class="tag-title"> {{ tag.title }} </span>
              <span class="button-close" @click.stop="deleteTag(tag.title)"></span>
            </div>
          </div>
        </transition-group>
      </div>
      <div class="button-list">
        <button
          class="button button--round button-primary"
          :class="{ 'button--disable': v.$invalid }"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */
import { defineComponent, ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import store, { Task } from '@/store';
import { useTime } from '@/composition/time';

export default defineComponent({
  name: 'Home',
  setup() {
    const title = ref('');
    const description = ref('');
    const whatWatch = ref<'Film'|'Serial'>('Film');
    const filmHours = ref(1);
    const filmMinutes = ref(30);
    const serialSeason = ref(1);
    const serialSeries = ref(8);
    const serialSeriesMinutes = ref(40);
    const tagTitle = ref('');
    const tagMenuShow = ref(false);
    const tags = ref<{title: string; use: boolean}[]>([]);

    const rules = {
      title: { required },
    };

    const v = useVuelidate(rules, { title });

    const filmTime = computed((): number => {
      const time = Number(filmHours.value) * 60 + Number(filmMinutes.value);
      return time;
    });

    const serialTime = computed((): number => {
      const time = serialSeason.value * serialSeries.value * serialSeriesMinutes.value;
      return time;
    });

    const onSubmit = async (): Promise<void> => {
      try {
        v.value.$touch();
        if (v.value.$invalid) {
          return;
        }

        const payload: Task = {
          title: title.value,
          description: description.value,
          whatWatch: whatWatch.value,
          time: (whatWatch.value === 'Film') ? filmTime.value : serialTime.value,
          tags: tags.value.map((tag) => tag.title),
          completed: false,
        };

        await store.dispatch('createTask', payload);

        title.value = '';
        description.value = '';
        whatWatch.value = 'Film';
        tags.value = [];
        filmHours.value = 1;
        filmMinutes.value = 30;
        serialSeason.value = 1;
        serialSeries.value = 8;
        serialSeriesMinutes.value = 40;
        tagMenuShow.value = false;

        v.value.$reset();
      } catch (error) {
        console.error(error);
      }
    };

    const newTag = (): void => {
      if (tagTitle.value === '') {
        return;
      }

      tags.value.push({
        title: tagTitle.value,
        use: true,
      });

      tagTitle.value = '';
    };

    const deleteTag = (deletedTagTitle: string): void => {
      tags.value = tags.value.filter((tag) => tag.title !== deletedTagTitle);
    };

    const useTag = (usedTagTitle: string): void => {
      tags.value = tags.value.map((tag) => {
        if (tag.title === usedTagTitle) {
          tag.use = !tag.use;
        }

        return tag;
      });
    };

    return {
      ...useTime(),
      title,
      description,
      whatWatch,
      filmHours,
      filmMinutes,
      serialSeason,
      serialSeries,
      serialSeriesMinutes,
      tagTitle,
      tagMenuShow,
      tags,
      v,
      onSubmit,
      filmTime,
      serialTime,
      newTag,
      deleteTag,
      useTag,
    };
  },
});
</script>

<style lang="scss" scoped>
  .form-item {
    .error {
      display: none;
      margin-bottom: 8px;
      font-size: 13.4px;
      color: #fc5c65;
    }

    &.errorInput {
      .error {
        display: block;
      }
    }
  }

  input {
    &.error {
      border-color: #fc5c65;
    }
  }

  .options-list {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    & .what-watch--radio {
      margin-right: 12px;
    }

    & input {
      margin-bottom: 0px;
    }

    & label {
      margin-right: 20px;
      margin-bottom: 0px;

      &:last-child {
        margin-right: 0px;
      }
    }
  }

  .total-time {
    margin-bottom: 20px;
    & p {
      margin-bottom: 6px;
    }

    & span {
      margin-bottom: 16px;
    }

    & .task-input {
      max-width: 80px;
      margin-bottom: 28px;
      margin-right: 10px;
    }
  }

  .time-title {
    display: block;
    margin-bottom: 6px;
  }

  .time-input {
    max-width: 80px;
    margin-right: 10px;
  }

  .button-close {
    width: 20px;
    height: 20px;
  }

  .tag-list {
    margin-bottom: 20px;
  }

  .ui-tag__wrapper {
    margin-right: 18px;
    margin-bottom: 10px;

    &:last-child {
      margin-right: 0px;
    }
  }

  .ui-tag {
    user-select: none;
    cursor: pointer;

    & .button-close {
      &.active {
        transform: rotate(45deg);
      }
    }

    &.used {
      background-color: #444ce0;
      color: #fff;

      & .button-close {
        &:before, &:after {
          background-color: #fff;
        }
      }
    }
  }

  .tag-list--menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tag-add--input {
    margin-bottom: 0;
    margin-right: 10px;
    height: 42px;
  }

  .button-list {
    display: flex;
    justify-content: flex-end;
  }
</style>
