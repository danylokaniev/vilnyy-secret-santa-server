#!/usr/bin/env bash
sudo ls /etc/nginx/conf.d/  && echo "HELLO I AM THERE" && sudo ls /etc/nginx/conf.d/  && sudo cat /etc/nginx/nginx.conf && sudo certbot -n -d vilnyyapi-env.eba-pnaebryc.us-east-1.elasticbeanstalk.com --nginx --agree-tos --email dkanevb@gmail.com 
