/**
 *
 * Functions for the template modal.vue
 */
function modalOpen(modalId) {
    let backdropId = 'backdrop_' + modalId;
    if (document.getElementById(backdropId) !== null) {
        document.getElementById(backdropId).style.display = "block"
    }
    if (document.getElementById(modalId) !== null) {
        document.getElementById(modalId).style.display = "block"
        document.getElementById(modalId).classList.add("show")
    }
}

function modalClose(modalId) {
    let backdropId = 'backdrop_' + modalId;
    if (document.getElementById(backdropId) !== null) {
        document.getElementById(backdropId).style.display = "none"
    }
    if (document.getElementById(modalId) !== null) {
        document.getElementById(modalId).style.display = "none"
        document.getElementById(modalId).classList.remove("show")
    }

}

export {modalOpen, modalClose}