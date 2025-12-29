/*
 * CrazyRat - Minimal JavaScript
 * Loading animation and mobile viewport fix
 */

(function() {
    'use strict';

    // Loading animation - remove is-loading class after page loads
    window.addEventListener('load', function() {
        // Small delay before starting animation
        setTimeout(function() {
            document.body.classList.remove('is-loading');
        }, 100);
    });

    // Fix for mobile viewport height (address bar issues)
    function setViewportHeight() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(setViewportHeight, 100);
    });

})();
