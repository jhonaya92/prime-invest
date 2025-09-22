param([string]$route="novo", [string]$title="Nova Página")
$dir = "app/$route"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
@"
export default function Page() {
  return (
    <main className="card">
      <h1 className="text-2xl font-bold">$title</h1>
      <p className="text-gray-400 text-sm">Página $route</p>
    </main>
  )
}
"@ | Set-Content "$dir/page.tsx"
Write-Host "Criado: $dir/page.tsx"
