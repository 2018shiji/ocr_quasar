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
        <div class="q-pa-md">
          <div class="q-gutter-y-md" style="max-width: 1000px">
            <q-card>
              <q-tabs
                v-model="panel"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                narrow-indicator
              >
                <div v-for="item in tableFields" :key="item.key">
                  <q-tab :name="item.key" :label="item.key" />
                </div>
              </q-tabs>
              <q-tab-panels v-model="panel" v-for="(item, index) in tableFields " :key="item.key" animated>
                <q-tab-panel :name="item.key">
                  <div>{{item.key}}{{"   index   " + index}}</div>
                  <q-table
                    :columns="item.value"
                    :data="tableResult.dataTable[index].value"
                  >
                  </q-table>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
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
  name: 'BoxByNumResult',
  data () {
    return {
      panel: 'mails',
      fieldUrl: '',
      resultUrl: '',

      inputParams: [],
      tableFields: [],
      tableResult: { dataTable: [], returnInfo: { errorCode: '1', errorMsg: 'failed' } }
      // tableFields:
      // [
      //   { key: 'result1', value: [{ name: 'containerNo', label: 'containerNo', field: 'containerNo', sortable: 'true' }, { name: 'containerId', label: 'containerId', field: 'containerId' }] },
      //   { key: 'result2', value: [{ name: 'containerHeight', label: 'containerHeight', field: 'containerHeight', sortable: 'true' }, { name: 'containerWeight', label: 'containerWeight', field: 'containerWeight' }] },
      //   { key: 'result3', value: [{ name: 'containerSize', label: 'containerSize', field: 'containerSize' }] }
      // ],
      // tableResult: {
      //   dataTable: [
      //     { key: 'result1', value: [{ containerNo: '111', containerId: '222' }] },
      //     { key: 'result2', value: [{ containerHeight: '333', containerWeight: '444' }] },
      //     { key: 'result3', value: [{ containerSize: '555' }] }
      //   ],
      //   returnInfo: {
      //     errorCode: '1',
      //     errorMsg: 'failed'
      //   }
      // }
    }
  },
  mounted () {
    console.log('Multi result mounted begin')
    eventCenter.$on('init-inputParams', inputInit => {
      this.fieldUrl = inputInit.fieldUrl
      this.resultUrl = inputInit.resultUrl
      this.inputParams = inputInit.inputParams
      console.log('MultiResult listen event of inputParams initial: ' + this.inputParams + this.inputParams.length)
    })
  },
  methods: {
    onSubmit () {
      console.log(this.tableFields)
      console.log(this.tableResult)
      this.tableFields = []
      this.tableResult = { dataTable: [], returnInfo: { errorCode: '1', errorMsg: 'failed' } }
      alert(JSON.stringify(this.inputParams))
      this.getTableFields(this.fieldUrl)
      console.log('---------format output---------' + '\n' + this.inputParams[0].key + this.inputParams[0].label + this.inputParams[0].value)
      let inputString = '{'
      for (let i = 0; i < this.inputParams.length; i++) {
        if (i !== this.inputParams.length - 1) {
          inputString += '"' + this.inputParams[i].key + '"' + ':' + '"' + this.inputParams[i].value + '", '
        } else {
          inputString += '"' + this.inputParams[i].key + '"' + ':' + '"' + this.inputParams[i].value + '"'
        }
      }
      inputString += '}'
      const inputResult = JSON.parse(inputString)
      this.getTableResults(this.resultUrl, inputResult)
    },
    getTableFields (url) {
      axios
        .get(url)
        .then(response => {
          console.log(response.data)
          console.log('here is MultiResult getTableFields')
          this.formatBoxTableFields(response.data)
        })
    },
    getTableResults (url, param) {
      axios
        .post(url, param)
        .then(response => {
          console.log(response.data)
          this.fulfillBoxTableResult(response.data)
        })
    },
    formatBoxTableFields (data) {
      this.tableFields.push({ key: 'vesselBay', value: data.vesselBay })
      this.tableFields.push({ key: 'vesselStack', value: data.vesselStack })
      this.tableFields.push({ key: 'vesselCellAll', value: data.vesselCellAll })
      this.tableFields.push({ key: 'vesselHatchCover', value: data.vesselHatchCover })
      console.log(this.tableFields)
    },
    fulfillBoxTableResult (data) {
      this.tableResult.dataTable.push({ key: 'vesselBay', value: data.vesselBay })
      this.tableResult.dataTable.push({ key: 'vesselStack', value: data.vesselStack })
      this.tableResult.dataTable.push({ key: 'vesselCellAll', value: data.vesselCellAll })
      this.tableResult.dataTable.push({ key: 'vesselHatchCover', value: data.vesselHatchCover })
      this.tableResult.returnInfo = data.returnInfo
      console.log(this.tableResult)
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
