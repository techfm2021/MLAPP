import matplotlib.pyplot as plt
import cv2


def extract_defects(template_path, test_path, get_plot=False):
    # read image
    template = cv2.imread(template_path)
    inspection_image = cv2.imread(test_path)

    # find defects
    defect_1 = cv2.subtract(inspection_image, template)
    defect_2 = cv2.subtract(template, inspection_image)
    defects = defect_1 + defect_2

    # create binary mask
    img = inspection_image.copy()
    Conv_hsv_Gray = cv2.cvtColor(defects, cv2.COLOR_BGR2GRAY)
    ret, mask = cv2.threshold(Conv_hsv_Gray, 0, 255,
                              cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)
    img[mask != 255] = [0, 0, 255]

    # remove extra edges
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    morph_open = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=1)
    morph_close = cv2.morphologyEx(
        morph_open, cv2.MORPH_CLOSE, kernel, iterations=1)

    # Find contours
    img_bbox = img.copy()
    boundaries = []
    contours, hierarchy = cv2.findContours(morph_close,
                                           cv2.RETR_CCOMP,
                                           cv2.CHAIN_APPROX_SIMPLE)

    # create boundaries on defects
    offset = 20
    for idx, (s, hierarchy_order) in enumerate(zip(contours, hierarchy[0])):

        # get bounding box
        x, y, w, h = cv2.boundingRect(s)
        top_left = (x - offset, y - offset)
        bottom_right = (x + w + offset, y + h + offset)
        # print(top_left, bottom_right,hierarchy_order)

        # skip outer most boundary
        if hierarchy_order[2] != -1:
            # print("skipping:",top_left,bottom_right)
            continue

        boundaries.append((top_left, bottom_right))

        if get_plot:
            try:
                cv2.rectangle(img_bbox, top_left,
                              bottom_right, (36, 255, 12), 2)
            except Exception as e:
                print("Error:\n", e)

    if get_plot:
        return boundaries, img_bbox
    return boundaries, None


if __name__ == "__main__":
    image_path = "/content/DeepPCB/PCBData/group00041/00041/00041001_test.jpg"
    template_path = "/content/DeepPCB/PCBData/group00041/00041/00041001_temp.jpg"

    boundaries, img_bbox = extract_defects(
        image_path, template_path, get_plot=True)
    print("Total defects:", len(boundaries))
    plt.imshow(img_bbox)
