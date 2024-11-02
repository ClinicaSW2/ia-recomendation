# Usa una imagen base oficial de Node.js
FROM node:18

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto de la aplicación
EXPOSE 4000

# Comando de inicio
CMD ["npm", "run", "dev"]
