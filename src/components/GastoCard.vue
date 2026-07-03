<template>
  <BListGroupItem class="d-flex justify-content-between align-items-center">
    <div>
      <BBadge :variant="variantCategoria(gasto.categoria)" class="me-2 text-capitalize">
        {{ gasto.categoria }}
      </BBadge>
      <strong>{{ gasto.descripcion }}</strong>
      <div class="text-muted small mt-1">{{ gasto.fecha }}</div>
    </div>
    <div class="d-flex align-items-center gap-3">
      <strong class="fs-5">${{ gasto.monto.toFixed(2) }}</strong>
      <BButton
        variant="outline-danger"
        size="sm"
        @click="emit('eliminar', gasto.id!)"
        title="Eliminar"
      >✕</BButton>
    </div>
  </BListGroupItem>
</template>

<script setup lang="ts">
import { BBadge, BButton, BListGroupItem } from 'bootstrap-vue-next'
import type { ColorVariant } from 'bootstrap-vue-next'
import type { Gasto } from '../types'

defineProps<{ gasto: Gasto }>()
const emit = defineEmits<{ (e: 'eliminar', id: number): void }>()

function variantCategoria(cat: string): ColorVariant {
  const map: Record<string, ColorVariant> = {
    alimentacion:    'success',
    transporte:      'warning',
    educacion:       'primary',
    salud:           'danger',
    entretenimiento: 'warning',
    ropa:            'info',
    servicios:       'secondary',
    general:         'dark',
  }
  return map[cat] ?? 'secondary'
}
</script>
