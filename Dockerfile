FROM node:20-bullseye
RUN mkdir -p /opt/powerdns-manager
WORKDIR /opt/powerdns-manager
COPY package*.json ./
# Only production dependencies and clean cache
RUN npm i --omit=dev && npm cache clean --force
COPY . /opt/powerdns-manager
EXPOSE 3000
# Konfigürasyonlar, pm2 kurulumları
#RUN chmod +x docker-entrypoint-v20.sh
#RUN ./docker-entrypoint-v20.sh
CMD ["pm2-runtime", "/opt/server/_env/pm2-prod-docker-ecosystem.json"]
