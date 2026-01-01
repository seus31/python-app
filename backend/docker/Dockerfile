FROM python:3.11-slim-buster

WORKDIR /backend

RUN apt-get update && apt-get -y install gcc libmariadb-dev

COPY ./backend/requirements.txt /backend

RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend /backend

CMD ["python", "main.py"]