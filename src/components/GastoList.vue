<template>
  <div>
    <!-- Filtros -->
    <BRow class="mb-3 g-2">
      <BCol sm="6">
        <BFormSelect v-model="filtroCategoria" :options="opcionesCat" @change="cargar" />
      </BCol>
      <BCol sm="6">
        <BFormInput v-model="filtroMes" type="month" @change="cargar" />
      </BCol>
    </BRow>

    <!-- Estados -->
    <div v-if="cargando" class="text-center py-4 text-muted">
      <BSpinner small /> Cargando gastos...
    </div>
    <BAlert v-else-if="error" variant="danger" :model-value="true">{{ error }}</BAlert>

    <!-- Lista -->
    <template v-else>
      <BAlert v-if="gastos.length === 0" variant="secondary" :model-value="true">
        No hay gastos registrados aún. ¡Agrega el primero!
      </BAlert>

      <BListGroup v-else>
        <GastoCard v-for="g in gastos" :key="g.id" :gasto="g" @eliminar="eliminar" />
      </BListGroup>

      <div class="text-end text-muted small mt-2">
        Mostrando <strong>{{ gastos.length }}</strong> gastos —
        Total: <strong>${{ totalMostrado.toFixed(2) }}</strong>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  BRow, BCol, BFormSelect, BFormInput,
  BSpinner, BAlert, BListGroup,
} from 'bootstrap-vue-next'
import GastoCard from './GastoCard.vue'
import { gastoService } from '../services/gastoService'
import type { Gasto } from '../types'

defineExpose({ cargar })

const gastos          = ref<Gasto[]>([])
const cargando        = ref(false)
const error           = ref('')
const filtroCategoria = ref('')
const filtroMes       = ref('')

const opcionesCat = [
  { value: '',             text: 'Todas las categorías' },
  { value: 'alimentacion',    text: 'Alimentación'    },
  { value: 'transporte',      text: 'Transporte'      },
  { value: 'educacion',       text: 'Educación'       },
  { value: 'entretenimiento', text: 'Entretenimiento' },
  { value: 'salud',           text: 'Salud'           },
  { value: 'servicios',       text: 'Servicios'       },
  { value: 'ropa',            text: 'Ropa'            },
  { value: 'general',         text: 'General'         },
]

const totalMostrado = computed(() =>
  gastos.value.reduce((acc, g) => acc + g.monto, 0)
)

async function cargar() {
  cargando.value = true
  error.value = ''
  try {
    const res = await gastoService.listar({
      categoria: filtroCategoria.value || undefined,
      mes: filtroMes.value || undefined,
    })
    gastos.value = res.gastos
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error al cargar'
  } finally {
    cargando.value = false
  }
}

async function eliminar(id: number) {
  if (!confirm('¿Eliminar este gasto?')) return
  try {
    await gastoService.eliminar(id)
    await cargar()
  } catch (e: unknown) {
    alert(e instanceof Error ? e.message : 'Error al eliminar')
  }
}

onMounted(cargar)
</script>
