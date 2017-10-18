$ExtensionName = "fiddlerfox"
$BuildDirectory = Join-Path $PSScriptRoot "build"
$BuildPath = Join-Path $BuildDirectory $($ExtensionName + ".zip")
$ExtDirectory = Resolve-Path "src"

Write-Host "Building $ExtensionName"

function Create-ZipArchive {
    param (
    [string]$ZipName,
    [string]$SourceDirectory 

    )
    Add-Type -Assembly System.IO.Compression.FileSystem

    $Compress = [System.IO.Compression.CompressionLevel]::Optimal
    [System.IO.Compression.ZipFile]::CreateFromDirectory($SourceDirectory, $ZipName, $Compress, $false)
}

New-Item -ItemType Directory -Path $BuildDirectory -Force -ErrorAction SilentlyContinue | Out-Null
Remove-Item -Path $BuildPath -Force -ErrorAction SilentlyContinue
Create-ZipArchive -ZipName $BuildPath -SourceDirectory $ExtDirectory

Write-Host "ZIP file available at $BuildPath" -ForegroundColor Green