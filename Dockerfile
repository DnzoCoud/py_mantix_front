# Usa la imagen oficial de Node.js como base para la fase de construcción
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias primero para aprovechar el caché de Docker
COPY package*.json ./

# Instala las dependencias usando `npm ci` para una instalación más rápida y confiable
RUN npm ci

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación Next.js
RUN npm run build

# Usa una imagen más ligera de Node.js para la fase de producción
FROM node:18-alpine AS runner

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios desde la fase de construcción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

# Instala solo las dependencias de producción para minimizar el tamaño
RUN npm ci --only=production

# Elimina archivos innecesarios para reducir el tamaño de la imagen
RUN rm -rf /app/src

# Expon el puerto 3000 donde Next.js escuchará
EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
