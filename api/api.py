from flask import Flask, jsonify
from flask import request, send_file
from flask_cors import CORS
from bs4 import BeautifulSoup
import helpers
import os
import requests
import shutil


app = Flask(__name__, static_folder="../build", static_url_path="/")
CORS(app)

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/api/download")
def download_zip():
    folder = request.json['folder']
    path = helpers.uniquify(folder)
    send_file(path + "/images.zip", as_attachment=True)


@app.route('/api/scrape', methods=['POST'], strict_slashes=False)
def image_scraper():
    folder = request.json['folder']
    image_names = request.json['imageNames']
    url = request.json['url']
    path = helpers.uniquify(folder)

    try:
        os.mkdir(path)
        os.chdir(path)
    except:
        pass

    rq = requests.get(url)
    soup = BeautifulSoup(rq.text, 'html.parser')

    images = soup.find_all('img')
    non_valid = 0
    image_counter = 0
    images_list = []

    for idx, image in enumerate(images):
        name = image.get('alt', image.get('title'))
        link = image.get('src', image.get('data-src'))

        if not link.startswith('http'):
            link = url + link

        if link is None:
            non_valid += 1
            continue

        if image_names == 'number' or name is None or name == '':
            name = str(idx)

        if image_names == 'alt-title':
            name = helpers.replace_all(name, helpers.chars_to_replace)

        images_list.append(link)

        try:
            with open(name + '.jpg', 'wb') as f:
                im_rq = requests.get(link)
                f.write(im_rq.content)
                image_counter += 1
        except:
            continue

    shutil.make_archive("images", 'zip', path)
    os.chdir('..')

    return jsonify(images=images_list, folder=path, total=image_counter, lala=path+"/images.zip")