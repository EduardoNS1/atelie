// services/imageContentAPI.js
import { SIGHTENGINE_API_SECRET, SIGHTENGINE_API_USER } from "@env";

export const checkImageContent = async (imageUri) => {
  try {
    // Preparar formData para envio
    const formData = new FormData();
    formData.append('media', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formData.append('api_user', SIGHTENGINE_API_USER);
    formData.append('api_secret', SIGHTENGINE_API_SECRET);
    formData.append('models', 'nudity,wad,offensive,gore');

    const response = await fetch('https://api.sightengine.com/1.0/check.json', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    // Análise do resultado
    const isInappropriate = 
      result.nudity.raw > 0.6 || 
      result.nudity.partial > 0.6 || 
      result.nudity.exposed > 0.6 ||
      result.weapon > 0.6 ||
      result.alcohol > 0.6 ||
      result.drugs > 0.6 ||
      result.offensive.prob > 0.6 ||
      result.gore.prob > 0.6;

    if (isInappropriate) {
      let reasons = [];
      if (result.nudity.raw > 0.6 || result.nudity.partial > 0.6 || result.nudity.exposed > 0.6) 
        reasons.push('conteúdo adulto');
      if (result.weapon > 0.6) reasons.push('armas');
      if (result.alcohol > 0.6) reasons.push('álcool');
      if (result.drugs > 0.6) reasons.push('drogas');
      if (result.offensive.prob > 0.6) reasons.push('conteúdo ofensivo');
      if (result.gore.prob > 0.6) reasons.push('violência');

      throw new Error(`Imagem contém conteúdo impróprio (${reasons.join(', ')})`);
    }

    return true;
  } catch (error) {
    throw error;
  }
};