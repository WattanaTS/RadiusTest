<template>
  <div
    class="row box content"
    style="margin-bottom: 30px;"
    v-for="(item, i) in data"
    :key="i"
    @click="showModal(item)"
  >
    <div class="row content">
      <a-avatar style="margin-right: 30px;" :src="item.links.patch.small" />
      <div>{{ item.name }}</div>
    </div>
    <div>{{ item.crew.length }} crews</div>
    <div>{{ item.static_fire_date_utc }}</div>
    <div v-if="item.upcoming == true">upcoming</div>
    <div v-if="item.upcoming == false">upcoming</div>
  </div>
  <a-modal v-model:visible="visible" title="Detail" @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel">Return</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        Submit
      </a-button>
    </template>
    <div style="padding: 20px;">
      <a-col class="">
        <a-col>
          <a-row class="dialogContent">
            {{ dataItem.name }}
          </a-row>
          <a-row class="dialogContent" style="font-size: 14px;">
            {{ dataItem.static_fire_date_utc }}
          </a-row>
        </a-col>
        <a-col>
          <a-row
            class="dialogContent"
            style="font-size: 18px; font-weight: bold;"
          >
            Rocket
          </a-row>
          <a-row class="dialogContent">{{ dataItem.date_precision }}</a-row>
        </a-col>
        <a-col>
          <a-row class="dialogContent">
            <img style="width: 50%;" :src="dataItem.links.patch.large" />
          </a-row>
        </a-col>
        <a-col>
          <a-row
            class="dialogContent"
            style="font-size: 18px; font-weight: bold;"
          >
            Launchpad
          </a-row>
          <a-row>{{ dataItem.details }}</a-row>
        </a-col>
      </a-col>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: { data: Object },
  setup() {
    const loading = ref<boolean>(false)
    const visible = ref<boolean>(false)
    const dataItem = ref()
    const showModal = (data: any) => {
      visible.value = true
      dataItem.value = data
    }

    const handleOk = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        visible.value = false
      }, 2000)
    }

    const handleCancel = () => {
      visible.value = false
    }
    return {
      loading,
      visible,
      showModal,
      handleOk,
      handleCancel,
      dataItem,
    }
  },
})
</script>

<style>
.box {
  border-style: solid;
}
.row {
  display: flex;
  flex-direction: row;
}
.col {
  display: flex;

  flex-direction: column;
}
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dialogContent {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  justify-content: center;
}
</style>
