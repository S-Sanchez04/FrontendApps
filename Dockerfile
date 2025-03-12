# Etapa 1: Construcción de la aplicación Angular
FROM node:20 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias primero (mejora la cacheabilidad)
COPY package.json package-lock.json ./

# Instalamos las dependencias de Angular
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación Angular (ajusta el --configuration según tu entorno)
RUN npm run build -- --configuration=production

# Etapa 2: Servidor NGINX para servir la aplicación
FROM nginx:alpine

# Copiamos la build de Angular desde la etapa anterior al directorio donde NGINX servirá los archivos
COPY --from=build /app/dist/* /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Iniciamos NGINX
CMD ["nginx", "-g", "daemon off;"]
