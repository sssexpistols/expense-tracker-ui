<template>
  <!-- NAVBAR -->
  <BNavbar variant="dark" class="bg-primary px-3">
    <BNavbarBrand class="text-white">Tracker de gastos</BNavbarBrand>
    <BButton variant="light" size="sm" :disabled="exportando" @click="exportar">
      {{ exportando ? 'Generando...' : 'Exportar Excel' }}
    </BButton>
  </BNavbar>

  <BContainer class="mt-4">
    <!-- Tarjetas de estadísticas -->
    <BRow v-if="stats" class="mb-4 g-3">
      <BCol sm="6" md="3">
        <BCard class="text-center h-100">
          <div class="text-muted small">Total gastado</div>
          <div class="fs-4 fw-bold text-primary">${{ stats.total_gastado.toFixed(2) }}</div>
        </BCard>
      </BCol>
      <BCol sm="6" md="3">
        <BCard class="text-center h-100">
          <div class="text-muted small">Registros</div>
          <div class="fs-4 fw-bold text-primary">{{ stats.num_registros }}</div>
        </BCard>
      </BCol>
      <BCol sm="6" md="3" v-if="stats.mayor_gasto">
        <BCard class="text-center h-100">
          <div class="text-muted small">Mayor gasto</div>
          <div class="fs-4 fw-bold text-primary">${{ stats.mayor_gasto.monto.toFixed(2) }}</div>
          <div class="text-muted small text-truncate">{{ stats.mayor_gasto.descripcion }}</div>
        </BCard>
      </BCol>
      <BCol sm="6" md="3" v-if="stats.por_categoria[0]">
        <BCard class="text-center h-100">
          <div class="text-muted small">Top categoría</div>
          <div class="fs-4 fw-bold text-primary text-capitalize">{{ stats.por_categoria[0].categoria }}</div>
          <div class="text-muted small">${{ stats.por_categoria[0].total.toFixed(2) }}</div>
        </BCard>
      </BCol>
    </BRow>

    <!-- Contenido principal -->
    <BRow class="g-4">
      <BCol md="4">
        <GastoForm @guardado="onGuardado" />
      </BCol>
      <BCol md="8">
        <h5 class="mb-3">Mis gastos</h5>
        <GastoList ref="listaRef" />
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  BNavbar, BNavbarBrand, BButton, BContainer,
  BRow, BCol, BCard,
} from 'bootstrap-vue-next'
import GastoForm from './components/GastoForm.vue'
import GastoList from './components/GastoList.vue'
import { gastoService } from './services/gastoService'
import type { Estadisticas } from './types'

const listaRef   = ref<InstanceType<typeof GastoList> | null>(null)
const stats      = ref<Estadisticas | null>(null)
const exportando = ref(false)

async function cargarStats() {
  try {
    stats.value = await gastoService.estadisticas()
  } catch { /* sin datos aún */ }
}

async function onGuardado() {
  await listaRef.value?.cargar()
  await cargarStats()
}

async function exportar() {
  exportando.value = true
  try {
    await gastoService.exportarExcel()
  } catch (e: unknown) {
    alert(e instanceof Error ? e.message : 'Error al exportar')
  } finally {
    exportando.value = false
  }
}

onMounted(cargarStats)
</script>
