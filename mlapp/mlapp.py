from threading import main_thread
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from defect_extraction import extract_defects
import json


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
        print(predictions)
        result = {"test_image_name": test_path,
                  "template_name": template_path,
                  "height": template.shape[0],
                  "width": template.shape[1],
                  "annotations": predictions
                  }
        with open("result.json", "w") as outfile:
            json.dump(result, outfile, indent=4)
        cv2.imshow('result', obj_det_image)
        cv2.waitKey(0)


if __name__ == "__main__":
    mlapp = Predict()
    mlapp.run_prediction(r"PCBData\group00041\00041\00041000_temp.jpg", r"PCBData\group00041\00041\00041000_test.jpg")

'''

{
    "image_name": "0001.jpg",
    "template_name": "0001_t.jpg",
    "height": 275,
    "width": 490,
    
    "annotations": [
        {
            "id": 0,
            "category_id": 2,
            "bbox": [
                45,
                2,
                85,
                85
            ],
            "segmentation": []
 
        },
        {
            "id": 1,
            "category_id":3,
            "bbox": [
                66,
                110,
                86,
                130
            ],
            "segmentation": []
        }
    ]
}

'''
