echo Installing dependencies for frontend...
cd panel-front
echo Current directory: %cd%
call npm install
cd ..
echo Current directory after frontend: %cd%

echo Installing dependencies for backend...
cd panel-backend
echo Current directory: %cd%
call npm install
cd ..
echo Current directory after backend: %cd%

echo Done.
pause
