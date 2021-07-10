from tensorflow.keras.applications import EfficientNetB0
IMG_SIZE = 150

inputs = layers.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
x = img_augmentation(inputs)

base_model = EfficientNetB0(include_top=False, weights='imagenet', classes=NUM_CLASSES)(x)
 
# add a global spatial average pooling layer
x = base_model
x = GlobalAveragePooling2D()(x)
# let's add a fully-connected layer
x = Dense(1024, activation='relu')(x)
# and a logistic layer -- let's say we have 200 classes
predictions = Dense(6, activation='softmax')(x)

model = tf.keras.Model(inputs, predictions)
model.compile(
    optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
)

model.summary()

epochs = 40  # @param {type: "slider", min:10, max:100}
hist = model.fit(ds_train, epochs=epochs, validation_data=ds_test)
