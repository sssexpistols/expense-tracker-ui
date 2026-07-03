/**
 * Las rutas usan /api/* que Vite redirige a http://localhost:5000/*
 * (configurado en vite.config.ts).
 */

import type { Gasto, ApiResponse, ListaGastosData, Estadisticas } from '../types'

const BASE = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const json: ApiResponse<T> = await res.json()
  if (!json.ok) throw new Error(json.error ?? 'Error en la API')
  return json.data
}

export const gastoService = {
  /** GET /gastos */
  listar(filtros?: { categoria?: string; mes?: string }): Promise<ListaGastosData> {
    const params = new URLSearchParams()
    if (filtros?.categoria) params.append('categoria', filtros.categoria)
    if (filtros?.mes) params.append('mes', filtros.mes)
    const query = params.toString() ? `?${params}` : ''
    return request<ListaGastosData>(`/gastos${query}`)
  },

  /** POST /gastos */
  crear(gasto: Gasto): Promise<Gasto> {
    return request<Gasto>('/gastos', {
      method: 'POST',
      body: JSON.stringify(gasto),
    })
  },

  /** DELETE /gastos/:id */
  eliminar(id: number): Promise<{ mensaje: string }> {
    return request(`/gastos/${id}`, { method: 'DELETE' })
  },

  /** GET /estadisticas */
  estadisticas(): Promise<Estadisticas> {
    return request<Estadisticas>('/estadisticas')
  },

  /** GET /exportar-excel **/
  async exportarExcel(): Promise<void> {
    const res = await fetch(`${BASE}/exportar-excel`)
    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      throw new Error((json as { error?: string }).error ?? 'Error al exportar')
    }
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    // Toma el nombre del header Content-Disposition si Flask lo envía
    const cd   = res.headers.get('Content-Disposition') ?? ''
    const match = cd.match(/filename="?([^"]+)"?/)
    a.download = match ? match[1] : `reporte_gastos_${Date.now()}.xlsx`
    a.click()
    URL.revokeObjectURL(url)
  },
}
