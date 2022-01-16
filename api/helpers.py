import os
from pathlib import Path

chars_to_replace = {
    ' ': '-',
    '/': '',
    '@': '-',
    ':': '',
    '"': '',
    '«': '',
    '»': ''
}


def uniquify(folder):
    path = os.path.join(str(os.path.join(Path.home(), "Downloads")), folder)
    counter = 1
    uniquify_folder = path

    while os.path.exists(uniquify_folder):
        uniquify_folder = path + '-' + str(counter)
        counter += 1

    return uniquify_folder


def replace_all(text, dic):
    for i, j in dic.items():
        text = text.replace(i, j)
    return text
