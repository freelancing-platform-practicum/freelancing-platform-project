import base64
import io

import filetype
from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
from drf_extra_fields.fields import Base64FileField, Base64ImageField

from taski.settings import ALLOWED_FILE_EXT, FILE_EXT_ERR

# from rest_framework import serializers


class CustomizedBase64ImageField(Base64ImageField):
    def to_representation(self, value):
        if value:
            extension = self.get_file_extension(value.name, value)
            with open(value.path, 'rb') as image_file:
                return bytes(
                    'data:image/' + extension + ';base64,', 'utf-8'
                ) + base64.b64encode(image_file.read())
        return None


class CustomizedBase64FileField(Base64FileField):
    def get_file_extension(self, filename, decoded_file):
        extension = filetype.guess_extension(decoded_file)
        if extension is None:
            try:
                # Try with PIL as fallback if format not detected
                # with `filetype` module
                from PIL import Image
                image = Image.open(io.BytesIO(decoded_file))
            except (ImportError, OSError):
                raise ValidationError(self.INVALID_FILE_MESSAGE)
            else:
                extension = image.format.lower()
        return "jpg" if extension == "jpeg" else extension

    def to_internal_value(self, data):
        if isinstance(data, str) and (
            data.startswith('data:image')
            or data.startswith('data:application/pdf')
        ):
            format, content = data.split(';base64,')
            ext = format.split('/')[-1]
            if ext not in [ALLOWED_FILE_EXT, 'pdf']:
                raise ValidationError(FILE_EXT_ERR + ', .pdf')
            decoded_file = base64.b64decode(content)
            return ContentFile(
                decoded_file,
                name=self.get_file_name(decoded_file) + '.' + ext
            )
        return super().to_internal_value(data)

    def to_representation(self, value):
        if value:
            extension = self.get_file_extension(value.name, value)
            with open(value.path, 'rb') as file:
                return bytes(
                    'data:image/' + extension + ';base64,', 'utf-8'
                ) + base64.b64encode(file.read())
        return None
