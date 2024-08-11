# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install flask

# Install LaTeX and pdf2svg
RUN apt-get update && \
    apt-get install -y texlive-latex-base texlive-pictures pdf2svg && \
    apt-get clean

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "api.py"]
