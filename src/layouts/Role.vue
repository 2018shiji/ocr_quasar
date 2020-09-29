<template>
    <q-page class="flex flex-lg-center">
      <div class="rightTextArea">
        <div class="row">
          <q-btn class="col-4" color="primary" label="test"></q-btn>
          <q-btn class="col-4" color="primary" label="test"></q-btn>
          <q-btn class="col-4" color="primary" label="test"></q-btn>
          <q-btn class="col-4" color="primary" label="test"></q-btn>
          <q-btn class="col-4" color="primary" label="test"></q-btn>
          <q-btn class="col-4" color="primary" label="test"></q-btn>
        </div>

        <div class="row">
          <q-input class="col-4" filled hint="input1"></q-input>
          <q-input class="col-4" filled hint="input2"></q-input>
          <q-input class="col-4" filled hint="input3"></q-input>
        </div>

        <q-form class="row" @submit="onSubmit" @reset="onReset">
          <q-input class="col-4" v-for="item in inputParams" v-model="item.value" :key="item.label" filled :hint="item.label"></q-input>
        </q-form>

        <div class="row">
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </div>
    </q-page>
</template>

<script>
export default {
  name: 'Role',
  data: function () {
    return {
      inputParams: [
        { label: '用户ID', value: '' },
        { label: '用户名', value: '' },
        { label: '密码', value: 'init' }
      ]
    }
  },
  methods: {
    onSubmit () {
      this.$q.notify({ message: 'message111' })
    }
  }

}
</script>

<style scoped>
  .rightTextArea{
    flex:1;
    display:flex;
    flex-direction: column;
    overflow:auto;
    background:green;
  }
</style>
