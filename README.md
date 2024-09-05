# Proyecto: Aplicación de Búsqueda de Usuarios de GitHub

Esta es una aplicación de React para buscar usuarios de GitHub y visualizar sus perfiles utilizando la API pública de GitHub. La aplicación permite buscar usuarios, ver detalles de los perfiles y muestra un gráfico de barras con el número de seguidores de los usuarios encontrados.

## Instalación y Ejecución

1. **Clonar el Repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
Instalar Dependencias

Asegúrate de tener npm instalado. Luego, instala las dependencias:

bash
Copy code
npm install
Correr el Proyecto

Para iniciar la aplicación en modo de desarrollo:

bash
Copy code
npm run dev
Esto iniciará la aplicación en http://localhost:3000 en tu navegador por defecto.

Pruebas
Para ejecutar las pruebas unitarias:

bash
Copy code
npm run test
Para verificar la cobertura de código:

bash
Copy code
npm test -- --coverage
Decisiones de Diseño y Técnicas
Domain-Driven Design (DDD): Se aplicó DDD para estructurar la aplicación, lo que permite una mejor organización del código y facilita la escalabilidad. Cada funcionalidad del dominio (como la búsqueda de usuarios) está bien encapsulada y separada en módulos específicos, lo que mejora la mantenibilidad del proyecto.

React Router: Se utiliza React Router para la gestión de rutas, permitiendo una navegación fluida entre las diferentes páginas de la aplicación, como la página de inicio y los perfiles de usuario.

React Query: Para el manejo de datos asíncronos y la gestión de caché, se utilizó React Query. Esta biblioteca optimiza las solicitudes de datos a la API de GitHub, mejorando la eficiencia y proporcionando una experiencia de usuario más fluida.

Chart.js con react-chartjs-2: Se empleó Chart.js junto con react-chartjs-2 para la visualización de datos en gráficos. Esta combinación ofrece una integración fácil y configuraciones altamente personalizables para representar datos visuales, como el número de seguidores de los usuarios.

SCSS para Estilos: Para el manejo de estilos, se optó por SCSS debido a sus capacidades avanzadas como el uso de variables, anidamiento y mixins. Esto permite una gestión de estilos más modular y organizada, facilitando el mantenimiento y la escalabilidad del código CSS.

React Testing Library y Jest: Estas herramientas se seleccionaron para las pruebas unitarias debido a su enfoque en pruebas basadas en el comportamiento del usuario. Esto asegura que la interfaz de usuario funcione según lo esperado y ayuda a mantener una alta calidad en el desarrollo del software.