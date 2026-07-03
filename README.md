# Expense Tracker UI

Frontend web para el [Expense Tracker API](https://github.com/sssexpistols/expense-tracker-api). Permite registrar, visualizar y filtrar gastos personales, y exportar reportes Excel.

Parte del ecosistema de finanzas personales: [Savings Goal Tracker CLI](https://github.com/sssexpistols/savings-goal-tracker) · [Expense Analyzer](https://github.com/sssexpistols/expense-analyzer) · [Expense Tracker API](https://github.com/sssexpistols/expense-tracker-api)

## Funcionalidades

- Registro de gastos
- Listado con filtros por categoría, mes y año
- Muestra los datos
- Exportación de reporte Excel

## Funcionalidades pendientes
- Modificar el valor de gastos (nombre, monto) esto fue un error por mi parte al momento de hacer la estructura del proyecto y tratar de sintetizar lo máximo posible en el menor tiempo, es algo que sucedió por no manejar correctamente mi tiempo vs la entrega de algo mínimamente funcional en ese sentido.
- Tener una mejor visualización de datos ya que en la forma de lista que se muestran los gastos fue mi solución rápida para resolverlo pero no es la forma más óptima o amigable a la vista ya que se rompe el orden visual por hacer demasiado scroll.
- Convertir la web a una SAP o web dinámica ya que necesita dar refresh cuando se elimina un gasto para que este se vea reflejado y de igual manera cuando se aplica un filtro da ese refresh.
- Crear también el sistema de ahorro para que también se mida el presupuesto para tener un ecosistema completo entre los 3 proyectos

- Estas funciones quedaron pendientes de aplicar ya que por todo el proyecto me tomé poco más de 4hrs de desarrollo hasta obtener las primeras interacciones reales con todo el sistema unido, durante la serie de pasos a seguir y la ruta que tomaría para llevarlo cometí un error al subestimar el tiempo que me tomaría, error que no volverá a suceder pues ahora soy más consciente de lo que es trabajar bajo esa presión de tiempo y demanda, comprometiéndome a generar rutas que primero nos permitan obtener lo mínimo presentable y después trabajar sobre de ello con orden de importancia en las tareas delegadas.
  
## Funcionalidades que me gustaría añadir a futuro
- Poder cargar archivos csv y excel personales y poder trabajar sobre las columnas a trabajar aprovechando que ya se está implementando el frontend y así no solo funcione con los archivos/datos que se crean desde la app.

## Instalación y uso

```bash
npm install
npm run dev
```
- Una vez instalada se tendrá que tener levantado también app.py de la API para que Vue escuche el puerto 5000 y se comuniquen entre sí

## Notas
 El desarrollo del proyecto lo decidí hacer con Vue porque fue uno de los frameworks que se comentaron durante la reunión, primeramente traté de responder preguntas básicas como ¿qué problemas me resolvería?, ¿qué limitantes tendría?, ¿cuáles serían los primeros problemas a solucionar?, ¿Qué serie de pasos me llevarán a ese resultado en el menor tiempo?, etc.  Los estilos están usados con Bootstrap, me dediqué el día de ayer a hacer la investigación de las tecnologías con las que trabajaría así como sobre cual arquitectura estaría sustentado el proyecto, en este caso consulté diversas fuentes de información y para la arquitectura terminé optando por Builder ya que al tener en mente funcionalidades por añadir o para editar, agregar, etc. Me pareció lo más sensato por su gran capacidad de elaborar sistemas.

 Me apoyé del autocompletado que ofrece VSCode ya que al detectar que estaba trabajando con Vue y Bootstrap me ayudó demasiado en la generación de los bloques de código en los archivos Vue pues me ponía estilos por defecto, claro está que después de implementar cada bloque de código volvía a confirmar el uso de cada propiedad aplicada para entender el por qué de las cosas y que funcionamiento estaban cumpliendo (esto lo comento para volver totalmente transparente y sincera esta evaluación). Aunado a esto también estuve realizando modificaciones un ejemplo de esto es en la propiedad de month al filtro de gastos pues me pareció lo más sensato, ya que al poner por día habría que recordad el día exacto en el que se hizo el gasto lo cual lo volvería más ineficiente, también el como desplegar la app y la estructura de una app en Vue me fue de utilidad para darle guía a este proyecto, también con esto solo quiero denotar mi capacidad en el uso de herramientas tecnológicas actuales y hacer un doble check por mí mismo para asegurarme que sea una solución óptima.

 Durante este proceso para mí la pieza fundamental era conectar el frontend con el backend por lo que primeramente obtuvé información en internet sobre usar flask-cors, pero al tener que instalar más dependencias al proyecto y que no me consideraba con el tiempo suficiente para realizar la configuración del mismo, terminé en un foro de reddit donde se comentaba que dentro de Vite se podían configurar los proxys para que así se redirigiera a la llamada de mi puerto 5000 que usa la API, con eso en mente al buscar en internet como redirigir el proxy para que escuche el puerto 5000 me arrojó este bloque de código como primer resultado:
 
 - <img width="676" height="613" alt="image" src="https://github.com/user-attachments/assets/96419d08-dc9b-40e0-abb6-92a617ba6402" />

 Realmente utilicé ese bloque de código y al ver que funcionó, fue el que se quedó ya en `vite.config.ts`.

 Otro dato a comentar que me parece de relevancia es el hecho de como está estructurado (ya que por la mala administración de tiempo que comenté anteriormente de la cual me hago total responsable para que no vuelva a ocurrir), la hice lo más correcta posible basado en las necesidades del proyecto, es por eso que no añadí una carpeta views ya que manejo una sola vista como tal, de igual forma estoy abierto a cualquier comentario para este tipo de situaciones. También lo comento porque hice un gran esfuerzo en separar los componentes aunque ahora ya con mas tiempo y buscando información me doy cuentas de distintas áreas de oportunidad como separar botones, formatos de encabezado, etc.

 Sin más que agregar, solo externar mi profundo agradecimiento por el tiempo tomado a lo largo de este proceso de selección y ahora para la evaluación de este proyecto, esperando que sea satisfactorio y sea entendible el como abordé este reto; quedo abierto a cualquier tipo de comentario o crítica constructiva de este desarrollo que pudieras aportar. Un abrazo.
# CAPTURAS DEL PROYECTO
 <img width="1919" height="909" alt="image" src="https://github.com/user-attachments/assets/8353a09d-d946-4d7e-b730-67832534c374" />
 <img width="1919" height="855" alt="image" src="https://github.com/user-attachments/assets/a52f4e20-6592-491a-a5aa-bfa1b16f25d3" />
 <img width="1919" height="798" alt="image" src="https://github.com/user-attachments/assets/72f9d095-edb0-4c65-ab81-cda4cc6b3014" />
 <img width="1344" height="790" alt="image" src="https://github.com/user-attachments/assets/ff32eff3-ec30-49cb-9097-4083a469f217" />

 
 ### REFERENCIAS BIBLIOGRÁFICAS CONSULTADAS
 - https://www.reddit.com/r/vuejs/comments/1jmjl1q/best_simple_setup_for_flask_and_vue/
 - https://refactoring.guru/es/design-patterns/builder/
 - https://refactoring.guru/es/design-patterns/builder/typescript/example#lang-features
 - https://www.luisllamas.es/estructura-app-vue/
