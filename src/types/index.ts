// aquí se refleja exactamente la estructura de la API

export interface Gasto {
  id?: number
  descripcion: string
  monto: number
  categoria: string
  fecha: string
}

export type Categoria =
  | 'alimentacion'
  | 'transporte'
  | 'educacion'
  | 'entretenimiento'
  | 'salud'
  | 'servicios'
  | 'ropa'
  | 'general'

export interface ApiResponse<T> {
  ok: boolean
  data: T
  error?: string
}

export interface ListaGastosData {
  total: number
  gastos: Gasto[]
}

export interface Estadisticas {
  total_gastado: number
  num_registros: number
  por_categoria: { categoria: string; total: number; num_gastos: number }[]
  por_mes: { mes: string; total: number; num_gastos: number }[]
  mayor_gasto: Gasto | null
}
