$base = "http://localhost:3000"

Write-Host ""
Write-Host "=== GET /books ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "$base/books" | ConvertTo-Json -Depth 5

Write-Host ""
Write-Host "=== POST /books ===" -ForegroundColor Cyan
$body = '{"title":"Atomic Habits","author":"James Clear"}'
Invoke-RestMethod -Uri "$base/books" -Method POST -ContentType "application/json" -Body $body | ConvertTo-Json -Depth 5

Write-Host ""
Write-Host "=== GET /books?title=gatsby ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "$base/books?title=gatsby" | ConvertTo-Json -Depth 5

Write-Host ""
Write-Host "=== GET /books/1 ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "$base/books/1" | ConvertTo-Json -Depth 5

Write-Host ""
Write-Host "=== PUT /books/1 ===" -ForegroundColor Cyan
$updateBody = '{"title":"The Great Gatsby (Revised)"}'
Invoke-RestMethod -Uri "$base/books/1" -Method PUT -ContentType "application/json" -Body $updateBody | ConvertTo-Json -Depth 5

Write-Host ""
Write-Host "=== DELETE /books/2 ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "$base/books/2" -Method DELETE | ConvertTo-Json -Depth 5

Write-Host ""
Write-Host "=== 404 Test: GET /books/999 ===" -ForegroundColor Cyan
try {
    Invoke-RestMethod -Uri "$base/books/999"
} catch {
    Write-Host "Caught 404: $($_.ErrorDetails.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== 400 Test: POST missing author ===" -ForegroundColor Cyan
try {
    Invoke-RestMethod -Uri "$base/books" -Method POST -ContentType "application/json" -Body '{"title":"No Author"}'
} catch {
    Write-Host "Caught 400: $($_.ErrorDetails.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Final GET /books ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "$base/books" | ConvertTo-Json -Depth 5
