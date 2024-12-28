Iniciando Proyecto

Crear el entorno virtual
python -m venv env

Activar el entorno virtual - Funciona en CMD
env\Scripts\activate

Nota: Revisar la ruta del ENV

Dentro del entorno instalar Django
pip install django

Crear nuevo proyecto para el settings
django-admin startproject Settings .

Crear nuevo proyecto en Django
django-admin startapp codeworks

Realiza las primeras migraciones
python manage.py migrate

Iniciar entorno de desarrollo
python manage.py runserver

Configurar Git
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
