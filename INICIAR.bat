@echo off
REM Iniciar servidor local en Puerto 8000
REM Abre automáticamente la aplicación

cd /d "%~dp0"

REM Verificar si Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python no encontrado. Instalalo desde python.org
    pause
    exit /b 1
)

echo.
echo ========================================
echo        VetCalc - Servidor Local
echo ========================================
echo.
echo Iniciando servidor en http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

REM Abrir navegador automáticamente
start http://localhost:8000

REM Iniciar servidor
python -m http.server 8000
