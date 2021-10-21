<template>
  <div class="row">
      <div class="col-md-2 mb-4">
          <h6>Filtter Task</h6>
          <select v-model="number" @change="filterTask" class="form-form-select form-select-sm form-control">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
          </select>
      </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex'
export default {
    setup(){
        const store =useStore();
        const number = ref()
        function filterTask() {
            store.dispatch('task/filterTask' , number.value)
        }
        return{filterTask , number}
    }
}
</script>

<style>

</style>