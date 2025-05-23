watch-web:
    cd web && bun dev
watch-server:
    cd server && bun dev
watch:
    trap 'kill 0' EXIT; just watch-web & just watch-server & wait
