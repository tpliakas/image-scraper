from flask import Flask, jsonify
from flask import request
from bs4 import BeautifulSoup
# from PIL import Image
# from io import BytesIO
import base64
import helpers
import os
import requests


app = Flask(__name__)


@app.route('/scrape', methods=['POST'], strict_slashes=False)
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
    base = []

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
                content = im_rq.content

                # TODO: fix base64
                if 'base64' in link:
                    content = base64.decodebytes(im_rq.content)

                f.write(content)
                image_counter += 1
        except:
            continue

    os.chdir('..')
    return jsonify(images=images_list, folder=path, total=image_counter, respo=base)
