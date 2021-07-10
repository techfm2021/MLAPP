from threading import main_thread
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from defect_extraction import extract_defects
from flask import Flask, jsonify, request
from collections import defaultdict
import os
import json

from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def resize_with_padding(img, target_size):
    old_size = img.shape[:2]  # old_size is in (height, width) format

    ratio = float(target_size) / max(old_size)
    new_size = tuple([int(x * ratio) for x in old_size])

    # new_size should be in (width, height) format

    im = cv2.resize(img, (new_size[1], new_size[0]))

    delta_w = target_size - new_size[1]
    delta_h = target_size - new_size[0]
    top, bottom = delta_h // 2, delta_h - (delta_h // 2)
    left, right = delta_w // 2, delta_w - (delta_w // 2)

    color = [0, 0, 0]
    new_im = cv2.copyMakeBorder(im, top, bottom, left, right, cv2.BORDER_CONSTANT,
                                value=color)
    return new_im


app = Flask(__name__)


class Predict():
    def __init__(self) -> None:
        self.model = load_model("efficientnet_b0_baseline_model.h5")
        pass

    def run_prediction(self, template_path, test_path):
        template = cv2.imread(template_path)
        inspection_image = cv2.imread(test_path)

        boundaries, _ = extract_defects(template_path, test_path)
        IMG_SIZE = 150
        predictions = []
        obj_det_image = inspection_image.copy()
        for i, box in enumerate(boundaries):
            (x1, y1), (x2, y2) = box
            img = inspection_image[y1:y2, x1:x2]
            img = resize_with_padding(img, IMG_SIZE)
            img = img[np.newaxis, ...]
            prediction = self.model.predict(img)
            category = int(np.argmax(prediction))
            annotation_dict = {
                "id": i,
                "category_id": category,
                "bbox": [x1, y1, x2, y2]
            }
            predictions.append(annotation_dict)
            cv2.rectangle(obj_det_image, (x1, y1), (x2, y2), (0, 0, 255), thickness=2)
            cv2.putText(obj_det_image, str(category), (x1, y2), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 150, 0), 2)
            os.remove("..\\mlweb\\src\\output\\output.png")
            cv2.imwrite("..\\mlweb\\src\\output\\output.png", obj_det_image)
        result = {"test_image_name": test_path,
                  "template_name": template_path,
                  "height": template.shape[0],
                  "width": template.shape[1],
                  "annotations": predictions
                  }
        return result


mlapp = Predict()
annotations_dict = defaultdict(lambda: 0)


@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    request_data = request.get_json()
    print(request_data)
    temp_img = r"..\\data\\" + request_data['template']
    test_img = r"..\\data\\" + request_data['test']
    output = mlapp.run_prediction(temp_img, test_img)
    for category in output['annotations']:
        annotations_dict[category['category_id']] += 1
    return jsonify({"output_path": "Output.png",
                    "annotations_count": annotations_dict,
                    "status": "success"})

    return 'JSON Object Example'


if __name__ == "__main__":
    app.run()
