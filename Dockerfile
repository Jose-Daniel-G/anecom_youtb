# Usa una imagen oficial de Node compatible
FROM node:16-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

# Compila la app Angular
RUN npm run build

# Expone el puerto 4200
EXPOSE 4200

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "start"]
