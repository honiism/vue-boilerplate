import AOS from 'aos'

export function getPos(id) {
    const rect = document.getElementById(id).getBoundingClientRect()

    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
    }
}

export function random(min, max) {
    if (min == 0 && max == 0) {
        return 0;
    }
    
    if (max == null) {
        max = min
        min = 0
    }

    if (min > max) {
        const tmp = min
        min = max
        max = tmp
    }

    return min + (max - min) * Math.random();
}

export function getRatio(id) {
    return {
        w: document.getElementById(id).offsetWidth,
        h: document.getElementById(id).offsetHeight
    }
}

export function setAttribute(elementId, attrName, value) {
    if (attrName == 'src') {
        document.getElementById(elementId).src = value
        return
    }

    if (attrName == 'backgroundPosition') {
        document.getElementById(elementId).style.backgroundPosition = value
        return
    }

    document.getElementById(elementId).setAttribute(attrName, value)
}

export function setImgSrcOnHover(elementId, hoverImgId, defaultImgId) {
    const element = document.getElementById(elementId)
    
    element.addEventListener('mouseover', () => {
        setAttribute(elementId, 'src', hoverImgId)
    })
    
    element.addEventListener('mouseout', () => {
        setAttribute(elementId, 'src', defaultImgId)
    })
}

export function setImgBgPosOnHover(elementId, bgPosHover, bgPosDefault) {
    const element = document.getElementById(elementId)

    element.addEventListener('mouseover', () => {
        setAttribute(elementId, backgroundPosition, bgPosHover)
    })

    element.addEventListener('mouseout', () => {
        setAttribute(elementId, backgroundPosition, bgPosDefault)
    })
}

// hover event is on the wrapper instead of the element that would change its background position
export function setImgBgPosOnWrapperHover(wrapperId, elementId, bgPosHover, bgPosDef) {
    const wrapper = document.getElementById(wrapperId)

    wrapper.addEventListener('mouseover', (event) => {
        event.stopPropagation()
        setAttribute(elementId, backgroundPosition, bgPosHover)  
    })
    
    wrapper.addEventListener('mouseout', (event) => {
        event.stopPropagation()
        setAttribute(elementId, backgroundPosition, bgPosDef)
    })
}

export function AOSRefresh() {
    document.querySelectorAll('img')
        .forEach((img) => {
            img.addEventListener('load', () => {
                AOS.refresh()
            })
        })
}

let refresh_rate = 300
let last_user_action = 0
let has_focus = false
let lost_focus_count = 0
let focus_margin = 10

function reset() {
    last_user_action = 0
}

function windowHasFocus() {
    has_focus = true
}

function windowLostFocus() {
    has_focus = false
    lost_focus_count++
}

setInterval(() => {
    last_user_action++
    refreshCheck()
}, 1000)

function refreshCheck() {
    let focus = window.onfocus

    if ((last_user_action >= refresh_rate 
            && !has_focus && document.readyState == "complete") 
            || lost_focus_count > focus_margin) {
        window.location.reload()
        reset()
    }
}

export function addAutoRefresh() {
    window.addEventListener("focus", windowHasFocus(), false)
    window.addEventListener("blur", windowLostFocus(), false)
    window.addEventListener("click", reset(), false)
    window.addEventListener("mousemove", reset(), false)
    window.addEventListener("keypress", reset(), false)
    window.addEventListener("scroll", reset(), false)
    document.addEventListener("touchMove", reset(), false)
    document.addEventListener("touchEnd", reset(), false)
}