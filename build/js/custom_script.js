const updateProperties = (elem, state) => {
    elem.style.setProperty('--x', `${state.x}px`)
    elem.style.setProperty('--y', `${state.y}px`)
    elem.style.setProperty('--width', `${state.width}px`)
    elem.style.setProperty('--height', `${state.height}px`)
    elem.style.setProperty('--radius', state.radius)
    elem.style.setProperty('--scale', state.scale)
}
document.querySelectorAll('.cursor').forEach(cursor => {
    let onElement

    const createState = e => {
        const defaultState = {
            x: e.clientX,
            y: e.clientY,
            width: 6,
            height: 6,
            scale:'100%',
            radius: '50%'
        }

        const computedState = {}

        if (onElement != null) {
            const { top, left, width, height } = onElement.getBoundingClientRect()
            // const radius = window.getComputedStyle(onElement).borderTopLeftRadius

            // computedState.x = left + width / 2
            // computedState.y = top + height / 2
            computedState.width = 30
            computedState.height = 30
            computedState.scale = '12%'
            // computedState.radius = radius
        }

        return {
            ...defaultState,
            ...computedState
        }
    }

    document.addEventListener('mousemove', e => {
        const state = createState(e)
        updateProperties(cursor, state)
    })

    document.querySelectorAll('a, button, .project-block .card').forEach(elem => {
        elem.addEventListener('mouseenter', () => (onElement = elem))
        elem.addEventListener('mouseleave', () => (onElement = undefined))
    })
})

var toggle = document.getElementById("theme-toggle");
var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme)
    document.documentElement.setAttribute('data-theme', storedTheme)

toggle.onclick = function() {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";

    if (currentTheme === "light") {
        targetTheme = "dark";
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
};


// header scroll
var header = document.getElementById("header");
window.onscroll = function(){
    if (window.pageYOffset > 100) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}


$(window).on("load", function () {
    $(".hamburger-box").click(function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        $(this).toggleClass("is-active");
        if($("html,body").hasClass("menu-open")){
            $("html,body").removeClass("menu-open")
        }else{
            $("html,body").addClass("menu-open")
        }
        
      });
      $(".scroll-down").click(function() {
        $('html,body').animate({
            scrollTop: $("#about").offset().top},
            'slow');
    });
    $(".navigation-links a").click(function(e){
        var $this = $(this).attr("href");
        console.log($this)
        e.preventDefault();
        e.stopImmediatePropagation();
        $(".hamburger-box").removeClass("is-active");
        $("html,body").removeClass("menu-open");
        $('html,body').animate({
            scrollTop: $($this).offset().top},
            'slower');
    });
    $('.tabs-nav a').click(function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var customType = $( this ).data('filter');
        $( this ).closest("li").siblings("li").removeClass("active");
        $( this ).closest("li").addClass("active");
        
        if(customType !== "all"){
            $(".project-block").hide().filter(function () {
                return $(this).data('block') === customType;    
            }).show();
        }else{
            $(".project-block").show();
        }
    })
    $(".project-block .card").click(function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        $(this).parent().find(".project-block-information").show();
        $("html,body").addClass("open-project");
    })
    $(".project-block-information .overlay").click(function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        $(this).parent().hide();
        $("html,body").removeClass("open-project");
    })
    $(".back-projects").click(function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        $(".project-block-information").hide();
        $("html,body").removeClass("open-project");
    })
    
    $('.owl-carousel').owlCarousel({
        loop:true,
        singleItem: true,
        items:1,
        nav: true,
        dots: false,
        navText: ["<i class='fa-solid fa-chevron-left'></i>","<i class='fa-solid fa-chevron-right'></i>"]
    })
    $('.popup-gallery').each(function() { 
    $(this).magnificPopup({
		delegate: '.owl-item:not(.cloned) a',
		type: 'image',
		// removalDelay: 500, //delay removal by X to allow out-animation
        gallery:{
        enabled:true,
        navigateByImgClick: true,
        }
	});
});

    // $('.tabs-nav a').click(function() {

    //     // Check for active
    //     $('.tabs-nav li').removeClass('active');
    //     $(this).parent().addClass('active');
    
    //     // Display active tab
    //     let currentTab = $(this).attr('href');
    //     $('.tabs-content div').hide();
    //     $(currentTab).show();
    
    //     return false;
    //   });
});
