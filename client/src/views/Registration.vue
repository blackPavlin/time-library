<template>
  <div class="registration">
    <div class="registration__banner">
      <banner />
    </div>
    <div class="registration__form">
      <span class="ui-title-2">Registration</span>
      <form @submit.prevent="onSubmit" @keypress.enter.prevent="onSubmit">
        <div class="form-item" :class="{ errorInput: v.login.$error }">
          <input
            type="email"
            placeholder="Email address"
            v-model="login"
            :class="{ error: v.login.$error }"
            @change="v.login.$touch()"
          />
          <p class="error" v-for="error of v.login.$errors" :key="error.$uid">
            {{ error.$message }}
          </p>
        </div>
        <div class="form-item" :class="{ errorInput: v.password.$error }">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            :class="{ error: v.password.$error }"
            @change="v.password.$touch()"
          />
          <p class="error" v-for="error of v.password.$errors" :key="error.$uid">
            {{ error.$message }}
          </p>
        </div>
        <div class="form-item" :class="{ errorInput: v.confirmPassword.$error }">
          <input
            type="password"
            placeholder="Repear password"
            v-model="confirmPassword"
            :class="{ error: v.confirmPassword.$error }"
            @change="v.confirmPassword.$touch()"
          />
          <p class="error" v-for="error of v.confirmPassword.$errors" :key="error.$uid">
            {{ error.$message }}
          </p>
        </div>
        <div class="buttons-list">
          <button
            class="button button-success"
            type="submit"
            :class="{ 'button--disable': v.$invalid }"
          >
            Registration
          </button>
          <div class="buttons-list buttons-list--info">
            <span>Do you have account?</span>
            <router-link to="/login"> Enter Here</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import store from '@/store';
import Banner from '@/components/Banner.vue';

export default defineComponent({
  name: 'Registration',
  components: {
    Banner,
  },
  setup() {
    const login = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const rules = {
      login: { required, email },
      password: { required, minLength: minLength(6) },
      confirmPassword: { sameAs: sameAs(password, 'password') },
    };

    const router = useRouter();
    const v = useVuelidate(rules, { login, password, confirmPassword });

    const onSubmit = async (): Promise<void> => {
      v.value.$touch();
      if (v.value.$invalid) {
        return;
      }

      try {
        const payload = {
          login: login.value,
          password: password.value,
        };

        await store.dispatch('signup', payload);
        await store.dispatch('login', payload);
        router.push('/home');
      } catch (error) {
        await store.dispatch('showErrorMessage', error);
      }
    };

    return {
      login,
      password,
      confirmPassword,
      onSubmit,
      v,
    };
  },
});
</script>

<style lang="scss" scoped>
.registration {
  display: flex;
}

.registration__banner,
.registration__form {
  width: 50%;
}

@media screen and (max-width: 480px) {
  .registration {
    flex-direction: column-reverse;
  }

  .registration__banner,
  .registration__form {
    width: 100%;
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }
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
    animation: shake 0.3s;
  }
}

.buttons-list {
  text-align: right;
  margin-bottom: 20px;

  &.buttons-list--info {
    text-align: center;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

a {
  color: #444ce0;
}
</style>
