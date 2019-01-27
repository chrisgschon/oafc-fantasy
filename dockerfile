FROM ubuntu:xenial-20180417

EXPOSE 80

#set versions here
ENV DJANGO_VERSION=2.0.4
ENV GUNICORN_VERSION=19.7.1
ENV PYODBC_VERSION=4.0.19
ENV DRF_VERSION=3.7.7
ENV DJANGO_PYODBC_VERSION=2.0.4.0
ENV PANDAS_VERSION=0.23.1

#create the environment
RUN apt-get update
RUN apt-get -y install python3-pip
RUN apt-get -y install htop

#add in azure sql dependencies
RUN apt-get update
RUN apt-get -y install apt-transport-https
RUN apt-get -y install curl
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update
RUN ACCEPT_EULA=Y apt-get -y install msodbcsql17
RUN apt-get -y install unixodbc-dev
RUN apt-get -y install nginx

# install requirements
RUN pip3 install --upgrade pip
RUN pip3 install --upgrade setuptools

RUN pip3 install Django==$DJANGO_VERSION
RUN pip3 install gunicorn==$GUNICORN_VERSION
RUN pip3 install djangorestframework==$DRF_VERSION
RUN pip3 install pyodbc==$PYODBC_VERSION
RUN pip3 install django-pyodbc-azure==$DJANGO_PYODBC_VERSION
RUN pip3 install pandas==$PANDAS_VERSION

#make directory for app
RUN mkdir -p /usr/django/app/
RUN mkdir -p /usr/django/logs/

WORKDIR /usr/django/app/

#copy nginx conf in
COPY ./nginx/adapt /etc/nginx/sites-available/adapt
RUN ln -s /etc/nginx/sites-available/adapt /etc/nginx/sites-enabled/adapt
RUN rm /etc/nginx/sites-enabled/default

#copy everything in app-wise
COPY . /usr/django/app

CMD bash docker_run.sh
#CMD printenv