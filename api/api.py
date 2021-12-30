from flask import Flask
import requests
from bs4 import BeautifulSoup
import os


app = Flask(__name__)


@app.route('/scrape')
def image_scraper(url, folder):
    try:
        path = os.path.join(os.getcwd(), folder)
        os.mkdir(path)
        os.chdir(path)
    except:
        pass

    rq = requests.get(url)
    soup = BeautifulSoup(rq.text, 'html.parser')

    images = soup.find_all('img')

    for idx, image in enumerate(images):
        name = image.get('alt', image.get('title'))
        link = image.get('src')

        if link is None or not link.startswith('http'):
            continue
        if name is None or name == '':
            name = str(idx)

        with open(name.replace(' ', '-').replace('/', '').replace('@', '-').replace(':', '').replace('"', '') + '.jpg',
                  'wb') as f:
            im_rq = requests.get(link)
            f.write(im_rq.content)
            print('Creating image #' + str(idx))
