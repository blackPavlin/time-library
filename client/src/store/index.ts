/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createStore,
  MutationTree,
  ActionTree,
  GetterTree,
} from 'vuex';
import client from '../plugins/axios';

export type Task = {
  _id?: string;
  user?: string;
  title: string;
  description: string;
  whatWatch: 'film' | 'serial';
  time: number;
  tags: string[];
  completed: boolean;
}

interface RootState {
  token: string;
  tasks: Task[];
}

export type UpdateTask = {
  title: string;
  description: string;
} | {
  completed: boolean
}

const state: RootState = {
  token: localStorage.getItem('token') || '',
  tasks: [],
};

const mutations: MutationTree<RootState> = {
  setToken(store, token: string): void {
    store.token = token;
  },
  clearToken(store): void {
    store.token = '';
  },
  setTasks(store, tasks: Task[]): void {
    store.tasks = tasks;
  },
};

const actions: ActionTree<RootState, RootState> = {
  async login({ commit }, payload: { login: string; password: string }): Promise<void> {
    const response = await client.post<{ token: string }>('/auth/login', payload);
    localStorage.setItem('token', response.data.token);
    commit('setToken', response.data.token);
  },
  async signup({ commit }, payload: { login: string; password: string }): Promise<void> {
    await client.post('/auth/signup', payload);
  },
  logout({ commit }): void {
    localStorage.removeItem('token');
    commit('clearToken');
  },
  async getTasks({ commit }): Promise<void> {
    const response = await client.get<{ tasks: Task[] }>('/task');
    commit('setTasks', response.data.tasks);
  },
  async createTask({ commit }, payload: Task): Promise<void> {
    await client.post<Task>('/task', payload);
  },
  async updateTask({ dispatch }, payload: { taskID: string; task: UpdateTask }): Promise<void> {
    await client.put<Task>(`/task/${payload.taskID}`, payload.task);
    await dispatch('getTasks');
  },
  async removeTask({ dispatch }, taskID: string): Promise<void> {
    await client.delete<Task>(`/task/${taskID}`);
    await dispatch('getTasks');
  },
};

const getters: GetterTree<RootState, RootState> = {
  isAuth: ({ token }): boolean => !!token,
  getToken: ({ token }): string => token,
  getTasks: ({ tasks }): Task[] => tasks,
  getActiveTasks: ({ tasks }): Task[] => tasks.filter((task) => !task.completed),
  getCompletedTasks: ({ tasks }): Task[] => tasks.filter((task) => task.completed),
};

export default createStore<RootState>({
  state,
  mutations,
  actions,
  getters,
});
