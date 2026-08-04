#!/bin/sh

set -e

cat <<EOF > /usr/share/nginx/html/runtime-config.js
window.RUNTIME_CONFIG = {
  BACKEND_URL_RECOG:   "${BACKEND_URL_RECOG}",
  BACKEND_URL_DICT:    "${BACKEND_URL_DICT}",
  BACKEND_URL_DUBBING: "${BACKEND_URL_DUBBING}"
};
EOF

exec nginx -g "daemon off;"
