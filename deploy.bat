@echo off
echo ============================================================
echo   BrilliantPrompts - One-Click Deployment
echo ============================================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH.
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo [1/4] Initializing Git repository...
cd /d "D:\21 AI\P\P01"

REM Initialize git if not already
if not exist ".git" (
    git init
    echo Git repository initialized.
) else (
    echo Git repository already exists.
)

echo.
echo [2/4] Adding all files...
git add -A
git commit -m "Initial deployment of BrilliantPrompts"

echo.
echo [3/4] Setting up remote repository...
echo.
echo ============================================================
echo   IMPORTANT: Next Steps
echo ============================================================
echo.
echo 1. Go to https://github.com/new and create a new repository
echo    Name it: brilliantprompts (or any name you prefer)
echo    Make it PRIVATE
echo    Do NOT initialize with README
echo.
echo 2. After creating the repo, copy the repository URL
echo    It looks like: https://github.com/YOUR-USERNAME/brilliantprompts.git
echo.

set /p REPO_URL="Paste your GitHub repository URL here: "

if "%REPO_URL%"=="" (
    echo No URL provided. You can add the remote later with:
    echo   git remote add origin YOUR-REPO-URL
    echo   git push -u origin main
) else (
    git remote add origin %REPO_URL% 2>nul
    if %errorlevel% neq 0 (
        git remote set-url origin %REPO_URL%
    )

    echo.
    echo [4/4] Pushing to GitHub...
    git branch -M main
    git push -u origin main

    if %errorlevel% equ 0 (
        echo.
        echo ============================================================
        echo   SUCCESS! Code pushed to GitHub.
        echo ============================================================
    ) else (
        echo.
        echo Push failed. You may need to authenticate with GitHub.
        echo Try running: git push -u origin main
    )
)

echo.
echo ============================================================
echo   NEXT: Deploy to Netlify
echo ============================================================
echo.
echo 1. Go to https://app.netlify.com
echo 2. Sign up / Log in (use your GitHub account)
echo 3. Click "Add new site" then "Import an existing project"
echo 4. Select GitHub and choose your repository
echo 5. Leave build settings empty (no build command needed)
echo 6. Click "Deploy site"
echo.
echo Your site will be live in about 30 seconds!
echo.
echo After deployment, follow SETUP-GUIDE.md for:
echo   - Lemon Squeezy setup
echo   - Custom domain (rsx.ch) configuration
echo.
pause
