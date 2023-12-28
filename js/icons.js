window.onload = function () {

    // define global variables
    const temp = (start.split('.')).map(item => item.slice(0, item.indexOf(':')));
    const data1 = temp.filter(el => (!(el.includes('webfonts'))));
    const data = (data1.filter(el => (el !== ''))).sort();
    var iconToPreview = '';
    var iconToPreviewClass = ''
    var searchList;
    // =================== Function Declarations ===================

    // function to set 'active' selected icon
    function setActive(el) {
        const divTarget = '#div' + el.innerText;
        $('div').removeClass('active');
        $(divTarget).addClass('active');
    }
    // function to set 'focus' for icon selected from search list
    function setIconFocus(e) {
        // last_IconList_option_elected = e.target.value;
        const value = '#div' + e.target.value;
        // move page to display icon selected from icons search list in icon library
        window.location.href = value;
        setActive(e.target);
    }
    // function to place icon to view in Previw window
    function viewIcon(iconClass) {
        let icon = iconClass.slice(4,);
        console.log('icon class to use:', iconClass);
        console.log('icon to use:', icon);
        $('#showIcon').html(`
        <div class='iconPreviewing'>
            <i id="previewingIcon" class= "${iconClass}"></i>
        </div>
        <p id ='showIconClass'>${iconClass}</p>
        `);
        console.log('the text to add to clipBoard:', $('#showIconClass').text());
        iconToPreview = icon;
        iconToPreviewClass = iconClass;
        $('#showOptions').fadeIn();
    }
    // function to manage auto-fill for search list
    function setAutoFill(elem) {
        $('#iconSearch').attr('value', 'e');
        const val = elem.tagName === 'INPUT' ? elem.value : elem.innerText.slice(3, 6);
        $('#iconSearch').attr('value', val);
        const subData = data.filter(el => el.match(`fa-${val}`));
        $('#iconList').html('<option value="Choose 1" style="background-color: lightgray" disabled>Choose an Icon:</option>');
        subData.forEach(icon => { $('#iconList').append(`<option id=${icon} value=${icon}>${icon}</option>`) });
    }
    // function to add selected option to icon setting in preview window
    function addIconOption(e, textClass) {
        let el = e.target;
        $('#showIconClass').text('');
        console.log('class to remove', textClass);
        $('#previewingIcon').removeClass();
        switch (el.attributes.value.value) {
            case ('normal'):
                $('#showIconClass').text(textClass);
                $('#previewingIcon').addClass(textClass);
                break;
            case ('rotate-90'):
                $('#showIconClass').text(textClass + ' fa-rotate-90');
                $('#previewingIcon').addClass(textClass + ' fa-rotate-90');
                break;
            case ('rotate-180'):
                $('#previewingIcon').addClass(textClass + ' fa-rotate-180');
                $('#showIconClass').text(textClass + ' fa-rotate-180');
                break;
            case ('spin'):
                $('#previewingIcon').addClass(textClass + ' fa-spin');
                $('#showIconClass').text(textClass + ' fa-spin');
                break;
            case ('pulse'):
                $('#previewingIcon').addClass(textClass + ' fa-pulse');
                $('#showIconClass').text(textClass + ' fa-pulse');
                break;
            default:
                break;
        }
        console.log('the text to add to clipBoard:', $('#showIconClass').text());

    }
    function handleIconSelection(e) {
        // determine which element selected and point to it's 'icon-label element
        setActive(e.currentTarget.children[1]);
        setAutoFill(e.currentTarget.children[1]);
    }

    function atStartUp() {
        // Clear Icon List
        $('#iconList').html('');
        // Create and add Iconlist option elements for icon search list
        data.forEach(icon => { (icon !== '') && $('#iconList').append(`<option id=${icon} value=${icon}>${icon}</option>`) });
        // Create and add IconDivs div elements to display icon library
        data.forEach(item => (item === '') || $('#iconDivs').append(`
    <div id = "div${item}" class='iconItem'>
        <p class='iconSpec'>
            <i class='fas ${item} '></i>
            <i class='fab ${item}' ></i>
        </p>
        <p class='icon-label'>${item}</p>
    </div>`
        ));
       
        $('#iconSearch').attr('value', 'a');
        setTimeout(() => {
            $('#iconSearch').attr('value', '');
            $('#iconSearch').focus()
        }, 500);

    }

    // =================== startUp executions ===================
    atStartUp();

    // =================== Event Listeners ===================

    $('#iconList').on('click', e => setIconFocus(e));
    $("#iconSearch").on('keyup', e => setAutoFill(e.target));
    $('#iconDivs>div').on('click', (e) => handleIconSelection(e));
    $('#iconOptions').on('click', e => addIconOption(e, iconToPreviewClass));
    $('.iconSpec').on('click', e => {
        console.log('iconSpec <p> element clicked:', e.target);
        // show selected Icon in preview window
        viewIcon(e.target.attributes.class.value);
    })
    // $('#iconList').on('active', e => e.target.focus() );
}; // end of onload
