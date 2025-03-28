# OpenFoodFacts - Buscador de Alimentos

Una aplicación web moderna para buscar y filtrar productos alimenticios utilizando la API de OpenFoodFacts. La aplicación permite a los usuarios explorar productos, ver sus características nutricionales y ambientales, y guardar sus favoritos.

## 🌟 Características

- 🔍 Búsqueda de productos alimenticios
- 🎨 Interfaz moderna y responsiva
- 🌓 Modo oscuro/claro
- ⭐ Sistema de favoritos
- 🏷️ Filtros avanzados:
  - Clasificación NOVA (Clasifica según el grado de procesamiento)
  - Nutri-Score (Sistema de etiquetado nutricional)
  - Eco-Score (Impacto ambiental del producto)
- 📱 Diseño adaptativo para móviles y tablets
- 🌐 Integración con OpenFoodFacts API

## 🛠️ Tecnologías Utilizadas

- React.js
- CSS Variables para temas
- OpenFoodFacts API
- CSS Grid y Flexbox para layouts responsivos

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/armanghazi/Buscador-deAlimentos.git
```

2. Instala las dependencias:
```bash
cd openfood
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador y visita:
```
http://localhost:5173
```

## 🎯 Funcionalidades Principales

### Búsqueda y Filtrado
- Visualización inicial de todos los productos disponibles
- Filtrado por clasificación NOVA (1-4)
- Filtrado por Nutri-Score (A-E)
- Filtrado por Eco-Score (A-E)
- Botón de filtrado manual para aplicar los filtros seleccionados

### Interfaz de Usuario
- Diseño limpio y moderno
- Modo oscuro/claro con transiciones suaves
- Diseño responsivo que se adapta a diferentes tamaños de pantalla
- Animaciones y transiciones para mejor experiencia de usuario

### Gestión de Favoritos
- Guardado de productos favoritos
- Vista separada para productos favoritos
- Persistencia de favoritos en el navegador

## 🔧 Estructura del Proyecto

```
openfood/
├── src/
│   ├── components/
│   │   ├── Filters/
│   │   ├── FoodCard/
│   │   └── Footer/
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   └── App.styles.css
├── public/
├── package.json
└── README.md
```

## 🌐 API y Datos

La aplicación utiliza la API de OpenFoodFacts para obtener información sobre productos alimenticios, incluyendo:
- Nombre del producto
- Imágenes
- Clasificación NOVA
- Nutri-Score
- Eco-Score
- Información nutricional

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- Arman Ghaziaskari Naeini - [@armanghazi](https://github.com/armanghazi)

## 🙏 Agradecimientos

- OpenFoodFacts por proporcionar la API y los datos
- La comunidad de React por las herramientas y recursos
