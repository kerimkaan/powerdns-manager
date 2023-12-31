FROM node:20-bullseye-slim
RUN mkdir -p /opt/powerdns-manager
WORKDIR /opt/powerdns-manager
COPY package*.json ./
# Only production dependencies and clean cache
RUN npm i --omit=dev && npm cache clean --force
COPY . /opt/powerdns-manager
EXPOSE 3000
# Konfigürasyonlar, pm2 kurulumları
RUN chmod +x docker-entrypoint.sh
RUN ./docker-entrypoint.sh
CMD ["pm2-runtime", "/opt/powerdns-manager/pm2-ecosystem.json"]
