async function main() {
    // Select the model
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
        runtime: 'mediapipe', // or 'tfjs'
        modelType: 'full'    // or 'lite'
    };

    // Create a detector
    const detector = await handPoseDetection.createDetector(model, detectorConfig);

    // Start video stream
    const video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
    });

    video.onloadedmetadata = () => {
        detectHands(detector, video);
    };
}

async function detectHands(detector, video) {
    const hands = await detector.estimateHands(video);
    
    // Log detected hands
    console.log(hands);

    // Call detectHands again to create a loop
    requestAnimationFrame(() => {
        detectHands(detector, video);
    });
}

main();
