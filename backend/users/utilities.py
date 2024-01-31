from io import BytesIO

import filetype
import fitz
from django.core.files.uploadedfile import InMemoryUploadedFile
from PIL import Image

from taski.settings import MEDIA_ROOT, THUMBNAIL_SIZE


def create_thumbnail(self):
    # расширение загруженного файла
    extension = filetype.guess_extension(self.file)
    # создаём имя thumbnail-файла
    _, thumb_name = self.file.name.replace('.', '_thumb.').split('/')
    if extension != 'png':
        thumb_name = thumb_name.replace(extension, 'png')
    # открываем загруженный файл
    data = fitz.open(MEDIA_ROOT + '/' + self.file.name)
    image = Image.open(
        BytesIO(
            data.get_page_pixmap(0).pil_tobytes(format='png')
        )
    )
    thumbnail_size = THUMBNAIL_SIZE
    image.thumbnail(thumbnail_size)
    thumb_io = BytesIO()
    image.save(thumb_io, 'png')
    self.thumbnail.save(
        thumb_name,
        InMemoryUploadedFile(
            thumb_io, None,
            thumb_name, 'image/png',
            thumb_io.tell, None
        ),
        save=True
    )
    thumb_io.close()
