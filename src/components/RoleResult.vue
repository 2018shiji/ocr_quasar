<template>
  <q-page class="flex flex-lg-center">
    <div class="rightArea">
      <div class="rightTextArea">
        <div class="row">
          <q-input class="col-4" v-for="item in inputParams" :key="item.label" v-model="item.value" filled :hint="item.label"></q-input>
        </div>
        <div>
          <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="row">
            <q-btn class="col-6" label="Submit" type="submit" color="primary"/>
            <q-btn class="col-6" label="Reset" type="reset" color="primary" flat />
          </form>
        </div>
      </div>

      <div class="rightTable">
        <q-table
          :columns="tableFields"
          :data="tableResult.dataTable">
        </q-table>
      </div>

      <div class="rightBottom">
        <div class="row">
          <q-input class="col-6" color="primary" label="ErrorCode" v-model="tableResult.returnInfo.errorCode"></q-input>
          <q-input class="col-6" color="primary" label="ErrorMsg" v-model="tableResult.returnInfo.errorMsg"></q-input>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import eventCenter from '../router/eventCenter'
export default {
  name: 'RoleResult',
  data: function () {
    return {
      fieldUrl: '',
      resultUrl: '',

      inputParams: [],
      tableFields: [],
      tableResult: { dataTable: [], returnInfo: { errorCode: '1', errorMsg: 'failed' } }
      // tableFields: [{ name: 'containerNo', label: 'containerNo', field: 'containerNo', sortable: 'true' }, { name: 'containerId', label: 'containerId', field: 'containerId' }],
      // tableResult: { dataTable: [{ containerNo: '111', containerId: '222' }, { containerNo: '333', containerId: '444' }], returnInfo: { errorCode: '1', errorMsg: 'failed' } }
    }
  },
  mounted () {
    console.log('Single result mounted begin')
    eventCenter.$on('init-inputParams', inputInit => {
      if (this.fieldUrl === '') {
        this.inputParams = inputInit.inputParams
        this.fieldUrl = inputInit.fieldUrl
        this.resultUrl = inputInit.resultUrl
      }
      if ((inputInit.fieldUrl === '/api/getRoleUserResultFormat') || (inputInit.fieldUrl === '/api/getContractorResultFormat')) {
        if (this.fieldUrl !== inputInit.fieldUrl) {
          this.inputParams = inputInit.inputParams
          this.fieldUrl = inputInit.fieldUrl
          this.resultUrl = inputInit.resultUrl
        }
      }
      console.log('listen event of inputParams initial: ' + this.inputParams + this.inputParams.length)
    })
  },
  methods: {
    onSubmit () {
      this.tableFields = []
      this.tableResult = { dataTable: [], returnInfo: { errorCode: '1', errorMsg: 'failed' } }
      alert(JSON.stringify(this.inputParams))
      this.getTableFields(this.fieldUrl)
      console.log('---------format output---------' + '\n' + this.inputParams[0].key + this.inputParams[0].label + this.inputParams[0].value)
      let inputString = '{'
      for (let i = 0; i < this.inputParams.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (i != this.inputParams.length - 1) {
          inputString += '"' + this.inputParams[i].key + '"' + ':' + '"' + this.inputParams[i].value + '", '
        } else {
          inputString += '"' + this.inputParams[i].key + '"' + ':' + '"' + this.inputParams[i].value + '"'
        }
      }
      inputString += '}'
      const inputResult = JSON.parse(inputString)
      this.getTableResults(this.resultUrl, inputResult)
    },
    onReset () {
      console.log('reset')
    },
    getTableFields (url) {
      axios
        .get(url)
        .then(response => {
          console.log(response.data)
          console.log('here is getTableFields(response data length):' + response.data.length)
          this.tableFields = response.data
        })
    },
    getTableResults (url, param) {
      axios
        .post(url, param)
        .then(response => {
          this.tableResult = response.data
          console.log(this.tableResult)
        })
    }
  }

}
</script>

<style scoped>
  .rightArea{
    flex:1;
    display:flex;
    flex-direction: column;
    overflow:auto;
  }

  .rightTextArea{
    flex:1;
    display:flex;
    flex-direction: column;
    overflow:auto;
  }

  .rightTable{
    flex:1;
    overflow: auto;
  }

  .rightBottom{
    flex:0 0 0px
  }
</style>
