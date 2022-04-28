<template>
  <a-layout
    class="row screen"
    style="margin-top: 50px; background-color: #ffffff;"
  >
    <!-- {{ data }} -->
    <a-layout-content class="">
      <!-- {{ statusUpcoming }} -->
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="page1" tab="ALL">
          <Page1 v-if="activeKey == 'page1'" :data="item" />
        </a-tab-pane>
        <a-tab-pane key="page2" tab="LAUNCHPAD">
          <Page1 v-if="activeKey == 'page2'" :data="statusLaunchpad" />
        </a-tab-pane>
        <a-tab-pane key="page3" tab="UPCOMING">
          <Page1 v-if="activeKey == 'page3'" :data="statusUpcoming" />
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Page1 from './views/page1.vue'
import { view } from './plugin/axios'
export default defineComponent({
  components: { Page1 },
  setup() {
    const activeKey = ref('page1')
    const data = ref()
    const item = ref()
    const statusUpcoming = ref()
    const statusLaunchpad = ref()
    onMounted(async () => {
      data.value = await view.get('').then((res) => res)

      item.value = data.value.data
      onFilter()
    })

    const onFilter = () => {
      if (item.value) {
        statusUpcoming.value = item.value.filter((x: any) => x.upcoming == true)
        statusLaunchpad.value = item.value.filter(
          (x: any) => x.upcoming == false,
        )
      }
      console.log(statusUpcoming.value)
    }

    return { activeKey, data, item, statusUpcoming, statusLaunchpad }
  },
})
</script>
<style>
.row {
  display: flex;
  flex-direction: row;
}

.col {
  display: flex;
  flex-direction: column;
}

.screen {
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
