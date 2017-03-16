#!/usr/bin/python
import cv2
import numpy as np
from matplotlib import pyplot as plt
from PIL import Image
import pytesseract
import sys


def main():

    argument = sys.argv[1]
    print argument
    img = cv2.imread(argument, 0)

    retval, threshold = cv2.threshold(
        img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    im = Image.fromarray(threshold)
    # im.seek(0)
    text = pytesseract.image_to_string(im, lang='eng')
    print text


if __name__ == "__main__":
    main()
