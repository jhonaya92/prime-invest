param([string]$m="update")
git add -A
$staged = git diff --cached --name-only
if (-not $staged) { Write-Host "Nada para enviar."; exit 0 }
git commit -m $m
git push
