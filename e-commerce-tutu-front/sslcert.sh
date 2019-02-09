#!/bin/bash

set -e
echo "
###############################
# Generating ya certificates! #
###############################
"

# No package install yet.
# wget https://dl.eff.org/certbot-auto
chmod +x /app/server/sslcert/certbot-auto
mv /app/server/sslcert/certbot-auto /usr/local/bin

# Install the dependencies.
certbot-auto --noninteractive --os-packages-only

# Use a 4096 bit RSA key and set up config file.
mkdir -p /etc/letsencrypt
cat > /etc/letsencrypt/cli.ini <<EOF
# Uncomment to use the staging/testing server - avoids rate limiting.
# server = https://acme-staging.api.letsencrypt.org/directory
 
# Use a 4096 bit RSA key instead of 2048.
rsa-key-size = 4096
 
# Set email and domains.
email = tutuguerra@hotmail.com
domains = tutuguerra.com.br, www.tutuguerra.com.br, api.tutuguerra.com.br

# Standalone authentication
authenticator = standalone
# Text interface.
text = True
# No prompts.
non-interactive = True
# Suppress the Terms of Service agreement interaction.
agree-tos = True

EOF
 
# Obtain cert.
certbot-auto certonly

exec "$@"