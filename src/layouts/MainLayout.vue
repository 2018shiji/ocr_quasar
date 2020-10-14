<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <q-tree
          :nodes="simple"
          selected-color="blue"
          node-key="label"
          :selected.sync="selected">
        </q-tree>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios'
import eventCenter from './../router/eventCenter.js'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      selected: '',
      inputParamsUrl: '',
      toEmit: {
        fieldUrl: '',
        resultUrl: '',
        inputParams: []
      },
      simple: [
        {
          label: '用户相关',
          children: [
            { handler: (node) => this.handleClick(node), label: '注册', url: 'register', inputParamsUrl: '/api/getRegisterInputParams', fieldUrl: '/api/getRegisterResultFormat', resultUrl: '/api/getRegisterResult' },
            { handler: (node) => this.handleClick(node), label: '终端登录', url: 'roleAction', inputParamsUrl: '/api/getLoginInputParams', fieldUrl: '/api/getLoginResultFormat', resultUrl: '/api/getLoginResult' },
            { handler: (node) => this.handleClick(node), label: '终端注销', url: 'roleAction', inputParamsUrl: '/api/getLogoutInputParams', fieldUrl: '/api/getLogoutResultFormat', resultUrl: '/api/getLogoutResult' },
            { handler: (node) => this.handleClick(node), label: '注销', url: 'roleAction', inputParamsUrl: '/api/getRegisterOutInputParams', fieldUrl: '/api/getRegisterOutResultFormat', resultUrl: '/api/getRegisterOutResult' },
            { handler: (node) => this.handleClick(node), label: '获取角色用户', url: 'role', inputParamsUrl: '/api/getRoleUserInputParams', fieldUrl: '/api/getRoleUserResultFormat', resultUrl: '/api/getRoleUserResult' },
            { handler: (node) => this.handleClick(node), label: '获取承包商', url: 'role', inputParamsUrl: '/api/getContractorInputParams', fieldUrl: '/api/getContractorResultFormat', resultUrl: '/api/getContractorResult' }
          ]
        },
        {
          label: '船箱查询',
          children: [
            { handler: (node) => this.handleClick(node), label: '查询激活船期', url: 'vesselSchedule', inputParamsUrl: '/api/getVesselScheduleInputParams', fieldUrl: '/api/getVesselScheduleResultFormat', resultUrl: '/api/getVesselScheduleResult' },
            { handler: (node) => this.handleClick(node), label: '查询船结构', url: 'vesselStruct', inputParamsUrl: '/api/getVesselStructInputParams', fieldUrl: '/api/getVesselStructResultFormat', resultUrl: '/api/getVesselStructResult' },
            { handler: (node) => this.handleClick(node), label: '查询箱位信息', url: 'vesselBox', inputParamsUrl: '/api/getBoxPositionInputParams', fieldUrl: '/api/getBoxPositionResultFormat', resultUrl: '/api/getBoxPositionResult' },
            { handler: (node) => this.handleClick(node), label: '据箱号查询箱', url: 'boxByNum', inputParamsUrl: '/api/getBoxByNumInputParams', fieldUrl: '/api/getBoxByNumResultFormat', resultUrl: '/api/getBoxByNumResult' },
            { handler: (node) => this.handleClick(node), label: '据子箱查询箱', url: 'vesselBox', inputParamsUrl: '/api/getQueryMainBoxInputParams', fieldUrl: '/api/getQueryMainBoxResultFormat', resultUrl: '/api/getQueryMainBoxResult' },
            { handler: (node) => this.handleClick(node), label: '查询泊位信息', url: 'berthMessage', inputParamsUrl: '/api/getBerthMsgInputParams', fieldUrl: '/api/getBerthMsgResultFormat', resultUrl: '/api/getBerthMsgResult' }
          ]
        },
        {
          label: '装卸船相关',
          children: [
            { handler: (node) => this.handleClick(node), label: '装船信息查询', url: 'workProcess', inputParamsUrl: '/api/getQueryShipUpInputParams', fieldUrl: '/api/getQueryShipUpResultFormat', resultUrl: '/api/getQueryShipUpResult' },
            { handler: (node) => this.handleClick(node), label: '装卸船作业初始化', url: 'workProcess', inputParamsUrl: '/api/getShipmentTaskInitInputParams', fieldUrl: '/api/getShipmentTaskInitResultFormat', resultUrl: '/api/getShipmentTaskInitResult' },
            { handler: (node) => this.handleClick(node), label: '确认装船', url: 'workProcess', inputParamsUrl: '/api/getShipmentUpRegInputParams', fieldUrl: '/api/getShipmentUpRegResultFormat', resultUrl: '/api/getShipmentUpRegResult' },
            { handler: (node) => this.handleClick(node), label: '确认卸船', url: 'workProcess', inputParamsUrl: '/api/getShipmentDownRegInputParams', fieldUrl: '/api/getShipmentDownRegResultFormat', resultUrl: '/api/getShipmentDownRegResult' },
            { handler: (node) => this.handleClick(node), label: '装卸船作业退出', url: 'workProcess', inputParamsUrl: '/api/getShipmentTaskQuitInputParams', fieldUrl: '/api/getShipmentTaskQuitResultFormat', resultUrl: '/api/getShipmentTaskQuitResult' },
            { handler: (node) => this.handleClick(node), label: '船箱信息更新', url: 'workProcess', inputParamsUrl: '/api/getUpdateDamageBoxInputParams', fieldUrl: '/api/getUpdateDamageBoxResultFormat', resultUrl: '/api/getUpdateDamageBoxResult' }
          ]
        },
        {
          label: '指令查询',
          children: [
            { handler: (node) => this.handleClick(node), label: '据箱号索装船箱指令', url: 'loadOrder', inputParamsUrl: '/api/getFindBoxOrderInputParams', fieldUrl: '/api/getFindBoxOrderResultFormat', resultUrl: '/api/getFindBoxOrderResult' },
            { handler: (node) => this.handleClick(node), label: '据箱号索卸船箱指令', url: 'unloadOrder', inputParamsUrl: '/api/getUnloadOrderInputParams', fieldUrl: '/api/getUnloadOrderResultFormat', resultUrl: '/api/getUnloadOrderResult' },
            { handler: (node) => this.handleClick(node), label: '岸桥作业指令', url: 'order', inputParamsUrl: '/api/getWorkOrderListInputParams', fieldUrl: '/api/getWorkOrderListResultFormat', resultUrl: '/api/getWorkOrderListResult' },
            { handler: (node) => this.handleClick(node), label: '卸船指令清单', url: 'order', inputParamsUrl: '/api/getUnloadOrderListInputParams', fieldUrl: '/api/getUnloadOrderListResultFormat', resultUrl: '/api/getUnloadOrderListResult' },
            { handler: (node) => this.handleClick(node), label: '作业量统计', url: 'order', inputParamsUrl: '/api/getShipWorkLoadInputParams', fieldUrl: '/api/getShipWorkLoadResultFormat', resultUrl: '/api/getShipWorkLoadResult' }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick (node) {
      console.log(`node: ${JSON.stringify(node)}`)
      this.getInputParams(node.inputParamsUrl, node.fieldUrl, node.resultUrl)
      this.$router.push(node.url)
    },
    async getInputParams (inputParamsUrl, fieldUrl, resultUrl) {
      console.log('go to getInputParams methods')
      this.toEmit.fieldUrl = fieldUrl
      this.toEmit.resultUrl = resultUrl
      const response = await axios.get(inputParamsUrl)
      console.log(response.data)
      console.log('getInputParams response(data length):' + response.data.length)
      this.toEmit.inputParams = response.data
      eventCenter.$emit('init-inputParams', this.toEmit)
    }
  }
}
</script>
// 页面缓存：https://www.cnblogs.com/smart-girl/p/10496769.html
// 页面缓存：https://www.jb51.net/article/173595.htm
// 仿造RegisterResult.vue和RoleActionResult进行代码编写
