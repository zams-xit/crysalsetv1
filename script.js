document.getElementById('settingsForm').addEventListener('submit', applySettings);

function applySettings(event) {
    event.preventDefault(); // Prevent form submission
    const xlock = document.getElementById('featureCheckbox').checked;
    const aimBooster = document.getElementById('boosterCheckbox').checked;
    const cacheCleaner = document.getElementById('cleanerCheckbox').checked;

    if (!xlock && !aimBooster && !cacheCleaner) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Please select at least one option before applying settings.',
            showConfirmButton: true
        });
        return false; // Prevent form submission
    }

    // Here you would call the Shizuku commands via the GVR interface
    if (xlock) {
        // Example command to change window animation settings
        window.shizuku.execute('settings put global window_animation_scale 0.5');
        window.shizuku.execute('settings put global transition_animation_scale 0');
        window.shizuku.execute('settings put global animator_duration_scale 0');
        console.log("XLOCK: Changed window animation settings to 0.5, 0, 0");
    }

    if (aimBooster) {
        // Example command to enable aim booster settings
        window.shizuku.execute('settings put system aim_booster_enabled 1');
        console.log("AIM BOOSTER: Enabled aim booster settings.");
    }

    if (cacheCleaner) {
        // Command to delete files in the cache directory
        const cachePath = '/sdcard/Android/data/com.dts.freefireth/cache/*'; // Path to the cache directory
        window.shizuku.execute(`rm -rf ${cachePath}`); // Remove files in the cache directory
        console.log("CACHE CLEANER: Cleared cache in " + cachePath);
    }

    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Settings applied successfully!',
        showConfirmButton: true
    });

    return true; // Allow form submission if needed
}
