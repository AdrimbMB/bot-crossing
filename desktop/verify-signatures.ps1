$ErrorActionPreference = 'Stop'

$releaseDirectory = Join-Path $PSScriptRoot '..\release'
$packageJson = Get-Content -LiteralPath (Join-Path $PSScriptRoot '..\package.json') -Raw | ConvertFrom-Json
$targets = @(
    Join-Path $releaseDirectory 'win-unpacked\AgentCity.exe'
    Join-Path $releaseDirectory "AgentCity-Setup-$($packageJson.version).exe"
)

foreach ($target in $targets) {
    if (-not (Test-Path -LiteralPath $target -PathType Leaf)) {
        throw "Expected signed artifact was not found: $target"
    }

    $signature = Get-AuthenticodeSignature -LiteralPath $target
    if ($signature.Status -ne 'Valid') {
        throw "Invalid or missing Authenticode signature on $target ($($signature.Status))."
    }
    if (-not $signature.SignerCertificate.Subject) {
        throw "The signature on $target has no verified publisher identity."
    }
    if (-not $signature.TimeStamperCertificate) {
        throw "The signature on $target has no trusted timestamp."
    }

    Write-Host "Valid signature: $target"
    Write-Host "Publisher: $($signature.SignerCertificate.Subject)"
}
