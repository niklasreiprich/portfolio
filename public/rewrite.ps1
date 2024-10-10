$ordnerPfad = "C:\Users\Niklas\Desktop\Portfolio Website\public\Urwald"

$name = "Urwald"

# Hole alle Dateien im Ordner
$dateien = Get-ChildItem -Path $ordnerPfad -File

# Zähler für die Nummerierung
$counter = 1

# Schleife durch alle Dateien im Ordner
foreach ($datei in $dateien) {
    # Dateierweiterung bestimmen
    $dateiExtension = $datei.Extension
    # Neuer Name
    $neuerName = "$name$counter$dateiExtension"
    # Vollständige Pfade für die Umbenennung
    $alterPfad = $datei.FullName
    $neuerPfad = Join-Path -Path $ordnerPfad -ChildPath $neuerName
    # Datei umbenennen
    Rename-Item -Path $alterPfad -NewName $neuerPfad
    # Zähler erhöhen
    $counter++
}

Write-Host "Dateien wurden erfolgreich umbenannt."