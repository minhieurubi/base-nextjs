import { userApi } from '@/services/api';

const DEFAULT_FOLDER = 'nextjs_uploads';

export const uploadImageToCloudinary = async (fileData: File) => {
  const { signature, api_key, timestamp, folder } = await userApi.getSignature({
    folder: DEFAULT_FOLDER,
  });

  const formData = new FormData();
  formData.append('file', fileData);
  formData.append('api_key', api_key);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('folder', folder);

  const cloudRes = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await cloudRes.json();
  return data.secure_url;
};
