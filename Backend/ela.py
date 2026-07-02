from PIL import Image, ImageChops, ImageEnhance

def convert_to_ela_image(path, quality=90):

    temp_file = "temp.jpg"

    image = Image.open(path).convert("RGB")

    image.save(temp_file, "JPEG", quality=quality)

    compressed = Image.open(temp_file)

    ela_image = ImageChops.difference(image, compressed)

    extrema = ela_image.getextrema()

    max_diff = max([pix[1] for pix in extrema])

    if max_diff == 0:
        max_diff = 1

    scale = 255.0 / max_diff

    ela_image = ImageEnhance.Brightness(
        ela_image
    ).enhance(scale)

    return ela_image