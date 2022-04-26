//swiper
    let ArrowPrevious = $('.CustomSwiperButtonPrevious');
    let ArrowNext = $('.CustomSwiperButtonNext');

    $('.swiper').each(function (index, element)
    {
        $(this).addClass('swiper' + index);
        
        ArrowPrevious[index].classList.add('CustomSwiperButtonPrevious' + index);
        ArrowNext[index].classList.add('CustomSwiperButtonNext' + index);

        new Swiper('.swiper' + index, {
            freeMode: true,
            slidesPerView: 'auto',
            breakpoints: {
                0: {
                    centeredSlides: true,
                    centeredSlidesBounds: true,
                },
                320: {
                    centeredSlides: true,
                    centeredSlidesBounds: true,
                },
                480: {
                    centeredSlides: false,
                    centeredSlidesBounds: false,
                },
                576: {
                    centeredSlides: false,
                    centeredSlidesBounds: false,
                },
                768: {
                    centeredSlides: false,
                    centeredSlidesBounds: false,
                }
            },
            navigation: {
                nextEl: '.CustomSwiperButtonNext' + index,
                prevEl: '.CustomSwiperButtonPrevious' + index
            },
        });
    });
///////////

//swiper tags
    $('.swiper-tags').each(function (index, element)
    {
        $(this).addClass('swiper-tags' + index);

        new Swiper('.swiper-tags' + index, {
            grabCursor: true,
            touchEventsTarget: "container",
            freeMode: true,
            slidesPerView: "auto",
        });
    });
///////////

//+- buttons
    function IncreaseValue(ElementID)
    {
        var IncrementNumber = document.getElementsByClassName('IncNumber')[ElementID];
        var IncrementNumberValue = IncrementNumber.value;
        IncrementNumberValue >= 8 ? '' : IncrementNumberValue++;
        IncrementNumber.value = IncrementNumberValue;
    }
    function DecreaseValue(ElementID)
    {
        var IncrementNumber = document.getElementsByClassName('IncNumber')[ElementID];
        var IncrementNumberValue = IncrementNumber.value;
        IncrementNumberValue <= 1 ? '' : IncrementNumberValue--;
        IncrementNumber.value = IncrementNumberValue;
    }
///////////

//+- time buttons
    if(document.getElementsByClassName('IncTime')[0])
    {
        const InputTime = document.getElementsByClassName('IncTime')[0].placeholder;
        const Increment = 15;
        var Minutes = String(InputTime).slice(-2);
        var Hours = '12';

        function UpdateTime()
        {
            document.getElementsByClassName('IncTime')[0].placeholder = Hours + ':' + Minutes;
        }

        function AddTime()
        {
            if (Minutes  < 45)
            {
                Minutes = Minutes * 1 + Increment;
            }
            else if (Minutes >= 45)
            {
                Minutes = 0;
                Hours++;
                if (Hours > 23)
                {
                    Minutes = 0;
                    Hours = 0;
                } 
            }
            UpdateTime();
        }

        function SubTime()
        {
            if (Minutes > 0)
            {
                Minutes = Minutes * 1 - Increment;
            }
            else if (Minutes  <= 0)
            {
                Minutes = 45;
                Hours--;
                if (Hours < 0)
                {
                    Hours = 23;
                    Minutes = 45;
                }
            }
            UpdateTime();
        }        
    }

///////////

//Overlays
    const { body, documentElement } = document;
    let { ScrollTop } = document.documentElement;

    function OpenNavMenu(MenuID)
    {
        ScrollTop = documentElement.ScrollTop;
        body.style.top = `-${ScrollTop}px`;
        body.classList.add("ScrollDisabled");

        document.getElementById(MenuID).style.height = "100%";
        document.getElementsByTagName('html')[0].style.overflowY = "hidden";
    }
    function CloseNavMenu(MenuID)
    {
        body.classList.remove("ScrollDisabled");
        documentElement.style.scrollBehavior = "auto";
        documentElement.ScrollTop = ScrollTop;
        documentElement.style.removeProperty("scroll-behavior");
        body.style.removeProperty("top");
        
        document.getElementById(MenuID).style.height = "0%";
        document.getElementsByTagName('html')[0].style.overflowY = "scroll";
    }
///////////

//Input range
//NEEDS IMPROVEMENTS
    const allRanges = document.querySelectorAll(".RangeWrapper");
    allRanges.forEach(wrap =>
    {
        const range = wrap.querySelector(".ValueRange");
        const bubble = wrap.querySelector(".RangeOutput");
        var amount = 0;

        range.addEventListener("input", () => {
            SetBubble(range, bubble, amount);
        });

        document.querySelector("#InputRangeButtonDown").addEventListener("click", () => {
            amount = -1;
            SetBubble(range, bubble, amount);
        });

        document.querySelector("#InputRangeButtonUp").addEventListener("click", () => {
            amount = 1;
            SetBubble(range, bubble, amount);
        });

        SetBubble(range, bubble, amount);
    });

    function SetBubble(range, bubble, amount)
    {
        var val = range.value;
        val = Number(val);
        const min = range.min ? range.min : 0;
        const max = range.max ? range.max : 100;

        if(amount != 0)
        {
            var val2 = val + amount;
            range.value = val2;
        }
        else
        {
            var val2 = val;
        }

        const newVal = Number(((val2 - min) * 100) / (max - min));

        bubble.innerHTML = '\u20AC ' + val2;

        var rangeWidth = document.getElementsByClassName("ValueRange")[0].offsetWidth;
        var bubbleWidth = document.getElementsByClassName("RangeOutput")[0].offsetWidth;
        var calcRange = rangeWidth - bubbleWidth;
        
        bubble.style.left = ((calcRange / 100) * newVal) + `px`;
    }
///////////

//Result map expansion
    function ExpandResultMap()
    {
        const MapArrowButton = document.getElementsByClassName("MapArrowButton")[0];
        const ResultHalf = document.getElementsByClassName("ResultHalf")[0];
        const MapHalf = document.getElementsByClassName("MapHalf")[0];

        if(MapArrowButton.value == "shrunk")
        {
            ResultHalf.style.whiteSpace = "nowrap";
            ResultHalf.style.width = "0%";
            MapHalf.style.width = "100%";
            console.log('Expanded the map');
            MapArrowButton.value = "expanded";
            MapArrowButton.innerHTML = "&gt";
        }
        else if(MapArrowButton.value == "expanded")
        {

            ResultHalf.style.removeProperty('width');
            MapHalf.style.removeProperty('width');
            console.log('Shrunk the map');
            MapArrowButton.value = "shrunk";
            MapArrowButton.innerHTML = "&lt";
            ResultHalf.style.whiteSpace = "normal";
        }
    }
///////////