let isPlaying = false;
let widget; 
let widgetReady = false;

// Initialize SoundCloud widget when iframe loads
window.addEventListener('load', function() {
    // Get the iframe element
    const iframeElement = document.querySelector('iframe');

    if (!iframeElement) {
        console.error('SoundCloud iframe not found!');
        return;
    }

    // Initialize SoundCloud widget
    widget = SC.Widget(iframeElement);

    // Set up event listeners for widget state
    widget.bind(SC.Widget.Events.READY, function() {
        console.log('SoundCloud widget is ready');
        widgetReady = true;

        // Get track title when widget is ready
        widget.getCurrentSound(function(sound) {
            console.log('Now playing:', sound.title);
        });
    });

    // Listen for play/pause events
    widget.bind(SC.Widget.Events.PLAY, function() {
        isPlaying = true;
        console.log('Widget is playing');
    });

    widget.bind(SC.Widget.Events.PAUSE, function() {
        isPlaying = false;
        console.log('Widget is paused');
    });

    // Error handling
    widget.bind(SC.Widget.Events.ERROR, function() {
        console.error('SoundCloud widget error occurred');
    });
});

// Control playback with better error handling
document.getElementById("play").addEventListener("click", function() {
    console.log('Play button clicked');

    if (!widget) {
        console.error('Widget not initialized');
        return;
    }

    if (!widgetReady) {
        console.log('Widget not ready yet, waiting...');
        // Try again after a short delay
        setTimeout(function() {
            if (widgetReady) {
                togglePlayback();
            } else {
                console.error('Widget still not ready');
            }
        }, 1000);
        return;
    }

    togglePlayback();
});

function togglePlayback() {
    console.log('Toggling playback, current state:', isPlaying ? 'playing' : 'paused');

    if (isPlaying) {
        console.log('Attempting to pause...');
        widget.pause().then(function() {
            console.log('Pause command sent successfully');
        }).catch(function(error) {
            console.error('Error pausing:', error);
        });
    } else {
        console.log('Attempting to play...');
        widget.play().then(function() {
            console.log('Play command sent successfully');
        }).catch(function(error) {
            console.error('Error playing:', error);
        });
    }

    isPlaying = !isPlaying;
}

