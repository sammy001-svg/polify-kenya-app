
Add-Type -AssemblyName System.Drawing

$images = @(
    "C:\Users\Shanfix\.gemini\antigravity\brain\778ab256-0fdf-44f7-b549-014fe00c65b1\flyer_truth_layer_1771091524566.png",
    "C:\Users\Shanfix\.gemini\antigravity\brain\778ab256-0fdf-44f7-b549-014fe00c65b1\flyer_civic_voice_1771091549466.png"
)

foreach ($imagePath in $images) {
    if (Test-Path $imagePath) {
        $img = [System.Drawing.Image]::FromFile($imagePath)
        $fileName = [System.IO.Path]::GetFileNameWithoutExtension($imagePath)
        $newPath = Join-Path "c:\Political Intelligence\flyers" "$fileName.jpg"
        $img.Save($newPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $img.Dispose()
        Write-Host "Converted: $newPath"
    } else {
        Write-Host "File not found: $imagePath"
    }
}
