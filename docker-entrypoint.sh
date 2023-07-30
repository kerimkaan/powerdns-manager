printf -- "---------------- Show files	-----------------\n"
ls -la
ln -sf /usr/share/zoneinfo/Europe/Istanbul /etc/localtime
printf -- "---------------- PM2 INSTALLING -----------------\n"
npm i -g pm2
