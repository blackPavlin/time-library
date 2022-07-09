<template>
  <div class="auth">
    <div class="auth__banner">
      <banner />
    </div>
    <div class="auth__form">
      <span class="ui-title-2">Login</span>
      <form @submit.prevent="onSubmit" @keypress.enter.prevent="onSubmit">
        <div class="form-item" :class="{ errorInput: v.login.$error }">
          <input
            type="email"
            placeholder="Email address"
            v-model="form.login"
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
            v-model="form.password"
            :class="{ error: v.password.$error }"
            @change="v.password.$touch()"
          />
          <p class="error" v-for="error of v.password.$errors" :key="error.$uid">
            {{ error.$message }}
          </p>
        </div>
        <div class="buttons-list">
          <button
            class="button button-success"
            :class="{ 'button--disable': v.$invalid }"
            type="submit"
          >
            Login
          </button>
          <div class="buttons-list buttons-list--info">
            <span>Do you need account?</span>
            <router-link to="/registration"> Enter Here</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import store from '@/store';
import Banner from '@/components/Banner.vue';

export default defineComponent({
  name: 'Login',
  components: {
    Banner,
  },
  setup() {
    const form = reactive({
      login: '',
      password: '',
    });

    const rules = {
      login: { required, email },
      password: { required },
    };

    const router = useRouter();
    const v = useVuelidate(rules, form);

    const onSubmit = async (): Promise<void> => {
      try {
        v.value.$touch();
        if (v.value.$invalid) {
          return;
        }

        await store.dispatch('login', form);
        router.push('/home');
      } catch (error) {
        await store.dispatch('showErrorMessage', error);
      }
    };

    return {
      form,
      onSubmit,
      v,
    };
  },
});
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.auth__banner,
.auth__form {
  width: 50%;
}

@media screen and (max-width: 480px) {
  .auth {
    flex-direction: column-reverse;
  }
  .auth__banner,
  .auth__form {
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
