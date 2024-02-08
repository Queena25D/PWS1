document.addEventListener('DOMContentLoaded', function () {
    const convertText = document.getElementById('convert_text');
    const clickToConvertButton = document.getElementById('click_to_convert');
    const bubblesContainer = document.getElementById('bubbles');

    let speechRecognition;
    let speechRecognitionActive = false;

    function startSpeechRecognition() {
        if (!speechRecognitionActive) {
            speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            speechRecognition.interimResults = true;
            speechRecognition.lang = 'en-US';

            speechRecognition.addEventListener('result', (e) => {
                const transcript = Array.from(e.results)
                    .map(result => result[0])
                    .map(result => result.transcript);

                convertText.innerHTML = transcript;
                createBubble(transcript.join(' '));
            });

            speechRecognition.addEventListener('end', () => {
                speechRecognitionActive = false;
                clickToConvertButton.innerText = 'Press to Convert';
            });

            speechRecognition.start();
            speechRecognitionActive = true;
            clickToConvertButton.innerText = 'Listening...';
        } else {
            speechRecognition.stop();
            speechRecognitionActive = false;
            clickToConvertButton.innerText = 'Press to Convert';
        }
    }

    clickToConvertButton.addEventListener('click', startSpeechRecognition);
});
