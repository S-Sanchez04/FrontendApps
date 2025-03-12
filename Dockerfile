# Etapa 1: Construcción de la aplicación Angular
FROM node:20 AS build

WORKDIR /app

# Copiamos package.json y package-lock.json primero para aprovechar cache
COPY package.json package-lock.json ./

RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación Angular (asegúrate de que el nombre del proyecto en dist sea correcto)
RUN npm run build -- --configuration=production

# Etapa 2: Servidor NGINX para servir la aplicación
FROM nginx:alpine

# Copiamos la build de Angular completa (asegúrate de que el nombre del proyecto en `dist/` sea correcto)
COPY --from=build /app/dist/frontend-security/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
