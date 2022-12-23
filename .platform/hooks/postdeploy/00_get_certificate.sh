#!/usr/bin/env bash
echo "HELLO 0" && sudo ls /etc/nginx/conf.d && echo "HELLO" && sudo ls /etc/nginx/conf.d/  && echo "HELLO I AM THERE" && sudo ls /etc/nginx/conf.d/  && echo "HELLO my file" && sudo cat /etc/nginx/nginx.conf && sudo certbot -n -d vilnyyapi-env.eba-pnaebryc.us-east-1.elasticbeanstalk.com --nginx --agree-tos --email dkanevb@gmail.com 
