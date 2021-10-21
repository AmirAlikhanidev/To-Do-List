<template>
  <div>
    <div v-if="loading" class="container mt-5">
      <div class="row justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="container mt-5">
      <CraeteTask />
      <hr />
      <FilterTask />
      <div class="row g-3">
        <div v-for="task in tasks" :key="task.id" class="col-md-4">
          <div class="card" :class="{ 'bg-light': task.completed }">
            <div
              class="
                card-body
                d-flex
                justify-content-between
                align-items-center
              "
            >
              <div>
                <del v-if="task.completed">
                  {{ task.title }}
                </del>
                <div v-else>
                  {{ task.title }}
                </div>
              </div>
              <div class="d-flex align-items-center">
                <UpdateTask :task="task" />
                <deleteTask :id="task.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import FilterTask from "../FilterTask/FilterTask.vue";
import CraeteTask from "../CreateTask/CreateTask.vue";
import UpdateTask from "../UpdateTask/UpdateTask.vue";
import deleteTask from "../deleteTask/deleteTask.vue";
export default {
  components: {
    FilterTask,
    CraeteTask,
    UpdateTask,
    deleteTask,
  },
  setup() {
    const store = useStore();
    const tasks = computed(() => store.getters['task/allTasks']);
    const loading = ref(false);
    async function fetchTasks() {
      loading.value = true;
      await store.dispatch("task/fetchTasks");
      loading.value = false;
    }
    fetchTasks();
    return { tasks, loading };
  },
};
</script>

<style>
del {
  font-weight: bold;
}
</style>