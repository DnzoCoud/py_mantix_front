# 1. Usar una imagen base de Node.js para la construcción
FROM node:20.16.0 AS build

# 2. Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# 3. Copiar el archivo package.json y package-lock.json (o yarn.lock) al directorio de trabajo
COPY package*.json ./
# Si usas yarn, usa COPY yarn.lock ./

# 4. Instalar dependencias
RUN npm install
# Si usas yarn, usa RUN yarn install

# 5. Copiar el resto de la aplicación al contenedor
COPY . .

# 6. Construir la aplicación para producción
RUN npm run build
# Si usas yarn, usa RUN yarn build

# 8. Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# 9. Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app ./
# Si usas yarn, usa COPY --from=build /app/yarn.lock /app/

# 10. Instalar solo las dependencias de producción
RUN npm install --only=production
# Si usas yarn, usa RUN yarn install --production

# 11. Exponer el puerto en el que Next.js servirá la aplicación
EXPOSE 3000

# 12. Iniciar la aplicación
CMD ["npm", "start"]
# Si usas yarn, usa CMD ["yarn", "start"]
