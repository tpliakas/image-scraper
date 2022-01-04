from flask import Flask, jsonify
from flask import request
import requests
from bs4 import BeautifulSoup
from pathlib import Path
import os

app = Flask(__name__)


def uniquify(folder):
    path = os.path.join(str(os.path.join(Path.home(), "Downloads")), folder)
    counter = 1
    uniquify_folder = path

    while os.path.exists(uniquify_folder):
        uniquify_folder = path + '-' + str(counter)
        counter += 1

    return uniquify_folder


@app.route('/scrape', methods=['POST'], strict_slashes=False)
def image_scraper():
    folder = request.json['folder']
    image_names = request.json['imageNames']
    url = request.json['url']

    try:
        path = uniquify(folder)
        os.mkdir(path)
        os.chdir(path)
    except:
        pass

    rq = requests.get(url)
    soup = BeautifulSoup(rq.text, 'html.parser')

    images = soup.find_all('img')
    non_valid = 0
    images_list = []

    for idx, image in enumerate(images):
        name = image.get('alt', image.get('title'))
        link = image.get('src', image.get('data-src'))

        if not link.startswith('http'):
            link = url + link

        if link is None:
            non_valid += 1
            continue

        if name is None or name == '':
            name = str(idx)

        images_list.append(link)

        # TODO: check if alt/title or index number and use it for image name

        with open(str(idx) + '.jpg', 'wb') as f:
            im_rq = requests.get(link)
            f.write(im_rq.content)
            print('Creating image #' + str(idx))

    return jsonify(images=images_list)
