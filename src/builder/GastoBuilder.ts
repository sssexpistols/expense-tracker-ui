/**
 * Decidí utilizar el patrón de diseño Builder para construir los objetos de Gasto con la finalidad de volverlo más legible y fácil de mantener.
 * =========================================
 * Se construye un objeto Gasto paso a paso, validando cada campo
   antes de ensamblar el objeto final con build().
 
 * Uso:
 *   const gasto = new GastoBuilder()
 *     .setDescripcion('Tacos')
 *     .setMonto(85)
 *     .setCategoria('alimentacion')
 *     .setFecha('2026-07-02')
 *     .build()
 */

import type { Gasto, Categoria } from '../types'

const CATEGORIAS_VALIDAS: Categoria[] = [
  'alimentacion', 'transporte', 'educacion',
  'entretenimiento', 'salud', 'servicios', 'ropa', 'general',
]

export class GastoBuilder {
  private _descripcion: string = ''
  private _monto: number = 0
  private _categoria: Categoria = 'general'
  private _fecha: string = new Date().toISOString().split('T')[0] // hoy por defecto

  setDescripcion(descripcion: string): GastoBuilder {
    const valor = descripcion.trim() //Primeramente eliminamos los posibles espacios vacíos
    if (!valor) throw new Error("La descripción no puede estar vacía.")
    this._descripcion = valor
    return this // permite encadenamiento: builder.setX().setY()
  }

  setMonto(monto: number): GastoBuilder {
    //Valida que el monto sea mayor que 0 y que sea un número
    if (isNaN(monto) || monto <= 0) {
      throw new Error("El monto debe ser un número mayor a 0.")
    } 
    this._monto = Math.round(monto * 100) / 100 // redondea a 2 decimales
    return this
  }

  setCategoria(categoria: string): GastoBuilder {
    const cat = categoria.trim().toLowerCase() as Categoria
    if (!CATEGORIAS_VALIDAS.includes(cat)) {
      throw new Error(`Categoría inválida. Opciones: ${CATEGORIAS_VALIDAS.join(', ')}`)
    }
    this._categoria = cat
    return this
  }

  setFecha(fecha: string): GastoBuilder {
    if (!fecha) throw new Error("La fecha es obligatoria.")
    this._fecha = fecha
    return this
  }

  /** Valida que todos los campos estén completos y retorna el objeto Gasto */
  build(): Gasto {
    if (!this._descripcion) throw new Error("Falta la descripción.")
    if (this._monto <= 0) throw new Error("Falta el monto.")
    return {
      descripcion: this._descripcion,
      monto: this._monto,
      categoria: this._categoria,
      fecha: this._fecha,
    }
  }

  /** Reinicia el builder para reutilizarlo */
  reset(): GastoBuilder {
    this._descripcion = ''
    this._monto = 0
    this._categoria = 'general'
    this._fecha = new Date().toISOString().split('T')[0]
    return this
  }
}
