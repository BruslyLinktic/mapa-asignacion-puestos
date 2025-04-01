# Mapa de Asignación de Puestos

Aplicación web para la generación automática y edición visual de mapas de asignación de puestos en oficinas.

## Características

- **Editor Visual**: Interfaz gráfica para diseñar mapas de puestos.
- **Generación Automática**: Crea layouts de forma automática por bloques.
- **Configuración Flexible**: Ajusta filas, columnas, espaciado y cantidad de puestos por bloque.
- **Posicionamiento Manual**: Arrastra y suelta puestos para ajustes finos.
- **Cuadrícula Ajustable**: Alinea elementos con precisión.
- **Exportación de Datos**: Descarga o copia los datos del mapa para usar en tu aplicación.
- **Visualización**: Vista de usuario final para ver los puestos asignados.

## Guía de Uso

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/BruslyLinktic/mapa-asignacion-puestos.git

# Entrar al directorio
cd mapa-asignacion-puestos

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

### Cómo usar el editor

1. **Generar layout inicial**:
   - Configura los parámetros para cada bloque (posición inicial, filas, columnas, espaciado)
   - Haz clic en "Generar Todos los Layouts" o en "Generar Bloque X" para un bloque específico

2. **Ajustar manualmente**:
   - Arrastra y suelta cada puesto a su posición deseada
   - Usa la cuadrícula para ayudarte a alinear los elementos
   - Puedes ajustar el tamaño de la cuadrícula con el control deslizante

3. **Exportar los datos**:
   - Haz clic en "Exportar Datos" para:
     - Descargar un archivo mapdata.js
     - Ver el código en la consola del navegador para copiar y pegar

4. **Usar los datos en tu aplicación**:
   - Reemplaza tu archivo mapdata.js existente con el nuevo generado
   - O copia y pega el código de la consola

## Estructura del Proyecto

```
mapa-asignacion-puestos/
├── public/                 # Archivos estáticos
├── src/                    # Código fuente
│   ├── components/         # Componentes React
│   │   └── MapDataEditor.jsx # Editor visual del mapa
│   ├── pages/              # Páginas de la aplicación
│   │   ├── HomePage.jsx    # Página principal (visualización)
│   │   └── EditorPage.jsx  # Página del editor
│   ├── mapdata.js          # Datos del mapa
│   ├── App.jsx             # Componente principal con rutas
│   └── index.js            # Punto de entrada
└── package.json            # Dependencias y scripts
```

## Consejos para usar el editor eficientemente

1. **Empieza con un bosquejo aproximado**: Primero configura y genera un layout que se parezca aproximadamente a lo que necesitas.
2. **Ajusta los bloques completos**: A veces es más fácil ajustar los parámetros del bloque completo (posición inicial, espaciado) antes de mover puestos individuales.
3. **Usa la cuadrícula**: La cuadrícula te ayudará a mantener todo alineado y ordenado.
4. **Exporta frecuentemente**: Guarda tu progreso exportando los datos periódicamente.
5. **Ajusta manualmente solo lo necesario**: Intenta que la generación automática haga la mayor parte del trabajo y ajusta manualmente solo los casos especiales.

## Tecnologías utilizadas

- React.js
- React Router
- React Konva (para gráficos en HTML5 Canvas)

## Licencia

MIT
