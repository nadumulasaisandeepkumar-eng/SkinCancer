import env from '../config/env';
import mockPrediction from '../data/mockPrediction.json';
import mockMetrics from '../data/mockMetrics.json';
import mockConfusionMatrix from '../data/mockConfusionMatrix.json';
import mockTrainingCurves from '../data/mockTrainingCurves.json';

/**
 * Simulates network latency for mock responses during development.
 */
const simulateDelay = (ms = 1800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const CLASS_MAPPING = {
  akiec: { name: 'Actinic Keratosis', severity: 'Moderate' },
  bcc: { name: 'Basal Cell Carcinoma', severity: 'Severe' },
  bkl: { name: 'Benign Keratosis', severity: 'Mild' },
  df: { name: 'Dermatofibroma', severity: 'Mild' },
  mel: { name: 'Melanoma', severity: 'Severe' },
  nv: { name: 'Melanocytic Nevi', severity: 'Mild' },
  vasc: { name: 'Vascular Lesions', severity: 'Mild' },
};

/**
 * Normalizes prediction API response to a consistent shape.
 * Translates Gradio classes to Frontend UI names.
 */
function normalizePredictionResponse(data) {
  // If it's the mock response, just return it directly or normalize it
  if (data.predicted_class === 'Melanoma') {
    return {
      predictedClass: data.predicted_class,
      severity: data.severity,
      confidence: Number(data.confidence ?? 0) * 100,
      description: data.description ?? '',
      recommendation: data.recommendation ?? '',
      probabilities: [],
    };
  }

  // Gradio API usually wraps response in data.data[0] or data[0] depending on client vs raw REST
  const predictionObj = data?.data?.[0] || data?.[0] || data;
  
  const rawClass = predictionObj.predicted_class ?? 'nv';
  const mappedInfo = CLASS_MAPPING[rawClass] || { name: 'Unknown', severity: 'Unknown' };

  // Map raw probabilities object to sorted array with display names
  const rawProbs = predictionObj.probabilities ?? {};
  const probabilities = Object.entries(rawProbs)
    .map(([key, value]) => ({
      key,
      name: CLASS_MAPPING[key]?.name ?? key,
      severity: CLASS_MAPPING[key]?.severity ?? 'Unknown',
      probability: Number(value),
    }))
    .sort((a, b) => b.probability - a.probability); // highest first

  // Generate generic descriptions since the model only outputs the class
  const isSevere = mappedInfo.severity === 'Severe';
  
  return {
    predictedClass: mappedInfo.name,
    severity: mappedInfo.severity,
    confidence: Number(predictionObj.confidence ?? 0) * 100,
    description: `The model identified characteristics predominantly consistent with ${mappedInfo.name}.`,
    recommendation: isSevere 
      ? 'Alert: High-risk pattern detected. Please consult a dermatologist immediately for clinical evaluation and potential biopsy.'
      : 'Low-risk pattern currently detected. Continue to monitor the lesion and consult a physician if any visual changes occur.',
    probabilities,
  };
}

/**
 * Normalizes metrics API response.
 */
function normalizeMetricsResponse(data) {
  return {
    accuracy: Number(data.accuracy ?? 0),
    precision: Number(data.precision ?? 0),
    recall: Number(data.recall ?? 0),
    f1Score: Number(data.f1_score ?? data.f1Score ?? 0),
    validationLoss: Number(data.validation_loss ?? data.validationLoss ?? 0),
    model: data.model ?? '',
    dataset: data.dataset ?? '',
  };
}

// ---------------------------------------------------------------------------
// Public Service Functions
// ---------------------------------------------------------------------------


/**
 * Submits a dermoscopic image and patient age for skin lesion prediction.
 *
 * MOCK MODE: Returns mock data after a simulated delay.
 * REAL MODE: Posts base64 JSON payload to Hugging Face Space API (/api/predict)
 *
 * @param {File} imageFile - The dermoscopic image file
 * @param {number} age - Patient age
 * @returns {Promise<NormalizedPrediction>}
 */
// eslint-disable-next-line no-unused-vars
export async function submitPrediction(imageFile, age) {
  if (env.ENABLE_MOCK_API) {
    await simulateDelay(2000);
    return normalizePredictionResponse(mockPrediction);
  }



  try {
    // Gradio client expects "username/spacename" rather than the full ".hf.space" URL
    // to properly resolve the config and API endpoints. 
    let spaceUrl = env.API_BASE_URL.replace(/\/$/, ""); 
    const hfMatch = spaceUrl.match(/https?:\/\/([^-]+)-([^.]+)\.hf\.space/);
    if (hfMatch) {
      spaceUrl = `${hfMatch[1]}/${hfMatch[2]}`; // Converts 'sanjaykatkuri-skin...' to 'sanjaykatkuri/skin...'
    }

    // Hugging Face client exposed from CDN in index.html
    if (!window.gradioClient) {
      throw new Error("Gradio client not loaded. Check internet connection or ad-blockers.");
    }
    
    // Connect to the hugging face space
    console.log('[PredictionService] Connecting to Gradio space:', spaceUrl);
    const app = await window.gradioClient(spaceUrl);

    // Call the exact predict function expected by the gr.Interface
    const result = await app.predict("/predict", [
      imageFile,
    ]);

    console.log('[PredictionService] Raw API response:', result);
    console.log('[PredictionService] Response data:', result?.data);

    const normalized = normalizePredictionResponse(result);
    console.log('[PredictionService] Normalized result:', normalized);

    return normalized;
  } catch (error) {
    if (error.message?.includes('404')) {
      throw new Error('Connection failed: API space not found or is still starting up. Wait 1 min and try again.');
    }
    throw new Error('API connection failed: ' + error.message);
  }
}

/**
 * Fetches model performance metrics.
 * 
 * Always uses static data since the Hugging Face Space only provides prediction endpoints.
 *
 * @returns {Promise<NormalizedMetrics>}
 */
export async function fetchMetrics() {
  await simulateDelay(600); // Small artificial delay for UI smoothness
  return normalizeMetricsResponse(mockMetrics);
}

/**
 * Fetches confusion matrix data.
 *
 * @returns {Promise<ConfusionMatrixData>}
 */
export async function fetchConfusionMatrix() {
  await simulateDelay(400);
  return mockConfusionMatrix;
}

/**
 * Fetches training and validation curve data.
 *
 * @returns {Promise<TrainingCurveData>}
 */
export async function fetchTrainingCurves() {
  await simulateDelay(400);
  return mockTrainingCurves;
}
