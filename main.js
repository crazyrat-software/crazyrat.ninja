/*
 * CrazyRat - Minimal JavaScript
 * Only essential functionality for cross-platform compatibility
 */

(function() {
    'use strict';

    // Fix for mobile viewport height (address bar issues)
    function setViewportHeight() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }

    // Set on load and resize
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(setViewportHeight, 100);
    });

})();
