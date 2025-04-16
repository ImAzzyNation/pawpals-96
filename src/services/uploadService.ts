
import { UPLOAD_CONFIG } from '../config/uploadConfig';

export const uploadImage = async (file: File): Promise<string> => {
  try {
    if (!UPLOAD_CONFIG.ALLOWED_FORMATS.includes(file.type)) {
      throw new Error('Invalid file format. Only JPG, PNG, and WebP are allowed.');
    }

    if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
      throw new Error('File size exceeds the 5MB limit.');
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const { filePath } = await response.json();
    return `${UPLOAD_CONFIG.PUBLIC_URL_PREFIX}/${filePath}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
