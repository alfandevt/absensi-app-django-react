# absensi-app-django-react
aplikasi absen dengan django dan react

# Requirement
- python 3.9
- node 16

# Python VENV
Di root folder project
```console
cd backend
```
=>
```console
python -m venv venv
```
=> Untuk mac / linux
```console
source venv/bin/activate
```
=> Untuk windows
```console
venv/Scripts/activate
```
=> setelah masuk virtual env
```console
pip install -r ../requirements.txt
```

=>setelah semua dependency django terinstall
=>lakukan make migrations dan migrate
```console
python manage.py makemigrations
```
```console
python manage.py migrate
```
=>setelah proses migrate selesai
=>bikin superuser untuk manage admin dan db
```console
python manage.py createsuperuser
```
<= isi email, nama lengkap, password

jalankan app dengan
```console
python manage.py runserver
```
app berjalan di localhost:8000
sebelumnya buka panel django admin terlebih dahulu
di localhost:8000/admin
untuk memastikan database tidak kosong

# React
buka folder frontend melalui cmd dari root folder
```console
cd frontend
```
lalu jalankan perintah
```console
npm install
```

untuk build react jalankan
```console
npm run build
```

setelah itu copy isi folder build ke backend/frontend/build
dan jalankan perintah
```console
python manage.py runserver
```
untuk menjalankan kembali app django