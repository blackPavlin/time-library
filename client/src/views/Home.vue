<template>
  <div class="home">
    <h1 class="ui-title-2">Home</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-item" :class="{ errorInput: v.title.$error }">
        <input
          type="text"
          placeholder="What we will watch?"
          v-model="form.title"
          @change="v.title.$touch()"
          :class="{ error: v.title.$error }"
        />
        <p class="error" v-for="error of v.title.$errors" :key="error.$uid">
          {{ error.$message }}
        </p>
      </div>
      <div class="form-item">
        <textarea v-model="form.description" @keyup.enter="onSubmit"></textarea>
      </div>
      <div class="options-list">
        <input
          class="what-watch--radio"
          type="radio"
          id="radioFilm"
          value="film"
          v-model="form.whatWatch"
        />
        <label for="radioFilm">Film</label>
        <input
          class="what-watch--radio"
          type="radio"
          id="radioSerial"
          value="serial"
          v-model="form.whatWatch"
        />
        <label for="radioSerial">Serial</label>
      </div>
      <div class="total-time">
        <div class="total-time__film" v-if="form.whatWatch === 'film'">
          <span class="time-title">Hours</span>
          <input class="time-input" type="number" v-model="form.filmHours" min="0" />
          <span class="time-title">Minutes</span>
          <input class="time-input" type="number" v-model="form.filmMinutes" min="0" />
          <p>{{ getHoursAndMinutes(filmTime) }}</p>
        </div>
        <div class="total-time__serial" v-else>
          <span class="time-title">How many season?</span>
          <input class="time-input" type="number" v-model="form.serialSeason" min="0" />
          <span class="time-title">How many series?</span>
          <input class="time-input" type="number" v-model="form.serialSeries" min="0" />
          <span class="time-title">How long is one series? (minutes)</span>
          <input class="time-input" type="number" v-model="form.serialSeriesMinutes" min="0" />
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
          />
          <div class="button button-default" @click="newTag">Add</div>
        </div>
      </transition>
      <div class="tag-list">
        <transition-group
          enter-active-class="animated fadeInRight"
          leave-active-class="animated fadeOutDown"
        >
          <div class="ui-tag__wrapper" v-for="tag in form.tags" :key="tag">
            <div class="ui-tag used">
              <span class="tag-title"> {{ tag }} </span>
              <span class="button-close" @click.stop="deleteTag(tag)"></span>
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
import { defineComponent, ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import store from '@/store';
import { useTime } from '@/composition/time';

enum WhatWatch {
  film = 'film',
  serial = 'serial',
}

interface Form {
  title: string;
  description: string;
  whatWatch: WhatWatch;
  filmHours: number;
  filmMinutes: number;
  serialSeason: number;
  serialSeries: number;
  serialSeriesMinutes: number;
  tags: string[];
}

export default defineComponent({
  name: 'Home',
  setup() {
    const defaultForm: Form = {
      title: '',
      description: '',
      whatWatch: WhatWatch.film,
      filmHours: 1,
      filmMinutes: 30,
      serialSeason: 1,
      serialSeries: 8,
      serialSeriesMinutes: 40,
      tags: [],
    };

    const form = reactive(Object.assign({}, defaultForm));

    const tagTitle = ref('');
    const tagMenuShow = ref(false);

    const rules = {
      title: { required },
    };

    const v = useVuelidate(rules, form);

    const filmTime = computed((): number => {
      return Number(form.filmHours) * 60 + Number(form.filmMinutes);
    });

    const serialTime = computed((): number => {
      return form.serialSeason * form.serialSeries * form.serialSeriesMinutes;
    });

    const onSubmit = async (): Promise<void> => {
      v.value.$touch();
      if (v.value.$invalid) {
        return;
      }

      try {
        const payload = {
          title: form.title,
          description: form.description,
          whatWatch: form.whatWatch,
          time: form.whatWatch === WhatWatch.film ? filmTime.value : serialTime.value,
          tags: form.tags,
          completed: false,
        };

        await store.dispatch('createTask', payload);

        Object.assign(form, defaultForm);
        form.tags = [];

        tagMenuShow.value = false;

        v.value.$reset();
      } catch (error) {
        await store.dispatch('showErrorMessage', error);
      }
    };

    const newTag = (): void => {
      if (tagTitle.value === '') {
        return;
      }

      form.tags.push(tagTitle.value);

      tagTitle.value = '';
    };

    const deleteTag = (title: string): void => {
      form.tags = form.tags.filter((tag) => tag !== title);
    };

    return {
      ...useTime(),
      form,
      tagTitle,
      tagMenuShow,
      v,
      onSubmit,
      filmTime,
      serialTime,
      newTag,
      deleteTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  & .ui-title-2 {
    margin-bottom: 0;
  }
}

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
      &:before,
      &:after {
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
