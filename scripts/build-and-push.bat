@echo off
REM Build and Push Docker Image Script (Windows)
REM Usage: scripts\build-and-push.bat [version]

setlocal

set IMAGE_NAME=gokite-nextjs
set REGISTRY=
set VERSION=%1
if "%VERSION%"=="" set VERSION=latest

echo Starting Docker build process...

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo Error: Docker is not running
    exit /b 1
)

REM Build the image
echo Building Docker image: %IMAGE_NAME%:%VERSION%
docker build -t %IMAGE_NAME%:%VERSION% .

if errorlevel 0 (
    echo Successfully built %IMAGE_NAME%:%VERSION%
) else (
    echo Failed to build Docker image
    exit /b 1
)

REM Tag image with version and latest
if not "%VERSION%"=="latest" (
    echo Tagging image as latest
    docker tag %IMAGE_NAME%:%VERSION% %IMAGE_NAME%:latest
)

REM Push to registry if REGISTRY is set
if not "%REGISTRY%"=="" (
    echo Tagging image for registry
    docker tag %IMAGE_NAME%:%VERSION% %REGISTRY%/%IMAGE_NAME%:%VERSION%
    
    if not "%VERSION%"=="latest" (
        docker tag %IMAGE_NAME%:%VERSION% %REGISTRY%/%IMAGE_NAME%:latest
    )
    
    echo Pushing to registry: %REGISTRY%
    docker push %REGISTRY%/%IMAGE_NAME%:%VERSION%
    
    if not "%VERSION%"=="latest" (
        docker push %REGISTRY%/%IMAGE_NAME%:latest
    )
    
    echo Successfully pushed to registry
) else (
    echo No registry configured. Skipping push.
    echo To push to a registry, set the REGISTRY variable in this script.
)

echo Build process completed!
echo Image: %IMAGE_NAME%:%VERSION%

REM Show image size
echo.
echo Image size:
docker images %IMAGE_NAME%:%VERSION%

endlocal

