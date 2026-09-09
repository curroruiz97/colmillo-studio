param(
  [Parameter(Mandatory = $true)]
  [string]$CreamSource,

  [Parameter(Mandatory = $true)]
  [string]$BlackSource,

  [string]$OutputDirectory = (Join-Path $PSScriptRoot '..\public\assets\brand')
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing.Common
$drawingProbe = [System.Drawing.Bitmap]::new(1, 1)
$drawingProbe.Dispose()
$drawingReferences = [AppDomain]::CurrentDomain.GetAssemblies() |
  Where-Object { $_.GetName().Name -match '^(System\.Drawing|System\.Private\.Windows)' } |
  Select-Object -ExpandProperty Location

if (-not ('Colmillo.BrandAssetProcessor' -as [type])) {
  Add-Type -ReferencedAssemblies $drawingReferences -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

namespace Colmillo
{
    public static class BrandAssetProcessor
    {
        public static string Extract(
            string sourcePath,
            string outputPath,
            int backgroundRed,
            int backgroundGreen,
            int backgroundBlue,
            int foregroundRed,
            int foregroundGreen,
            int foregroundBlue,
            int padding)
        {
            using (var original = new Bitmap(sourcePath))
            using (var source = new Bitmap(
                original.Width,
                original.Height,
                PixelFormat.Format32bppArgb))
            {
                using (var graphics = Graphics.FromImage(source))
                {
                    graphics.CompositingMode = System.Drawing.Drawing2D.CompositingMode.SourceCopy;
                    graphics.DrawImageUnscaled(original, 0, 0);
                }

                var bounds = new Rectangle(0, 0, source.Width, source.Height);
                var sourceData = source.LockBits(
                    bounds,
                    ImageLockMode.ReadOnly,
                    PixelFormat.Format32bppArgb);
                var sourceBytes = new byte[Math.Abs(sourceData.Stride) * source.Height];
                Marshal.Copy(sourceData.Scan0, sourceBytes, 0, sourceBytes.Length);
                source.UnlockBits(sourceData);

                var alpha = new byte[source.Width * source.Height];
                var minX = source.Width;
                var minY = source.Height;
                var maxX = -1;
                var maxY = -1;
                var deltaRed = foregroundRed - backgroundRed;
                var deltaGreen = foregroundGreen - backgroundGreen;
                var deltaBlue = foregroundBlue - backgroundBlue;
                var denominator =
                    (deltaRed * deltaRed) +
                    (deltaGreen * deltaGreen) +
                    (deltaBlue * deltaBlue);

                if (denominator == 0)
                {
                    throw new ArgumentException("Foreground and background colors must differ.");
                }

                for (var y = 0; y < source.Height; y++)
                {
                    var row = y * sourceData.Stride;
                    for (var x = 0; x < source.Width; x++)
                    {
                        var sourceIndex = row + (x * 4);
                        var blue = sourceBytes[sourceIndex];
                        var green = sourceBytes[sourceIndex + 1];
                        var red = sourceBytes[sourceIndex + 2];
                        var numerator =
                            ((red - backgroundRed) * deltaRed) +
                            ((green - backgroundGreen) * deltaGreen) +
                            ((blue - backgroundBlue) * deltaBlue);
                        var opacity = (int)Math.Round(255d * numerator / denominator);
                        opacity = Math.Max(0, Math.Min(255, opacity));

                        if (opacity <= 2) opacity = 0;
                        if (opacity >= 253) opacity = 255;
                        alpha[(y * source.Width) + x] = (byte)opacity;

                        if (opacity > 2)
                        {
                            minX = Math.Min(minX, x);
                            minY = Math.Min(minY, y);
                            maxX = Math.Max(maxX, x);
                            maxY = Math.Max(maxY, y);
                        }
                    }
                }

                if (maxX < minX || maxY < minY)
                {
                    throw new InvalidDataException("No foreground pixels were detected.");
                }

                var cropWidth = (maxX - minX) + 1;
                var cropHeight = (maxY - minY) + 1;
                using (var output = new Bitmap(
                    cropWidth + (padding * 2),
                    cropHeight + (padding * 2),
                    PixelFormat.Format32bppArgb))
                {
                    var outputBounds = new Rectangle(0, 0, output.Width, output.Height);
                    var outputData = output.LockBits(
                        outputBounds,
                        ImageLockMode.WriteOnly,
                        PixelFormat.Format32bppArgb);
                    var outputBytes = new byte[Math.Abs(outputData.Stride) * output.Height];

                    for (var y = 0; y < cropHeight; y++)
                    {
                        for (var x = 0; x < cropWidth; x++)
                        {
                            var opacity = alpha[((minY + y) * source.Width) + minX + x];
                            var outputIndex =
                                ((y + padding) * outputData.Stride) + ((x + padding) * 4);
                            outputBytes[outputIndex] = (byte)foregroundBlue;
                            outputBytes[outputIndex + 1] = (byte)foregroundGreen;
                            outputBytes[outputIndex + 2] = (byte)foregroundRed;
                            outputBytes[outputIndex + 3] = opacity;
                        }
                    }

                    Marshal.Copy(outputBytes, 0, outputData.Scan0, outputBytes.Length);
                    output.UnlockBits(outputData);

                    Directory.CreateDirectory(Path.GetDirectoryName(outputPath));
                    output.Save(outputPath, ImageFormat.Png);
                    return String.Format(
                        "{0}: {1}x{2}, source bounds {3},{4}-{5},{6}",
                        Path.GetFileName(outputPath),
                        output.Width,
                        output.Height,
                        minX,
                        minY,
                        maxX,
                        maxY);
                }
            }
        }
    }
}
'@
}

$creamOutput = Join-Path $OutputDirectory 'colmillo-wordmark-cream.png'
$blackOutput = Join-Path $OutputDirectory 'colmillo-wordmark-black.png'

# The supplied raster originals are flat artwork over uniform mattes. Recovering
# alpha from those two exact colors preserves the provided contours and avoids
# generative redraws or edge halos.
$creamResult = [Colmillo.BrandAssetProcessor]::Extract(
  $CreamSource,
  $creamOutput,
  225,
  225,
  225,
  250,
  243,
  222,
  12
)
$blackResult = [Colmillo.BrandAssetProcessor]::Extract(
  $BlackSource,
  $blackOutput,
  255,
  255,
  255,
  3,
  3,
  3,
  12
)

Write-Output $creamResult
Write-Output $blackResult
