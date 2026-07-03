# Expense Tracker UI — Vue 3 + TypeScript

Frontend web para el [Expense Tracker API](https://github.com/sssexpistols/expense-tracker-api). Permite registrar, visualizar y filtrar gastos personales, y exportar reportes Excel profesionales generados por el analizador de gastos.

Parte del ecosistema de finanzas personales: [Savings Goal Tracker CLI](https://github.com/sssexpistols/savings-goal-tracker) · [Expense Analyzer](https://github.com/sssexpistols/expense-analyzer) · [Expense Tracker API](https://github.com/sssexpistols/expense-tracker-api)

---

## Stack

- **Vue 3** — Composition API con `<script setup>`
- **TypeScript** — tipado estricto en componentes y servicios
- **bootstrap-vue-next** — componentes UI exclusivamente de la documentación oficial
- **Vite** — bundler con proxy hacia la API Flask en puerto 5000

## Patrones de diseño aplicados

- **Builder Pattern** — `GastoBuilder.ts` construye objetos `Gasto` con validación encadenada
- **Service Layer** — `gastoService.ts` centraliza todas las llamadas HTTP
- **Component-based architecture** — separación clara entre `GastoForm`, `GastoList` y `GastoCard`

## Funcionalidades

- Registro de gastos con categoría, monto, descripción y fecha
- Listado con filtros por categoría y mes
- Estadísticas en tiempo real (total gastado, promedio, máximo)
- Exportación de reporte Excel profesional con gráficas (ejecuta `analizar_gastos.py` en el backend)

## Requisitos previos

- Node.js 18+
- [Expense Tracker API](https://github.com/sssexpistols/expense-tracker-api) corriendo en `http://localhost:5000`

## Instalación y uso

```bash
npm install
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## Estructura del proyecto

```
src/
├── builder/
│   └── GastoBuilder.ts       # Builder Pattern para construcción de gastos
├── components/
│   ├── GastoForm.vue          # Formulario de registro
│   ├── GastoList.vue          # Listado con filtros
│   └── GastoCard.vue          # Tarjeta individual de gasto
├── services/
│   └── gastoService.ts        # Capa de comunicación con la API
├── types/
│   └── index.ts               # Interfaces TypeScript
└── App.vue                    # Componente raíz con estadísticas
```

## Autor

Gabriel Valderrama — [github.com/sssexpistols](https://github.com/sssexpistols)
