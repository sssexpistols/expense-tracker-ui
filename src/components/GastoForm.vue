<template>
  <BCard title="Nuevo gasto">
    <BForm @submit.prevent="guardar">
      <BFormGroup label="Descripción *" label-for="descripcion" class="mb-3">
        <BFormInput
          id="descripcion"
          v-model="form.descripcion"
          placeholder="Ej. Tacos de canasta"
          required
        />
      </BFormGroup>

      <BRow class="mb-3">
        <BCol>
          <BFormGroup label="Monto ($) *" label-for="monto">
            <BFormInput
              id="monto"
              v-model="form.monto"
              type="number"
              placeholder="0.00"
              required
            />
          </BFormGroup>
        </BCol>
        <BCol>
          <BFormGroup label="Fecha *" label-for="fecha">
            <BFormInput
              id="fecha"
              v-model="form.fecha"
              type="date"
              required
            />
          </BFormGroup>
        </BCol>
      </BRow>

      <BFormGroup label="Categoría *" label-for="categoria" class="mb-3">
        <BFormSelect
          id="categoria"
          v-model="form.categoria"
          :options="opcionesCategoria"
          required
        />
      </BFormGroup>

      <BAlert v-if="errorMsg" variant="danger" :model-value="true" class="mb-3">
        {{ errorMsg }}
      </BAlert>

      <BButton type="submit" variant="primary" :disabled="cargando" class="w-100">
        {{ cargando ? 'Guardando...' : 'Agregar gasto' }}
      </BButton>
    </BForm>
  </BCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  BCard, BForm, BFormGroup, BFormInput, BFormSelect,
  BButton, BAlert, BRow, BCol,
} from 'bootstrap-vue-next'
import { GastoBuilder } from '../builder/GastoBuilder'
import { gastoService } from '../services/gastoService'

const emit = defineEmits<{ (e: 'guardado'): void }>()

const hoy = new Date().toISOString().split('T')[0]
const form = ref({ descripcion: '', monto: '' as string | number, categoria: 'general', fecha: hoy })
const errorMsg = ref('')
const cargando = ref(false)

const opcionesCategoria = [
  { value: 'alimentacion',    text: 'Alimentación'    },
  { value: 'transporte',      text: 'Transporte'      },
  { value: 'educacion',       text: 'Educación'       },
  { value: 'entretenimiento', text: 'Entretenimiento' },
  { value: 'salud',           text: 'Salud'           },
  { value: 'servicios',       text: 'Servicios'       },
  { value: 'ropa',            text: 'Ropa'            },
  { value: 'general',         text: 'General'         },
]

async function guardar() {
  errorMsg.value = ''
  cargando.value = true
  try {
    const gasto = new GastoBuilder()
      .setDescripcion(form.value.descripcion)
      .setMonto(Number(form.value.monto))
      .setCategoria(form.value.categoria)
      .setFecha(form.value.fecha)
      .build()

    await gastoService.crear(gasto)
    form.value = { descripcion: '', monto: '', categoria: 'general', fecha: hoy }
    emit('guardado')
  } catch (e: unknown) {
    errorMsg.value = e instanceof Error ? e.message : 'Error al guardar'
  } finally {
    cargando.value = false
  }
}
</script>
