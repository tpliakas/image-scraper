from flask import Flask, jsonify
from flask import request
import requests
from bs4 import BeautifulSoup
from pathlib import Path
import os

app = Flask(__name__)


@app.route('/scrape', methods=['POST'], strict_slashes=False)
def image_scraper():
    folder = request.json['folder']
    image_names = request.json['imageNames']
    url = request.json['url']

    try:
        path = os.path.join(str(os.path.join(Path.home(), "Downloads")), folder)
        # TODO: if path exists add index number to folder name
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

        if link is None or not link.startswith('http'):
            print(image)
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
