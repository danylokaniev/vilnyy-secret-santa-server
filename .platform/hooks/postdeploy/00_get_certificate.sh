#!/usr/bin/env bash
cat /etc/nginx/nginx.conf && sudo certbot -n -d vilnyyapi-env.eba-pnaebryc.us-east-1.elasticbeanstalk.com --nginx --agree-tos --email dkanevb@gmail.com 
