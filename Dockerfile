# Usa la imagen oficial de Node.js como base
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación Next.js
RUN npm run build

# Usa una imagen de Node.js más ligera para la producción
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la fase de construcción
COPY --from=builder /app ./

# Instala solo las dependencias de producción
RUN npm install --only=production

# Expone el puerto en el que Next.js escuchará
EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]