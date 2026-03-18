FROM python:3.9-slim

WORKDIR /app

COPY . .
COPY requirements.txt /app/

RUN pip install -r requirements.txt

EXPOSE 5000